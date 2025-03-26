export default {
  // Режим Nuxt (универсальный или SPA)
  // mode: 'universal',
  
  // Порт для бэкенда
  server: {
    port: process.env.PORT || 3001, // Теперь будет использоваться PORT из окружения или 3001 как запасной вариант
    host: '0.0.0.0'
  },

  // Конфигурация для серверного рендеринга
  serverMiddleware: [
    { path: '/api', handler: '~/api/index.js' }
  ],

  // Базовая конфигурация
  head: {
    title: 'Backend API',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ]
  },

  // Модули
  modules: [
    '@nuxt/http',
  ],
  
  // Сборка
  build: {
    // Тут можно настроить опции сборки
  }
} 