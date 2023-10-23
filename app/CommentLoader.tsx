import { CommentItem } from "@/Components/CommentElement"
import ls from 'local-storage'

export interface CommentUpdate {
    comments: CommentItem[]
    valueID: string
}

export function storeComments(update: CommentUpdate) {
    ls(update.valueID, update.comments)

}

export function getComments(valueID: string) {
    //@ts-ignore
    let loaded: CommentItem[] = ls(valueID)
    return loaded
}

export function removeComments(valueID: string) {
    ls(valueID, [])
}