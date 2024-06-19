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
import { ref } from "vue"
import { useStore } from "vuex"

const store = useStore()

const title = ref("")
const description = ref("")

const addTodo = () => {
  if (title.value.trim() === "" || description.value.trim() === "") return
  store.dispatch("addTodo", {
    title: title.value,
    description: description.value,
  })
  title.value = ""
  description.value = ""
  router.push("/")
}
</script>

<template>
  <div class="max-w-xl mx-auto">
    <Card>
      <CardHeader>
        <CardTitle>Add Todo</CardTitle>
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
        <Button @click="addTodo">Add Todo</Button>
      </CardFooter>
    </Card>
  </div>
</template>
