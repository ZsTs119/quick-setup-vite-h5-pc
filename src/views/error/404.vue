<template>
  <div class="not-found">
    <h1>404</h1>
    <p>页面不存在</p>
    <button @click="$router.push('/')">返回首页</button>
  </div>
</template>

<script setup lang="ts">
// 404 页面不需要特殊逻辑
</script>

<style scoped lang="scss">
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  
  h1 {
    font-size: 6rem;
    margin: 0;
    color: #666;
  }
  
  p {
    color: #666;
    margin: 1rem 0;
  }
  
  button {
    padding: 0.5rem 1rem;
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
</style> 