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
    const commentsPerPage = 10
    const children = value.children
    const [comments, setComments] = useState<CommentItem[]>(() => {
        return value.comments
    })
    const [newComment, setNewComment] = useState<CommentItem>(createComment())
    const [currentPage, setCurrentPage] = useState(0)

    const handleComment = () => {
        const updatedComments = [newComment, ...comments]
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

        storeComments({ comments: newComments, valueID: value.id })
    }

    const showMoreComments = () => {
        setCurrentPage(currentPage + 1)
    }
    let displayedComments = comments.slice(0, ((currentPage + 1) * commentsPerPage))
    let shouldShowPreviousButton = displayedComments.length < comments.length
    let isLeaf = depth == 1
    if (isLeaf) {
        return (
            <div className='bg-gray-100 p-4 rounded-md my-2'>
                <p className='text-gray-700'>{value.name}</p>

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
                <div className='ml-4 mt-2'>
                    {displayedComments.map((comment, index) => (
                        <CommentElement key={index} comment={comment} onDeleteClicked={deleteComment} />
                    ))}
                    {shouldShowPreviousButton &&
                        <p className='flex-none text-blue-700' onClick={showMoreComments} >Previous logs...</p>
                    }
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
