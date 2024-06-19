<script setup lang="ts">
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { router } from "@/router"
import { onMounted, ref } from "vue"
import { useRoute } from "vue-router"
import { useStore } from "vuex"

const route = useRoute()
const store = useStore()

onMounted(() => {
  if (!store.getters["todoExists"](Number(route.query.id))) {
    title.value = ""
    description.value = ""
    isEdit.value = false
    router.push("/add")
  }
})

const isEdit = ref(!!route.query.id)

const title = ref((route.query.title as string) ?? "")
const description = ref((route.query.description as string) ?? "")

const addTodo = () => {
  store.dispatch("addTodo", {
    title: title.value,
    description: description.value,
  })
}

const editTodo = () => {
  store.dispatch("editTodo", {
    todoId: Number(route.query.id),
    content: { title: title.value, description: description.value },
  })
}

const todoAction = () => {
  if (title.value.trim() === "" || description.value.trim() === "") return
  isEdit.value ? editTodo() : addTodo()
  description.value = ""
  router.push("/")
}
</script>

<template>
  <div class="max-w-xl mx-auto">
    <Card>
      <CardHeader>
        <CardTitle>
          {{ isEdit ? "Edit Todo" : "Add Todo" }}
        </CardTitle>
        <CardDescription>
          Fill in the form below to add a new todo item.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="grid gap-6">
          <div class="grid gap-3">
            <Label for="name">Title</Label>
            <Input
              id="name"
              type="text"
              class="w-full"
              placeholder="Buy groceries"
              v-model="title"
            />
          </div>
          <div class="grid gap-3">
            <Label for="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Buy milk, eggs, and bread."
              class="min-h-32"
              v-model="description"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button @click="todoAction">
          {{ isEdit ? "Edit Todo" : "Add Todo" }}
        </Button>
      </CardFooter>
    </Card>
  </div>
</template>
