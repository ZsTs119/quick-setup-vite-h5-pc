// 定义通用的请求/响应类型
import { BaseRequestData } from '@/utils/http'

// 通用请求类型
export type RequestData<T = Record<string, any>> = BaseRequestData & {
  parameter?: T
}
// 用户模块相关类型
export interface UserInfo {
  id: number
  username: string
  role: string
  [key: string]: any
}



// 其他模块类型...