import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Checkbox, Dropdown } from 'antd'
import { useDispatch } from 'react-redux'
import DateBox from './DateBox'
import PriorityBox from './PriorityBox'
import { todoVariants } from '../../constants'
import { toggleTodo } from '../../sclices/todoSlice'
import { MoreOutlined } from '@ant-design/icons'
import Confetti from 'react-confetti'

const TodoItem = ({ todo, dropdownItems }) => {
    const dispatch = useDispatch()

    const randomColors = [
        { bg: "#FF5733", text: "#FFFFFF" },
        { bg: "#FFC300", text: "#000000" },
        { bg: "#85C1E9", text: "#000000" },
        { bg: "#52BE80", text: "#FFFFFF" },
        { bg: "#F1948A", text: "#000000" },
        { bg: "#D7DBDD", text: "#000000" },
        { bg: "#F0B27A", text: "#000000" },
        { bg: "#AED6F1", text: "#000000" }
    ];
    const [randomColor, setRandomColor] = useState(randomColors[Math.floor(Math.random() * randomColors.length)]);

    return (
        <motion.div initial="hidden"
            animate="visible"
            variants={todoVariants} className="flex w-full p-2 items-start gap-x-2 gap-y-4 shadow-2xl hover:shadow-md" key={todo.id}
            style={{
                backgroundColor: randomColor.bg,
                color: randomColor.text
            }}
        >
            <Checkbox className='my-[2px]' onChange={() => dispatch(toggleTodo(todo.id))} />
            <div className="grid  w-full group/todobox gap-y-1">
                <input type="text" placeholder='Enter Todo' className='w-full px-2  disabled:bg-inherit min-w-[10px]' disabled value={todo.title} />
                <input placeholder='Enter Description' className={`px-2 text-xs  disabled:bg-inherit ${todo.description ? 'inline' : 'hidden'} min-w-[10px]`} disabled value={todo.description} />
                <motion.div initial="hidden" animate="visible" variants={todoVariants} className="flex gap-x-3">
                    {todo.dueDate ? <DateBox fixedDate={todo.dueDate} /> : ''}
                    {todo.priority ? <PriorityBox priority={todo.priority} /> : ''}
                </motion.div>
            </div>
            <Dropdown overlay={dropdownItems(todo.id)} key={todo.id}>
                <MoreOutlined className='font-bold' />

            </Dropdown>
        </motion.div>

    )
}

export default TodoItem