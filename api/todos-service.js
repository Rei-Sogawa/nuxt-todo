import { nanoid } from 'nanoid'

const getTodos = () => {
  const storedTodos = localStorage.getItem('todos')
  const todos = storedTodos ? JSON.parse(storedTodos) : []
  return Promise.resolve(todos.sort((a, b) => b.createdAt - a.createdAt))
}

const postTodo = async ({ title, completed }) => {
  const newTodo = {
    id: nanoid(),
    title,
    completed,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  }
  const todos = await getTodos()
  todos.push(newTodo)
  localStorage.setItem('todos', JSON.stringify(todos))
  return newTodo
}

const putTodo = async ({ id, title, completed }) => {
  const todos = await getTodos()
  const updatedTodo = Object.assign(
    todos.find((todo) => todo.id === id),
    { title, completed, updatedAt: Date.now() }
  )
  localStorage.setItem(
    'todos',
    JSON.stringify(todos.map((todo) => (todo.id === id ? updatedTodo : todo)))
  )
  return updatedTodo
}

const deleteTodo = async ({ id }) => {
  const todos = await getTodos()
  localStorage.setItem(
    'todos',
    JSON.stringify(todos.filter((todo) => todo.id !== id))
  )
}

export { getTodos, postTodo, putTodo, deleteTodo }
