<script setup lang="ts">
import { Button } from "@/components/ui/button"
import { CardHeader } from "@/components/ui/card"
import { Card } from "@/components/ui/card"
import { CardDescription } from "@/components/ui/card"
import { CardFooter } from "@/components/ui/card"
import { CardContent } from "@/components/ui/card"
import { CardTitle } from "@/components/ui/card"
import { router } from "@/router"
import { ITodo } from "@/types/todo"
import {
  BadgePlus,
  CircleCheck,
  CircleX,
  Pencil,
  RefreshCcw,
  Trash2,
} from "lucide-vue-next"
import { ComputedRef, computed, ref } from "vue"
import { useStore } from "vuex"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const store = useStore()

const currentFilter = ref<"all" | "completed" | "active">("all")

const todoList: ComputedRef<ITodo[]> = computed(() => {
  switch (currentFilter.value) {
    case "completed":
      return store.state.todos.filter((todo: ITodo) => todo.completed)
    case "active":
      return store.state.todos.filter((todo: ITodo) => !todo.completed)
    default:
      return store.state.todos
  }
})

const clearTodos = () => store.dispatch("clearTodos")

const deleteTodo = (id: number) => store.dispatch("deleteTodo", id)
const markAsCompleted = (id: number) => store.dispatch("toggleTodo", id)
const editTodo = (todo: ITodo) => {
  router.push({
    path: "/add",
    query: {
      id: todo.id,
      title: todo.title,
      description: todo.description,
    },
  })
}
</script>

<template>
  <div class="max-w-xl mx-auto space-y-4">
    <div class="flex items-center justify-between">
      <CardTitle>Todo List</CardTitle>
    </div>
    <div class="flex items-center justify-between flex-row-reverse">
      <Button @click="router.push('/add')" class="space-x-2" size="sm">
        <p>Add Todo</p>
        <BadgePlus :size="20" />
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button
            class="capitalize max-w-24 w-full"
            variant="outline"
            size="sm"
            >{{ currentFilter }}</Button
          ></DropdownMenuTrigger
        >
        <DropdownMenuContent>
          <DropdownMenuLabel>Filters</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem @click="currentFilter = 'all'"
            >All</DropdownMenuItem
          >
          <DropdownMenuItem @click="currentFilter = 'completed'"
            >Completed</DropdownMenuItem
          >
          <DropdownMenuItem @click="currentFilter = 'active'"
            >Active</DropdownMenuItem
          >
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
    <Card class="grid gap-2 overflow-y-scroll h-[42rem] no-scrollbar p-1">
      <Card v-for="todo in todoList" class="relative">
        <CircleCheck
          v-if="todo.completed"
          class="absolute top-4 right-4"
          :size="20"
          color="green"
        />
        <CircleX v-else class="absolute top-4 right-4" :size="20" color="red" />
        <CardHeader>
          <CardTitle :class="todo.completed && 'line-through'">{{
            todo.title
          }}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription :class="todo.completed && 'line-through'">{{
            todo.description
          }}</CardDescription>
        </CardContent>
        <CardFooter class="flex items-center justify-between gap-x-1.5">
          <Button class="space-x-2" size="sm" @click="markAsCompleted(todo.id)">
            <p>
              {{ todo.completed ? "Mark as Active" : "Mark as Completed" }}
            </p>
            <CircleCheck v-if="!todo.completed" :size="20" />
            <CircleX v-else :size="20" />
          </Button>
          <div class="flex gap-x-1.5">
            <Button
              size="sm"
              class="max-w-24 w-full space-x-2"
              @click="editTodo(todo)"
              variant="outline"
            >
              <p>Edit</p>
              <Pencil :size="16" />
            </Button>
            <Button
              size="sm"
              class="max-w-28 w-full space-x-2"
              variant="destructive"
              @click="deleteTodo(todo.id)"
            >
              <p>Delete</p>
              <Trash2 :size="20" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </Card>
    <div class="flex justify-center" v-if="todoList.length > 0">
      <Button
        @click="clearTodos"
        size="sm"
        class="space-x-2 w-full max-w-md"
        variant="destructive"
      >
        <p>Clear Todos</p>
        <RefreshCcw :size="20" />
      </Button>
    </div>
  </div>
</template>
