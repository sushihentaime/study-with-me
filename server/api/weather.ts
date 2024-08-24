import type { WeatherResponse } from '~/types/weather'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const { lat, lon } = query

  try {
    const config = useRuntimeConfig(event)
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${config.openWeatherApiKey}`
    const response: WeatherResponse = await $fetch(url)
    return response
  }
  catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'
    return { error: errorMessage }
  }
})
