import React from 'react'
import { motion } from 'framer-motion'
import { Checkbox, Dropdown } from 'antd'
import { useDispatch } from 'react-redux'
import DateBox from './DateBox'
import PriorityBox from './PriorityBox'
import { todoVariants } from '../../constants'
import { toggleTodo } from '../../sclices/todoSlice'
import { MoreOutlined } from '@ant-design/icons'

const CompletedTodoItem = ({ todo,dropdownItems }) => {
    const dispatch = useDispatch()

    return (
        <motion.div initial="hidden"
            animate="visible"
            variants={todoVariants} className="flex w-full p-2 items-start gap-x-2 gap-y-4 hover:shadow-md" key={todo.id}>
            <Checkbox checked className='my-[2px]' onChange={() => dispatch(toggleTodo(todo.id))} />
            <div className="grid  w-full group/todobox gap-y-1">
                <input type="text" placeholder='Enter Todo' className='w-full px-2  disabled:bg-inherit line-through' disabled value={todo.title} />
                <input placeholder='Enter Description' className={`px-2 text-xs  disabled:bg-inherit line-through ${todo.description ? 'inline' : 'hidden'}`} disabled value={todo.description} />
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

export default CompletedTodoItem