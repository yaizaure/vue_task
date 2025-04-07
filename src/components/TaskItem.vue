// This component represents a single task item in the task list.
// It displays the task's title and allows toggling its completion status.

<script setup lang="ts">
import type { Task } from '@/types';

const props = defineProps<{ task: Task }>();
const emit = defineEmits<{ (event: 'update-task', task: Task): void }>();

const changeStatus = () => {
  emit('update-task', { ...props.task, completed: !props.task.completed });
};
</script>

<template>
  <li :class="{ completed: task.completed }">
    <input
      type="checkbox"
      v-model="task.completed"
      @change="changeStatus"
    />
    {{ task.title }}
  </li>
</template>

<style scoped>
.completed {
  text-decoration: line-through;
  color: gray;
}
</style>