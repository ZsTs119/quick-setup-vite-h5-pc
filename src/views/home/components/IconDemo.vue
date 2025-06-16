<template>
  <div class="icon-demo">
    <h2 class="component-title">图标组件展示</h2>

    <div class="demo-section">
      <h3 class="section-title">SVG图标</h3>
      <div class="icon-grid">
        <div v-for="icon in svgIcons" :key="icon" class="icon-item">
          <div class="icon-wrapper">
            <svg-icon :icon-class="icon" />
          </div>
          <span class="icon-name">{{ icon }}</span>
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h3 class="section-title">Iconfont图标</h3>
      <div class="icon-grid">
        <div v-for="icon in iconfontTypes" :key="icon" class="icon-item">
          <div class="icon-wrapper">
            <incon-fent :type="icon" />
          </div>
          <span class="icon-name">{{ icon }}</span>
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h3 class="section-title">图标尺寸与颜色</h3>
      <div class="size-demo">
        <div class="size-row">
          <div v-for="size in iconSizes" :key="size" class="size-item">
            <svg-icon icon-class="user" :style="{ fontSize: `${size}px` }" />
            <span class="size-label">{{ size }}px</span>
          </div>
        </div>

        <div class="color-row">
          <div v-for="color in iconColors" :key="color.name" class="color-item">
            <svg-icon icon-class="heart" :style="{ color: color.value }" />
            <span class="color-label" :style="{ color: color.value }">{{
              color.name
            }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h3 class="section-title">图标用法示例</h3>
      <div class="usage-examples">
        <div class="example-item">
          <el-button type="primary">
            <svg-icon icon-class="plus" />
            添加内容
          </el-button>
        </div>

        <div class="example-item">
          <el-input placeholder="搜索内容">
            <template #prefix>
              <svg-icon icon-class="search" />
            </template>
          </el-input>
        </div>

        <div class="example-item">
          <el-tag>
            <svg-icon icon-class="tag" />
            标签示例
          </el-tag>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

// SVG图标列表
const svgIcons = ref(["about"]);

// Iconfont图标类型
const iconfontTypes = ref(["info", "success", "warn", "error"]);

// 图标尺寸
const iconSizes = ref([16, 24, 32, 48]);

// 图标颜色
const iconColors = ref([
  { name: "主色调", value: "var(--primary-color)" },
  { name: "成功", value: "var(--success-color, #67C23A)" },
  { name: "警告", value: "var(--warning-color, #E6A23C)" },
  { name: "危险", value: "var(--danger-color, #F56C6C)" },
  { name: "信息", value: "var(--info-color, #909399)" },
]);
</script>

<style scoped lang="scss">
.icon-demo {
  padding: 20px;

  .component-title {
    font-size: 24px;
    margin-bottom: 24px;
    color: var(--text-primary);
    border-bottom: 2px solid var(--primary-color);
    padding-bottom: 12px;
  }

  .demo-section {
    margin-bottom: 30px;

    .section-title {
      font-size: 18px;
      margin-bottom: 16px;
      color: var(--text-primary);
    }

    .icon-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
      gap: 16px;

      .icon-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
        transition: transform 0.3s;

        &:hover {
          transform: scale(1.1);
        }

        .icon-wrapper {
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: var(--bg-color-secondary);
          border-radius: 8px;
          margin-bottom: 8px;

          svg,
          i {
            font-size: 24px;
            color: var(--primary-color);
          }
        }

        .icon-name {
          font-size: 12px;
          color: var(--text-secondary);
          text-align: center;
        }
      }
    }

    .size-demo {
      margin-top: 20px;

      .size-row,
      .color-row {
        display: flex;
        flex-wrap: wrap;
        gap: 32px;
        margin-bottom: 24px;

        .size-item,
        .color-item {
          display: flex;
          flex-direction: column;
          align-items: center;

          svg {
            margin-bottom: 8px;
          }

          .size-label,
          .color-label {
            font-size: 12px;
            color: var(--text-secondary);
          }
        }
      }
    }

    .usage-examples {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;

      .example-item {
        min-width: 180px;

        svg {
          margin-right: 5px;
        }
      }
    }
  }
}
</style>
