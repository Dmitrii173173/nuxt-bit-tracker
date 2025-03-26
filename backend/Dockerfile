FROM node:16-alpine

# Создаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm ci

# Копируем исходный код
COPY . .

# Собираем приложение
RUN npm run build

# Устанавливаем переменные окружения
ENV HOST=0.0.0.0
ENV PORT=3001

# Открываем порт
EXPOSE 3001

# Запускаем сервер
CMD [ "npm", "start" ] 