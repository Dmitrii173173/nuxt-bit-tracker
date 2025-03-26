<template>
  <div class="container">
    <h1>Bit-Tracker API Backend</h1>
    <p>API доступен по следующим эндпоинтам:</p>
    <ul>
      <li>
        <a href="/api/ticker" target="_blank">/api/ticker</a> - Получить данные одного тикера
      </li>
      <li>
        <a href="/api/tickers" target="_blank">/api/tickers</a> - Получить данные нескольких тикеров
      </li>
    </ul>
    <div v-if="ticker" class="ticker-example">
      <h2>Пример данных:</h2>
      <pre>{{ JSON.stringify(ticker, null, 2) }}</pre>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ticker: null
    }
  },
  async mounted() {
    try {
      this.ticker = await this.$http.$get('/api/ticker')
    } catch (error) {
      console.error('Ошибка при загрузке данных:', error)
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  max-width: 800px;
  padding: 20px;
  font-family: Arial, sans-serif;
}
.ticker-example {
  margin-top: 20px;
  padding: 15px;
  background-color: #f5f5f5;
  border-radius: 5px;
}
pre {
  background-color: #eee;
  padding: 10px;
  border-radius: 5px;
  overflow: auto;
}
</style> 