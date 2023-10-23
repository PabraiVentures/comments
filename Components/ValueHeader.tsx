'use client'
import { EnhancedValue, newEnhancedValue } from '@/app/valuesLoader'
import { useState } from 'react'
import CommentElement, { createComment, CommentItem } from './CommentElement'
import { removeComments, storeComments } from '@/app/CommentLoader'

interface ValueHeaderProps {
    value: EnhancedValue
    depth: number
}

export default function ValueHeader({ value, depth }: ValueHeaderProps) {
    const children = value.children
    const [comments, setComments] = useState<CommentItem[]>(() => {
        return value.comments
    })
    const [newComment, setNewComment] = useState<CommentItem>(createComment())
    const handleComment = () => {
        const updatedComments = [...comments, newComment]
        setComments(updatedComments)
        setNewComment(createComment())
        storeComments({ comments: updatedComments, valueID: value.id })
    }

    const deleteComment = (commentID: string) => {
        let newComments = comments.filter((comment) => {
            return comment.id !== commentID
        })
        setComments(newComments)
        removeComments(value.id)

        console.log("new comments " + JSON.stringify(newComments))
        storeComments({ comments: newComments, valueID: value.id })
    }

    let isLeaf = depth == 1
    if (isLeaf) {
        return (
            <div className='bg-gray-100 p-4 rounded-md my-2'>
                <p className='text-gray-700'>{value.name}</p>
                <div className='ml-4 mt-2'>
                    {comments.map((comment, index) => (
                        <CommentElement key={index} comment={comment} onDeleteClicked={deleteComment} />
                    ))}
                </div>
                <div className='flex mt-2'>
                    <input
                        value={newComment.text}
                        onChange={e => setNewComment({
                            ...newComment,
                            text: e.target.value
                        })}
                        placeholder='Log this value...'
                        className='flex-1 p-2 rounded-md border border-gray-300 mr-2'
                    />
                    <button
                        onClick={handleComment}
                        className='bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600'
                    >
                        Log
                    </button>
                </div>
            </div>
        )
    } else {
        return (
            <div className='bg-gray-100 p-4 rounded-md my-2'>
                <p className='text-gray-700'>{value.name}</p>
                <div className='ml-4 mt-2'>
                    {children.map((reply, index) => (
                        <ValueHeader key={index} value={reply} depth={depth + 1} />
                    ))}
                </div>
            </div>
        )
    }
}
