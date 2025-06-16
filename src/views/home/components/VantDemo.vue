<template>
  <div class="vant-demo">
    <h2 class="component-title">Vant 组件展示</h2>

    <div class="section-intro">
      <p>
        Vant是一个轻量、可靠的移动端组件库，提供了80+高质量组件，支持TypeScript，单测覆盖率超90%。
      </p>
      <p>以下展示了Vant的常用组件和交互功能。</p>
    </div>

    <div class="demo-section">
      <h3 class="section-title">基础按钮</h3>
      <div class="component-row">
        <van-button type="primary">主要按钮</van-button>
        <van-button type="success">成功按钮</van-button>
        <van-button type="default">默认按钮</van-button>
        <van-button type="danger">危险按钮</van-button>
        <van-button type="warning">警告按钮</van-button>
      </div>

      <div class="component-row">
        <van-button plain type="primary">朴素按钮</van-button>
        <van-button plain type="success">朴素按钮</van-button>
      </div>

      <div class="component-row">
        <van-button round type="primary">圆角按钮</van-button>
        <van-button round type="success">圆角按钮</van-button>
      </div>
    </div>

    <div class="demo-section">
      <h3 class="section-title">表单元素</h3>
      <div class="component-row van-form-row">
        <van-cell-group inset>
          <van-field
            v-model="username"
            label="用户名"
            placeholder="请输入用户名"
          />
          <van-field
            v-model="password"
            type="password"
            label="密码"
            placeholder="请输入密码"
          />
        </van-cell-group>
      </div>

      <div class="component-row">
        <div class="form-item">
          <span class="item-label">开关：</span>
          <van-switch v-model="switchValue" />
        </div>
        <div class="form-item">
          <span class="item-label">步进器：</span>
          <van-stepper v-model="stepperValue" />
        </div>
        <div class="form-item">
          <span class="item-label">评分：</span>
          <van-rate v-model="rateValue" />
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h3 class="section-title">移动端组件</h3>
      <div class="component-row">
        <van-notice-bar
          left-icon="volume-o"
          text="通知栏文字：在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。"
        />
      </div>

      <div class="component-row">
        <van-tag type="primary">标签</van-tag>
        <van-tag type="success">标签</van-tag>
        <van-tag type="danger">标签</van-tag>
        <van-tag type="warning">标签</van-tag>
      </div>

      <div class="component-row">
        <van-cell-group inset>
          <van-cell title="单元格" value="内容" />
          <van-cell title="单元格" value="内容" label="描述信息" />
        </van-cell-group>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 表单数据
const username = ref("");
const password = ref("");
const switchValue = ref(true);
const stepperValue = ref(1);
const rateValue = ref(3);
</script>

<style scoped lang="scss">
.vant-demo {
  padding: 20px;

  .component-title {
    font-size: 24px;
    margin-bottom: 24px;
    color: var(--text-primary);
    border-bottom: 2px solid var(--primary-color);
    padding-bottom: 12px;
  }

  .section-intro {
    margin-bottom: 24px;

    p {
      margin: 8px 0;
      color: var(--text-secondary);
      line-height: 1.6;
    }
  }

  .demo-section {
    margin-bottom: 30px;

    .section-title {
      font-size: 18px;
      margin-bottom: 16px;
      color: var(--text-primary);
    }

    .section-desc {
      color: var(--text-secondary);
      margin-bottom: 16px;
      font-size: 14px;
    }

    .component-row {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      margin-bottom: 20px;
      align-items: center;

      .form-item {
        display: flex;
        align-items: center;
        gap: 8px;

        .item-label {
          font-size: 14px;
          color: var(--text-secondary);
          min-width: 60px;
        }
      }
    }

    .van-form-row {
      width: 100%;
      max-width: 500px;
    }

    .interaction-row {
      margin-top: 20px;
    }

    .code-example {
      background-color: var(--bg-color-secondary);
      border-radius: 8px;
      padding: 16px;
      margin: 16px 0;

      h4 {
        margin-top: 0;
        margin-bottom: 12px;
        color: var(--text-primary);
        font-size: 16px;
      }

      pre {
        margin: 0;
        padding: 0;
        white-space: pre-wrap;
        font-family: "Courier New", Courier, monospace;
        font-size: 14px;
        line-height: 1.5;
        color: var(--text-regular);
      }
    }

    .toggle-code {
      margin-top: 12px;
    }
  }
}
</style>
