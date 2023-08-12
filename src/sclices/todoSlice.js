import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { firestore, todosRef } from '../utils/Firebase';
import { getAuth } from "firebase/auth";


const auth = getAuth();
const user = auth.currentUser;

export const fetchUserTodos = createAsyncThunk('todos/fetchUserTodos', async (_, { getState }) => {
  const userId = "cD0nlcnFnRNb5SmkRfc2gTAa18M2";
  console.log(user)
  const snapshot = await todosRef.where("userId", "==","cD0nlcnFnRNb5SmkRfc2gTAa18M2").get();

  if (snapshot.empty) {
    console.log("No matching todos.");
    return;
  }

  let todos = [];
  snapshot?.forEach((doc) => {
    todos.push(doc.data());
  });

  return todos;
});

export const addTodoFirebase = createAsyncThunk('todos/addTodo', async (props, { getState }) => {
  const userId = props?.userId;
  const todoRef = firestore.collection('todos').doc();
  await todoRef.set({
    title:props?.title,
    createdAt: new Date(),
    userId,
  });
});

const todoSlice = createSlice({
  name: 'todos',
  initialState: {

    todos: [],
    userTodos:[],
    filterTodo: null,
    notFound: false

  }
  ,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    toggleTodo: (state, action) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.done = !todo.done;
      }
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    editTodo: (state, action) => {
      const item = state.todos.find(todo => todo.id === action.payload.id)
      if (item) {
        item.title = action.payload.title;
        item.description = action.payload.description;
        item.priority = action.payload.priority;
        item.dueDate = action.payload.dueDate;
        item.done = action.payload.done;
      }
    },
    searchTodo: (state, action) => {
      if (action.payload) {
        state.filterTodo = state.todos.filter((item) => item.title.startsWith(action.payload) || item.description.startsWith(action.payload))
        state.notFound = state.filterTodo.length === 0 ? true : false
      }
      else {
        state.filterTodo = null
        state.notFound = false
      }
    }

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserTodos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserTodos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userTodos = action.payload;
      })
      .addCase(fetchUserTodos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addTodoFirebase.fulfilled, (state) => {
        state.status = 'idle';
      });
  },
});

export const { addTodo, toggleTodo, deleteTodo, editTodo, searchTodo } = todoSlice.actions;
export default todoSlice.reducer;
