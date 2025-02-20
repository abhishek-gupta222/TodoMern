import { configureStore, createSlice } from '@reduxjs/toolkit';

// Define the initial state and reducers for the auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: '',
    isLoggedIn: false, // Use boolean for isLoggedIn instead of a string
  },
  reducers: {
   logIn(state){
    state.isLoggedIn=true;
   },

   logOut(state){
    state.isLoggedIn=false;
   }
  },
});

// Export the actions
export const { logIn , logOut } = authSlice.actions;

// Configure the Redux store
export const store = configureStore({
  reducer: {
    auth: authSlice.reducer, // Corrected the key to match the slice name
  },
});
