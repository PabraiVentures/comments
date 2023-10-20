'use client'

import { useState } from 'react'
import Comment from './Comment'
import loadValues, { EnhancedValue, newEnhancedValue } from '@/app/valuesLoader'

export default function CommentsList() {
    const [comments, setComments] = useState(() => {
        let k = loadValues()
        debugger;
        return loadValues()
    })
    const [newComment, setNewComment] = useState<EnhancedValue>(newEnhancedValue())

    const handleAddComment = () => {
        const updatedComments = [...comments, newComment]
        setComments(updatedComments)
        setNewComment(newEnhancedValue())
    }

    return (
        <div className='p-4'>
            <div className='flex mb-4'>
                <input
                    value={newComment.name}
                    onChange={e => {
                        setNewComment({
                            ...newComment,
                            name: e.target.value
                        })
                    }}
                    placeholder='Add a value...'
                    className='flex-1 p-2 rounded-md border border-gray-300 mr-2'
                />
                <button
                    onClick={handleAddComment}
                    className='bg-green-500 text-white rounded-md px-4 py-2 hover:bg-green-600'
                >
                    Comment
                </button>
            </div>
            <div className='space-y-4'>
                {comments.map((comment, index) => (
                    <Comment key={index} comment={comment} />
                ))}
            </div>
        </div>
    )
}
