import { ElMessage } from 'element-plus'
import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { generateSignature } from '@/utils'
import { getClientId } from '@/utils/device'
import { useTokenStore } from '@/stores/token'
import { useUserStore } from '@/stores/user'
import { debounce } from 'lodash-es'
import router from '@/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 配置 NProgress
NProgress.configure({
  easing: "ease", // 动画方式
  speed: 500, // 递增进度条的速度
  showSpinner: false, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3, // 初始化时的最小百分比
});


// 添加自定义样式
const style = document.createElement('style')
style.textContent = `
  #nprogress .bar {
    background: #e6492b !important; /* 使用CSS变量，支持主题切换 */
    height: 3px;
  }
  #nprogress .spinner-icon {
    border-top-color: #e6492b;
    border-left-color: #e6492b;
  }
  #nprogress .peg {
    box-shadow: none;
  }
`
document.head.appendChild(style)

// 定义请求参数基础接口
interface BaseRequestData {
  platform?: string
  reqTime?: number
  requestId?: string
  sign?: string
  token?: string
  clientId?: string
  parameter?: Record<string, any>
}

// 定义响应数据接口
interface ApiResponse<T = any> {
  result: T
  requestId: string | null,
  errorMessages: string | null,
  errorCode: string | null | number,
  success: boolean
}

// 创建请求实例
const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_NODE_ENV === 'development' ? import.meta.env.VITE_TEST_URL : import.meta.env.VITE_PRO_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
})

// 检测是否为移动设备
const isMobileDevice = () => {
  return window.innerWidth < 768; // 小于768px认为是移动设备
};

// 清除对象中的空值
const cleanEmptyValues = (obj: Record<string, any>): void => {
  Object.keys(obj).forEach(key => {
    if (obj[key] == null || obj[key] === undefined || obj[key] === '') {
      delete obj[key]
    }
  })
}

// 防抖的错误提示函数
const debouncedErrorMessage = debounce((message: string) => {
  ElMessage.error(message)
}, 800)

// 请求拦截器
axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const { url, data } = config
    if (isMobileDevice()) {
      NProgress.start()
    }

    // 清除无用参数
    if (data) {
      cleanEmptyValues(data)
    }

    // 获取 token 信息
    const tokenStore = useTokenStore()
    const requestData: BaseRequestData = {
      ...config.data,
      platform: 'web',
      reqTime: Math.floor(Date.now() / 1000),
      requestId: uuidv4(),
      clientId: await getClientId()
    }

    // 添加认证信息
    if (tokenStore.token) {
      requestData.token = tokenStore.token
    }

    // 添加签名，使用整个 requestData 对象
    requestData.sign = generateSignature(requestData)

    // 更新请求数据
    config.data = requestData

    console.log(`[${url}：请求信息]`, config)
    return config
  },
  (error) => {
    if (isMobileDevice()) {
      NProgress.done()
    }
    return Promise.reject(error)
  }
)

// 响应拦截器
axiosInstance.interceptors.response.use(
  <T>(response: AxiosResponse<ApiResponse<T>>) => {
    if (isMobileDevice()) {
      NProgress.done()
    }
    const { result, errorMessages, errorCode, success } = response.data

    console.log(`[${response.config.url}：响应信息]`, response)
    if (!success) {
      if (errorCode == 10001) {
        // token 过期，清除用户信息并跳转到登录页
        const userStore = useUserStore()
        userStore.logout()
        router.push({
          path: '/login'
        })
      } else if (errorCode !== 10002) {
        // 对于 errorCode 10002 静默处理
        debouncedErrorMessage(errorMessages || '请求失败')
      }
      return Promise.reject(new Error(errorMessages || '请求失败'))
    }
    return result

  },
  (error) => {
    if (isMobileDevice()) {
      NProgress.done()
    }
    const message = error.response?.data?.message || error.response?.data?.errorMessages || '系统正在升级中...'
    console.error('API Error:', message)
    debouncedErrorMessage(message)
    return Promise.reject(error)
  }
)

// 创建流式请求方法
export const streamRequest = async <T>(
  url: string,
  params: Record<string, any> = {},
  onChunk: (chunk: any) => void,
  onComplete?: () => void,
  onError?: (error: any) => void,
  signal?: AbortSignal
) => {
  const tokenStore = useTokenStore()

  // 构建请求数据，保持与普通请求相同的签名逻辑
  const requestData: BaseRequestData = {
    platform: 'web',
    reqTime: Math.floor(Date.now() / 1000),
    requestId: uuidv4(),
    clientId: await getClientId(),
    parameter: params
  }

  // 添加认证信息
  if (tokenStore.token) {
    requestData.token = tokenStore.token
  }

  // 添加签名
  requestData.sign = generateSignature(requestData)

  try {
    if (isMobileDevice()) {
      NProgress.start()
    }

    // 使用fetch API代替axios处理流式响应
    const response = await fetch(`${import.meta.env.VITE_NODE_ENV === 'development' ? import.meta.env.VITE_TEST_URL : import.meta.env.VITE_PRO_URL}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Accept': 'text/event-stream'
      },
      body: JSON.stringify(requestData),
      signal // 添加signal参数用于取消请求
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    if (!response.body) {
      throw new Error('ReadableStream not supported')
    }

    // 获取响应流
    const reader = response.body.getReader()
    const decoder = new TextDecoder('utf-8')

    // 读取数据流
    while (true) {
      const { done, value } = await reader.read()
      if (done) {
        onComplete?.()
        break
      }

      // 解码并处理数据块
      const chunk = decoder.decode(value, { stream: true })
      onChunk(chunk)
    }
    if (isMobileDevice()) {
      NProgress.done()
    }
  } catch (error) {
    if (isMobileDevice()) {
      NProgress.done()
    }

    // 检查是否是取消请求导致的错误，不向用户显示
    if (error.name === 'AbortError') {
      console.log('请求被用户取消');
      onError?.(error);
      return;
    }

    console.error('Stream API Error:', error)
    const message = error.response?.data?.errorMessages || '系统正在升级中...'
    console.error('API Error:', message)
    debouncedErrorMessage(message)
    onError?.(error)
    return Promise.reject(error)
  }
}


// 导出类型
export type { ApiResponse, BaseRequestData }
// 导出实例
export default axiosInstance
