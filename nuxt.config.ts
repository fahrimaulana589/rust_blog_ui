// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: [
    "@/assets/css/app.css"
  ],
  modules: [
    '@nuxt/ui'
  ],
  vite: {
    plugins: [
      tailwindcss()
    ]
  },
  nitro: {
    preset: "cloudflare-pages"
  },
  runtimeConfig: {
    public: {
      apiBase: 'https://api_blog.projeku.qzz.io',
    },
  },
})
