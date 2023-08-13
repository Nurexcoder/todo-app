import { Checkbox, IconButton, SvgIcon } from '@mui/material'
import React from 'react'
import CheckCheckox from '../customIcons/CheckCheckox'
import CheckedCheckox from '../customIcons/CheckedCheckBox'
import dayjs from 'dayjs'
import { mS } from '../../constants'
import { useDispatch } from 'react-redux'
import { fetchUserTodos, toggleFirebaseTodo } from '../../sclices/todoSlice'
import { DeleteOutline } from '@mui/icons-material'

const formatAMPM = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';

    hours %= 12;
    hours = hours || 12;
    minutes = minutes < 10 ? `0${minutes}` : minutes;

    const strTime = `${hours}:${minutes} ${ampm}`;

    return strTime;
};
const DesignedCompletedTodoItems = ({ todo }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const formatedDate = todo.dueDate ? todo.dueDate.toDate().getDate() + ' ' + mS[todo.dueDate.toDate().getMonth()] : null
    const formatedTime = todo.dueTime ? formatAMPM(todo.dueTime.toDate()) : null

    const dispatch = useDispatch()
    const toggleTodo = async (id) => {
        await dispatch(toggleFirebaseTodo({ id: id, done: !todo.done }))

        dispatch(fetchUserTodos())
    }
    return (

        <div className={`rounded-2xl ${todo.priority === 1 ? 'bg-low' : todo.priority === 2 ? 'bg-medium' : todo.priority === 3 ? 'bg-high' : 'bg-gen '} shadow-todoItem flex items-start px-2 min-h-[104px] pb-4 pt-8 gap-x-2 justify-between relative`}>
            <div className="flex gap-2">

                <Checkbox icon={<CheckCheckox priority={todo.priority} />} checkedIcon={<CheckedCheckox priority={todo.priority} />} sx={{
                    color: 'transparent', '&.Mui-checked': {
                        color: 'transparent',
                    },

                }}
                    defaultChecked
                    onClick={() => toggleTodo(todo.id)}
                />
                <div className={`${(todo.priority === 3 || todo.priority === 0) ? 'text-white' : 'text-black'}  `}>
                    <h3 className="text-lg font-bold leading-tight line-through">
                        {todo.title}
                    </h3>
                    <h4 className="text-xs font-normal leading-tight line-through">
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
                <div className={`${(todo.priority === 3 || todo.priority === 0) ? 'text-white' : 'text-black'} ${formatedTime ? 'inline' : 'hidden'} text-xs font-semibold w-max  leading-none `}>
                    Due: {formatedTime}
                </div>

                <div className={`${(todo.priority === 3 || todo.priority === 0) ? 'text-white' : 'text-black'} ${formatedDate ? 'inline' : 'hidden'} text-xs font-semibold w-max  leading-none`}>
                    {formatedDate}
                </div>

            </div>
            <div className='absolute right-0 top-0'>
                <div className={`${todo.priority === 3 || todo.priority === 0 ? 'text-white' : 'text-black'} `} >

                    <IconButton
                        aria-label="more"
                        id="long-button"
                        aria-controls={open ? 'long-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={handleClick}
                        color='inherit'
                    >
                        <DeleteOutline color='inherit' fontSize='small' />
                    </IconButton>
                </div>
            </div>
        </div>

    )

}

export default DesignedCompletedTodoItems