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
import { showMessage } from "@/utils";
import { userApi } from "@/apis";
import { testSignaturePerformance } from "@/utils/encrypt";
const data = ref(null);
const loading = ref(false);
const error = ref(null);
let bSwitch = ref(true);
onMounted(() => {
  showMessage({
    content: "我是默认弹窗",
    type: "success",
    callback: function () {
      console.log("我是完成的回调函数", import.meta.env);
      console.log("App Version:", __APP_VERSION__);
      ElMessage("This is a message.");
    },
  });
  loading.value = true;
  error.value = null;
  // 测试单个对象
  const testParams = {
    name: "test",
    age: 18,
    items: [1, 2, 3],
    nested: {
      a: 1,
      b: 2,
    },
    arrayObj: [
      {
        a: 22,
        b: [
          {
            c: 1121,
          },
          {
            c: 1121,
          },
          {
            c: 1211,
          },
          {
            c: 1121,
          },
          {
            c: 1121,
          },
        ],
      },
      {
        a: 222,
        b: [
          {
            c: 12211,
          },
          {
            c: 11221,
          },
          {
            c: 11221,
          },
          {
            c: 11122,
          },
          {
            c: 21211,
          },
        ],
      },
      {
        a: 2222,
        b: [
          {
            c: 12211,
          },
          {
            c: 12121,
          },
          {
            c: 21211,
          },
          {
            c: 12121,
          },
          {
            c: 12121,
          },
        ],
      },
    ],
  };

  // 执行性能测试
  testSignaturePerformance(testParams, 10000); // 测试100次
  // try {
  //   userApi
  //     .login({ username: "111", password: "2222" })
  //     .then((response) => {
  //       console.log("Data:", response);
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // } catch (err: any) {
  //   error.value = err.message;
  // } finally {
  //   loading.value = false;
  // }
});
</script>
