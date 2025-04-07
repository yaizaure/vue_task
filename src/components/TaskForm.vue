// This component includes a form for adding new tasks.
// It emits an event with the new task data when the form is submitted.

<script setup lang="ts">
import { ref } from 'vue';
import type { Task } from '@/types';

const emit = defineEmits<{ (event: 'add-task', task: Task): void }>();
const newTask = ref('');

const submitTask = () => {
  emit('add-task', {
    title: newTask.value,
    completed: false,
  });
  newTask.value = ''; 
};
</script>

<template>
  <form @submit.prevent="submitTask" class="task-form">
    <input v-model="newTask" placeholder="New Task" required />
    <button type="submit">Add</button>
  </form>
</template>

<style scoped>
.task-form {
  display: flex;
  gap: 10px;
  align-items: center;
}
</style>