import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { useDispatch } from 'react-redux'
import { addTodo, editTodo } from '../sclices/todoSlice'
import { mS } from '../constants'
import TodoForm from '../components/customComponents/TodoForm'
import { useNavigate } from 'react-router-dom'

const AddTodoPage = () => {
    const [currentTodo, setCurrentTodo] = useState({
        title: '',
        description: '',
        priority: 0,
        dueDate: '',
    })
    const dispatch = useDispatch()
    const navigate=useNavigate()

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
            priority: 0,
            dueDate: '',
        });
    }


    const handleSubmit = (e) => {
        e.preventDefault();


        if (currentTodo.title) {

            const formatedDate = currentTodo.dueDate ? currentTodo.dueDate?.$D + ' ' + mS[currentTodo.dueDate.$M] : ''
            const tempCurrentTodo = { ...currentTodo }
            tempCurrentTodo.dueDate = formatedDate


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
            setCurrentTodo({
                title: '',
                description: '',
                priority: 0,
                dueDate: '',
            });
            navigate('/')
        }
    };
    return (
        <div className="h-screen overflow-y-scroll flex flex-col items-center gap-5 bg-slate-100 relative">
            <Navbar />
            <div className='flex flex-col w-11/12 mx-auto max-w-4xl bg-white shadow-sm p-4 gap-10 mb-10'>
                <h1 className="text-2xl font-bold">
                    Add Todos
                </h1>
                <TodoForm handleSubmit={handleSubmit} handleChange={handleChange}
                    currentTodo={currentTodo} setCurrentTodo={setCurrentTodo} 
                    clearCurTodo={clearCurTodo} />
            </div>
        </div>
    )
}

export default AddTodoPage