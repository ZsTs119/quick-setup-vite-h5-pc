<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>

<template>
  <svg :class="svgClass" aria-hidden="true" v-on="emit">
    <use :xlink:href="`#icon-${props.iconClass}`" />
  </svg>
</template>

<script setup>
import { computed } from "vue";

// 从props定义中获取iconClass和className属性
const props = defineProps({
  iconClass: {
    type: String,
    required: true,
  },
  className: {
    type: String,
    default: "",
  },
});

// 使用计算属性来定义svgClass
const svgClass = computed(() => {
  return props.className ? `svg-icon ${props.className}` : "svg-icon";
});

// 获取上下文中的emit函数
const emit = defineEmits();
</script>
