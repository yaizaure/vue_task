// This component generates and displays a list of tasks.
// It receives the tasks as a prop and uses the TaskItem component to display each task.

<script setup lang="ts">
import TaskItem from './TaskItem.vue';
import type { Task } from '@/types';

defineProps<{ tasks: Task[] }>();
</script>

<template>
  <ul class="task-list">
    <TaskItem v-for="task in tasks" :key="task.id" :task="task" />
  </ul>
</template>

<style scoped>
.task-list {
  list-style: none;
  padding: 0;
}
</style>