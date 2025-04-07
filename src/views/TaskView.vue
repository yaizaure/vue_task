// This is the main view of the application. It manages the task list, handles
// adding new tasks and updating existing ones. It uses TaskForm for task creation
// and TaskList to display and manage them.

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import type { Task } from '@/types';
import TaskList from '@/components/TaskList.vue';
import TaskForm from '@/components/TaskForm.vue';

const LOCAL_STORAGE_KEY = 'taskList';
const tasks = ref<Task[]>([]);

const addTask = (task: Task) => {
  tasks.value.push({
    id: tasks.value.length + 1,
    ...task,
  });
};

const updateTask = (updatedTask: Task) => {
  const index = tasks.value.findIndex((t) => t.id === updatedTask.id);
  if (index !== -1) {
    tasks.value[index] = updatedTask;
  }
};

const deleteTask = (taskId: number) => {
  tasks.value = tasks.value.filter((task) => task.id !== taskId);
};

onMounted(() => {
  const savedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (savedTasks) {
    tasks.value = JSON.parse(savedTasks);
  }
});

watch(tasks, (newTasks) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTasks));
}, { deep: true });
</script>

<template>
  <div class="container">
    <h1>Task list for OpenLog</h1>
    <TaskForm @add-task="addTask" />
    <TaskList :tasks="tasks" @update-task="updateTask" @delete-task="deleteTask" />
  </div>
</template>

<style scoped>
.container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  background: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}
</style>