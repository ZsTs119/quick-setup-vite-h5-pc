// 用户模块相关接口
import axiosInstance from '@/utils/http'
import type { RequestData } from '../types/common'
// 定义不同登录方式的参数类型
interface PhoneLoginParams {
  phone: string
  code: string
}

// 登录响应类型
export interface LoginResponse {
  token: string
  clientId: string
  traceId: string
  userId: number
  username: string
  qrCodeUrl?: string
}

// 更新错误类型
export interface LoginError {
  code: string
  message: string
}

/**
 * 手机验证码登录
 */
export const phoneLogin = (params: PhoneLoginParams) => {
  const requestData: RequestData<PhoneLoginParams> = {
    parameter: params
  }
  return axiosInstance.post<LoginResponse>('/api/user/phone-login', requestData)
}
/**
 * 获取手机验证码
 */
export const getPhoneCode = (phone: string) => {
  return axiosInstance.post('/api/user/send-code', {
    parameter: { phone }
  })
}

