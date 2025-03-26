export default {
  // Режим Nuxt (универсальный или SPA)
  // mode: 'universal',
  
  // Порт для бэкенда - используем переменную окружения PORT, которую предоставляет Railway
  server: {
    port: process.env.PORT || 3001, // Теперь будет использоваться PORT из окружения или 3001 как запасной вариант
    host: '0.0.0.0'
  },

  // Конфигурация для серверного рендеринга
  serverMiddleware: [
    // Добавляем маршрут для healthcheck
    { 
      path: '/api', 
      handler: (req, res, next) => {
        if (req.url === '/' || req.url === '') {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ status: 'API is running' }));
          return;
        }
        next();
      } 
    },
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