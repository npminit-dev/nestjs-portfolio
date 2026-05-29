// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['primeicons/primeicons.css', '~/assets/css/variables.css'],
  modules: ['@nuxtjs/i18n', '@vercel/analytics'],
  i18n: {
    locales: [
      { code: 'en', iso: 'en-US', name: 'English', file: 'en.json' },
      { code: 'es', iso: 'es-ES', name: 'Español', file: 'es.json' }
    ],
    defaultLocale: 'en',
    langDir: 'locales',
    strategy: 'no_prefix',
    detectBrowserLanguage: false
  },
  runtimeConfig: {
    recaptchaSecretKey: '',
    public: {
      recaptchaSiteKey: '',
    }
  }
})
