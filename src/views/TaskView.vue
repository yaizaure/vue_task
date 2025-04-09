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

const addTask = async (task: Task) => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });

  if (response.ok) {
    const createdTask = await response.json();
    const uniqueId = tasks.value.length > 0 
      ? Math.max(...tasks.value.map((t) => t.id ?? 0)) + 1 
      : 1;

    const newTask = {
      id: uniqueId,
      ...task,
    };

    tasks.value.push(newTask);
    console.log('added task', { ...createdTask, id: uniqueId });

  } else {
    console.error('failed to add task');
  }
};

const updateTask = (updatedTask: Task) => {
  const index = tasks.value.findIndex((t) => t.id === updatedTask.id);
  if (index !== -1) {
    tasks.value[index] = updatedTask;
  }
};

const deleteTask = async (taskId: number) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${taskId}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    tasks.value = tasks.value.filter((task) => task.id !== taskId);
    console.log('deleted task', taskId);

  } else {
    console.error('failed to delete task');
  }
};

onMounted(() => {
  const savedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (savedTasks) {
    tasks.value = JSON.parse(savedTasks);

  } else {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.error('failed to fetch tasks');
          return [];
        }
      })

      .then((data) => {
        tasks.value = data.map((task: Task, index: number) => ({
          ...task,
          id: task.id || index + 1,
        }));
      });
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