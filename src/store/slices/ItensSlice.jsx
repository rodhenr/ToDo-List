import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    mudarColuna: (state, action) => {
      state.items = state.items.filter((i) => {
        if (i.desc === action.payload.item.desc) {
          return (i.coluna = action.payload.nomeColuna);
        } else {
          return i;
        }
      });
    },
    deleteTodo: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    initialTodos: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { addTodo, deleteTodo, mudarColuna, initialTodos } = itemsSlice.actions;

export default itemsSlice.reducer;
