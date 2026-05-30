import { useEffect, useState } from "react"

import { useDispatch, useSelector } from "react-redux"

import type { RootState, AppDispatch } from "./app/store"

import {
  fetchTodos,
  addTodo,
  removeTodo,
  updateTodo,
} from "./features/todos/todoSlice"

function App() {
  const dispatch = useDispatch<AppDispatch>()

  const { todos, loading, error } = useSelector(
    (state: RootState) => state.todos
  )

  const [title, setTitle] = useState("")
  const [editingId, setEditingId] = useState<number | null>(null)
  useEffect(() => {
    dispatch(fetchTodos())
  }, [dispatch])

  async function handleSaveTodo() {
    if (!title.trim()) return
  
    if (editingId !== null) {
      await dispatch(
        updateTodo({
          id: editingId,
          title,
          isCompleted: false,
        })
      )
  
      setEditingId(null)
    } else {
      await dispatch(addTodo(title))
    }
  
    setTitle("")
  }

  async function handleDelete(id: number) {
    await dispatch(removeTodo(id))
  }

  function handleEdit(id: number, currentTitle: string) {
    setEditingId(id)
    setTitle(currentTitle)
  }
  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="mx-auto max-w-xl rounded bg-white p-6 shadow">
        <h1 className="mb-6 text-3xl font-bold">
          Redux Todo App
        </h1>

        <div className="mb-6 flex gap-2">
          <input
            type="text"
            placeholder="Enter todo..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 rounded border p-2"
          />

          <button
            onClick={handleSaveTodo}
            className="rounded bg-blue-500 px-4 py-2 text-white"
          >
            {editingId !== null ? "Update" : "Add"}
          </button>
        </div>

        {loading && (
          <p className="mb-4 text-gray-500">
            Loading...
          </p>
        )}

        {error && (
          <p className="mb-4 text-red-500">
            {error}
          </p>
        )}

        <div className="space-y-3">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className="flex items-center justify-between rounded border p-3"
            >
              <span>{todo.title}</span>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(todo.id, todo.title)}
                  className="rounded bg-yellow-500 px-3 py-1 text-white"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(todo.id)}
                  className="rounded bg-red-500 px-3 py-1 text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App