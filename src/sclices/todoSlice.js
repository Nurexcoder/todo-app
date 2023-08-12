import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { firestore, todosRef } from '../utils/Firebase';
import firebase from '../utils/Firebase';


export const fetchUserTodos = createAsyncThunk('todos/fetchUserTodos', async (user, { getState }) => {
  const snapshot = await todosRef.where("userId", "==", user).get();
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

  console.log(props)
  const timestamp = props.dueDate ? firebase.firestore.Timestamp.fromDate(props.dueDate.$d) : null;

  const todoRef = firestore.collection('todos').doc();
  console.log(timestamp)
  console.log(getState().reducer.auth.user?.uid)
  const res = await todoRef.set({
    title: props?.title,
    description: props?.description,
    priority: props?.priority,
    createdAt: new Date(),
    dueDate: timestamp,
    userId: getState().reducer.auth.user?.uid,
    done:false
  });
  console.log(res)
});

const todoSlice = createSlice({
  name: 'todos',
  initialState: {

    todos: [],
    userTodos: [],
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
