import { Checkbox, SvgIcon } from '@mui/material'
import React from 'react'
import CheckCheckox from '../customIcons/CheckCheckox'
import CheckedCheckox from '../customIcons/CheckedCheckBox'

const DesignedTodoItems = ({ todo }) => {


    return (
        <div className={`rounded-2xl ${todo.priority === 1 ? 'bg-low' : todo.priority === 2 ? 'bg-medium' : todo.priority === 3 ? 'bg-high' : 'bg-gen min-h-[109px]'} shadow-todoItem flex items-start p-2 py-6 gap-x-2 justify-between `}>
            <div className="flex gap-2">

                <Checkbox icon={<CheckCheckox priority={todo.priority} />} checkedIcon={<CheckedCheckox priority={todo.priority} />} sx={{
                    color: 'transparent', '&.Mui-checked': {
                        color: 'transparent',
                    },
                }} />
                <div className={`${(todo.priority === 3 || todo.priority === 0) ? 'text-white' : 'text-black'}  `}>
                    <h3 className="text-lg font-bold leading-tight">
                        {todo.title}
                    </h3>
                    <h4 className="text-xs font-normal leading-tight">
                        {todo.description}
                    </h4>
                </div>
            </div>
            <div className="flex flex-col gap-2 items-start h-full">
                <div className={`${todo.priority === 0 ? 'hidden ' : (todo.priority === 1 || todo.priority === 2) ? 'text-white bg-black' : 'text-black bg-white'} rounded-xl text-xs px-2 font-bold w-full text-center uppercase`}>
                    {todo.priority === 1 ?
                        'Low' :
                        todo.priority === 2 ?
                            'Medium' :
                            todo.priority === 3 ?
                                'High' :
                                'General'

                    }
                </div>
                <div className={`${(todo.priority === 3 || todo.priority === 0) ? 'text-white' : 'text-black'} text-xs font-semibold w-max  leading-none `}>
                    Due: 12:22 PM
                </div>

                <div className={`${(todo.priority === 3 || todo.priority === 0) ? 'text-white' : 'text-black'} text-xs font-semibold w-max  leading-none`}>
                    12 Aug
                </div>

            </div>
        </div>
    )

}

export default DesignedTodoItems