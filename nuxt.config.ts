import type { NuxtPage } from 'nuxt/schema'
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@pinia/nuxt","@ant-design-vue/nuxt"],
  css: ['~/assets/scss/_sets.scss'],
  devServer: {
    port: 3002,
  },
  runtimeConfig: {
    public: {
      apiServer: process.env.apiServer,
      baseUrl: process.env.baseUrl
    }
  },
  hooks: {
    'pages:extend' (pages) {
      function setMiddleware (pages: NuxtPage[]) {
        for (const page of pages) {
          if (true) {
            page.meta ||= {}
            page.meta.middleware = ['auth']
          }
          if (page.children) {
            setMiddleware(page.children)
          }
        }
      }
      setMiddleware(pages)
    }
  },
})