// src/components/TodoList.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTodo } from '../sclices/todoSlice';
import { motion } from 'framer-motion';

const TodoList = () => {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const completedTodos = todos.filter((todo) => todo.done);
  const notCompletedTodos = todos.filter((todo) => !todo.done);

  const todoVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div>
      <h2>Todo List</h2>
      <div>
        <h3>Not Completed</h3>
        <ul>
          {notCompletedTodos.map((todo) => (
            <motion.li
              key={todo.id}
              initial="hidden"
              animate="visible"
              variants={todoVariants}
              onClick={() => dispatch(toggleTodo(todo.id))}
              className={`cursor-pointer ${
                todo.done ? 'line-through text-gray-400' : 'text-black'
              }`}
            >
                <input type='checkbox'/>
              {todo.title}
            </motion.li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Completed</h3>
        <ul>
          {completedTodos.map((todo) => (
            <motion.li
              key={todo.id}
              initial="hidden"
              animate="visible"
              variants={todoVariants}
              onClick={() => dispatch(toggleTodo(todo.id))}
              className={`cursor-pointer line-through text-gray-400`}
            >
              {todo.title}
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
