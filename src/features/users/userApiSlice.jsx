import { apiSlice } from "../../app/api/apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
      providesTags: ["Todos"],
    }),
    addTodo: builder.mutation({
      query: (item) => ({
        url: "/users",
        method: "POST",
        body: item,
      }),
      invalidatesTags: ["Todos"],
    }),
    updateTodo: builder.mutation({
      query: (data) => ({
        url: "/users",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Todos"],
    }),
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: "/users",
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
} = usersApiSlice;
