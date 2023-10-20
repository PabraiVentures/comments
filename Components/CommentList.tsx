'use client'

import { useState } from 'react'
import Comment from './Comment'
import loadValues, { EnhancedValue, newEnhancedValue } from '@/app/valuesLoader'
import ls from 'local-storage'


export default function CommentsList() {
    const [comments, setComments] = useState(() => {
        let k = loadValues()
        let g = ls.get("pies") || "empty"
        console.log("pies is " + JSON.stringify(g))
        ls.set("pies", "apple")
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
            <div className='space-y-4'>
                {comments.map((comment, index) => (
                    <Comment key={index} comment={comment} depth={0} />
                ))}
            </div>
        </div>
    )
}
