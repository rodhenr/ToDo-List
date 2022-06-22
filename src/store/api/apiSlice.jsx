import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080" }),
  tagTypes: ["Todos", "Update"],
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: (id) => ({
        url: "/",
        method: "GET",
        params: { id },
      }),
      providesTags: (result, error, arg) =>
        result
          ? [...result.data.map(({ id }) => ({ type: "Todos", id })), "Todos"]
          : ["Todos"],
    }),
    addTodo: builder.mutation({
      query: (item) => ({
        url: "/",
        method: "POST",
        body: item,
      }),
      invalidatesTags: ["Todos"],
    }),
    updateTodo: builder.mutation({
      query: (data) => ({
        url: "/",
        method: "PATCH",
        body: {
          data,
        },
      }),
      invalidatesTags: ["Todos"],
    }),
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: "/",
        method: "DELETE",
        params: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Todos", id: arg.id }],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = apiSlice;
