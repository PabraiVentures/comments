'use client'
import { CommentItem } from "@/Components/CommentElement";
import values from "./values.json"
import { v4 as uuidv4 } from "uuid";
import ls from "local-storage"
import { getComments } from "./CommentLoader";

export interface Value {
    id: string;
    name: string;
    childrenIDs: string[];
}

export interface EnhancedValue {
    id: string;
    name: string;
    children: EnhancedValue[];
    comments: CommentItem[]
}

export function newEnhancedValue() {
    return { id: uuidv4(), name: "", children: [], comments: [] }
}

export default function loadValues() {
    let cleaned: Value[] = values.map((value) => {
        return {
            ...value,
            childrenIDs: value.childrenIDs == undefined ? [] : value.childrenIDs
        }
    })
    let valuesById = new Map<string, Value>()
    let parentIdForId = new Map<string, string>()
    cleaned.forEach((value) => {
        valuesById.set(value.id, value)
        if (value.childrenIDs != null) {
            value.childrenIDs.forEach((id) => {
                parentIdForId.set(id, value.id)
            });
        }
    });

    // Function to map values recursively
    let valueMapper = (value: Value): EnhancedValue => {
        let childrenIDs = value?.childrenIDs ?? []
        return {
            ...value,
            comments: getComments(value.id), // todo load in comments
            children: childrenIDs
                .map((id) => valuesById.get(id))
                .filter((value): value is Value => value !== undefined)
                .map((value) => valueMapper(value)),
        };
    }

    return cleaned.filter((value) => parentIdForId.get(value.id) == null)
        .map(valueMapper)

}