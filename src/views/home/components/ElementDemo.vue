<template>
  <div class="element-demo">
    <h2 class="component-title">Element Plus 组件展示</h2>

    <div class="demo-section">
      <h3 class="section-title">基础按钮</h3>
      <div class="component-row">
        <el-button>默认按钮</el-button>
        <el-button type="primary">主要按钮</el-button>
        <el-button type="success">成功按钮</el-button>
        <el-button type="info">信息按钮</el-button>
        <el-button type="warning">警告按钮</el-button>
        <el-button type="danger">危险按钮</el-button>
      </div>
    </div>

    <div class="demo-section">
      <h3 class="section-title">标签</h3>
      <div class="component-row">
        <el-tag>标签一</el-tag>
        <el-tag type="success">标签二</el-tag>
        <el-tag type="info">标签三</el-tag>
        <el-tag type="warning">标签四</el-tag>
        <el-tag type="danger">标签五</el-tag>
      </div>
    </div>

    <div class="demo-section">
      <h3 class="section-title">表单元素</h3>
      <div class="component-row form-elements">
        <el-input
          v-model="inputValue"
          placeholder="请输入内容"
          class="form-item"
        ></el-input>
        <el-select v-model="selectValue" placeholder="请选择" class="form-item">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-date-picker
          v-model="dateValue"
          type="date"
          placeholder="选择日期"
          class="form-item"
        ></el-date-picker>
      </div>
      <div class="component-row">
        <el-switch v-model="switchValue" class="form-item"></el-switch>
        <el-rate v-model="rateValue" class="form-item"></el-rate>
        <el-color-picker
          v-model="colorValue"
          class="form-item"
        ></el-color-picker>
      </div>
    </div>

    <div class="demo-section">
      <h3 class="section-title">卡片 & 进度条</h3>
      <el-card class="demo-card">
        <template #header>
          <div class="card-header">
            <span>卡片标题</span>
            <el-button type="text">操作按钮</el-button>
          </div>
        </template>
        <div class="card-content">
          <p>卡片内容区域</p>
          <el-progress :percentage="50" class="progress-item"></el-progress>
          <el-progress
            :percentage="80"
            status="success"
            class="progress-item"
          ></el-progress>
          <el-progress
            :percentage="25"
            status="warning"
            class="progress-item"
          ></el-progress>
          <el-progress
            :percentage="100"
            status="exception"
            class="progress-item"
          ></el-progress>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

// 表单数据
const inputValue = ref("");
const selectValue = ref("");
const dateValue = ref("");
const switchValue = ref(true);
const rateValue = ref(3);
const colorValue = ref("#409EFF");

// 选择器选项
const options = [
  { value: "option1", label: "选项1" },
  { value: "option2", label: "选项2" },
  { value: "option3", label: "选项3" },
  { value: "option4", label: "选项4" },
  { value: "option5", label: "选项5" },
];
</script>

<style scoped lang="scss">
.element-demo {
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

    .component-row {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      margin-bottom: 20px;
      align-items: center;
    }

    .form-elements {
      .form-item {
        min-width: 200px;
      }
    }

    .demo-card {
      .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .card-content {
        .progress-item {
          margin-bottom: 16px;
        }
      }
    }
  }
}
</style>
