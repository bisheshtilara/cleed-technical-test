import { type ITodo } from "@/types/todo"
import { createStore } from "vuex"

interface IState {
  todos: ITodo[]
  nextTodoId: number
}

export default createStore<IState>({
  state: {
    todos: [],
    nextTodoId: 1,
  },
  getters: {
    allTodos: (state) => state.todos,
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
  },
})
