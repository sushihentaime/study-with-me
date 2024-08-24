// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  runtimeConfig: {
    openWeatherApiKey: process.env.WEATHER_API_KEY,
  },
  modules: ['@nuxt/eslint', '@pinia/nuxt'],
  eslint: {
    config: {
      stylistic: true,
    },
  },
  css: ['~/assets/css/main.css'],
})
