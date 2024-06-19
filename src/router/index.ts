import AddTodo from "@/pages/AddTodo.vue"
import TodoList from "@/pages/TodoList.vue"
import { createRouter, createWebHistory } from "vue-router"

const routes = [
  { path: "/", component: TodoList },
  { path: "/add", component: AddTodo },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
