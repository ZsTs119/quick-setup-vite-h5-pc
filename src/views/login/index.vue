<style lang="scss" scoped>
.login-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;

  .login-card {
    max-width: 600px;
    margin: 40px auto;

    .card-header {
      text-align: center;

      h2 {
        margin-top: 0;
        margin-bottom: 10px;
        color: var(--primary-color);
      }

      p {
        margin-bottom: 20px;
        color: var(--text-regular);
      }
    }

    .login-section {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px 0;

      .el-button {
        min-width: 200px;
      }

      .el-divider {
        width: 100%;
        margin: 30px 0;
      }
    }
  }
}
</style>

<template>
  <div class="login-container">
    <el-card class="login-card">
      <template #header>
        <div class="card-header">
          <h2>Quick Setup 示例系统</h2>
          <p>请使用 JSONPlaceholder 提供的用户名登录系统</p>
          <el-alert
            title="可使用的测试用户名: Bret, Antonette, Samantha, Karianne, Kamren 等"
            type="info"
            :closable="false"
            show-icon
          />
        </div>
      </template>

      <div class="login-section">
        <el-button type="primary" size="large" @click="showLoginForm">
          <el-icon><User /></el-icon>
          点击登录
        </el-button>

        <el-divider>或者</el-divider>

        <el-button @click="showLoginForm">
          <el-icon><House /></el-icon>
          前往首页查看组件示例
        </el-button>
      </div>
    </el-card>

    <!-- 登录表单组件 -->
    <login-form
      v-model:visible="loginFormVisible"
      @login-success="onLoginSuccess"
    />
  </div>
</template>

<script lang="ts" setup name="login">
import { ref, onMounted } from "vue";
import { User, House } from "@element-plus/icons-vue";
import LoginForm from "@/components/LoginForm/index.vue";
import { useRouter } from "vue-router";

const router = useRouter();

// 登录表单可见性
const loginFormVisible = ref(false);

// 显示登录表单
const showLoginForm = () => {
  loginFormVisible.value = true;
};

// 登录成功回调
const onLoginSuccess = () => {
  // 登录表单组件内部已处理跳转，这里可以添加额外逻辑
};

// 添加获取用户列表的方法
const fetchAvailableUsers = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await response.json();

    // 格式化为用户名列表
    const usernames = users.map((user) => user.username).join(", ");

    // 更新提示信息
    // 注意：这里只是获取用户名，实际场景中不应该这样暴露用户列表
    console.log("可用的测试用户名:", usernames);
    return usernames;
  } catch (error) {
    console.error("获取用户列表失败:", error);
    return "Bret, Antonette, Samantha (获取完整列表失败)";
  }
};

// 在组件挂载时获取用户列表
onMounted(async () => {
  await fetchAvailableUsers();
});
</script>
