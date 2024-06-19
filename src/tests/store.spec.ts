import store from "@/store"
import { describe, it, expect, beforeEach } from "vitest"

describe("Vuex Store", () => {
  beforeEach(() => {
    store.commit("CLEAR_TODOS")
  })

  it("adds a new todo", () => {
    const todo = { text: "New Todo" }
    store.dispatch("addTodo", todo)
    expect(store.getters.allTodos).toHaveLength(1)
    expect(store.getters.allTodos[0].text).toBe(todo.text)
  })

  it("toggles a todo completion status", async () => {
    const todo = { text: "New Todo" }
    await store.dispatch("addTodo", todo)

    const todoId = store.getters.allTodos[0].id
    await store.dispatch("toggleTodo", todoId)

    expect(store.getters.allTodos[0].completed).toBe(true)
  })

  it("deletes a todo", async () => {
    await store.dispatch("addTodo", { text: "Todo 1" })
    await store.dispatch("addTodo", { text: "Todo 2" })

    const todoIdToDelete = store.getters.allTodos[0].id
    await store.dispatch("deleteTodo", todoIdToDelete)

    expect(store.getters.allTodos).toHaveLength(1)
    expect(store.getters.allTodos[0].text).toBe("Todo 2")
  })

  it("edits a todo", async () => {
    await store.dispatch("addTodo", { text: "Todo 1" })

    const todoId = store.getters.allTodos[0].id
    await store.dispatch("editTodo", {
      todoId,
      content: { text: "Edited Todo" },
    })

    expect(store.getters.allTodos[0].text).toBe("Edited Todo")
  })

  it("clears all todos", async () => {
    await store.dispatch("addTodo", { text: "Todo 1" })
    await store.dispatch("addTodo", { text: "Todo 2" })

    await store.dispatch("clearTodos")

    expect(store.getters.allTodos).toHaveLength(0)
  })

  it("checks if a todo exists", async () => {
    await store.dispatch("addTodo", { text: "Todo 1" })

    const todoId = store.getters.allTodos[0].id
    expect(store.getters.todoExists(todoId)).toBe(true)
  })
})
