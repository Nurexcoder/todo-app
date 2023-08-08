import { CalculatorOutlined, CalendarFilled, CalendarOutlined, DeleteOutlined, EditOutlined, FlagFilled, FlagOutlined, MinusOutlined, MoreOutlined, PlusOutlined } from '@ant-design/icons'
import { Checkbox, Collapse, DatePicker, Dropdown, Menu, Select, Tooltip } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo, deleteTodo, editTodo, toggleTodo } from '../sclices/todoSlice'
import { motion } from 'framer-motion';
import PriorityBox from './customComponents/PriorityBox'
import DateBox from './customComponents/DateBox'
import { mS, todoVariants } from '../constants'
import dayjs from 'dayjs'
import TodoItem from './customComponents/TodoItem'
import CompletedTodoItem from './customComponents/CompletedTodoItem'


const TodoView = () => {
    const [currentTodo, setCurrentTodo] = useState({
        title: '',
        description: '',
        priority: 0,
        dueDate: '',
    })
    const [activeKey, setActiveKey] = useState(null)
    const inputRef = useRef(null)
    const dispatch = useDispatch()
    const todos = useSelector(state => state.todos)


    const completedTaskes = todos.filter((item) => item.done)

    const pendingTaskes = todos.filter((item) => !item.done)

    //filter the not completed task by priority
    pendingTaskes.sort((a, b) => (b.priority - a.priority))


    const handleEdit = (id) => {

        let editableTodo = { ...todos.find((item) => item.id === id) }
        editableTodo.dueDate = dayjs('2023 ' + editableTodo.dueDate)
        setCurrentTodo(editableTodo)
        console.log(editableTodo)

        setActiveKey('1')
        inputRef.current?.scrollIntoView({ behavior: 'smooth' });
        inputRef.current?.focus();

    }



    const dropdownItems = (id) => (
        <Menu >
            <Menu.Item key="1">
                <button className='flex items-center gap-x-2 px-2' onClick={() => handleEdit(id)}>
                    <EditOutlined />  Edit Todo
                </button>
            </Menu.Item>
            <Menu.Item key="2">
                <button className='flex items-center gap-x-2 px-2' onClick={() => dispatch(deleteTodo(id))} >
                    <DeleteOutlined />  Delete Todo
                </button>
            </Menu.Item>
        </Menu>
    )


    const handleSubmit = (e) => {
        e.preventDefault();


        if (currentTodo.title) {

            const formatedDate = currentTodo.dueDate ? currentTodo.dueDate?.$D + ' ' + mS[currentTodo.dueDate.$M] : ''
            const tempCurrentTodo = { ...currentTodo }
            tempCurrentTodo.dueDate = formatedDate
            if (currentTodo.id) {
                dispatch(editTodo(tempCurrentTodo));
            }
            else {

                dispatch(
                    addTodo({
                        id: Date.now(),
                        title: currentTodo.title,
                        description: currentTodo.description,
                        priority: currentTodo.priority,
                        dueDate: formatedDate,
                        done: false,
                    })
                );
            }
            setCurrentTodo({
                title: '',
                description: '',
                priority: 0,
                dueDate: '',
            });
        }
    };

    const handleChange = (e) => {
        setCurrentTodo({
            ...currentTodo,
            [e.target.name]: e.target.value,
        });
    }
    const addItemsMenu = [
        {
            key: '1',
            label: <h3 className=" font-semibold">
                {currentTodo.id ? 'Edit Todo' : 'Add Todo'}
            </h3>,

            children: <form className="flex w-full items-start gap-x-4 gap-y-4 " onSubmit={handleSubmit}>
                <Checkbox className='py-1' />
                <div className="grid gap-y-2 w-full group/todobox">
                    <input type="text" name='title' ref={inputRef} placeholder='Enter Todo' value={currentTodo.title} onChange={handleChange} className='w-full px-2 py-1' />
                    <textarea name='description' placeholder='Enter Description' value={currentTodo.description} onChange={handleChange} className='px-2 text-sm py-1' />
                    <motion.div initial="hidden" animate="visible" variants={todoVariants} className="flex gap-x-3 ">
                        {currentTodo.dueDate ? <DateBox date={currentTodo.dueDate} /> : ''}
                        {currentTodo.priority ? <PriorityBox priority={currentTodo.priority} /> : ''}

                    </motion.div>
                    <div className=" gap-x-3  flex items-center" >
                        <Tooltip title='Due Date'>
                            <DatePicker value={currentTodo.dueDate} onChange={(value) => setCurrentTodo({ ...currentTodo, dueDate: value })} />
                        </Tooltip>
                        <Tooltip title='Priority'>
                            <Select style={{ width: 100 }} defaultValue={0} options={[{ value: 0, label: "Priority" }, { value: 1, label: "Low" }, { value: 2, label: "Medium" }, { value: 3, label: "High" }]} value={currentTodo.priority} onChange={(value) => setCurrentTodo({ ...currentTodo, priority: value })} />
                        </Tooltip>
                    </div>
                    <div className="justify-self-end">
                        <button type='submit' className='bg-blue-400 p-2 rounded-md text-blue-50'>{currentTodo.id ? 'Edit Todo' : 'Add Todo'}</button>
                    </div>
                </div>
            </form>

        },
    ]


    
    const completedItems = [{
        key: '1',
        label: <h3 className="text-lg font-semibold">Completed Tasks</h3>,
        children:
            <div className="grid gap-5">

                {completedTaskes?.map((todo) =>
                    <CompletedTodoItem todo={todo} key={todo.id} dropdownItems={dropdownItems} />)}
            </div>


    }]


    return (
        <div className='flex flex-col w-11/12 mx-auto max-w-4xl bg-white shadow-sm p-4 gap-10 mb-10'>
            <h1 className="text-2xl font-bold">
                My Todos
            </h1>

            <div className="grid gap-5 w-full ">
                <Collapse items={addItemsMenu}
                    expandIcon={({ isActive }) => <>
                        {!isActive ? <PlusOutlined rotate={90} /> : <MinusOutlined rotate={180} />}
                    </>}
                    activeKey={activeKey} onChange={(key) => setActiveKey(key.length ? key[0] : null)} />

                <div className="w-full flex flex-col gap-5 min-h-[10rem] px-2">
                    <h3 className='text-lg font-semibold'>Pending Tasks</h3>
                    {pendingTaskes?.map((todo) =>
                        <TodoItem todo={todo} key={todo.id} dropdownItems={dropdownItems} />
                    )
                    }
                </div>

                <Collapse ghost expandIconPosition={'end'} items={completedItems} accordion={true} />
            </div>

        </div>
    )
}

export default TodoView