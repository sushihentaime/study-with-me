<template>
  <div v-draggable="'pomodoro-timer'">
    <div class="pomodoro-container">
      <p>{{ currentPhase }}</p>
      <p>Remaining Period Before Long Break: {{ 3 - workCount }}</p>
      <div class="timer-display">
        <input
          v-if="!isRunning && currentPhase === phases[0]"
          v-model="editableMinutes"
          type="number"
          min="1"
          @blur="updateTimeFromEditable"
          @keyup.enter="updateTimeFromEditable"
        >
        <span v-else>{{ minutes < 10 ? '0' + minutes : minutes}}</span>
        : {{ seconds < 10 ? '0' + seconds : seconds }}
      </div>
      <div class="pomodoro-buttons">
        <button @click="startTimer">
          {{ isRunning ? 'Pause' : 'Start' }}
        </button>
        <button @click="resetTimer">
          Reset
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const defaultWorkMinutes = 25
const workMinutes = ref<number>(defaultWorkMinutes)
const shortBreakMinutes = ref<number>(5)
const longBreakMinutes = ref<number>(15)
const minutes = ref<number>(workMinutes.value)
const seconds = ref<number>(0)
const workCount = ref<number>(0)
const isRunning = ref(false)
const alarmSound = ref<HTMLAudioElement | null>(null)
let timer: ReturnType<typeof setInterval> | null = null
const phases = ['Work/Study', 'Short Break', 'Long Break']
const currentPhase = ref<string>(phases[0])
const editableMinutes = ref(workMinutes.value.toString())

watch(minutes, (newValue) => {
  if (!isRunning.value && currentPhase.value === phases[0]) {
    editableMinutes.value = newValue.toString()
  }
})

const updateTimeFromEditable = () => {
  const mins = parseInt(editableMinutes.value)
  if (!isNaN(mins) && mins >= 1 && mins <= 59) {
    minutes.value = mins
    workMinutes.value = mins
  }
  else {
    editableMinutes.value = minutes.value.toString()
  }
}

const stopAlarmSound = (): void => {
  if (alarmSound.value) {
    alarmSound.value.pause()
    alarmSound.value.currentTime = 0
  }
}

const startTimer = (): void => {
  if (isRunning.value) {
    pauseTimer()
    return
  }
  isRunning.value = true
  stopAlarmSound()
  timer = setInterval(() => {
    if (seconds.value === 0) {
      if (minutes.value === 0) {
        handlePhaseTransition()
      }
      else {
        minutes.value--
        seconds.value = 59
      }
    }
    else {
      seconds.value--
    }
  }, 1000)
}

const pauseTimer = (): void => {
  if (timer) {
    clearInterval(timer)
  }
  isRunning.value = false
}

const resetTimer = (): void => {
  if (timer) {
    clearInterval(timer)
  }
  isRunning.value = false
  minutes.value = workMinutes.value
  seconds.value = 0
}

const handlePhaseTransition = (): void => {
  clearInterval(timer!)
  isRunning.value = false
  alarmSound.value?.play()

  console.log(workCount.value)

  switch (currentPhase.value) {
    case phases[0]:
      if (workCount.value === 2) {
        currentPhase.value = phases[2]
        minutes.value = longBreakMinutes.value
        seconds.value = 0
        workCount.value = 0
      }
      else {
        currentPhase.value = phases[1]
        minutes.value = shortBreakMinutes.value
        seconds.value = 0
        workCount.value++
      }
      break
    case phases[1]:
    case phases[2]:
      currentPhase.value = phases[0]
      minutes.value = workMinutes.value
      seconds.value = 0
      break
  }
}

onMounted(() => {
  alarmSound.value = new Audio('/sound/alarm.mp3')
})
</script>

<style scoped>
.pomodoro-container {
  background-color: rgba(30, 30, 30, 0.8);
  color: #fff;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 385px;
}

.pomodoro-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.pomodoro-title {
  font-size: 1.2rem;
  font-weight: 500;
}

.pomodoro-header button {
  padding: 5px 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.timer-display {
  font-size: 3rem;
  font-weight: bold;
  text-align: center;
  margin: 20px 0;
}

.timer-display input {
  width: 70px;
  background-color: transparent;
  color: #fff;
  border: none;
  border-bottom: 2px solid #fff;
  font-size: 3rem;
  font-weight: bold;
  text-align: center;
}

/* Hide scroll bar for Chrome, Safari and Opera */
.timer-display input::-webkit-outer-spin-button,
.timer-display input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.timer-display input:focus {
  outline: none;
  border-bottom: 2px solid #4caf50;
}

.pomodoro-buttons {
  display: flex;
  justify-content: space-around;
}

.pomodoro-buttons button {
  padding: 8px 15px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.pomodoro-buttons button:disabled {
  background-color: #888;
  cursor: not-allowed;
}
</style>
