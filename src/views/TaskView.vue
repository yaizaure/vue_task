// This is the main view of the application. It manages the task list, handles
// adding new tasks and updating existing ones. It uses TaskForm for task creation
// and TaskList to display and manage them.

<script setup lang="ts">
import { ref } from 'vue';
import type { Task } from '@/types';
import TaskList from '@/components/TaskList.vue';
import TaskForm from '@/components/TaskForm.vue';

const tasks = ref<Task[]>([
  { id: 1, title: 'Vue.js 3 Learning', completed: false },
  { id: 2, title: 'GraphQL Learning', completed: true },
]);

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
</script>

<template>
  <div class="container">
    <h1>Task list for OpenLog</h1>
    <TaskForm @add-task="addTask" />
    <TaskList :tasks="tasks" @update-task="updateTask" />
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