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

</template>

<script lang="ts" setup name="App">
import { onMounted } from "vue";
import { showMessage } from "@/utils";
let bSwitch = ref(true)
onMounted(() => {
  showMessage({
    content: "我是默认弹窗",
    type: "success",
    callback: function () {
      console.log("我是完成的回调函数");
      ElMessage('This is a message.');
    },
  });
});
</script>
