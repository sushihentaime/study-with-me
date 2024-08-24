<template>
  <div class="app-container">
    <video
      :src="backgroundImage"
      autoplay
      muted
      loop
      class="background-video"
    />
    <div class="content">
      <Quote />
      <Note />
      <Pomodoro />
      <TodoList />
      <Weather :weather="weatherData" />
    </div>
  </div>
</template>

<script setup lang="ts">
const { weatherData, fetchWeather, backgroundImage } = weatherAndTime()

onMounted(async () => {
  await fetchWeather()
})
</script>

<style scoped>
.app-container {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.background-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
}

.content {
  position: relative;
  z-index: 1;
}
</style>
