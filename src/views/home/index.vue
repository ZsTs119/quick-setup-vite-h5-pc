<template>
  <div class="home-container">
    <h1>首页</h1>
    <div class="user-info" v-if="userStore.userInfo">
      <p>欢迎, {{ userStore.userInfo.username }}</p>
      <button @click="handleLogout">退出登录</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

const handleLogout = () => {
  userStore.logout()
  router.push('/login')
}
</script>

<style scoped lang="scss">
.home-container {
  padding: 2rem;
  
  .user-info {
    margin-top: 1rem;
    
    button {
      margin-top: 0.5rem;
      padding: 0.5rem 1rem;
      background-color: #f44336;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      
      &:hover {
        background-color: #da190b;
      }
    }
  }
}
</style> 