import { Attribute, EventBadgeMetaData } from "./../generated/schema";
import { Bytes, dataSource, json, log } from "@graphprotocol/graph-ts";
import { getOrCreateAttribute } from "./helper/utils";

export function handleEventBadgeMetadata(content: Bytes): void {
    log.debug("handleEventBadgeMetadata: {}", [dataSource.stringParam()]);

    let eventBadgeMetadata = new EventBadgeMetaData(dataSource.stringParam());
    const value = json.fromBytes(content).toObject();

    if (value) {
        const attribs = value.get("attributes");

        if (attribs) {
            let newAttributes: Array<string> = [];
            let attributesArray = attribs.toArray();

            let currentType: string;
            let currentValue: string;

            for (let i = 0; i < attributesArray.length; i++) {
                currentType = attributesArray[i]
                    .toObject()
                    .mustGet("trait_type")
                    .toString();
                currentValue = attributesArray[i]
                    .toObject()
                    .mustGet("value")
                    .toString();

                const newTypeString = currentType.replace(" ", "_");
                const newValueString = currentValue.replace(" ", "_");
                const attributeId = newTypeString + "-" + newValueString;

                let attributeObj = Attribute.load(attributeId);

                if (attributeObj == null) {
                    attributeObj = new Attribute(attributeId);
                    attributeObj.trait_type = currentType;
                    attributeObj.value = currentValue;
                    attributeObj.save();
                }

                let attributesId = attributeObj.id;

                newAttributes.push(attributesId);
            }

            eventBadgeMetadata.attributes = newAttributes;

            log.debug(
                "ipfs: {} | newAttributes: {} | eventBadgeMetadata.attributes: {}",
                [
                    dataSource.stringParam(),
                    newAttributes.toString(),
                    eventBadgeMetadata.attributes!.toString(),
                ]
            );
        }
    }
    eventBadgeMetadata.save();
}
