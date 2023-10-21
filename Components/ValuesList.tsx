'use client'

import { useState } from 'react'
import CommentElement from './CommentElement'
import ValueHeader from './ValueHeader'
import loadValues, { EnhancedValue, newEnhancedValue } from '@/app/valuesLoader'
import ls from "local-storage"

export default function ValuesList() {
    const [values, setValues] = useState(() => {
        return loadValues()
    })

    return (
        <div className='p-4'>
            <div className='space-y-4'>
                {values.map((value, index) => (
                    <ValueHeader key={index} value={value} depth={0} />
                ))}
            </div>
        </div>
    )
}
