import React from 'react'
import { motion } from 'framer-motion'
import { Checkbox } from 'antd'
import { mS, todoVariants } from '../../constants'
import DateBox from './DateBox'
import PriorityBox from './PriorityBox'
import dayjs from 'dayjs'
import { useDispatch } from 'react-redux'
import { addTodoFirebase } from '../../sclices/todoSlice'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { FormControl, InputLabel, MenuItem, Select, TextField, Tooltip } from '@mui/material'


const priorityArray = [ { value: 1, label: "Low" }, { value: 2, label: "Medium" }, { value: 3, label: "High" }]
const TodoForm = ({ handleClose }) => {
    const [currentTodo, setCurrentTodo] = React.useState({
        title: '',
        description: '',
        priority: 0,
        dueDate: '',
    })
    const dispatch = useDispatch()

    const handleChange = (e) => {
        setCurrentTodo({
            ...currentTodo,
            [e.target.name]: e.target.value,
        });
    }
    const clearCurTodo = () => {
        setCurrentTodo({
            title: '',
            description: '',
            priority: null,
            dueDate: '',
        });
        handleClose()
    }


    const handleSubmit = (e) => {
        e.preventDefault();


        if (currentTodo.title) {

            const formatedDate = currentTodo.dueDate ? currentTodo.dueDate?.$D + ' ' + mS[currentTodo.dueDate.$M] : ''
            const tempCurrentTodo = { ...currentTodo }
            tempCurrentTodo.dueDate = formatedDate


            dispatch(
                addTodoFirebase({
                    id: Date.now(),
                    title: currentTodo.title,
                    description: currentTodo.description,
                    priority: currentTodo.priority,
                    dueDate: formatedDate,
                    done: false,
                })
            );
            setCurrentTodo({
                title: '',
                description: '',
                priority: 0,
                dueDate: '',
            });
        }
        handleClose()
    };
    function disabledDate(current) {
        return current && current <= dayjs().startOf('day');
    }
    console.log(currentTodo)
    return (
        <form className="flex w-full items-start gap-x-4 gap-y-4 bg-white p-4 rounded-md " onSubmit={handleSubmit} >
            <Checkbox className='py-1' />

            <div className="grid gap-y-2 w-full group/todobox">
                <input type="text" name='title' placeholder='Enter Todo' value={currentTodo.title} onChange={handleChange} className='w-full px-2 py-1 border rounded-md' />
                <textarea name='description' placeholder='Enter Description' value={currentTodo.description} onChange={handleChange} className='px-2 text-sm py-1 border rounded-md' />
                <motion.div initial="hidden" animate="visible" variants={todoVariants} className="flex gap-x-3 ">
                    {currentTodo.dueDate ? <DateBox date={currentTodo.dueDate} /> : ''}
                    {currentTodo.priority ? <PriorityBox priority={currentTodo.priority} /> : ''}

                </motion.div>
                <div className=" gap-x-3  flex items-center " >
                    <Tooltip title='Due Date'>
                        <div className="flex-1 flex items-center">


                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                {/* <DatePicker value={currentTodo.dueDate} className='z-50' onChange={(value) => setCurrentTodo({ ...currentTodo, dueDate: value })} disabledDate={disabledDate} /> */}
                                <DemoContainer components={['DatePicker']}>
                                    <DatePicker label="Due Date" slotProps={{ textField: { size: 'small' } }} />
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>
                    </Tooltip>
                    <Tooltip title='Priority'>

                        <div className="flex-1 flex items-center mt-[8px]">

                            <FormControl size='small' fullWidth >
                                <InputLabel id="priority-select-label">Priority</InputLabel>
                                <Select
                                    id="priority-select"
                                    label="Priority"
                                    value={currentTodo.priority}
                                    onChange={(value) => setCurrentTodo({ ...currentTodo, priority: value.target.value })}
                                >
                                    {priorityArray.map((item) => (
                                        <MenuItem value={item.value} key={item.value}>{item.label}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
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