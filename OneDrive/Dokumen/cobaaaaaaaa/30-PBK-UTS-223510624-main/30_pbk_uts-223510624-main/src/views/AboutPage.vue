<script setup lang="ts">
  import TodoListFooter from '@/components/TodoListFooter.vue'

  const description =
    ''
  const tip = "created by: @septiaheskaa"
</script>

<template>
  <div class="page-container">
    <div class="page-wrapper">
      <div class="mt-8 min-h-[200px]">
        <h2 class="text-3xl text-center font-bold"></h2>
        <p class="mt-8 text-center">
          {{ description }}
        </p>
        <p class="mt-4 text-center">
          {{ tip }}
        </p>
      </div>

      <TodoListFooter />
    </div>
  </div>
</template>
