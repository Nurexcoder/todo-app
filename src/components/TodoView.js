import { CalculatorOutlined, CalendarFilled, CalendarOutlined, DeleteOutlined, EditOutlined, FlagFilled, FlagOutlined, MinusOutlined, MoreOutlined, PlusOutlined } from '@ant-design/icons'
import { Checkbox, Collapse, Dropdown, Tooltip } from 'antd'
import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo, toggleTodo } from '../sclices/todoSlice'
import { motion } from 'framer-motion';
const TodoView = () => {
    const [currentTodo, setCurrentTodo] = useState({
        title: '',
        description: '',
        priority: '',
        dueDate: '',
    })
    const [activeKey, setActiveKey] = useState(null)
    const inputRef=useRef()
    
    const todos = useSelector(state => state.todos)

    const completedTaskes = todos.filter((item) => item.done)
    const pendingTaskes = todos.filter((item) => !item.done)
    const dispatch = useDispatch()
    const items = [
        {
            key: '1',
            label: (
                <button className='flex items-center gap-x-2 px-2'>
                    <EditOutlined />  Edit Todo
                </button>
            )
        },
        {
            key: '2',
            label: (
                <button className='flex items-center gap-x-2 px-2'>
                    <DeleteOutlined />  Delete Todo
                </button>
            )
        },
    ]
    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentTodo.title) {
            console.log("Hi")
            dispatch(
                addTodo({
                    id: Date.now(),
                    title: currentTodo.title,
                    description: currentTodo.description,
                    done: false,
                })
            );
            setCurrentTodo({
                title: '',
                description: '',
                priority: '',
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
                Add Todo
            </h3>,
            
            children: <form className="flex w-full items-start gap-x-4 gap-y-4 " onSubmit={handleSubmit}>
                <Checkbox className='py-1' />
                <div className="grid gap-y-2 w-full group/todobox">
                    <input type="text" name='title' placeholder='Enter Todo' value={currentTodo.title} onChange={handleChange} className='w-full px-2 py-1' />
                    <textarea name='description' placeholder='Enter Description' value={currentTodo.description} onChange={handleChange} className='px-2 text-sm py-1' />
                    <div className=" gap-x-3  flex">
                        <Tooltip title='Due Date'>
                            <CalendarOutlined />
                        </Tooltip>
                        <Tooltip title='Priority'>
                            <FlagOutlined />
                        </Tooltip>
                    </div>
                    <div className="justify-self-end">
                        <button type='submit' className='bg-blue-400 p-2 rounded-md text-blue-50'>Add Todo</button>
                    </div>
                </div>
                <Dropdown menu={{ items }}>
                    <MoreOutlined className='font-bold' />

                </Dropdown>
            </form>

        },
    ]
    const todoVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: { opacity: 1, y: 0 },
    };
    const completedItems = [{
        key: '1',
        label: <h3 className="text-lg font-semibold">Completed Tasks</h3>,
        children: completedTaskes?.map((todo) =>
            <motion.div initial="hidden"
                animate="visible"
                variants={todoVariants} className="flex w-full items-start gap-x-4 gap-y-4 " key={todo.id}>
                <Checkbox className='py-1' defaultChecked onChange={() => dispatch(toggleTodo(todo.id))} />
                <div className="grid  w-full group/todobox">
                    <input type="text" ref={inputRef} placeholder='Enter Todo' className='w-full px-2  disabled:bg-inherit line-through' disabled value={todo.title} />
                    <input placeholder='Enter Description' className={`px-2 text-xs  disabled:bg-inherit ${todo.description ? 'inline' : 'hidden'} line-through`} disabled value={todo.description} />
                </div>
                <Dropdown menu={{ items }}>
                    <MoreOutlined className='font-bold' />

                </Dropdown>
            </motion.div>
        ),

    }]



    return (
        <div className='flex flex-col w-11/12 mx-auto max-w-4xl bg-white shadow-sm p-4 gap-10 mb-4'>
            <h1 className="text-2xl font-bold">
                My Todos
            </h1>

            <div className="grid gap-5 w-full ">
                <Collapse items={addItemsMenu} expandIcon={({ isActive }) => <>
                    {!isActive ? <PlusOutlined rotate={90} /> : <MinusOutlined rotate={180} />}
                </>
                }  activeKey={activeKey} onChange={(key)=>setActiveKey(key.length?key[0]:null)} />

                <div className="w-full flex flex-col gap-3 min-h-[10rem] px-2">
                    <h3 className='text-lg font-semibold'>Pending Tasks</h3>
                    {pendingTaskes?.map((todo) =>
                        <motion.div initial="hidden"
                            animate="visible"
                            variants={todoVariants} className="flex w-full items-start gap-x-2 gap-y-4 " key={todo.id}>
                            <Checkbox className='my-[2px]' onChange={() => dispatch(toggleTodo(todo.id))} />
                            <div className="grid  w-full group/todobox">
                                <input type="text" placeholder='Enter Todo' className='w-full px-2  disabled:bg-inherit' disabled value={todo.title} />
                                <input placeholder='Enter Description' className={`px-2 text-xs  disabled:bg-inherit ${todo.description ? 'inline' : 'hidden'}`} disabled value={todo.description} />
                                <div className=" gap-x-3  hidden">
                                    <Tooltip title='Due Date'>
                                        <CalendarOutlined />
                                    </Tooltip>
                                    <Tooltip title='Priority'>
                                        <FlagOutlined />
                                    </Tooltip>
                                </div>
                                <div className="justify-self-end hidden">
                                    <button className='bg-blue-400 p-2 rounded-md text-blue-50'>Add Todo</button>
                                </div>
                            </div>
                            <Dropdown menu={{ items }}>
                                <MoreOutlined className='font-bold' />

                            </Dropdown>
                        </motion.div>
                    )
                    }
                </div>

                <Collapse ghost expandIconPosition={'end'}  items={completedItems} accordion={true}   />
            </div>

        </div>
    )
}

export default TodoView