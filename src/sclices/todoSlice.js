import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todos',
  initialState: {

    todos: [],
    filterTodo: []
  }
  ,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    toggleTodo: (state, action) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      console.log(todo, action.payload)
      if (todo) {
        todo.done = !todo.done;
      }
    },
    deleteTodo: (state, action) => {
      console.log(action.payload)
      return state.todos.filter((todo) => todo.id !== action.payload);
    },
    editTodo: (state, action) => {
      console.log(action.payload)
      const item = state.todos.find(todo => todo.id === action.payload.id)
      if (item) {
        item.title = action.payload.title,
          item.description = action.payload.description,
          item.priority = action.payload.priority,
          item.dueDate = action.payload.dueDate,
          item.done = action.payload.done
      }
    },
    searchTodo:(state,action)=>{
      state.filterTodo=state.todos.includes(action.payload)
    }

  },
});

export const { addTodo, toggleTodo, deleteTodo, editTodo,searchTodo } = todoSlice.actions;
export default todoSlice.reducer;
