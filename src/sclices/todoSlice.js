import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { firestore, todosRef } from '../utils/Firebase';
import { query, where, orderBy, getDocs, collection } from "firebase/firestore";
import firebase from '../utils/Firebase';
import dayjs from 'dayjs';

const newTodoRef = collection(firestore, "todos")

export const fetchUserTodos = createAsyncThunk('todos/fetchUserTodos', async (props, { getState }) => {
  const uid = props?.userId || getState().reducer.auth.user?.uid
  if (!uid) return;

  let userTodoQuery;
  if (getState().reducer.todos.byOrder === 0) {
    const requiredDate = getState().reducer.todos.requiredDate
    if (requiredDate === 100) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      userTodoQuery = query(newTodoRef, where("userId", "==", uid), where("dueDate", "==", today), orderBy("priority", "desc"));

    }
    else if (requiredDate === 101) {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() + 1);
      startDate.setHours(0, 0, 0, 0)
      console.log(startDate)
      userTodoQuery = query(newTodoRef, where("userId", "==", uid), where("dueDate", "==", startDate), orderBy("priority", "desc"));

      console.log("hi")

    }
    else if (requiredDate === 102) {
      userTodoQuery = query(newTodoRef, where("userId", "==", uid), orderBy("priority", "desc"));
      console.log("Hi")

    }
    else {
      const searchDate = new Date(requiredDate)
      console.log(searchDate)
      userTodoQuery = query(newTodoRef, where("userId", "==", uid), where("dueDate", "==", requiredDate), orderBy("priority", "desc"));
    }


  }
  else {

    const requiredDate = getState().reducer.todos.requiredDate
    if (requiredDate === 100) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      userTodoQuery = query(newTodoRef, where("userId", "==", uid), where("dueDate", "==", today), orderBy("dueDate", "asc"));

    }
    else if (requiredDate === 101) {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() + 1);
      startDate.setHours(0, 0, 0, 0)
      console.log(startDate)
      userTodoQuery = query(newTodoRef, where("userId", "==", uid), where("dueDate", "==", startDate), orderBy("dueDate", "asc"));

      console.log("hi")

    }
    else if (requiredDate === 102) {
      userTodoQuery = query(newTodoRef, where("userId", "==", uid), orderBy("dueDate", "asc"));

    }
    else {
      console.log(props)
      console.log(requiredDate)
      const searchDate = new Date(requiredDate)
      console.log(searchDate)
      userTodoQuery = query(newTodoRef, where("userId", "==", uid), where("dueDate", "==", requiredDate), orderBy("priority", "desc"));
    }
  }


  const snapshot = await getDocs(userTodoQuery)
  if (snapshot.empty) {
    console.log("No matching todos.");
    return;
  }

  let todos = [];
  snapshot?.forEach((doc) => {
    todos.push({ ...doc.data(), id: doc.id });
  });

  return todos;
});

export const addTodoFirebase = createAsyncThunk('todos/addTodo', async (props, { getState }) => {

  console.log(props.dueDate.$d)
  const datestamp = props.dueDate ? firebase.firestore.Timestamp.fromDate(props.dueDate.$d) : null;
  const timestamp = props.dueTime ? firebase.firestore.Timestamp.fromDate(props.dueTime.$d) : null;

  const todoRef = firestore.collection('todos').doc();
  console.log(getState().reducer.auth.user?.uid)
  const res = await todoRef.set({
    title: props?.title,
    description: props?.description,
    priority: props?.priority,
    dueDate: datestamp,
    dueTime: timestamp,
    userId: getState().reducer.auth.user?.uid,
    done: false
  });
});

export const deleteFirebaseTodo = createAsyncThunk('todos/deleteTodo', async (id, { getState }) => {
  const todoRef = firestore.collection('todos').doc(id);
  const res = await todoRef.delete();
})

export const toggleFirebaseTodo = createAsyncThunk('todos/toggleTodo', async (prop, { getState }) => {
  const todoRef = firestore.collection('todos').doc(prop.id);
  const res = await todoRef.update({
    done: prop.done
  });

})

export const editFirebaseTodo = createAsyncThunk('todos/editTodo', async (props, { getState }) => {
  const datestamp = props.dueDate ? firebase.firestore.Timestamp.fromDate(props.dueDate.$d) : null;
  const timestamp = props.dueTime ? firebase.firestore.Timestamp.fromDate(props.dueTime.$d) : null;

  try {

    const todoRef = firestore.collection('todos').doc(props.id);
    console.log(props)

    const res = await todoRef.update({
      title: props.title,
      description: props.description,
      priority: props.priority,
      dueDate: datestamp,
      dueTime: timestamp,
    });
  } catch (error) {
    console.log(error)
  }
})

export const fetchAllTodos = createAsyncThunk('todos/fetchAllTodos', async (props, { getState }) => {

  const uid = props?.userId || getState().reducer.auth.user?.uid
  if (!uid) return;
  const userTodoQuery = query(newTodoRef, where("userId", "==", uid));

  const snapshot = await getDocs(userTodoQuery)
  if (snapshot.empty) {
    console.log("No matching todos.");
    return;
  }

  let todos = [];
  snapshot?.forEach((doc) => {
    todos.push({ ...doc.data(), id: doc.id });
  });

  return todos;
})

const todoSlice = createSlice({
  name: 'todos',
  initialState: {

    todos: [],
    userTodos: [],
    filterTodo: null,
    notFound: false,
    byOrder: 0,
    requiredDate: 100,
    error: ''

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
    ,
    toggleRequireData: (state, action) => {
      state.requiredDate = action.payload
    },
    toggleByOrder: (state, action) => {
      state.byOrder = action.payload
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
        // console.log(state.error)
      })
      .addCase(addTodoFirebase.pending, (state) => {
        state.status = 'Aloading';
      })
      .addCase(addTodoFirebase.fulfilled, (state) => {
        state.status = 'idle';
      })
      .addCase(deleteFirebaseTodo.fulfilled, (state) => {
        state.status = 'idle';
      })
      .addCase(toggleFirebaseTodo.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(toggleFirebaseTodo.fulfilled, (state) => {
        state.status = 'idle';
      })
      .addCase(toggleFirebaseTodo.rejected, (state) => {
        console.log(state.error)
      })
      .addCase(editFirebaseTodo.pending, (state) => {
        state.status = 'Aloading';
      })
      .addCase(editFirebaseTodo.fulfilled, (state) => {
        state.status = 'idle';
      })
      .addCase(editFirebaseTodo.rejected, (state) => {
        console.log(state)
      })
      .addCase(fetchAllTodos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.allTodos = action.payload;
      })
  },
});

export const { addTodo, toggleTodo, deleteTodo, editTodo, searchTodo, toggleRequireData, toggleByOrder } = todoSlice.actions;
export default todoSlice.reducer;
