import {
    Address,
    dataSource,
    JSONValue,
    log,
    TypedMap,
} from "@graphprotocol/graph-ts";

import { Attribute } from "../../generated/schema";

export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

export function getOrCreateArray(
    arrayObj: Array<string> | null
): Array<string> {
    if (arrayObj == null) {
        return [];
    } else {
        return arrayObj;
    }
}

export function getValueFromJSON(
    jsonObj: TypedMap<string, JSONValue> | null,
    key: string
): string | null {
    if (jsonObj == null) {
        return null;
    } else {
        let targetValue = jsonObj.get(key);
        if (targetValue == null) {
            return null;
        } else {
            return targetValue.toString();
        }
    }
}

export function getIPFSHashFromURL(url: string): string {
    return url.replace("ipfs://", "");
}

export function getOrCreateAttribute(type: string, value: string): Attribute {
    const newTypeString = type.replace(" ", "_");
    const newValueString = value.replace(" ", "_");
    const attributeId = newTypeString + "-" + newValueString;

    let attributeObj = Attribute.load(attributeId);

    if (attributeObj == null) {
        attributeObj = new Attribute(attributeId);
        attributeObj.trait_type = type;
        attributeObj.value = value;
        attributeObj.save();
    }

    return attributeObj;
}
