import React from 'react'
import { motion } from 'framer-motion'
import { Checkbox, DatePicker, Select, Tooltip } from 'antd'
import { todoVariants } from '../../constants'
import DateBox from './DateBox'
import PriorityBox from './PriorityBox'
import dayjs from 'dayjs'


const TodoForm = ({ handleChange, handleSubmit, currentTodo, setCurrentTodo,inputRef,clearCurTodo }) => {
    function disabledDate(current) {
        return current && current <= dayjs().startOf('day');
      }
    return (
        <form className="flex w-full items-start gap-x-4 gap-y-4 " onSubmit={handleSubmit } >
            <Checkbox className='py-1'  />

            <div className="grid gap-y-2 w-full group/todobox">
                <input type="text" name='title' ref={inputRef} placeholder='Enter Todo' value={currentTodo.title} onChange={handleChange} className='w-full px-2 py-1' />
                <textarea name='description' placeholder='Enter Description' value={currentTodo.description} onChange={handleChange} className='px-2 text-sm py-1' />
                <motion.div initial="hidden" animate="visible" variants={todoVariants} className="flex gap-x-3 ">
                    {currentTodo.dueDate ? <DateBox date={currentTodo.dueDate}  /> : ''}
                    {currentTodo.priority ? <PriorityBox priority={currentTodo.priority} /> : ''}

                </motion.div>
                <div className=" gap-x-3  flex items-center" >
                    <Tooltip title='Due Date'>
                        <DatePicker value={currentTodo.dueDate} onChange={(value) => setCurrentTodo({ ...currentTodo, dueDate: value })} disabledDate={disabledDate} />
                    </Tooltip>
                    <Tooltip title='Priority'>
                        <Select style={{ width: 100 }} defaultValue={0} options={[{ value: 0, label: "Priority" }, { value: 1, label: "Low" }, { value: 2, label: "Medium" }, { value: 3, label: "High" }]} value={currentTodo.priority} onChange={(value) => setCurrentTodo({ ...currentTodo, priority: value })} />
                    </Tooltip>
                </div>
                <div className="justify-self-end flex gap-x-3 items-center">
                    <button type='button' onClick={clearCurTodo} className='bg-red-400 p-2 rounded-md text-blue-50 hover:bg-red-500'>Cancel</button>
                    <button type='submit' className='bg-blue-400 p-2 rounded-md text-blue-50 hover:bg-blue-500'>{currentTodo.id ? 'Edit Todo' : 'Add Todo'}</button>
                </div>
            </div>
        </form>
    )
}

export default TodoForm