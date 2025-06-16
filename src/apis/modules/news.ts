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
 * 由于API可能不稳定，这里直接返回模拟数据
 * 实际项目中应该通过后端代理请求第三方API
 */
export const fetchNewsHeadlines = async () => {
  try {
    // 在实际项目中，这里应该使用真实的API请求
    // 由于API可能不稳定，这里直接返回模拟数据进行演示

    // 模拟一个网络请求延迟
    await new Promise(resolve => setTimeout(resolve, 800));

    // 返回模拟数据
    return {
      pagination: {
        limit: 10,
        offset: 0,
        count: 10,
        total: 100
      },
      data: [
        {
          title: '科技巨头推出全新AI芯片，性能提升300%',
          description: '据报道，全球领先的科技公司今日发布了新一代人工智能芯片，相比上一代产品，性能提升高达300%，能耗却降低了50%。该芯片将广泛应用于云计算、自动驾驶和智能手机等领域。',
          url: 'https://example.com/tech-news/1',
          source: '科技日报',
          image: 'https://picsum.photos/800/400?random=1',
          category: '科技',
          language: 'zh',
          country: 'CN',
          published_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() // 2小时前
        },
        {
          title: '全球最大电动汽车制造商宣布新能源战略',
          description: '全球最大电动汽车制造商今日宣布了未来五年的新能源战略，计划投资500亿美元用于电池研发和充电基础设施建设，目标是到2025年将电动汽车的续航里程提升至1000公里。',
          url: 'https://example.com/auto-news/1',
          source: '汽车世界',
          image: 'https://picsum.photos/800/400?random=2',
          category: '汽车',
          language: 'zh',
          country: 'CN',
          published_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString() // 5小时前
        },
        {
          title: '研究发现：每天喝咖啡可能延长寿命',
          description: '一项涉及超过50万人的长期研究表明，每天适量饮用咖啡的人群平均寿命比不喝咖啡的人长3-5年。研究者认为，咖啡中的抗氧化物质可能是关键因素。',
          url: 'https://example.com/health-news/1',
          source: '健康时报',
          image: 'https://picsum.photos/800/400?random=3',
          category: '健康',
          language: 'zh',
          country: 'CN',
          published_at: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString() // 8小时前
        },
        {
          title: '世界经济论坛：全球经济将迎来新一轮增长',
          description: '世界经济论坛最新报告指出，尽管面临通胀和地缘政治挑战，全球经济有望在下半年迎来新一轮增长，特别是新兴市场国家将成为主要推动力。',
          url: 'https://example.com/finance-news/1',
          source: '经济观察报',
          image: 'https://picsum.photos/800/400?random=4',
          category: '财经',
          language: 'zh',
          country: 'CN',
          published_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString() // 12小时前
        },
        {
          title: '人工智能帮助发现新抗生素，可对抗超级细菌',
          description: '科学家利用人工智能技术从数百万种化合物中筛选出一种全新抗生素，实验表明它能有效对抗目前已知的所有超级细菌，这一突破有望解决全球抗生素耐药性危机。',
          url: 'https://example.com/science-news/1',
          source: '科学前沿',
          image: 'https://picsum.photos/800/400?random=5',
          category: '科学',
          language: 'zh',
          country: 'CN',
          published_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() // 1天前
        },
        {
          title: '全球气候变化会议达成新协议，196国承诺减排',
          description: '在为期两周的全球气候变化大会上，196个国家达成了新的减排协议，承诺到2030年将碳排放量减少50%，发达国家还将为发展中国家提供气候资金支持。',
          url: 'https://example.com/environment-news/1',
          source: '环球时报',
          image: 'https://picsum.photos/800/400?random=6',
          category: '环境',
          language: 'zh',
          country: 'CN',
          published_at: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString() // 1.5天前
        },
        {
          title: '新研究：深度睡眠对大脑健康至关重要',
          description: '最新神经科学研究发现，深度睡眠阶段对于清除大脑中的代谢废物和毒素至关重要，长期睡眠质量差可能导致阿尔茨海默症等神经退行性疾病风险增加。',
          url: 'https://example.com/health-news/2',
          source: '医学周刊',
          image: 'https://picsum.photos/800/400?random=7',
          category: '健康',
          language: 'zh',
          country: 'CN',
          published_at: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString() // 2天前
        },
        {
          title: '量子计算取得突破，成功模拟复杂分子结构',
          description: '科学家使用最新的量子计算机成功模拟了一种复杂蛋白质的分子结构，这一突破将加速新药研发并可能彻底改变材料科学和化学工业。',
          url: 'https://example.com/tech-news/2',
          source: '量子科技报道',
          image: 'https://picsum.photos/800/400?random=8',
          category: '科技',
          language: 'zh',
          country: 'CN',
          published_at: new Date(Date.now() - 60 * 60 * 60 * 1000).toISOString() // 2.5天前
        },
        {
          title: '考古学家在埃及发现5000年前古城遗址',
          description: '考古学家在埃及尼罗河三角洲地区发现了一座有5000年历史的古城遗址，出土了大量陶器、工具和珠宝，这一发现将帮助研究人员更好地了解古埃及早期文明。',
          url: 'https://example.com/archaeology-news/1',
          source: '历史探索',
          image: 'https://picsum.photos/800/400?random=9',
          category: '历史',
          language: 'zh',
          country: 'CN',
          published_at: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString() // 3天前
        },
        {
          title: '新型可降解塑料问世，21天完全分解为水和二氧化碳',
          description: '科学家研发出一种革命性的可降解塑料，在自然环境中仅需21天即可完全分解为水和二氧化碳，不产生微塑料。这种材料有望替代传统塑料，大幅减少海洋塑料污染。',
          url: 'https://example.com/environment-news/2',
          source: '创新科技日报',
          image: 'https://picsum.photos/800/400?random=10',
          category: '环境',
          language: 'zh',
          country: 'CN',
          published_at: new Date(Date.now() - 96 * 60 * 60 * 1000).toISOString() // 4天前
        }
      ]
    };
  } catch (error) {
    console.error('获取新闻失败:', error);

    // 发生错误时返回简化的模拟数据
    return {
      pagination: { limit: 10, offset: 0, count: 5, total: 5 },
      data: Array(5).fill(0).map((_, i) => ({
        title: `模拟新闻标题 ${i + 1}`,
        description: '由于API请求失败，这是一条模拟的新闻描述。实际使用时，应正确配置API密钥和请求参数。',
        url: 'https://example.com',
        source: '模拟来源',
        image: 'https://picsum.photos/800/400?random=' + (i + 1),
        category: '技术',
        language: 'zh',
        country: 'CN',
        published_at: new Date().toISOString()
      }))
    };
  }
} 