import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Todo } from "../../types/Todo"

import {
  fetchTodosApi,
  createTodoApi,
  updateTodoApi,
  deleteTodoApi,
} from "./todoService"

interface TodoState {
  todos: Todo[]
  loading: boolean
  error: string | null
}

const initialState: TodoState = {
  todos: [],
  loading: false,
  error: null,
}

export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async () => {
    return await fetchTodosApi()
  }
)

export const addTodo = createAsyncThunk(
  "todos/addTodo",
  async (title: string) => {
    return await createTodoApi(title)
  }
)

export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async (todo: Todo) => {
    return await updateTodoApi(todo)
  }
)

export const removeTodo = createAsyncThunk(
  "todos/removeTodo",
  async (id: number) => {
    return await deleteTodoApi(id)
  }
)

const todoSlice = createSlice({
  name: "todos",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      // FETCH
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true
      })

      .addCase(
        fetchTodos.fulfilled,
        (state, action: PayloadAction<Todo[]>) => {
          state.loading = false
          state.todos = action.payload
        }
      )

      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Error"
      })

      // ADD
      .addCase(
        addTodo.fulfilled,
        (state, action: PayloadAction<Todo>) => {
          state.todos.push(action.payload)
        }
      )

      // DELETE
      .addCase(
        removeTodo.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.todos = state.todos.filter(
            (todo) => todo.id !== action.payload
          )
        }
      )
      // UPDATE
      .addCase(
        updateTodo.fulfilled,
        (state, action: PayloadAction<Todo>) => {
          const index = state.todos.findIndex(
            (todo) => todo.id === action.payload.id
          )

          if (index !== -1) {
            state.todos[index] = action.payload
          }
        }
      )
  },
})

export default todoSlice.reducer