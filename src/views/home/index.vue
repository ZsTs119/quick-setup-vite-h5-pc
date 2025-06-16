<template>
  <div class="home-container">
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card class="welcome-card">
          <div class="user-welcome">
            <h1>欢迎回来，{{ userStore.userInfo?.username }}</h1>
            <p>您已成功登录 Quick Setup 示例系统</p>
            <el-button type="danger" @click="handleLogout" size="small"
              >退出登录</el-button
            >
          </div>
        </el-card>
      </el-col>
    </el-row>

    <h2 class="components-title">组件示例展示</h2>

    <div class="section">
      <h2 class="section-title">Element Plus 组件</h2>
      <div class="component-row">
        <el-button>默认按钮</el-button>
        <el-button type="primary">主要按钮</el-button>
        <el-button type="success">成功按钮</el-button>
        <el-button type="info">信息按钮</el-button>
        <el-button type="warning">警告按钮</el-button>
        <el-button type="danger">危险按钮</el-button>
      </div>

      <div class="component-row">
        <el-tag>标签一</el-tag>
        <el-tag type="success">标签二</el-tag>
        <el-tag type="info">标签三</el-tag>
        <el-tag type="warning">标签四</el-tag>
        <el-tag type="danger">标签五</el-tag>
      </div>

      <div class="component-row">
        <el-input v-model="inputValue" placeholder="请输入内容"></el-input>
        <el-switch v-model="switchValue" />
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">Vant 组件</h2>
      <div class="component-row">
        <van-button type="primary">主要按钮</van-button>
        <van-button type="success">成功按钮</van-button>
        <van-button type="default">默认按钮</van-button>
        <van-button type="danger">危险按钮</van-button>
        <van-button type="warning">警告按钮</van-button>
      </div>

      <div class="component-row">
        <van-switch v-model="switchValue" />
        <van-stepper v-model="stepperValue" />
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">图标组件</h2>
      <div class="icon-display">
        <div class="svg-icon-wrapper">
          <svg-icon icon-class="about" class="svg_icon" />
          <span class="icon-label">SVG图标</span>
        </div>

        <div class="iconfont-wrapper">
          <incon-fent type="info" class="iconfont" />
          <span class="icon-label">Iconfont图标</span>
        </div>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">API调用示例</h2>
      <div class="component-row">
        <el-button type="primary" @click="makeApiRequest" :loading="loading"
          >获取新闻头条</el-button
        >
        <el-button
          type="warning"
          @click="makeStreamRequest"
          :loading="streamLoading"
          >发起流式请求</el-button
        >
        <el-button
          type="danger"
          @click="cancelStreamRequest"
          :disabled="!streamLoading"
          >取消流式请求</el-button
        >
      </div>

      <!-- 新闻列表展示 -->
      <div v-if="newsData.length > 0" class="news-list">
        <h3>最新新闻</h3>
        <el-card
          v-for="(news, index) in newsData"
          :key="index"
          class="news-item"
        >
          <div class="news-header">
            <h4 class="news-title">{{ news.title }}</h4>
            <span class="news-source">{{ news.source }}</span>
          </div>
          <p class="news-description">{{ news.description }}</p>
          <div class="news-footer">
            <span class="news-category">{{ news.category }}</span>
            <span class="news-date">{{ formatDate(news.published_at) }}</span>
          </div>
          <a :href="news.url" target="_blank" class="news-link">阅读原文</a>
        </el-card>
      </div>

      <div class="code-block" v-if="apiResponse && !newsData.length">
        <h3>响应结果:</h3>
        <pre>{{ apiResponse }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";
import { newsApi } from "@/apis";
import type { NewsItem } from "@/apis/modules/news";

const router = useRouter();
const userStore = useUserStore();

// 示例数据
const inputValue = ref("");
const switchValue = ref(true);
const stepperValue = ref(1);

// API请求状态
const loading = ref(false);
const streamLoading = ref(false);
const apiResponse = ref("");
const newsData = ref<NewsItem[]>([]);

// 用于取消流式请求的控制器
const controller = new AbortController();

const handleLogout = () => {
  userStore.logout();
  router.push("/login");
};

// 格式化日期
const formatDate = (dateString: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// 发起常规API请求
const makeApiRequest = async () => {
  loading.value = true;
  apiResponse.value = "";
  newsData.value = [];

  try {
    // 使用新闻API获取新闻头条
    const response = await newsApi.fetchNewsHeadlines();
    apiResponse.value = JSON.stringify(response, null, 2);

    // 如果有数据，更新新闻列表
    if (response && response.data && Array.isArray(response.data)) {
      newsData.value = response.data;
    }
  } catch (error) {
    apiResponse.value = JSON.stringify(error, null, 2);
  } finally {
    loading.value = false;
  }
};

// 发起流式请求
const makeStreamRequest = () => {
  streamLoading.value = true;
  apiResponse.value = "";

  // 模拟流式请求，实际上使用定时器模拟数据流
  let count = 0;
  const interval = setInterval(() => {
    apiResponse.value += `模拟流式数据块 ${++count}\n`;

    if (count >= 10) {
      clearInterval(interval);
      streamLoading.value = false;
      apiResponse.value += "\n[请求完成]";
    }
  }, 500);

  // 保存清除函数以便取消
  controller.abort = () => {
    clearInterval(interval);
  };
};

// 取消流式请求
const cancelStreamRequest = () => {
  controller.abort();
  streamLoading.value = false;
  apiResponse.value += "\n[请求已取消]";
};
</script>

<style scoped lang="scss">
.home-container {
  padding: 20px;

  .welcome-card {
    margin-bottom: 30px;

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

  .components-title {
    margin: 30px 0 20px;
    padding-bottom: 10px;
    border-bottom: 2px solid var(--primary-color);
    color: var(--text-primary);
  }

  .section {
    margin-bottom: 30px;

    .section-title {
      font-size: 18px;
      margin-bottom: 16px;
      padding-bottom: 8px;
      border-bottom: 1px solid var(--border-light);
      color: var(--text-primary);
    }

    .component-row {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      margin-bottom: 20px;
      align-items: center;
    }

    .code-block {
      background-color: var(--bg-color-secondary);
      padding: 16px;
      border-radius: 4px;
      margin-top: 16px;

      pre {
        margin: 0;
        white-space: pre-wrap;
        color: var(--text-regular);
      }
    }
  }

  .icon-display {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 20px;

    .svg-icon-wrapper,
    .iconfont-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;

      .svg_icon,
      .iconfont {
        position: relative;
        font-size: 35px;
        color: var(--primary-color);
      }

      .icon-label {
        margin-top: 8px;
        font-size: 12px;
      }
    }
  }

  // 新闻列表样式
  .news-list {
    margin-top: 20px;

    h3 {
      margin-bottom: 16px;
      color: var(--text-primary);
    }

    .news-item {
      margin-bottom: 16px;
      transition: transform 0.3s;

      &:hover {
        transform: translateY(-3px);
      }

      .news-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 8px;

        .news-title {
          margin: 0;
          font-size: 18px;
          color: var(--text-primary);
          flex: 1;
        }

        .news-source {
          padding: 2px 6px;
          font-size: 12px;
          border-radius: 4px;
          background-color: var(--primary-light);
          color: var(--primary-color);
        }
      }

      .news-description {
        color: var(--text-regular);
        margin: 0 0 16px;
        line-height: 1.5;
      }

      .news-footer {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        color: var(--text-secondary);
        margin-bottom: 8px;
      }

      .news-link {
        display: inline-block;
        color: var(--primary-color);
        text-decoration: none;
        font-size: 14px;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
