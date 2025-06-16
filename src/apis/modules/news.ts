// 新闻模块相关接口
import axiosInstance from '@/utils/http'
import type { RequestData } from '../types/common'

// 新闻列表参数类型
export interface NewsParams {
  limit?: number
  category?: string
}

// 新闻项类型
export interface NewsItem {
  title: string
  description: string
  url: string
  source: string
  image?: string
  category: string
  language: string
  country: string
  published_at: string
}

// 新闻列表响应类型
export interface NewsResponse {
  pagination: {
    limit: number
    offset: number
    count: number
    total: number
  }
  data: NewsItem[]
}

/**
 * 获取新闻列表
 * @param params 新闻查询参数
 * @returns 新闻列表数据
 */
export const getNewsList = (params: NewsParams = {}) => {
  const requestData: RequestData<NewsParams> = {
    parameter: params
  }
  return axiosInstance.post<NewsResponse>('/api/news/list', requestData)
}

/**
 * 模拟新闻API请求
 * 由于我们使用的是第三方API，这个方法直接返回Promise，不经过项目的axios实例
 * 实际项目中应该通过后端代理请求第三方API
 */
export const fetchNewsHeadlines = async () => {
  try {
    // 使用Mediastack API (参考public-apis仓库)
    const apiKey = '3a3d5bed9ff0a8635ee5c1dd28c6c9cf'; // 注意：实际项目中不应该硬编码API密钥
    const response = await fetch(`https://api.mediastack.com/v1/news?access_key=${apiKey}&languages=zh,en&limit=10`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('获取新闻失败:', error);
    throw error;
  }
} 