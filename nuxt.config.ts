import type { NuxtPage } from 'nuxt/schema'
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@ant-design-vue/nuxt", "@pinia/nuxt"],
  css: ['~/assets/scss/_sets.scss'],
  devServer: {
    port: 3002, // default: 3000
  },
  runtimeConfig: {
    public: {
      apiBase: '',
      apiServer: "https://backend.scbbbb.com/",
    }
  },
  hooks: {
    'pages:extend' (pages) {
      function setMiddleware (pages: NuxtPage[]) {
        for (const page of pages) {
          if (/* some condition */ true) {
            page.meta ||= {}
            // Note that this will override any middleware set in `definePageMeta` in the page
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