<template>
  <div class="login-container">
    <h2>登录</h2>
    
    <!-- 登录方式切换 -->
    <div class="login-type-switch">
      <button 
        :class="{ active: loginType === LoginType.Phone }"
        @click="loginType = LoginType.Phone"
      >
        手机登录
      </button>
      <button 
        :class="{ active: loginType === LoginType.QRCode }"
        @click="loginType = LoginType.QRCode"
      >
        扫码登录
      </button>
    </div>

    <!-- 手机登录表单 -->
    <div v-if="loginType === LoginType.Phone" class="login-form">
      <input v-model="phone" type="text" placeholder="手机号" />
      <div class="code-input">
        <input v-model="code" type="text" placeholder="验证码" />
        <button 
          @click="handleSendCode" 
          :disabled="countdown > 0"
        >
          {{ countdown > 0 ? `${countdown}s` : '获取验证码' }}
        </button>
      </div>
      <button @click="handlePhoneLogin">登录</button>
    </div>

    <!-- 二维码登录 -->
    <div v-else class="qrcode-container">
      <img v-if="qrCodeUrl" :src="qrCodeUrl" alt="登录二维码" />
      <p>请使用APP扫码登录</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useTokenStore } from '@/stores/token'
import { useUserStore } from '@/stores/user'
import { 
  LoginType, 
  phoneLogin, 
  qrcodeLogin, 
  getPhoneCode, 
  getLoginQRCode,
  type LoginResponse,
  type LoginError 
} from '@/apis/user'
import { ElMessage } from 'element-plus'

const router = useRouter()
const route = useRoute()
const tokenStore = useTokenStore()
const userStore = useUserStore()

// 登录方式
const loginType = ref<LoginType>(LoginType.Phone)

// 手机登录相关
const phone = ref('')
const code = ref('')
const countdown = ref(0)
let countdownTimer: ReturnType<typeof setInterval> | null = null

// 二维码登录相关
const qrCodeUrl = ref('')
let qrCodeCheckTimer: ReturnType<typeof setInterval> | null = null

// 发送验证码
const handleSendCode = async () => {
  if (!phone.value) {
    ElMessage.warning('请输入手机号')
    return
  }
  
  try {
    const { data } = await getPhoneCode(phone.value)
    countdown.value = 60
    countdownTimer = setInterval(() => {
      if (countdown.value > 0) {
        countdown.value--
      } else {
        if (countdownTimer) {
          clearInterval(countdownTimer)
          countdownTimer = null
        }
      }
    }, 1000)
  } catch (error) {
    console.error('发送验证码失败:', error)
  }
}

// 手机登录
const handlePhoneLogin = async () => {
  if (!phone.value || !code.value) {
    ElMessage.warning('请输入手机号和验证码')
    return
  }

  try {
    const { data: result } = await phoneLogin({
      phone: phone.value,
      code: code.value
    })
    
    handleLoginSuccess(result)
  } catch (error) {
    console.error('登录失败:', error)
  }
}

// 获取二维码
const getQRCode = async () => {
  try {
    const { data: result } = await getLoginQRCode()
    qrCodeUrl.value = result.qrCodeUrl || ''
    startQRCodeCheck()
  } catch (error) {
    console.error('获取二维码失败:', error)
  }
}

// 开始轮询检查二维码状态
const startQRCodeCheck = () => {
  qrCodeCheckTimer = setInterval(async () => {
    try {
      const { data: result } = await qrcodeLogin({ qrCode: qrCodeUrl.value })
      if (result) {
        handleLoginSuccess(result)
        if (qrCodeCheckTimer) {
          clearInterval(qrCodeCheckTimer)
          qrCodeCheckTimer = null
        }
      }
    } catch (error) {
      const loginError = error as LoginError
      // 忽略未扫码的错误
      if (loginError.code !== 'NOT_SCANNED') {
        console.error('二维码登录失败:', error)
        if (qrCodeCheckTimer) {
          clearInterval(qrCodeCheckTimer)
          qrCodeCheckTimer = null
        }
      }
    }
  }, 2000)
}

// 统一处理登录成功
const handleLoginSuccess = (result: LoginResponse) => {
  tokenStore.setToken(result.token)
  tokenStore.setClientInfo(result.clientId, result.traceId)
  
  userStore.setUserInfo({
    id: result.userId,
    username: result.username
  })
  
  const redirect = route.query.redirect as string
  router.push(redirect || '/')
}

// 组件挂载时，如果是二维码登录则获取二维码
onMounted(() => {
  if (loginType.value === LoginType.QRCode) {
    getQRCode()
  }
})

// 组件卸载时清除定时器
onUnmounted(() => {
  if (countdownTimer) {
    clearInterval(countdownTimer)
    countdownTimer = null
  }
  if (qrCodeCheckTimer) {
    clearInterval(qrCodeCheckTimer)
    qrCodeCheckTimer = null
  }
})

// 在模板中使用 LoginType 枚举
// 需要显式地将 LoginType 暴露给模板
defineExpose({
  LoginType
})
</script>

<style scoped lang="scss">
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  
  .login-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 300px;
    
    input {
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    
    button {
      padding: 0.5rem;
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      
      &:hover {
        background-color: #45a049;
      }
    }
  }

  .login-type-switch {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;

    button {
      padding: 0.5rem 1rem;
      border: 1px solid #ddd;
      background: none;
      cursor: pointer;

      &.active {
        background-color: #409eff;
        color: white;
        border-color: #409eff;
      }
    }
  }

  .code-input {
    display: flex;
    gap: 0.5rem;

    input {
      flex: 1;
    }

    button {
      width: 100px;
      font-size: 0.9rem;

      &:disabled {
        background-color: #909399;
        cursor: not-allowed;
      }
    }
  }

  .qrcode-container {
    text-align: center;

    img {
      width: 200px;
      height: 200px;
      margin-bottom: 1rem;
    }

    p {
      color: #606266;
    }
  }
}
</style> 