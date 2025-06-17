<template>
  <el-header class="navbar">
    <div class="logo-container">
      <router-link to="/">
        <h1 class="logo">Vite-H5-PC-Template</h1>
      </router-link>
    </div>

    <div class="menu-container">
      <el-menu
        :default-active="activeIndex"
        mode="horizontal"
        :ellipsis="false"
        router
      >
        <el-menu-item index="/">首页</el-menu-item>
        <!-- <el-menu-item index="/settings">设置</el-menu-item> -->
      </el-menu>
    </div>

    <div class="actions-container">
      <theme-switch />
      <el-dropdown v-if="userStore.isLoggedIn">
        <el-avatar :size="32" :src="userAvatar">
          {{ userInitials }}
        </el-avatar>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item divided @click="handleLogout"
              >退出登录</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";
import ThemeSwitch from "@/components/ThemeSwitch/index.vue";

// 获取当前路由和路由器实例
const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

// 根据当前路由路径设置活动菜单项
const activeIndex = computed(() => route.path);

// 用户头像和初始字母（如果没有头像）
const userAvatar = computed(() => userStore.userInfo?.avatar || "");
const userInitials = computed(() => {
  const name = userStore.userInfo?.username || "";
  return name.substring(0, 2).toUpperCase();
});

// 跳转到登录页
const goToLogin = () => {
  router.push("/login");
};

// 退出登录
const handleLogout = async () => {
  await userStore.logout();
  router.push("/login");
};
</script>

<style lang="scss" scoped>
.navbar {
  display: flex;
  align-items: center;
  height: 60px;
  padding: 0 20px;
  background-color: var(--bg-color);
  border-bottom: 1px solid var(--border-light);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  @include useTheme;
}

.logo-container {
  min-width: 200px;

  .logo {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--primary-color);
  }

  a {
    text-decoration: none;
  }
}

.menu-container {
  flex: 1;
  display: flex;

  :deep(.el-menu) {
    --el-menu-hover-bg-color: var(--primary-light);
    --el-menu-active-color: var(--primary-color);
    border-bottom: none;
    background-color: transparent;
  }

  :deep(.el-menu-item) {
    color: var(--text-primary);

    &.is-active {
      color: var(--primary-color);
    }
  }
}

.actions-container {
  display: flex;
  align-items: center;
  gap: 16px;
}
</style>
