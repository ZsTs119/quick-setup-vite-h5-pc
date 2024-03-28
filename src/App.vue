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
</template>

<script lang="ts" setup name="App">
import { onMounted } from "vue";
import { showMessage } from "@/utils";
onMounted(() => {
  showMessage({
    content: "我是默认弹窗",
    type: "success",
    callback: function () {
      console.log("我是完成的回调函数");
    },
  });
});
</script>
