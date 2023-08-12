import { Checkbox, SvgIcon } from '@mui/material'
import React from 'react'
import CheckCheckox from '../customIcons/CheckCheckox'
import CheckedCheckox from '../customIcons/CheckedCheckBox'

const DesignedTodoItems = ({ priority }) => {


    return (
        <div className={`rounded-2xl ${priority === 1 ? 'bg-low' : priority === 2 ? 'bg-medium' : priority === 3 ? 'bg-high' : 'bg-gen'} bg-black shadow-todoItem flex items-start p-2 py-6 gap-x-2`}>
            <Checkbox icon={<CheckCheckox priority={priority} />} checkedIcon={<CheckedCheckox priority={priority} />} sx={{
                color: 'transparent', '&.Mui-checked': {
                    color: 'transparent',
                },
            }} />
            <div className={`${(priority === 3||priority === 0) ? 'text-white' : 'text-black'}  `}>
                <h3 className="text-lg font-bold leading-tight">
                    Homework
                </h3>
                <h4 className="text-xs font-normal leading-tight">
                    I have to do maths Homework
                </h4>
            </div>
            <div className="flex flex-col gap-2 items-start h-full">
                <div className={`${priority === 0 ? 'hidden ' : (priority === 1||priority === 2) ? 'text-white bg-black': 'text-black bg-white'} rounded-xl text-xs px-2 font-bold w-full text-center uppercase`}>
                    {priority === 1 ?
                        'Low' :
                        priority === 2 ?
                            'Medium' :
                            priority === 3 ?
                                'High' :
                                'General'

                    }
                </div>
                <div className={`${(priority === 3||priority === 0) ? 'text-white' : 'text-black'} text-xs font-semibold w-max  leading-none`}>
                    Due: 12:22 PM
                </div>

                <div className={`${(priority === 3||priority === 0) ? 'text-white' : 'text-black'} text-xs font-semibold w-max  leading-none`}>
                    12 Aug
                </div>

            </div>
        </div>
    )

}

export default DesignedTodoItems