import { ElMessage } from 'element-plus'
import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { generateSignature } from '@/utils'
import { useTokenStore } from '@/stores/token'
import { useUserStore } from '@/stores/user'
import router from '@/router'

// 定义请求参数基础接口
interface BaseRequestData {
  platform?: string
  reqTime?: number
  requestId?: string
  sign?: string
  token?: string
  clientId?: string
  traceId?: string
  parameter?: Record<string, any>
}

// 定义响应数据接口
interface ApiResponse<T = any> {
  code: number
  result: T
  errorMessages: string
}

// 创建请求实例
const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://interactapi.tiger-culture.com',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
})

// 清除对象中的空值
const cleanEmptyValues = (obj: Record<string, any>): void => {
  Object.keys(obj).forEach(key => {
    if (obj[key] == null || obj[key] === undefined || obj[key] === '') {
      delete obj[key]
    }
  })
}

// 请求拦截器
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const { url, data } = config

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
      requestId: uuidv4()
    }

    // 添加认证信息
    if (tokenStore.token) {
      Object.assign(requestData, {
        token: tokenStore.token,
        clientId: tokenStore.clientId,
        traceId: tokenStore.traceId
      })
    }

    // 添加签名
    requestData.sign = generateSignature(data?.parameter || {})

    // 更新请求数据
    config.data = requestData

    console.log(`[${url}：请求信息]`, config)
    return config
  },
  (error) => Promise.reject(error)
)

// 响应拦截器
axiosInstance.interceptors.response.use(
  <T>(response: AxiosResponse<ApiResponse<T>>) => {
    const { code, result, errorMessages } = response.data
    
    if (code === 10001) {
      // token 过期，清除用户信息并跳转到登录页
      const userStore = useUserStore()
      userStore.logout()
      router.push({
        path: '/login',
        query: { redirect: router.currentRoute.value.fullPath }
      })
      return Promise.reject(new Error('登录已过期，请重新登录'))
    }
    
    if (code !== 200) {
      ElMessage.error(errorMessages)
      return Promise.reject(new Error(errorMessages))
    }
    
    return result
  },
  (error) => {
    const message = error.response?.data?.errorMessages || '请求失败'
    console.error('API Error:', message)
    ElMessage.error(message)
    return Promise.reject(error)
  }
)

// 导出类型
export type { ApiResponse, BaseRequestData }
// 导出实例
export default axiosInstance
