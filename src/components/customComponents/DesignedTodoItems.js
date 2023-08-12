import { Checkbox, SvgIcon } from '@mui/material'
import React from 'react'
import CheckCheckox from './CheckCheckox'

const DesignedTodoItems = ({priority}) => {
 
    switch (priority) {
        case 0:
            return (
                <div className='rounded-2xl bg-black shadow-todoItem'>
                    <Checkbox icon={<CheckCheckox/> } />
                </div>
            )
        case 1:
            return (
                <div></div>
            )
        case 2:
            return (
                <div></div>
            )
        case 3:
            return (
                <div></div>
            )
    
        default:
            break;
    }
}

export default DesignedTodoItems