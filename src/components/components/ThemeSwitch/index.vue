<template>
  <el-dropdown @command="handleThemeChange" class="theme-switch">
    <span class="theme-switch__trigger" ref="triggerRef">
      <el-icon>
        <Moon v-if="isDarkMode" />
        <Sunny v-else />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="light">日间模式</el-dropdown-item>
        <el-dropdown-item command="dark">夜间模式</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { Moon, Sunny } from "@element-plus/icons-vue";
import { useThemeStore } from "@/stores/theme";
import { useThemeTransition } from "@/hooks/useThemeTransition";

const themeStore = useThemeStore();
const triggerRef = ref<HTMLElement | null>(null);
const { handleThemeChange: themeTransition } = useThemeTransition();

const isDarkMode = computed(() => themeStore.currentTheme === "dark");

const handleThemeChange = async (command: "light" | "dark") => {
  await themeTransition(command, triggerRef.value);
};
</script>

<style lang="scss" scoped>
.theme-switch {
  cursor: pointer;

  &__trigger {
    display: flex;
    align-items: center;
    color: var(--text-primary);

    &:hover {
      background-color: transparent;
    }

    &:focus {
      outline: none;
    }

    &:active {
      background-color: transparent;
    }

    .el-icon {
      font-size: 20px;
    }
  }
}

:deep(.el-dropdown-menu__item:focus),
:deep(.el-dropdown-menu__item:not(.is-disabled):hover) {
  background: linear-gradient(
    270deg,
    rgba(230, 73, 43, 0) 0%,
    rgba(230, 73, 43, 0.13) 100%
  ) !important;
  color: var(--text-primary) !important;
}

:deep(.el-dropdown) {
  outline: none !important;
  border: none !important;

  .el-dropdown-selfdefine:focus {
    outline: none !important;
    border-color: transparent !important;
    box-shadow: none !important;
  }

  .el-dropdown-selfdefine:hover {
    border-color: transparent !important;
  }
}
</style>
