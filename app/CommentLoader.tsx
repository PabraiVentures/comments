import { CommentItem } from "@/Components/CommentElement"
import ls from 'local-storage'

export interface CommentUpdate {
    comments: CommentItem[]
    valueID: string
}

export function storeComments(update: CommentUpdate) {
    ls.set(update.valueID, update.comments)
}

export function getComments(valueID: string) {
    let loaded: CommentItem[] = ls.get(valueID) ?? []
    return loaded
}