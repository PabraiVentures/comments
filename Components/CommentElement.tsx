'use client'
import { EnhancedValue, newEnhancedValue } from '@/app/valuesLoader'
import { useState } from 'react'
import { v4 as uuidv4 } from "uuid";

interface CommentProps {
    comment: CommentItem
    onDeleteClicked(commentID: string): void
}

export interface CommentItem {
    text: string
    id: string
}

export function createComment(): CommentItem {
    return { id: uuidv4(), text: "" }
}

export default function CommentElement({ comment, onDeleteClicked }: CommentProps) {
    const [buttonState, setButtonState] = useState(false)
    function showButtons() {
        setButtonState(true)
    }

    function hideButtons() {
        setButtonState(false)
    }

    function deleteClicked() {
        onDeleteClicked(comment.id)
    }

    return (
        <div className='bg-gray-100 p-4 rounded-md my-2' onMouseOver={showButtons} onMouseLeave={hideButtons}>
            <div className='flex flex-row'>
                <p className='flex-1 text-gray-700' >{comment.text}</p>
                {buttonState &&
                    <p className='flex-none text-red-700' onClick={deleteClicked} >Delete</p>
                    // 

                }
            </div>
        </div >
    )
}
