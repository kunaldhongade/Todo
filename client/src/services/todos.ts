import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

export interface TodoCreate {
  // when we create todo we do not have id
  description: string;
  todoStatus: boolean;
}

export interface TodoI extends TodoCreate {
  _id: string;
}

enum METHOD {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3022",
  }),
  tagTypes: ["Todos"],
  endpoints: (builder) => ({
    getTodos: builder.query<TodoI[], void>({
      query: () => "todos",
      providesTags: ["Todos"],
    }),
    createTodo: builder.mutation<TodoI, TodoCreate>({
      query(todo) {
        return {
          url: "todos",
          method: METHOD.POST,
          body: todo,
        };
      },
      invalidatesTags: ["Todos"], // it automatically fetch new todos from server
    }),
    updateTodo: builder.mutation<TodoI, TodoI>({
      query(todo) {
        return { url: `todos/${todo._id}`, method: METHOD.PUT, body: todo };
      },
      invalidatesTags: ["Todos"],
    }),
    getTodoById: builder.query({
      query: (todoId) => `todos/${todoId}`, // we want to be edit we want to able display  on model
      providesTags: ["Todos"],
    }),
  }),
});
