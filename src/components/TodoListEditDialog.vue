<script setup lang="ts">
  import {
    ref,
    onMounted,
  } from 'vue'

  interface TodoListItem {
    id: number
    text: string
    status: string
    updatedAt: string
  }

  interface Props {
    visible: boolean,
    task: TodoListItem,
  }

  const inputRef = ref<HTMLInputElement | null>(null)

  const { visible, task } = defineProps<Props>()

  const emit = defineEmits(['save'])

  onMounted(() => {
    inputRef.value?.focus()
  })
</script>

<template>
  <Teleport to="body">
    <div v-if="visible" class="fixed top-0 right-0 bottom-0 left-0 flex flex-col justify-center items-center bg-red-500/50">
      <div class="flex flex-col justify-between p-4 w-[300px] h-[120px] bg-red-300 rounded">
        <input ref="inputRef" v-model="task.text" class="p-1 rounded" type="text" />
        <button
          class="btn-primary mt-2 bg-blackRGBA-700"
          type="button"
          @click="emit('save', task)"
        >
          Save
        </button>
      </div>
    </div>
  </Teleport>
</template>
