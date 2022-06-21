import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080" }),
  tagTypes: ["Todos", "Update"],
  endpoints: (builder) => ({
    getAllTodos: builder.query({
      query: () => "/todos",
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.data[0].item.map(({ id }) => ({ type: "Todos", id })),
              "Todos",
            ]
          : ["Todos"],
    }),
    changeTodos: builder.mutation({
      query: (items) => ({
        url: "/todos",
        method: "PATCH",
        body: items,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Todos", id: arg.id }],
    }),
  }),
});

export const { useGetAllTodosQuery, useChangeTodosMutation } = apiSlice;
