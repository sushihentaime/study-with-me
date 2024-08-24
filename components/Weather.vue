<template>
  <div v-draggable="'weather'">
    <div
      v-if="weather"
      class="weather-container"
    >
      <h2 class="weather-title">
        {{ weather.name }}
      </h2>
      <div class="weather-info">
        <img
          :src="`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`"
          :alt="weather.weather[0].description"
          class="weather-icon"
        >
        <p class="weather-description">
          {{ weather.weather[0].description }}
        </p>
        <p class="weather-temp">
          {{ (weather.main.temp - 273.15).toFixed(0) }}°C
        </p>
      </div>
    </div>
    <div
      v-else
      class="loading-container"
    >
      <p>Loading...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { WeatherResponse } from '~/types/weather'

defineProps({
  weather: {
    type: Object as PropType<WeatherResponse | null>,
    required: true,
  },
})
</script>

<style scoped>
h2, p {
  margin: 0;
  padding: 0;
}

.weather-container {
  background-color: rgba(30, 30, 30, 0.8);
  color: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 200px;
  text-align: center;
  margin: 20px auto;
}

.weather-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 10px;
}

.weather-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

.weather-icon {
  width: 100px;
  height: 100px;
}

.weather-description {
  font-size: 1.2rem;
  text-transform: capitalize;
  color: #ccc;
}

.weather-temp {
  font-size: 2rem;
  font-weight: 700;
  color: #ffca28;
}

.loading-container {
  text-align: center;
  font-size: 1.2rem;
  color: #fff;
}
</style>
