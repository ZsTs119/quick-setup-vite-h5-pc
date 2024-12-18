// 用户模块相关接口
import axiosInstance from '@/utils/http'
import type { UserInfo, RequestData } from './types'

// 定义登录方式枚举
export enum LoginType {
  QRCode = 'qrcode',
  Phone = 'phone'
}

// 定义不同登录方式的参数类型
interface PhoneLoginParams {
  phone: string
  code: string
}

interface QRCodeLoginParams {
  qrCode: string
}

// 注册参数类型
interface RegisterParams {
  username: string
  password: string
  email: string
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
 * 二维码登录
 */
export const qrcodeLogin = (params: QRCodeLoginParams) => {
  const requestData: RequestData<QRCodeLoginParams> = {
    parameter: params
  }
  return axiosInstance.post<LoginResponse>('/api/user/qrcode-login', requestData)
}

/**
 * 获取手机验证码
 */
export const getPhoneCode = (phone: string) => {
  return axiosInstance.post('/api/user/send-code', {
    parameter: { phone }
  })
}

/**
 * 获取登录二维码
 */
export const getLoginQRCode = () => {
  return axiosInstance.get('/api/user/qrcode')
}

/**
 * 用户注册
 * @param params 注册参数
 */
export const register = (params: RegisterParams) => {
  const requestData: RequestData<RegisterParams> = {
    parameter: params
  }
  return axiosInstance.post<UserInfo>('/api/user/register', requestData)
}
// 其他用户相关接口... 