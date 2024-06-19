<script setup lang="ts">
import { Button } from "@/components/ui/button"
import { CardHeader } from "@/components/ui/card"
import { Card } from "@/components/ui/card"
import { CardDescription } from "@/components/ui/card"
import { CardFooter } from "@/components/ui/card"
import { CardContent } from "@/components/ui/card"
import { CardTitle } from "@/components/ui/card"
import { router } from "@/router"
import { BadgePlus, CircleCheck, Pencil, Trash2 } from "lucide-vue-next"
import { computed } from "vue"
import { useStore } from "vuex"

const store = useStore()

const todoList = computed(() => store.state.todos)
// const clearTodos = () => store.dispatch("clearTodos")

const deleteTodo = (id: number) => store.dispatch("deleteTodo", id)
const markAsCompleted = (id: number) => store.dispatch("toggleTodo", id)
</script>

<template>
  <div className="max-w-xl mx-auto space-y-4">
    <div class="flex items-center justify-between">
      <CardTitle>Todo List</CardTitle>
      <!-- <Button @click="clearTodos">Clear Todos</Button> -->
      <Button @click="router.push('/add')" class="space-x-2" size="sm">
        <p>Add Todo</p>
        <BadgePlus :size="20" />
      </Button>
    </div>
    <div class="grid gap-2">
      <Card v-for="todo in todoList">
        <CardHeader>
          <CardTitle>{{ todo.title }}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>{{ todo.description }}</CardDescription>
        </CardContent>
        <CardFooter class="flex items-center justify-between">
          <Button class="space-x-2" size="sm" @click="markAsCompleted(todo.id)">
            <p>Mark as Completed</p>
            <CircleCheck :size="20" />
          </Button>
          <div class="flex gap-x-1.5">
            <Button size="sm" class="max-w-24 w-full space-x-2">
              <p>Edit</p>
              <Pencil :size="16" />
            </Button>
            <Button
              size="sm"
              class="max-w-28 w-full space-x-2"
              @click="deleteTodo(todo.id)"
            >
              <p>Delete</p>
              <Trash2 :size="20" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  </div>
</template>
