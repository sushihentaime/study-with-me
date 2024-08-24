<template>
  <div v-draggable="'todo-list'">
    <div class="todo-container">
      <div class="todo-list">
        <div class="todo-header">
          <p class="todo-title">
            To-do List
          </p>
          <button @click="toggleDropdown">
            {{ isDropdownOpen ? 'Close' : 'Add' }}
          </button>
        </div>
        <div
          v-if="isDropdownOpen"
          class="dropdown"
        >
          <div class="task-container">
            <label
              for="task"
              class="task-label"
            >Task:</label>
            <input
              id="task"
              v-model="taskInput"
              type="text"
              placeholder="Add Task"
              maxlength="50"
              class="task-input"
              @keyup.enter="addTask"
            >
            <span class="task-counter">{{ taskInput.length }}/50</span>
          </div>
          <button @click="addTask">
            Add
          </button>
        </div>
        <div
          v-if="tasks.length > 0"
          class="task-list"
        >
          <ul>
            <li
              v-for="(task, index) in tasks"
              :key="index"
              class="task-item"
            >
              <button
                class="toggle-btn"
                :class="{ completed: task.isCompleted }"
                @click="toggleTask(index)"
              >
                <span class="checkmark">&#10003;</span>
              </button>
              <span
                class="task-text"
                :class="{ 'completed-text': task.isCompleted }"
              >{{
                task.name
              }}</span>
              <button
                class="delete-btn"
                @click="deleteTask(index)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polyline points="3 6 5 6 21 6" />
                  <path
                    d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                  />
                </svg>
              </button>
            </li>
          </ul>
        </div>
        <div
          v-else
          class="no-tasks"
        >
          No tasks to show
        </div>
        <button
          v-if="tasks.length > 0"
          @click="clearAllTasks"
        >
          Clear All
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Task {
  name: string
  isCompleted: boolean
}

const tasks = ref<Task[]>([])
const taskInput = ref<string>('')
const isDropdownOpen = ref<boolean>(false)

// TODO: should be refactored to use Pinia store
const loadTasks = (): void => {
  const savedTasks = localStorage.getItem('tasks')
  if (savedTasks) {
    tasks.value = JSON.parse(savedTasks)
  }
}

// TODO: should be refactored to use Pinia store
const saveTasks = (): void => {
  localStorage.setItem('tasks', JSON.stringify(tasks.value))
}

const toggleDropdown = (): void => {
  isDropdownOpen.value = !isDropdownOpen.value
  console.log(isDropdownOpen.value)
}

const addTask = (): void => {
  console.log('Adding task...')
  if (!taskInput.value) return
  if (taskInput.value.trim()) {
    tasks.value.push({ name: taskInput.value, isCompleted: false })
    taskInput.value = ''
  }
}

const toggleTask = (index: number): void => {
  tasks.value[index].isCompleted = !tasks.value[index].isCompleted
}

const deleteTask = (index: number) => {
  tasks.value.splice(index, 1)
}

const clearAllTasks = (): void => {
  tasks.value = []
}

onMounted(() => {
  loadTasks()
})

watch(
  tasks,
  () => {
    saveTasks()
    console.log(tasks.value)
  },
  { deep: true },
)
</script>

<style scoped>
.todo-container {
  background-color: rgba(30, 30, 30, 0.8);
  color: #fff;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 385px;
}

.todo-list {
  width: 100%;
}

.todo-title {
  font-size: 1.2rem;
  font-weight: 500;
}

.todo-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.todo-header button {
  padding: 5px 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.task-container {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.task-input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

.task-counter {
  font-size: 14px;
  text-align: right;
  color: #ccc;
}

ul {
  list-style-type: none;
  padding: 0;
}

.task-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.task-item:hover {
  background-color: #f0f0f0;
}

.toggle-btn {
  width: 24px;
  height: 24px;
  border: 2px solid #ccc;
  border-radius: 50%;
  background-color: white;
  margin-right: 10px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
}

.toggle-btn.completed {
  background-color: #4caf50;
  border-color: #4caf50;
}

.checkmark {
  color: white;
  font-size: 14px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.toggle-btn.completed .checkmark {
  opacity: 1;
}

.task-text {
  flex-grow: 1;
  transition: color 0.3s ease;
}

.completed-text {
  color: #888;
  text-decoration: line-through;
}

.delete-btn {
  opacity: 0;
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  color: #888;
  transition: color 0.3s ease;
}

.task-item:hover .delete-btn {
  opacity: 1;
}

.delete-btn:hover {
  color: #ff4136;
}
</style>
