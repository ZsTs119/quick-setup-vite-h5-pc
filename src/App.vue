<style lang="scss">
@import "@/styles/transitions/theme.scss";

.home-container {
  width: 100%;
  height: 100vh;
  background: var(--bg-color);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  @include useTheme;

  .right-container {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 10px 20px;
    box-sizing: border-box;
  }
}
.iconfont {
  font-size: 30px;
  color: red;
}

.svg_icon {
  position: relative;
  font-size: 35px;
  color: blue;
}
</style>

<template>
  <div class="home-container">
    <div class="right-container">
      切换主题
      <ThemeSwitch />
    </div>

    <svg-icon icon-class="about" className="svg_icon" />
    <incon-fent type="info" />
    <hr />
    <div>
      <el-button>Default</el-button>
      <el-button type="primary">Primary</el-button>
      <el-button type="success">Success</el-button>
      <el-button type="info">Info</el-button>
      <el-button type="warning">Warning</el-button>
      <el-button type="danger">Danger</el-button>
    </div>
    <hr />
    <div>
      <van-button type="primary">主要按钮</van-button>
      <van-button type="success">成功按钮</van-button>
      <van-button type="default">默认按钮</van-button>
      <van-button type="danger">危险按钮</van-button>
      <van-button type="warning">警告按钮</van-button>
      <van-switch v-model="bSwitch" />
    </div>

    <router-view />
  </div>
</template>

<script lang="ts" setup name="App">
import ThemeSwitch from "@/components/ThemeSwitch/index.vue";
import { useThemeStore } from "@/stores/theme";
import { userApi, scriptApi } from "@/apis";

// 获取 themeStore 实例
const themeStore = useThemeStore();
let bSwitch = ref(true);
// 创建AbortController用于取消请求
const controller = new AbortController();

onMounted(() => {
  // 初始化主题
  themeStore.initTheme();
  //默认请求示例
  userApi
    .phoneLogin({ phone: "111", code: "2222" })
    .then((response) => {
      console.log("Data:", response);
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  //默认流式请求示例
  scriptApi.streamScript({
    requestUrl: "/api/seller/script/aiGenerateScript",
    params: {
      scriptId: 1,
    },
    //处理每个块
    onChunk: (chunk) => {
      console.log("Chunk:", chunk);
    },
    //处理完成
    onComplete: () => {
      console.log("Complete");
    },
    //处理错误
    onError: (error) => {
      console.error("Error:", error);
    },
    //处理信号
    signal: controller.signal,
  });

  setTimeout(() => {
    //一秒后取消流式请求
    controller.abort();
  }, 10000);
});
</script>
