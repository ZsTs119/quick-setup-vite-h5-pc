<template>
  <div class="theme-switch">
    <el-dropdown @command="handleThemeChange">
      <span class="theme-switch__trigger">
        主题切换
        <el-icon><arrow-down /></el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="light">默认主题</el-dropdown-item>
          <el-dropdown-item command="dark">暗黑主题</el-dropdown-item>
          <el-dropdown-item command="red">红色主题</el-dropdown-item>
          <el-dropdown-item command="purple">紫色主题</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { useThemeStore, type ThemeType } from '@/stores/theme'

const themeStore = useThemeStore()

const handleThemeChange = (theme: ThemeType) => {
  themeStore.setTheme(theme)
}
</script>

<style lang="scss" scoped>
.theme-switch {
  @include useTheme;
  
  &__trigger {
    color: var(--text-primary);
    cursor: pointer;
  }
}
</style> 