import { Checkbox, IconButton, Menu, MenuItem, Modal, SvgIcon } from '@mui/material'
import React, { useState } from 'react'
import CheckCheckox from '../customIcons/CheckCheckox'
import CheckedCheckox from '../customIcons/CheckedCheckBox'
import dayjs from 'dayjs'
import { mS } from '../../constants'
import { useDispatch } from 'react-redux'
import { deleteFirebaseTodo, fetchAllTodos, fetchUserTodos, toggleFirebaseTodo } from '../../sclices/todoSlice'
import { DeleteOutline, Edit, MoreVert } from '@mui/icons-material'
import TodoForm from './TodoForm'

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
const DesignedTodoItems = ({ todo }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const [modalOpen, setModalOpen] = useState(false)
    const handleModalOpen = () => {
        setModalOpen(true)
    }
    const handleModalClose = () => {
        setModalOpen(false)
    }

    const formatedDate = todo.dueDate ? todo.dueDate.toDate().getDate() + ' ' + mS[todo.dueDate.toDate().getMonth()] : null
    const formatedTime = todo.dueTime ? formatAMPM(todo.dueTime.toDate()) : null

    const dispatch = useDispatch()
    const toggleTodo = async (id) => {
        await dispatch(toggleFirebaseTodo({ id: id, done: !todo.done }))

        dispatch(fetchUserTodos())
        dispatch(fetchAllTodos())
    }
    const handleEdit = (id) => {
        setModalOpen(true)
        handleClose()
    }
    const handleDelete = async (id) => {
        handleClose()
        await dispatch(deleteFirebaseTodo(id))
        dispatch(fetchUserTodos())
        dispatch(fetchAllTodos())
    }
    return (

        <div className={`rounded-2xl ${todo.priority === 1 ? 'bg-low' : todo.priority === 2 ? 'bg-medium' : todo.priority === 3 ? 'bg-high' : 'bg-gen '} min-h-[104px] shadow-todoItem flex items-start px-2 pb-4 pt-8 gap-x-2 justify-between relative`}>
            <div className="flex gap-2">

                <Checkbox icon={<CheckCheckox priority={todo.priority} />} checkedIcon={<CheckedCheckox priority={todo.priority} />} sx={{
                    color: 'transparent', '&.Mui-checked': {
                        color: 'transparent',
                    },
                }}
                    onChange={() => toggleTodo(todo.id)}
                />
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
                        <MoreVert color='inherit' fontSize='small' />
                    </IconButton>
                </div>
                <Menu
                    id="long-menu"
                    MenuListProps={{
                        'aria-labelledby': 'long-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            px: 1,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <MenuItem onClick={handleEdit}>

                        <button  className='flex items-center justify-center gap-x-2'>
                            <Edit fontSize='small' /> Edit
                        </button>
                    </MenuItem>
                    <MenuItem onClick={() => handleDelete(todo.id)}>

                        <button className='flex items-center justify-center gap-x-2'>
                            <DeleteOutline fontSize='small' /> Delete
                        </button>
                    </MenuItem>
                </Menu>
            </div>
            <Modal open={modalOpen} onClose={handleModalClose}>
                <TodoForm todoData={todo} handleClose={handleModalClose} />
            </Modal>
            
        </div>

    )

}

export default DesignedTodoItems