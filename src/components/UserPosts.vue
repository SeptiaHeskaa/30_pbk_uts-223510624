<template>
    <div class="container">
      <!-- Tombol "Show Todos" -->
      <button class="button" @click="toggleShowTodos">{{ showTodos ? 'Hide Todos' : 'Show Todos' }}</button>
  
      <!-- Tombol "Postingan" -->
      <button class="button" @click="toggleShowPosts">{{ showPosts ? 'Hide Posts' : 'Show Posts' }}</button>
  
      <!-- Select untuk memilih pengguna -->
      <select v-if="showUserSelect && showPosts" v-model="selectedUser" @change="fetchUserPosts" class="select-user">
        <option value="">Select User</option>
        <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
      </select>
  
      <!-- Daftar postingan -->
      <ul v-if="showPosts && selectedUser" class="post-list">
        <li v-for="post in posts" :key="post.id">{{ post.title }}</li>
      </ul>
      
      <!-- Daftar Todos -->
      <ul v-if="showTodos" class="todos">
        <!-- Tampilkan komponen-komponen di sini -->
        <TodoList v-if="showTodos" />
        <TodoListEditDialog v-if="showTodos" />
        <TodoListFooter v-if="showTodos" />
        <TodoListHeader v-if="showTodos" />
        <TodoListAb v-if="showTodos" />
      </ul>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  interface User {
    id: number;
    name: string;
  }
  
  interface Todo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
  }
  
  interface Post {
    id: number;
    title: string;
  }
  
  const users = ref<User[]>([]);
  const selectedUser = ref('');
  const posts = ref<Post[]>([]);
  const todos = ref<Todo[]>([]);
  const showPosts = ref(false);
  const showUserSelect = ref(false);
  const showTodos = ref(false);
  
  const fetchUsers = async () => {
    try {
      const response = await axios.get<User[]>('https://jsonplaceholder.typicode.com/users');
      users.value = response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  
  const fetchUserPosts = async () => {
    if (!selectedUser.value) return;
    try {
      const response = await axios.get<Post[]>(`https://jsonplaceholder.typicode.com/posts?userId=${selectedUser.value}`);
      posts.value = response.data;
    } catch (error) {
      console.error('Error fetching user posts:', error);
    }
  };
  
  const fetchTodos = async () => {
    try {
      const response = await axios.get<Todo[]>('https://jsonplaceholder.typicode.com/todos');
      todos.value = response.data;
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };
  
  const toggleShowTodos = () => {
    showTodos.value = !showTodos.value;
  };
  
  const toggleShowPosts = () => {
    showPosts.value = !showPosts.value;
    if (showPosts.value && !showUserSelect.value) {
      showUserSelect.value = true;
      fetchUsers();
    }
  };
  
  onMounted(() => {
    fetchUsers();
  });
  </script>
  
  <style scoped>
  .container {
    text-align: center;
  }
  
  .button {
    padding: 10px 20px;
    font-size: 24px;
    background-color: #ff0000;
    color: rgb(255, 255, 255);
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin: 5px;
  }
  
  .button:hover {
    background-color: #bd132d;
  }
  
  .select-user {
    margin-top: 10px;
  }
  
  .post-list {
    list-style-type: none;
    padding: 0;
    margin-top: 10px;
  }
  
  .post-list li {
    margin-bottom: 5px;
  }
  
  .todos {
    list-style-type: none;
    padding: 0;
  }
  
  .todos li {
    margin-bottom: 5px;
  }
  </style>
  
