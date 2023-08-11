import { CalculatorOutlined, CalendarFilled, CalendarOutlined, DeleteOutlined, EditOutlined, FlagFilled, FlagOutlined, MinusOutlined, MoreOutlined, PlusOutlined } from '@ant-design/icons'
import { Checkbox, Collapse, DatePicker, Dropdown, Menu, Select, Tooltip, notification } from 'antd'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo, deleteTodo, editTodo, toggleTodo } from '../sclices/todoSlice'
import { motion } from 'framer-motion';
import PriorityBox from './customComponents/PriorityBox'
import DateBox from './customComponents/DateBox'
import { mS, todoVariants } from '../constants'
import dayjs from 'dayjs'
import TodoItem from './customComponents/TodoItem'
import CompletedTodoItem from './customComponents/CompletedTodoItem'
import TodoForm from './customComponents/TodoForm'


const TodoView = () => {
    const [currentTodo, setCurrentTodo] = useState({
        title: '',
        description: '',
        priority: 0,
        dueDate: '',
    })
    const [activeKey, setActiveKey] = useState(null)
    const inputRef = useRef(null)
    const divRef = useRef(null)
    const dispatch = useDispatch()
    const todos = useSelector(state => state.todos.filterTodo ? state.todos.filterTodo : state.todos.todos)
    const notFound = useSelector(state => state.todos.notFound)

    const completedTaskes = todos.filter((item) => item.done)

    const pendingTaskes = todos.filter((item) => !item.done)

    //filter the not completed task by priority
    pendingTaskes.sort((a, b) => (b.priority - a.priority))

    const handleEdit = (id) => {

        let editableTodo = { ...todos.find((item) => item.id === id) }
        if (editableTodo.dueDate)
            editableTodo.dueDate = dayjs('2023 ' + editableTodo.dueDate)
        setActiveKey('1')
        setCurrentTodo(editableTodo)

        inputRef.current?.scrollIntoView({ behavior: 'smooth' });
        inputRef.current?.focus();

    }
    const clearCurTodo = () => {
        setCurrentTodo({
            title: '',
            description: '',
            priority: 0,
            dueDate: '',
        });
        setActiveKey()
    }

    const handleItemDelete = (id) => {
        dispatch(deleteTodo(id))
        if (id === currentTodo?.id) {
            clearCurTodo()
        }

    }



    const handleChange = (e) => {
        setCurrentTodo({
            ...currentTodo,
            [e.target.name]: e.target.value,
        });
    }


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
            setActiveKey()
        }
    };

    const dropdownItems = (id) => (
        <Menu >
            <Menu.Item key="1">
                <button className='flex items-center gap-x-2 px-2' onClick={() => handleEdit(id)}>
                    <EditOutlined />  Edit Todo
                </button>
            </Menu.Item>
            <Menu.Item key="2">
                <button className='flex items-center gap-x-2 px-2' onClick={() => handleItemDelete(id)} >
                    <DeleteOutlined />  Delete Todo
                </button>
            </Menu.Item>
        </Menu>
    )


    const addItemsMenu = [
        {
            key: '1',
            label: <h3 className=" font-semibold">
                {currentTodo.id ? 'Edit Todo' : 'Add Todo'}
            </h3>,

            children: <TodoForm handleSubmit={handleSubmit} handleChange={handleChange}
                currentTodo={currentTodo} setCurrentTodo={setCurrentTodo} inputRef={inputRef}
                clearCurTodo={clearCurTodo} />

        },
    ]



    const completedItems = [{
        key: '1',
        label: <h3 className="text-lg font-semibold">Completed Tasks</h3>,
        children:
            <div className="grid gap-5">

                {completedTaskes?.map((todo) =>
                    <CompletedTodoItem todo={todo} key={todo.id} dropdownItems={dropdownItems} clearCurTodo={clearCurTodo} />)}
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

                {!notFound ? <>

                    <div className="w-full flex flex-col gap-5 min-h-[10rem] px-2">
                        <h3 className='text-lg font-semibold'>Pending Tasks</h3>
                        {pendingTaskes?.map((todo) =>
                            <TodoItem todo={todo} key={todo.id} dropdownItems={dropdownItems} />
                        )
                        }
                    </div>

                    <Collapse ghost expandIconPosition={'end'} items={completedItems} accordion={true} />
                </> : <h3 className='text-lg font-semibold'>No Matching Todos</h3>}

            </div>

        </div>
    )
}

export default TodoView