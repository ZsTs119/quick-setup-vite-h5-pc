<template>
  <el-dialog
    v-model="dialogVisible"
    title="用户登录"
    width="400px"
    :close-on-click-modal="false"
    :show-close="true"
  >
    <el-form
      ref="formRef"
      :model="loginForm"
      :rules="loginRules"
      label-width="80px"
      class="login-form"
    >
      <el-form-item label="用户名" prop="username" style="margin-bottom: 10px">
        <el-input
          v-model="loginForm.username"
          placeholder="请输入用户名"
          :prefix-icon="User"
        />
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input
          v-model="loginForm.password"
          type="password"
          placeholder="请输入密码"
          :prefix-icon="Lock"
          @keyup.enter="handleLogin"
        />
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="handleLogin" :loading="loading">
          登录
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import { User, Lock } from "@element-plus/icons-vue";
import { ElMessage, ElForm } from "element-plus";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";
import { useTokenStore } from "@/stores/token";
import axios from "axios";

// 定义Props
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});

// 定义事件
const emit = defineEmits(["update:visible", "login-success"]);

// 表单引用
const formRef = ref<InstanceType<typeof ElForm>>();

// 表单数据
const loginForm = reactive({
  username: "",
  password: "",
});

// 表单验证规则
const loginRules = {
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    {
      min: 3,
      max: 20,
      message: "用户名长度应在3-20个字符之间",
      trigger: "blur",
    },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 20, message: "密码长度应在6-20个字符之间", trigger: "blur" },
  ],
};

// 状态
const loading = ref(false);

// 计算属性 - 对话框可见性
const dialogVisible = computed({
  get: () => props.visible,
  set: (val) => emit("update:visible", val),
});

// 获取store和router
const userStore = useUserStore();
const tokenStore = useTokenStore();
const router = useRouter();

// 关闭对话框
const closeDialog = () => {
  dialogVisible.value = false;
};

// 登录处理
const handleLogin = async () => {
  if (!formRef.value) return;

  await formRef.value.validate(async (valid) => {
    if (!valid) return;

    loading.value = true;

    try {
      // 使用JSONPlaceholder API模拟登录
      // 由于JSONPlaceholder没有真正的登录API，这里使用users接口模拟
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/users?username=${loginForm.username}`
      );

      if (response.data && response.data.length > 0) {
        const user = response.data[0];

        // 模拟生成token
        const token = `token-${Date.now()}-${Math.random()
          .toString(36)
          .substring(2, 15)}`;

        // 存储用户信息和token
        userStore.setUserInfo({
          id: user.id,
          username: user.username,
          email: user.email,
          name: user.name,
        });

        tokenStore.setToken(token);

        ElMessage.success("登录成功");

        // 发出登录成功事件
        emit("login-success");

        // 关闭对话框
        closeDialog();

        // 跳转到首页
        router.push("/");
      } else {
        ElMessage.error("用户名或密码错误");
      }
    } catch (error) {
      console.error("登录失败:", error);
      ElMessage.error("登录失败，请稍后重试");
    } finally {
      loading.value = false;
    }
  });
};
</script>

<style lang="scss" scoped>
.login-form {
  margin-top: 20px;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>
