<template>
  <div class="api-demo">
    <h2 class="component-title">API调用示例</h2>

    <div class="demo-section">
      <h3 class="section-title">新闻API请求</h3>
      <p class="section-desc">
        本示例演示如何发起API请求获取新闻数据，并展示返回结果。使用了项目封装的HTTP请求方法。
      </p>

      <div class="operation-panel">
        <el-button type="primary" @click="makeApiRequest" :loading="loading">
          <svg-icon icon-class="refresh" v-if="!loading" />
          获取新闻头条
        </el-button>

        <el-select
          v-model="apiLimitValue"
          placeholder="选择数量"
          style="width: 120px"
        >
          <el-option
            v-for="item in limitOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>

      <!-- 新闻列表展示 -->
      <div v-if="newsData.length > 0" class="news-list">
        <h3>最新新闻</h3>
        <el-skeleton :rows="3" animated v-if="loading" />
        <template v-else>
          <el-card
            v-for="(news, index) in newsData"
            :key="index"
            class="news-item"
            shadow="hover"
          >
            <div class="news-header">
              <h4 class="news-title">{{ news.title }}</h4>
              <span class="news-source">{{ news.source }}</span>
            </div>
            <p class="news-description">{{ news.description }}</p>
            <div class="news-footer">
              <div class="news-meta">
                <el-tag size="small" class="news-category">{{
                  news.category
                }}</el-tag>
                <span class="news-date">{{
                  formatDate(news.published_at)
                }}</span>
              </div>
              <a :href="news.url" target="_blank" class="news-link">
                阅读原文
                <el-icon><ArrowRight /></el-icon>
              </a>
            </div>
          </el-card>
        </template>
      </div>
      <el-empty v-else-if="!loading" description="暂无新闻数据" />
    </div>

    <div class="demo-section">
      <h3 class="section-title">流式API请求</h3>
      <p class="section-desc">
        本示例演示了如何发起和取消流式数据请求。流式请求适用于大量数据分块返回的场景，如聊天、实时日志等。
      </p>

      <div class="operation-panel">
        <el-button
          type="warning"
          @click="makeStreamRequest"
          :loading="streamLoading"
          :disabled="streamLoading"
        >
          <svg-icon icon-class="play" v-if="!streamLoading" />
          发起流式请求
        </el-button>
        <el-button
          type="danger"
          @click="cancelStreamRequest"
          :disabled="!streamLoading"
        >
          <svg-icon icon-class="stop" v-if="!streamLoading" />
          取消请求
        </el-button>
        <el-button type="info" @click="clearResponse" :disabled="!apiResponse">
          <svg-icon icon-class="delete" v-if="!streamLoading" />
          清空结果
        </el-button>
      </div>

      <div class="code-block" v-if="apiResponse">
        <div class="code-header">
          <h4>响应结果</h4>
          <span
            class="code-status"
            :class="{ 'status-loading': streamLoading }"
          >
            {{ streamLoading ? "接收数据中..." : "请求完成" }}
          </span>
        </div>
        <pre class="code-content">{{ apiResponse }}</pre>
      </div>
    </div>

    <div class="demo-section">
      <h3 class="section-title">API请求代码示例</h3>
      <p class="section-desc">以下是API请求的代码实现示例：</p>

      <el-tabs v-model="activeCodeTab">
        <el-tab-pane label="标准请求" name="standard">
          <div class="code-example">
            <pre>
// 发起常规API请求
const makeApiRequest = async () => {
  loading.value = true;
  try {
    // 使用新闻API获取新闻头条
    const response = await newsApi.fetchNewsHeadlines();
    
    // 处理返回的数据
    if (response && response.data && Array.isArray(response.data)) {
      newsData.value = response.data;
    }
  } catch (error) {
    console.error('获取新闻失败:', error);
  } finally {
    loading.value = false;
  }
};</pre
            >
          </div>
        </el-tab-pane>
        <el-tab-pane label="流式请求" name="stream">
          <div class="code-example">
            <pre>
// 发起流式请求
const makeStreamRequest = () => {
  streamLoading.value = true;
  apiResponse.value = "";

  // 创建AbortController用于取消请求
  const controller = new AbortController();
  
  streamRequest(
    '/api/chat/stream',
    { message: '你好', sessionId: '123' },
    (chunk) => {
      // 处理每个数据块
      apiResponse.value += chunk;
    },
    () => {
      // 完成回调
      streamLoading.value = false;
      console.log('Stream completed');
    },
    (error) => {
      // 错误回调
      streamLoading.value = false;
      console.error('Stream error:', error);
    },
    controller.signal
  );
};</pre
            >
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { newsApi } from "@/apis";
import type { NewsItem } from "@/apis/modules/news";
import { ArrowRight } from "@element-plus/icons-vue";

