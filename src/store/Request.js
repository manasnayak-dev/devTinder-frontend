import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "Request",
  initialState: [],
  reducers: {
    addrequest: (store, action) => {
      return action.payload;
    },
    removerequest: (state, action) => {
      return state.filter((request) => request._id !== action.payload);
    },
  },
});

export const { addrequest, removerequest } = requestSlice.actions;

export default requestSlice.reducer;
