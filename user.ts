// 用户模块相关接口
import axiosInstance from '@/utils/http'
import type { UserInfo, RequestData } from './types'

// 定义登录请求参数类型
interface LoginParams {
  username: string
  password: string
}

/**
 * 用户登录
 * @param params 登录参数
 */
export const login = (params: LoginParams) => {
  // 使用 RequestData 包装请求参数
  const requestData: RequestData<LoginParams> = {
    parameter: params
  }
  return axiosInstance.post<UserInfo>('/api/user/login', requestData)
}

/**
 * 用户注册
 * @param params 注册参数
 */
export const register = (params: LoginParams & { email: string }) => {
  const requestData: RequestData<LoginParams & { email: string }> = {
    parameter: params
  }
  return axiosInstance.post<UserInfo>('/api/user/register', requestData)
}

// 其他用户相关接口... 