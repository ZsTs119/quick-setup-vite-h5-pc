/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_NODE_ENV: string;
    readonly VITE_APP_TITLE: string;
    readonly VITE_APP_MODE: string;
    readonly VITE_API_BASE_URL: string;
    readonly VITE_PRO_URL: string;
    readonly VITE_TEST_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}

declare module 'vue' {
    import { ComponentCustomProperties } from 'vue'
    interface ComponentCustomProperties {
        // 全局属性声明
    }
}

declare module 'pinia' { }
declare module 'pinia-plugin-persistedstate' { } 