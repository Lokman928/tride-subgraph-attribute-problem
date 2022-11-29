import { EventBadgeMetadata } from "./../generated/schema";
import { Bytes, dataSource, json, log } from "@graphprotocol/graph-ts";
import { getOrCreateAttribute } from "./helper/utils";

export function handleEventBadgeMetadata(content: Bytes): void {
    log.debug("handleEventBadgeMetadata: {}", [
        dataSource.address().toString(),
    ]);

    let eventBadgeMetadata = new EventBadgeMetadata(
        dataSource.address().toString()
    );
    const value = json.fromBytes(content).toObject();

    if (value) {
        const image = value.get("image");
        const name = value.get("name");
        const description = value.get("description");
        const attribs = value.get("attributes");

        if (image) {
            eventBadgeMetadata.image = image.toString();
        }

        if (name) {
            eventBadgeMetadata.name = name.toString();
        }

        if (description) {
            eventBadgeMetadata.description = description.toString();
        }
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

                let attributesId = getOrCreateAttribute(
                    currentType,
                    currentValue
                ).id;

                newAttributes.push(attributesId);
            }

            eventBadgeMetadata.attributes = newAttributes;

            log.debug(
                "ipfs: {} | newAttributes: {} | eventBadgeMetadata.attributes: {}",
                [
                    dataSource.address().toString(),
                    newAttributes.toString(),
                    eventBadgeMetadata.attributes!.toString(),
                ]
            );
        }

        eventBadgeMetadata.save();
    }
}
