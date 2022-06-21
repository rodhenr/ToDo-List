import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080" }),
  endpoints: (builder) => ({
    getAllTodos: builder.query({
      query: () => "/todos",
    }),
    changeTodos: builder.mutation({
      query: (items) => ({
        url: "/todos",
        method: "PATCH",
        body: items,
      }),
    }),
  }),
});

export const { useGetAllTodosQuery, useChangeTodosMutation } = apiSlice;
