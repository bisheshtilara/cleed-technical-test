import { type ITodo } from "@/types/todo"
import { createStore } from "vuex"
import VuexPersistence from "vuex-persist"

interface IState {
  todos: ITodo[]
  nextTodoId: number
}

const vuexLocal = new VuexPersistence<IState>({
  storage: window.localStorage,
})

export default createStore<IState>({
  state: {
    todos: [],
    nextTodoId: 1,
  },
  plugins: [vuexLocal.plugin],
  getters: {
    allTodos: (state) => state.todos,
    todoExists: (state) => (todoId: number) =>
      state.todos.some((todo) => todo.id === todoId),
    getTodo: (state) => (todoId: number) =>
      state.todos.find((todo) => todo.id === todoId),
  },

  mutations: {
    ADD_TODO: (state, todo: Omit<ITodo, "id" | "completed">) => {
      const newTodo: ITodo = {
        ...todo,
        id: state.nextTodoId,
        completed: false,
      }
      state.todos.push(newTodo)
      state.nextTodoId++
    },
    TOGGLE_TODO: (state, todoId: number) => {
      const todo = state.todos.find((todo) => todo.id === todoId)
      if (todo) todo.completed = !todo.completed
    },
    DELETE_TODO: (state, todoId: number) => {
      state.todos = state.todos.filter((todo) => todo.id !== todoId)
    },
    CLEAR_TODOS: (state) => {
      state.todos = []
      // state.nextTodoId = 1;
    },
    EDIT_TODO: (
      state,
      {
        todoId,
        content,
      }: { todoId: number; content: Omit<ITodo, "id" | "completed"> }
    ) => {
      const todoIndex = state.todos.findIndex((todo) => todo.id === todoId)
      if (todoIndex !== -1) {
        state.todos[todoIndex] = {
          ...state.todos[todoIndex],
          ...content,
        }
      }
    },
  },
  actions: {
    addTodo: ({ commit }, todo: Omit<ITodo, "id" | "completed">) => {
      commit("ADD_TODO", todo)
    },
    toggleTodo: ({ commit }, todoId: number) => {
      commit("TOGGLE_TODO", todoId)
    },
    deleteTodo: ({ commit }, todoId: number) => {
      commit("DELETE_TODO", todoId)
    },
    clearTodos: ({ commit }) => {
      commit("CLEAR_TODOS")
    },
    editTodo: (
      { commit },
      {
        todoId,
        content,
      }: { todoId: number; content: Omit<ITodo, "id" | "completed"> }
    ) => {
      commit("EDIT_TODO", { todoId, content })
    },
  },
})
