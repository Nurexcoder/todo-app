import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { firestore, todosRef } from '../utils/Firebase';
import { query, where, orderBy, getDocs, collection } from "firebase/firestore";
import firebase from '../utils/Firebase';

const newTodoRef = collection(firestore, "todos")

export const fetchUserTodos = createAsyncThunk('todos/fetchUserTodos', async (userId, { getState }) => {
  const uid = userId || getState().reducer.auth.user?.uid
  console.log(uid)
  if (!uid) return;

  let userTodoQuery;
  // const requiredDate=getState().reducer.filterTodo
  if (getState().reducer.todos.byOrder === 'priority') {
    userTodoQuery = query(newTodoRef, where("userId", "==", uid), orderBy("priority", "desc"));

  }
  else {

    userTodoQuery = query(newTodoRef, where("userId", "==", uid), orderBy("dueDate", "asc"));
  }


  const snapshot = await getDocs(userTodoQuery)
  console.log(uid)
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
  const datestamp = props.dueDate ? firebase.firestore.Timestamp.fromDate(props.dueDate.$d) : null;
  const timestamp = props.dueTime ? firebase.firestore.Timestamp.fromDate(props.dueTime.$d) : null;

  const todoRef = firestore.collection('todos').doc();
  console.log(timestamp)
  console.log(getState().reducer.auth.user?.uid)
  const res = await todoRef.set({
    title: props?.title,
    description: props?.description,
    priority: props?.priority,
    createdAt: new Date(),
    dueDate: datestamp,
    dueTime: timestamp,
    userId: getState().reducer.auth.user?.uid,
    done: false
  });
  console.log(res)
});

export const deleteFirebaseTodo = createAsyncThunk('todos/deleteTodo', async (id, { getState }) => {
  const todoRef = firestore.collection('todos').doc(id);
  const res = await todoRef.delete();
})

export const toggleFirebaseTodo= createAsyncThunk('todos/toggleTodo', async (id, { getState }) => {
  const todoRef = firestore.collection('todos').doc(id);
  const res = await todoRef.update({
    done: !getState().reducer.todos.todos.find((todo) => todo.id === id).done
  });

})

const todoSlice = createSlice({
  name: 'todos',
  initialState: {

    todos: [],
    userTodos: [],
    filterTodo: null,
    notFound: false,
    byOrder: 'priority',
    requiredDate:'today'

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
        console.log(state.error)
        state.error = action.error.message;
      })
      .addCase(addTodoFirebase.fulfilled, (state) => {
        state.status = 'idle';
      })
      .addCase(deleteFirebaseTodo.fulfilled, (state) => {
        state.status = 'idle';
      })
      .addCase(toggleFirebaseTodo.fulfilled, (state) => {
        state.status = 'idle';
      })
  },
});

export const { addTodo, toggleTodo, deleteTodo, editTodo, searchTodo } = todoSlice.actions;
export default todoSlice.reducer;