// 请求状态
const loading = ref(false);
const streamLoading = ref(false);
const apiResponse = ref("");
const newsData = ref<NewsItem[]>([]);
const activeCodeTab = ref("standard");
const apiLimitValue = ref(5);

// 选择器选项
const limitOptions = [
  { value: 5, label: "5条" },
  { value: 10, label: "10条" },
  { value: 20, label: "20条" },
];

// 用于取消流式请求的控制器
const controller = new AbortController();

onMounted(() => {
  // 页面加载后自动获取新闻数据
  makeApiRequest();
});

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

    // 如果有数据，更新新闻列表
    if (response && response.data && Array.isArray(response.data)) {
      // 限制显示的新闻数量
      newsData.value = response.data.slice(0, apiLimitValue.value);

      // 在控制台记录请求结果
      console.log("新闻API响应:", response);

      // 同时在响应区域显示API返回的原始JSON
      apiResponse.value = JSON.stringify(response, null, 2);
    }
  } catch (error) {
    console.error("获取新闻数据失败:", error);
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

// 清空响应结果
const clearResponse = () => {
  apiResponse.value = "";
};
</script>

<style scoped lang="scss">
.api-demo {
  padding: 20px;

  .component-title {
    font-size: 24px;
    margin-bottom: 24px;
    color: var(--text-primary);
    border-bottom: 2px solid var(--primary-color);
    padding-bottom: 12px;
  }

  .demo-section {
    margin-bottom: 40px;

    .section-title {
      font-size: 18px;
      margin-bottom: 12px;
      color: var(--text-primary);
    }

    .section-desc {
      color: var(--text-secondary);
      margin-bottom: 20px;
      line-height: 1.6;
    }

    .operation-panel {
      display: flex;
      gap: 12px;
      margin-bottom: 20px;
      flex-wrap: wrap;

      .el-button {
        display: flex;
        align-items: center;

        .svg-icon {
          margin-right: 6px;
        }
      }
    }
  }

  // 代码示例
  .code-example {
    background-color: var(--bg-color-secondary);
    border-radius: 8px;
    overflow: auto;

    pre {
      margin: 0;
      padding: 16px;
      font-family: "Courier New", Courier, monospace;
      font-size: 14px;
      line-height: 1.5;
      color: var(--text-regular);
    }
  }

  // 代码块
  .code-block {
    background-color: var(--bg-color-secondary);
    border-radius: 8px;
    margin-top: 20px;
    overflow: hidden;

    .code-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 16px;
      background-color: rgba(0, 0, 0, 0.05);

      h4 {
        margin: 0;
        font-size: 14px;
        font-weight: 500;
      }

      .code-status {
        font-size: 12px;
        padding: 4px 8px;
        border-radius: 4px;
        background-color: var(--success-color, #67c23a);
        color: white;

        &.status-loading {
          background-color: var(--warning-color, #e6a23c);
        }
      }
    }

    .code-content {
      margin: 0;
      padding: 16px;
      white-space: pre-wrap;
      font-family: "Courier New", Courier, monospace;
      font-size: 13px;
      line-height: 1.5;
      color: var(--text-regular);
      max-height: 300px;
      overflow-y: auto;
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
      border: none;
      border-radius: 8px;
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-3px);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
      }

      .news-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 12px;

        .news-title {
          margin: 0;
          font-size: 18px;
          color: var(--text-primary);
          font-weight: 600;
          flex: 1;
        }

        .news-source {
          padding: 4px 8px;
          font-size: 12px;
          border-radius: 4px;
          background-color: var(--primary-light);
          color: var(--primary-color);
          font-weight: 500;
        }
      }

      .news-description {
        color: var(--text-regular);
        margin: 0 0 16px;
        line-height: 1.6;
        font-size: 14px;
      }

      .news-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .news-meta {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .news-category {
          font-size: 12px;
        }

        .news-date {
          font-size: 12px;
          color: var(--text-secondary);
        }

        .news-link {
          display: flex;
          align-items: center;
          gap: 4px;
          color: var(--primary-color);
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.3s;

          &:hover {
            color: var(--primary-color-dark);
            gap: 8px;
          }
        }
      }
    }
  }
}
</style>
