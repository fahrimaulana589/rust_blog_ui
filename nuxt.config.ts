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
  nitro:{
    prerender:{
      routes:[
        '/',
        '/blog',
        '/portofolio',
        '/project',
      ],
      crawlLinks: false,
    }
  },
  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:8080',
    },
  },
})
