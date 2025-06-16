<style lang="scss">
@import "@/styles/transitions/theme.scss";

.app-container {
  width: 100%;
  min-height: 100vh;
  background: var(--bg-color);
  display: flex;
  flex-direction: column;
  @include useTheme;

  .main-content {
    margin-top: 60px; /* 与导航栏高度一致 */
    padding: 20px;
    flex: 1;
  }
}
</style>

<template>
  <div class="app-container">
    <Navbar />
    <div class="main-content">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts" setup name="App">
import { onMounted } from "vue";
import Navbar from "@/components/Navbar/index.vue";
import { useThemeStore } from "@/stores/theme";

// 获取 themeStore 实例
const themeStore = useThemeStore();

onMounted(() => {
  // 初始化主题
  themeStore.initTheme();
});
</script>
