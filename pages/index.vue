<template>
  <b-container class="todo-app-page">
    <h1 class="text-center">Todos</h1>

    <b-form @submit.prevent="onSubmitNewTodo">
      <b-form-input
        v-model.trim="newTodoTitle"
        type="text"
        placeholder="Add new todo"
      />
    </b-form>
    <br />

    <b-list-group>
      <div v-for="todo in todos" :key="todo.id">
        <b-list-group-item v-if="!isTodoBeingEdited(todo)" class="mb-1">
          <b-form-checkbox
            :checked="todo.completed"
            class="d-inline-block"
            @input="onToggleCompleted($event, todo)"
          />
          <span :class="{ 'completed-todo': todo.completed }">{{
            todo.title
          }}</span>
          <span class="float-right">
            <b-icon
              icon="pencil-square"
              class="pencil-icon"
              shift-v="-2"
              @click="onClickEdit(todo)"
            />
            <b-icon
              icon="trash"
              class="trash-icon"
              shift-v="-2"
              @click="onClickRemove(todo)"
            />
          </span>
        </b-list-group-item>
        <b-form v-else class="mb-1" @submit.prevent="onSubmitUpdateTodo">
          <b-form-input
            id="edit-todo-form"
            v-model.trim="todoBeingEdited.title"
            type="text"
            class="px-5 py-4"
            @blur="todoBeingEdited = null"
          />
        </b-form>
      </div>
    </b-list-group>
  </b-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Index',

  data() {
    return {
      newTodoTitle: '',
      todoBeingEdited: null,
    }
  },

  computed: {
    ...mapGetters('todos-store', ['todos']),
  },

  async created() {
    await this.fetchTodos()
  },

  methods: {
    ...mapActions('todos-store', [
      'fetchTodos',
      'createTodo',
      'updateTodo',
      'removeTodo',
    ]),

    isTodoBeingEdited(todo) {
      return this.todoBeingEdited && this.todoBeingEdited.id === todo.id
    },

    async onSubmitNewTodo() {
      if (!this.newTodoTitle) {
        return
      }
      await this.createTodo({
        title: this.newTodoTitle,
        completed: false,
      })
      this.newTodoTitle = ''
    },

    async onToggleCompleted(checked, todo) {
      await this.updateTodo({
        id: todo.id,
        title: todo.title,
        completed: checked,
      })
    },

    onClickEdit(todo) {
      this.todoBeingEdited = { ...todo }
      this.$nextTick(() => {
        document.getElementById('edit-todo-form').focus()
      })
    },

    async onClickRemove(todo) {
      await this.removeTodo({ id: todo.id })
    },

    async onSubmitUpdateTodo() {
      if (!this.todoBeingEdited.title) {
        return
      }
      await this.updateTodo({
        id: this.todoBeingEdited.id,
        title: this.todoBeingEdited.title,
        completed: this.todoBeingEdited.completed,
      })
      this.todoBeingEdited = null
    },
  },
}
</script>

<style scoped>
.todo-app-page {
  width: 480px;
}
.pencil-icon {
  cursor: pointer;
}
.trash-icon {
  cursor: pointer;
}
.completed-todo {
  text-decoration: line-through;
}
</style>
