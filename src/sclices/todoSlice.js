import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      state.push(action.payload);
    },
    toggleTodo: (state, action) => {
      const todo = state.find((todo) => todo.id === action.payload);
      console.log(todo, action.payload)
      if (todo) {
        todo.done = !todo.done;
      }
    },
    deleteTodo: (state, action) => {
      console.log(action.payload)
      return state.filter((todo) => todo.id !== action.payload);
    },
    editTodo: (state, action) => {
      console.log(action.payload)
      const item=state.find(todo => todo.id === action.payload.id)
      if(item){
        item.title=action.payload.title,
        item.description=action.payload.description,
        item.priority=action.payload.priority
      }
    }

  },
});

export const { addTodo, toggleTodo, deleteTodo, editTodo } = todoSlice.actions;
export default todoSlice.reducer;
