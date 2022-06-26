import { createSlice } from "@reduxjs/toolkit";

const anomSlice = createSlice({
  name: "anom",
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      const newItem = { ...action.payload };
      state.push(newItem);
    },
    updateTodo: (state, action) => {
      return state.map((task) => {
        if (task.task_id === action.payload.task_id) {
          return { ...task, task_desc: { ...action.payload.task_desc } };
        } else {
          return task;
        }
      });
    },
    deleteTodo: (state, action) => {
      return state.filter((i) => i.task_id !== action.payload);
    },
  },
});

export const { addTodo, getTodo, updateTodo, deleteTodo } = anomSlice.actions;

export default anomSlice.reducer;

export const getTodos = (state) => state.anom;
