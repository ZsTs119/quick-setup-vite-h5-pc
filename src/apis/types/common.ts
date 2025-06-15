// 定义通用的请求/响应类型
import { BaseRequestData } from '@/utils/http'

// 通用请求类型
export type RequestData<T = Record<string, any>> = BaseRequestData & {
  parameter?: T
}