<template>
  <div class="login-container">
    <h2>登录</h2>
    <div class="login-form">
      <input v-model="username" type="text" placeholder="用户名" />
      <input v-model="password" type="password" placeholder="密码" />
      <button @click="handleLogin">登录</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useLoginStore } from '@/stores/login'

const router = useRouter()
const route = useRoute()
const loginStore = useLoginStore()

const username = ref('')
const password = ref('')

const handleLogin = async () => {
  try {
    // 这里添加实际的登录逻辑
    // 模拟登录成功
    loginStore.setToken('mock-token')
    loginStore.setUserInfo({
      username: username.value,
      role: 'admin' // 模拟角色
    })
    
    // 获取重定向地址
    const redirect = route.query.redirect as string
    router.push(redirect || '/')
  } catch (error) {
    console.error('登录失败:', error)
  }
}
</script>

<style scoped lang="scss">
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  
  .login-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 300px;
    
    input {
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    
    button {
      padding: 0.5rem;
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      
      &:hover {
        background-color: #45a049;
      }
    }
  }
}
</style> 