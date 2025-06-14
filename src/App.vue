<style lang="scss" scoped>
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
  <div v-if="loading">Loading...</div>
  <pre v-if="data">{{ data }}</pre>
  <div v-if="error" style="color: red">{{ error }}</div>
</template>

<script lang="ts" setup name="App">
import { userApi } from "@/apis";
const data = ref(null);
const loading = ref(false);
const error = ref(null);
let bSwitch = ref(true);
onMounted(() => {
  loading.value = true;
  error.value = null;
  try {
    userApi
      .phoneLogin({ phone: "111", code: "2222" })
      .then((response) => {
        console.log("Data:", response);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  } catch (err: any) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
});
</script>
