import { streamRequest } from "@/utils/http";

//流式返回类型
export interface StreamResponse<T> {
    requestUrl: string
    params: Record<string, any>
    onChunk: (chunk: any) => void
    onComplete: () => void
    onError: (error: any) => void
    signal: AbortSignal
}

export const streamScript = (params: StreamResponse<any>) => {
    return streamRequest(params.requestUrl, params.params, params.onChunk, params.onComplete, params.onError, params.signal)
}