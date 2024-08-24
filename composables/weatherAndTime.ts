import type { WeatherResponse } from '~/types/weather'

export default function useWeatherAndTime() {
  const weatherData: Ref<WeatherResponse | null> = ref(null)
  const time: Ref<Date> = ref(new Date())

  const fetchWeather = async () => {
    try {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords
          const { data } = await useFetch<WeatherResponse>(`/api/weather`, {
            query: {
              lat: latitude,
              lon: longitude,
            },
          })
          weatherData.value = data.value
        },
        (error) => {
          console.error('Geolocation error:', error)
        },
      )
    }
    catch (error) {
      console.error('Error fetching weather:', error)
    }
  }

  const backgroundImage: ComputedRef<string> = computed(() => {
    if (!weatherData.value && time.value) {
      const hours = time.value.getHours()
      return hours >= 6 && hours < 18 ? '/image/day-no-rain.mp4' : '/wallpaper/night-no-rain.mp4'
    }

    const weather = weatherData.value?.weather[0].icon

    switch (weather) {
      case '01d' || '02d' || '03d' || '04d' || '13d' || '50d':
        return '/image/day-no-rain.mp4'
      case '09d' || '10d' || '11d':
        return '/image/day-rain.mp4'
      case '01n' || '02n' || '03n' || '04n' || '13n' || '50n':
        return '/image/night-no-rain.mp4'
      case '09n' || '10n' || '11n':
        return '/image/night-rain.mp4'
      default:
        return '/image/day-no-rain.mp4'
    }
  })

  return {
    weatherData,
    fetchWeather,
    backgroundImage,
  }
}
