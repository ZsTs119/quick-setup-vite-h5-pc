<style lang="scss" scoped>
//引入inconfent个人图标库的css地址
@import "//at.alicdn.com/t/c/font_4441309_ikd12ld30xi.css";
.iconfont {
  font-size: inherit;
  color: inherit;
}
</style>
<template>
  <i class="iconfont" :class="fontName" />
</template>
<script lang="ts" setup name="icont">
import { computed, ref, getCurrentInstance } from "vue";
const instance = getCurrentInstance();
const props = defineProps<{ type: string }>();
interface FontMap {
  [key: string]: string;
}
const fontNameMap: FontMap = {
  info: "icon-info",
  success: "icon-success",
  warn: "icon-warn",
  error: "icon-error",
};
const fontName = computed(() => {
  return fontNameMap[props.type];
});
//暴露实例内部属性
defineExpose({ instance });
// console.log("icon,", instance);
// console.log("fontName", fontName.value, fontNameMap[props.type]);
</script>
