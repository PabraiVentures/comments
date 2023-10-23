import { CommentItem } from "@/Components/CommentElement"
import ls from 'local-storage'
import { remove, get } from "local-storage"

export interface CommentUpdate {
    comments: CommentItem[]
    valueID: string
}

export function storeComments(update: CommentUpdate) {
    if (update.comments.length > 0) {
        ls(update.valueID, update.comments)
    } else {
        remove(update.valueID)
    }
}

export function getComments(valueID: string) {
    let loaded: CommentItem[] = get(valueID)
    return loaded
}

export function removeComments(valueID: string) {
    ls(valueID, "")
}