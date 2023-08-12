// src/features/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { auth, signInWithGoogleFunction } from '../utils/Firebase';

export const signInWithGoogle = createAsyncThunk('auth/signInWithGoogle', async () => {
  console.log("first")
  // const provider = new auth.GoogleAuthProvider();
  // await auth.signInWithPopup(provider);
  return await signInWithGoogleFunction()

});

export const handleSignOut = createAsyncThunk('auth/signOut', async () => {
  try {
    await auth.signOut();
  } catch (error) {
    console.error(error);
  }
})



const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signInWithGoogle.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signInWithGoogle.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
      })
      .addCase(signInWithGoogle.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(handleSignOut.fulfilled, (state) => {
        state.user = null
      })

  },
});

export default authSlice.reducer;
