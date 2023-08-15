import { CalculatorOutlined, CalendarFilled, CalendarOutlined, DeleteOutlined, EditOutlined, FlagFilled, FlagOutlined, MinusOutlined, MoreOutlined, PlusOutlined } from '@ant-design/icons'
import { Checkbox, Collapse, DatePicker, Dropdown, Menu, Select, Tooltip, notification } from 'antd'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo, deleteTodo, editTodo, fetchAllTodos, fetchUserTodos, toggleByOrder, toggleRequireData, toggleTodo } from '../sclices/todoSlice'
import { motion } from 'framer-motion';
import PriorityBox from './customComponents/PriorityBox'
import DateBox from './customComponents/DateBox'
import { mS, sortArray, todoVariants, todoViewType } from '../constants'
import dayjs from 'dayjs'
import TodoItem from './customComponents/TodoItem'
import CompletedTodoItem from './customComponents/CompletedTodoItem'
import TodoForm from './customComponents/TodoForm'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DesignedTodoItems from './customComponents/DesignedTodoItems'
import { Backdrop, CircularProgress } from '@mui/material'
import DesignedCompletedTodoItems from './customComponents/DesignedCompletedTodoItems'
import DisplayDate from './customComponents/DisplayDate'

const TodoView = () => {
    const [currentTodo, setCurrentTodo] = useState({
        title: '',
        description: '',
        priority: 0,
        dueDate: '',
    })
    const [viewValue, setviewValue] = useState(100)

    const dispatch = useDispatch()
    const state = useSelector(state => state.reducer.todos.status)
    const todos = useSelector(state => state.reducer.todos.todos)
    const auth = useSelector(state => state.reducer.auth)

    const userTodos = useSelector(state => state.reducer.todos.userTodos)

    useEffect(() => {
        if (auth?.user) {

            dispatch(fetchUserTodos({ userId: auth.user.uid }))
            dispatch(fetchAllTodos())

        }
    }, [auth?.user])

    const notFound = useSelector(state => state.reducer.todos.notFound)

    const completedTaskes = userTodos?.filter((item) => item.done)

    const pendingTaskes = userTodos?.filter((item) => !item.done)
    
    const requiredDate = useSelector(state => state.reducer.todos.requiredDate)

    //filter the not completed task by priority








    const completedItems = [{
        key: '1',
        label: <h3 className="text-lg font-semibold">Completed Tasks</h3>,
        children:
            <div className="w-full grid items-start md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3  gap-5 min-h-[10rem] px-2 max-h-[200px] overflow-y-auto no-scrollbar">

                {completedTaskes?.map((todo) =>
                    <DesignedCompletedTodoItems todo={todo} key={todo.id} />)}
            </div>


    }]
    const handleSortChange = (value) => {
        dispatch(
            toggleByOrder(value)
        )
        dispatch(
            fetchUserTodos()
        )
    }
    const handleViewChange = (value) => {
        setviewValue(value)
        dispatch(
            toggleRequireData(value)
        )
        dispatch(

            fetchUserTodos()
        )

    }

    useEffect(() => {
        if (typeof (requiredDate) === 'object') {
            setviewValue(103)
        }

    }, [requiredDate])



    return (
        <div className='flex flex-col w-full md:w-full mx-auto col-span-2 md:col-span-1   shadow-sm gap-5 mb-10  h-full rounded-3xl bg-primary p-5' >

            <div className="flex lg:justify-between gap-y-5 lg:items-center flex-col lg:flex-row">
                <div className="flex lg:items-center  gap-x-3 lg:justify-center flex-row">

                    <DisplayDate />
                    <h1 className="text-4xl font-bold font-poppins ">
                        TO-DO
                    </h1>
                </div>
                <div className=" flex gap-x-4 items-start lg:items-center sm:flex-col">
                    <div className="flex gap-x-2 items-center">
                        <span className=' text-base font-semibold'>

                            Sort By :
                        </span>

                        <Select defaultValue={0} style={{ width: 120 }} options={sortArray} size="large" className='font-poppins' suffixIcon={<KeyboardArrowDownIcon />} onChange={(value) => handleSortChange(value)} />
                    </div>
                    <div className="flex gap-x-2 items-center">
                        <span className=' text-base font-semibold'>

                            View  :
                        </span>

                        <Select defaultValue={100}
                            style={{ width: 120 }} options={todoViewType} size="large"
                            suffixIcon={<KeyboardArrowDownIcon />}
                            value={viewValue}
                            onChange={(value) => handleViewChange(value)} />
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-5 w-full  bg-[#00A3FF4F] h-full rounded-xl p-4 justify-start ">

                {!notFound ? <>
                    <h3 className="text-xl font-bold font-poppins uppercase">
                        Pending Tasks : {pendingTaskes?.length ? pendingTaskes.length : 0}
                    </h3>
                    <div className={"w-full grid items-start justify-start grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3  gap-5 min-h-[10rem] px-2 max-h-[44vh] h-full overflow-y-auto no-scrollbar " + (pendingTaskes?.length / 3 <= 3 ? 'lg:grid-rows-3' : '')}>
                        {pendingTaskes?.map((todo) =>
                            <DesignedTodoItems todo={todo} key={todo.id} />
                        )
                        }
                        {/* <TodoItem todo={todo} key={todo.id} dropdownItems={dropdownItems} /> */}
                        {/* <DesignedTodoItems priority={1} />
                        <DesignedTodoItems priority={2} />
                        <DesignedTodoItems priority={3} /> */}
                    </div>

                    <Collapse ghost expandIconPosition={'end'} items={completedItems} accordion={true} />
                </> : <h3 className='text-lg font-semibold'>No Matching Todos</h3>}
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={state === 'loading'}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </div>

        </div>
    )
}

export default TodoView