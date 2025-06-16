<template>
  <div class="home-container">
    <!-- 顶部欢迎区 -->
    <el-card class="welcome-card">
      <div class="user-welcome">
        <h1>欢迎回来，{{ userStore.userInfo?.username }}</h1>
        <p>您已成功登录 Quick Setup 示例系统</p>
        <el-button type="danger" @click="handleLogout" size="small"
          >退出登录</el-button
        >
      </div>
    </el-card>

    <!-- 博客式左右布局 -->
    <div class="blog-layout">
      <!-- 左侧导航菜单 -->
      <div class="sidebar">
        <el-menu
          :default-active="activeMenu"
          class="sidebar-menu"
          @select="handleMenuSelect"
          :router="false"
        >
          <el-menu-item index="element">
            <el-icon><el-icon-menu /></el-icon>
            <span>Element Plus 组件</span>
          </el-menu-item>
          <el-menu-item index="vant">
            <el-icon><el-icon-mobile-phone /></el-icon>
            <span>Vant 组件</span>
          </el-menu-item>
          <el-menu-item index="icon">
            <el-icon><el-icon-picture-rounded /></el-icon>
            <span>图标组件</span>
          </el-menu-item>
          <el-menu-item index="api">
            <el-icon><el-icon-connection /></el-icon>
            <span>API调用示例</span>
          </el-menu-item>
        </el-menu>
      </div>

      <!-- 右侧内容区 -->
      <div class="content">
        <component :is="activeComponent" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, shallowRef, computed } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";
import {
  Menu as ElIconMenu,
  Cellphone as ElIconMobilePhone,
  PictureRounded as ElIconPictureRounded,
  Connection as ElIconConnection,
} from "@element-plus/icons-vue";

// 导入子组件
import ElementDemo from "./components/ElementDemo.vue";
import VantDemo from "./components/VantDemo.vue";
import IconDemo from "./components/IconDemo.vue";
import ApiDemo from "./components/ApiDemo.vue";

const router = useRouter();
const userStore = useUserStore();

// 主题切换
const isDarkMode = ref(false);

// 当前激活的菜单项
const activeMenu = ref("element");

// 使用shallowRef包装组件提高性能
const ElementDemoComponent = shallowRef(ElementDemo);
const VantDemoComponent = shallowRef(VantDemo);
const IconDemoComponent = shallowRef(IconDemo);
const ApiDemoComponent = shallowRef(ApiDemo);

// 根据当前激活的菜单项显示对应组件
const activeComponent = computed(() => {
  switch (activeMenu.value) {
    case "element":
      return ElementDemoComponent.value;
    case "vant":
      return VantDemoComponent.value;
    case "icon":
      return IconDemoComponent.value;
    case "api":
      return ApiDemoComponent.value;
    default:
      return ElementDemoComponent.value;
  }
});

// 菜单选择处理
const handleMenuSelect = (index: string) => {
  activeMenu.value = index;
};

// 切换主题（这里只是示例，实际应该调用主题切换相关方法）
const toggleTheme = () => {
  // 使用document.documentElement设置数据主题
  if (isDarkMode.value) {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
  }

  console.log("切换主题:", isDarkMode.value ? "暗色模式" : "亮色模式");
};

// 登出处理
const handleLogout = () => {
  userStore.logout();
  router.push("/login");
};
</script>

<style scoped lang="scss">
.home-container {
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;

  .welcome-card {
    margin-bottom: 24px;

    .user-welcome {
      text-align: center;

      h1 {
        color: var(--primary-color);
        margin-bottom: 10px;
      }

      p {
        color: var(--text-regular);
        margin-bottom: 20px;
      }
    }
  }

  .blog-layout {
    display: flex;
    gap: 24px;
    min-height: 800px;

    // 左侧边栏
    .sidebar {
      width: 240px;
      flex-shrink: 0;

      .sidebar-menu {
        border-radius: 8px;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
      }

      .theme-switch {
        margin-top: 20px;
        padding: 16px;
        background-color: var(--bg-color-secondary);
        border-radius: 8px;
        display: flex;
        align-items: center;

        .theme-label {
          margin-left: 12px;
          font-size: 14px;
          color: var(--text-secondary);
        }
      }
    }

    // 右侧内容区
    .content {
      flex: 1;
      background-color: var(--bg-color);
      border-radius: 8px;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
      overflow: hidden;
    }
  }
}

// 响应式调整
@media (max-width: 768px) {
  .home-container {
    padding: 12px;

    .blog-layout {
      flex-direction: column;

      .sidebar {
        width: 100%;
        margin-bottom: 16px;
      }
    }
  }
}
</style>
