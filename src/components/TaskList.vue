// This component generates and displays a list of tasks.
// It receives the tasks as a prop and uses the TaskItem component to display each task.

<script setup lang="ts">
import TaskItem from './TaskItem.vue';
import type { Task } from '@/types';

defineProps<{ tasks: Task[] }>();
defineEmits(['delete-task']);
</script>

<template>
  <ul class="task-list">
    <li v-for="task in tasks" :key="task.id" class="task-item">
      <TaskItem :task="task" />
      <button class="delete-btn" @click="$emit('delete-task', task.id)">✖</button>
    </li>
  </ul>
</template>

<style scoped>
.task-list {
  list-style: none;
  padding: 0;
}

.task-item {
  display: flex;
  align-items: center;
  gap: 8px; 
  margin-bottom: 10px;
}

.delete-btn {
  background: none;
  border: none;
  color: gray;
  font-size: 13.5px;
  cursor: pointer;
  padding: 0;
}

</style>