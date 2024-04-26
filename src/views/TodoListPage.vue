<script setup lang="ts">
  import TodoListHeader from '@/components/TodoListHeader.vue'
  import TodoList from '@/components/TodoList.vue'
  import TodoListFooter from '@/components/TodoListFooter.vue'
</script>

<template>
  <div class="page-container">
    <div class="page-wrapper">
      <TodoListHeader />

      <TodoList />

      <TodoListFooter />
    </div>
  </div>
</template>
