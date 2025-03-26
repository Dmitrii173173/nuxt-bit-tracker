const express = require('express');
const app = express();

// Middleware для обработки JSON
app.use(express.json());

// Разрешаем CORS для фронтенда
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Эндпоинт для получения данных о криптовалюте
app.get('/ticker', (req, res) => {
  // Возвращаем данные в формате JSON
  const data = {
    symbol: 'BTC/USD',
    price: Math.random() * 50000 + 20000, // Случайная цена между 20,000 и 70,000
    time: new Date().toISOString()
  };
  
  res.json(data);
});

// Эндпоинт для получения нескольких тикеров
app.get('/tickers', (req, res) => {
  const tickers = [
    {
      symbol: 'BTC/USD',
      price: Math.random() * 50000 + 20000,
      time: new Date().toISOString()
    },
    {
      symbol: 'ETH/USD',
      price: Math.random() * 3000 + 1000,
      time: new Date().toISOString()
    },
    {
      symbol: 'BNB/USD',
      price: Math.random() * 400 + 200,
      time: new Date().toISOString()
    }
  ];
  
  res.json(tickers);
});

// Экспортируем приложение Express
module.exports = app; 