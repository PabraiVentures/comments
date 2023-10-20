'use client'
import { EnhancedValue, newEnhancedValue } from '@/app/valuesLoader'
import { useState } from 'react'

interface CommentProps {
    comment: CommentItem
}

export interface CommentItem {
    text: string
}

export function createComment(): CommentItem {
    return { text: "" }
}

export default function CommentElement({ comment }: CommentProps) {
    return (
        <div className='bg-gray-100 p-4 rounded-md my-2'>
            <p className='text-gray-700'>{comment.text}</p>
        </div>
    )
}
