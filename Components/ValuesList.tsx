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

    const [collapsed, setCollapsed] = useState(false)

    function toggleCollapsed() {
        setCollapsed(!collapsed)
    }
    return (
        <div className='p-4'>
            {collapsed &&
                <p className='flex-none text-blue-700' onClick={toggleCollapsed} >Show logs</p>
            }
            {!collapsed &&
                <p className='flex-none text-blue-700' onClick={toggleCollapsed} >Hide logs</p>
            }
            <div className='space-y-4'>
                {values.map((value, index) => (
                    <ValueHeader key={index} value={value} depth={0} collapsed={collapsed} />
                ))}
            </div>
        </div>
    )
}
