import * as todosService from '@/api/todos-service'

const state = () => ({
  storedTodos: [],
})

const getters = {
  todos: (_state) => _state.storedTodos,
}

const mutations = {
  SET_TODOS: (_state, value) => {
    _state.storedTodos = value
  },
}

const actions = {
  fetchTodos: async (context) => {
    const todos = await todosService.getTodos()
    context.commit('SET_TODOS', todos)
  },

  createTodo: async (context, { title, completed }) => {
    await todosService.postTodo({ title, completed })
    await context.dispatch('fetchTodos')
  },

  updateTodo: async (context, { id, title, completed }) => {
    await todosService.putTodo({ id, title, completed })
    await context.dispatch('fetchTodos')
  },

  removeTodo: async (context, { id }) => {
    await todosService.deleteTodo({ id })
    await context.dispatch('fetchTodos')
  },
}

export { state, getters, mutations, actions }
