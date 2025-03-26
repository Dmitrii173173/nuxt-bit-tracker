<template>
  <div class="container">
    <h1>Bit-Tracker</h1>
    
    <div v-if="loading" class="loading">
      Загрузка данных...
    </div>
    
    <div v-else-if="error" class="error">
      {{ error }}
    </div>
    
    <div v-else>
      <div class="card" v-for="ticker in tickers" :key="ticker.symbol">
        <h2>{{ ticker.symbol }}</h2>
        <div class="price">{{ formatPrice(ticker.price) }}</div>
        <div class="time">{{ formatTime(ticker.time) }}</div>
      </div>
      
      <button @click="refreshData" class="refresh-btn">Обновить данные</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tickers: [],
      loading: true,
      error: null,
      refreshInterval: null
    }
  },
  mounted() {
    this.fetchData();
    // Обновляем данные каждые 10 секунд
    this.refreshInterval = setInterval(() => {
      this.fetchData();
    }, 10000);
  },
  beforeDestroy() {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
  },
  methods: {
    async fetchData() {
      this.loading = true;
      this.error = null;
      
      try {
        // Для доступа к API сервера используем относительный URL
        const response = await fetch('/api/tickers');
        if (!response.ok) {
          throw new Error(`Ошибка HTTP: ${response.status}`);
        }
        
        this.tickers = await response.json();
      } catch (err) {
        console.error('Ошибка при получении данных:', err);
        this.error = `Не удалось загрузить данные: ${err.message}`;
      } finally {
        this.loading = false;
      }
    },
    refreshData() {
      this.fetchData();
    },
    formatPrice(price) {
      return new Intl.NumberFormat('ru-RU', { 
        style: 'currency', 
        currency: 'USD',
        maximumFractionDigits: 2
      }).format(price);
    },
    formatTime(time) {
      return new Date(time).toLocaleString('ru-RU');
    }
  }
}
</script>

<style>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h1 {
  color: #333;
  text-align: center;
  margin-bottom: 30px;
}

.card {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.card:hover {
  transform: translateY(-3px);
}

.card h2 {
  margin-top: 0;
  color: #333;
}

.price {
  font-size: 24px;
  font-weight: bold;
  color: #28a745;
  margin: 10px 0;
}

.time {
  font-size: 14px;
  color: #6c757d;
}

.loading, .error {
  text-align: center;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  margin-top: 20px;
}

.error {
  color: #dc3545;
}

.refresh-btn {
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.2s;
}

.refresh-btn:hover {
  background-color: #0069d9;
}
</style>
