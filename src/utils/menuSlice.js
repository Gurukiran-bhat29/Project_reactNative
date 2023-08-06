import { createSlice } from "@reduxjs/toolkit";

const menuSlice = createSlice({
  name: 'details',
  initialState: {
    userDetails: 'lol'
  },
  reducers: {
    addDetails: (state, action) => {
      state.userDetails = action.payload;
    }
  }
})

export const { addDetails } = menuSlice.actions;

export default menuSlice.reducer;