import React from 'react'
import { motion } from 'framer-motion'
import { Checkbox } from 'antd'
import { mS, priorityArray, todoVariants } from '../../constants'
import DateBox from './DateBox'
import PriorityBox from './PriorityBox'
import dayjs from 'dayjs'
import { useDispatch, useSelector } from 'react-redux'
import { addTodoFirebase, editFirebaseTodo, fetchAllTodos, fetchUserTodos } from '../../sclices/todoSlice'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Backdrop, CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField, Tooltip } from '@mui/material'
import { TimePicker } from '@mui/x-date-pickers'


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40vw',
    minWidth: 350,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};
const TodoForm = ({ handleClose, todoData }) => {

    const auth = useSelector(state => state.reducers?.auth?.user)
    const [currentTodo, setCurrentTodo] = React.useState(todoData ? {
        id: todoData.id,
        title: todoData.title,
        description: todoData.description,
        priority: todoData.priority,
        dueDate: todoData.dueDate ? dayjs(todoData.dueDate.toDate()) : undefined,
        dueTime: todoData.dueTime ? dayjs(todoData.dueTime.toDate()) : undefined,
    } : {
        title: '',
        description: '',
        priority: 0,
        dueDate: undefined,
        dueTime: undefined,
    })
    console.log(currentTodo)
    // if(todoData){
    //     setCurrentTodo(todoData)    
    // }
    const dispatch = useDispatch()

    const state = useSelector(state => state.reducer.todos.status)
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


    const handleSubmit = async (e) => {
        e.preventDefault();


        if (currentTodo.title) {

            const tempCurrentTodo = { ...currentTodo }
            // tempCurrentTodo.dueDate = formatedDate

            console.log(tempCurrentTodo)
            if (!currentTodo.id) {

                await dispatch(
                    addTodoFirebase({
                        id: Date.now(),
                        title: currentTodo.title,
                        description: currentTodo.description,
                        priority: currentTodo.priority,
                        dueDate: currentTodo.dueDate,
                        dueTime: currentTodo.dueTime,
                        done: false,
                    })
                );
            }
            else {

                await dispatch(
                    editFirebaseTodo(
                        {
                            id: currentTodo.id,
                            title: currentTodo.title,
                            description: currentTodo.description,
                            priority: currentTodo.priority,
                            dueDate: currentTodo.dueDate,
                            dueTime: currentTodo.dueTime,
                            done: false,
                        }
                    )
                )
            }
            dispatch(
                fetchUserTodos(auth?.uid)
            )
            dispatch(fetchAllTodos())
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
    return (
        <div style={style} className="">
            <form className="flex w-full items-start gap-x-4 gap-y-4 bg-white p-4 lg:p-8 rounded-md  flex-col " onSubmit={handleSubmit} >
                <h1 className="text-2xl font-semibold">
                    Add Todo
                </h1>
                {/* <Checkbox className='py-1' /> */}

                <div className="grid gap-y-4 w-full group/todobox">
                    <input type="text" name='title' placeholder='Enter Todo' value={currentTodo.title} onChange={handleChange} className='w-full px-2 py-1 border rounded-md' />
                    <textarea name='description' placeholder='Enter Description' value={currentTodo.description} onChange={handleChange} className='px-2 text-sm py-1 border rounded-md' />
                    <motion.div initial="hidden" animate="visible" variants={todoVariants} className="flex gap-x-3 ">
                        {currentTodo.dueDate ? <DateBox date={currentTodo.dueDate} /> : ''}
                        {currentTodo.priority ? <PriorityBox priority={currentTodo.priority} /> : ''}

                    </motion.div>
                    <div className=" gap-x-3  flex items-center flex-wrap" >
                        <Tooltip title='Due Date'>
                            <div className="flex-1 flex items-center">


                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    {/* <DatePicker value={currentTodo.dueDate} className='z-50' onChange={(value) => setCurrentTodo({ ...currentTodo, dueDate: value })} disabledDate={disabledDate} /> */}
                                    <DemoContainer components={['DatePicker']}>
                                        <DatePicker label="Due Date" slotProps={{ textField: { size: 'small' } }} value={currentTodo.dueDate} onChange={(date) => setCurrentTodo({ ...currentTodo, dueDate: date })} />
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
                        <Tooltip title='Due Time'>
                            <div className="flex-1 flex items-center">


                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['TimePicker']}>
                                        <TimePicker label="Due Time" slotProps={{ textField: { size: 'small' } }} value={currentTodo.dueTime} onChange={(time) => setCurrentTodo({ ...currentTodo, dueTime: time })} />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </div>
                        </Tooltip>
                    </div>
                    <div className="justify-self-end flex gap-x-3 items-center">
                        <button type='button' onClick={clearCurTodo} className='bg-red-400 p-2 rounded-md text-blue-50 hover:bg-red-500'>Cancel</button>
                        <button type='submit' className='bg-blue-400 p-2 rounded-md text-blue-50 hover:bg-blue-500'>{currentTodo.id ? 'Edit Todo' : 'Add Todo'}</button>
                    </div>
                </div>
            </form>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={state === 'Aloading'}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    )
}

export default TodoForm