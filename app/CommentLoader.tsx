import { CommentItem } from "@/Components/CommentElement"
import ls from 'local-storage'
import { remove, get } from "local-storage"

export interface CommentUpdate {
    comments: CommentItem[]
    valueID: string
}

interface RawComment {
    id: string
    createdAt: string
    text: string
}

export function storeComments(update: CommentUpdate) {
    if (update.comments.length > 0) {
        ls(update.valueID, update.comments)
    } else {
        remove(update.valueID)
    }
}

export function getComments(valueID: string) {
    let rawComments: RawComment[] = get(valueID)
    if (rawComments == null) {
        return []
    }
    return rawComments.map((comment: any) => {
        return {
            ...comment,
            createdAt: new Date(comment.createdAt)
        }
    })
}

export function removeComments(valueID: string) {
    ls(valueID, "")
}