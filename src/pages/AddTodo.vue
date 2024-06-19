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
import { BadgePlus, CircleChevronLeft, Pencil } from "lucide-vue-next"
import { onMounted, ref } from "vue"
import { useRoute } from "vue-router"
import { useStore } from "vuex"
import { useToast } from "@/components/ui/toast/use-toast"

const route = useRoute()
const store = useStore()
const { toast } = useToast()

onMounted(() => {
  if (!store.getters["todoExists"](Number(route.query.id))) {
    title.value = ""
    description.value = ""
    isEdit.value = false
    router.push("/add")
  }
})

const isEdit = ref<boolean>(!!route.query.id)

const title = ref<string>((route.query.title as string) ?? "")
const description = ref<string>((route.query.description as string) ?? "")

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
  if (title.value.trim() === "") {
    toast({
      title: "Incomplete info",
      description: "Please fill in atleast the title",
    })
    return
  }
  isEdit.value ? editTodo() : addTodo()
  toast({
    description: isEdit.value
      ? "Todo updated successfully"
      : "Todo added successfully",
  })
  title.value = ""
  description.value = ""
  router.push("/")
}
</script>

<template>
  <div class="max-w-xl mx-auto">
    <Card class="relative">
      <Button
        class="absolute top-4 right-4"
        @click="router.push('/')"
        variant="ghost"
      >
        <CircleChevronLeft />
      </Button>
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
        <div class="flex justify-end w-full">
          <Button
            @click="todoAction"
            disabled="!title"
            class="w-36 space-x-2"
            size="sm"
          >
            <p>{{ isEdit ? "Edit Todo" : "Add Todo" }}</p>
            <Pencil :size="16" v-if="isEdit" />
            <BadgePlus v-else :size="20" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  </div>
</template>
