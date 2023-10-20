'use client'
import { EnhancedValue, newEnhancedValue } from '@/app/valuesLoader'
import { useState } from 'react'

interface CommentProps {
    comment: EnhancedValue
}

export default function Comment({ comment }: CommentProps) {
    const [replies, setReplies] = useState<EnhancedValue[]>(comment.children)
    const [newReply, setNewReply] = useState<EnhancedValue>(newEnhancedValue())

    const handleReply = () => {
        const updatedReplies = [...replies, newReply]
        setReplies(updatedReplies)
        setNewReply(newEnhancedValue())
    }

    return (
        <div className='bg-gray-100 p-4 rounded-md my-2'>
            <p className='text-gray-700'>{comment.name}</p>
            <div className='flex mt-2'>
                <input
                    value={newReply.name}
                    onChange={e => setNewReply({
                        ...newReply,
                        name: e.target.value
                    })}
                    placeholder='Log this value...'
                    className='flex-1 p-2 rounded-md border border-gray-300 mr-2'
                />
                <button
                    onClick={handleReply}
                    className='bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600'
                >
                    Reply
                </button>
            </div>
            <div className='ml-4 mt-2'>
                {replies.map((reply, index) => (
                    <Comment key={index} comment={reply} />
                ))}
            </div>
        </div>
    )
}
