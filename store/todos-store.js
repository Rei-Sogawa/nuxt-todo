import * as TodosService from '@/api/todos-service'

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
    const todos = await TodosService.getTodos()
    context.commit('SET_TODOS', todos)
  },

  createTodo: async (context, { title, completed }) => {
    await TodosService.postTodo({ title, completed })
    await context.dispatch('fetchTodos')
  },

  updateTodo: async (context, { id, title, completed }) => {
    await TodosService.putTodo({ id, title, completed })
    await context.dispatch('fetchTodos')
  },

  removeTodo: async (context, { id }) => {
    await TodosService.deleteTodo({ id })
    await context.dispatch('fetchTodos')
  },
}

export { state, getters, mutations, actions }
