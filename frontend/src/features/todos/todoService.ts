import type { Todo } from "../../types/Todo"

const API_URL = "http://localhost:5200/api/todo"

export async function fetchTodosApi(): Promise<Todo[]> {
  const response = await fetch(API_URL)

  if (!response.ok) {
    throw new Error("Failed to fetch todos")
  }

  return response.json()
}

export async function createTodoApi(title: string): Promise<Todo> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      isCompleted: false,
    }),
  })

  if (!response.ok) {
    throw new Error("Failed to create todo")
  }

  return response.json()
}

export async function deleteTodoApi(id: number): Promise<number> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  })

  if (!response.ok) {
    throw new Error("Failed to delete todo")
  }

  return id
}
export async function updateTodoApi(todo: Todo): Promise<Todo> {
  console.log(`${API_URL}/${todo.id}`)
  const response = await fetch(`${API_URL}/${todo.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  })

  if (!response.ok) {
    throw new Error("Failed to update todo")
  }

  return todo
}