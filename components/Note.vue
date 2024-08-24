<template>
  <div v-draggable="'note'">
    <div
      ref="noteContainer"
      class="note-container"
      :style="{ backgroundColor: noteColor }"
    >
      <div class="note-header">
        <input
          v-model="noteTitle"
          placeholder="Title"
          :style="{ backgroundColor: noteColor }"
        >
        <button
          class="three-dot-button"
          @click="toggleColorPanel"
        >
          ⋮
        </button>
        <div
          v-if="showColorPanel"
          class="color-panel"
        >
          <div
            v-for="color in colors"
            :key="color"
            class="color-option"
            :style="{ backgroundColor: color }"
            @click="changeNoteColor(color)"
          />
        </div>
      </div>
      <div class="note-content">
        <textarea
          v-model="textContent"
          placeholder="Type your note..."
          :style="{ backgroundColor: noteColor }"
        />
      </div>
      <div
        class="resizer"
        @mousedown.stop="startResize"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const colors = [
  '#ffff99', // Yellow (default)
  '#ff9999', // Light Red
  '#99ff99', // Light Green
  '#9999ff', // Light Blue
  '#ffcc99', // Light Orange
  '#ff99ff', // Light Purple
]

const noteTitle = ref<string>('')
const textContent = ref<string>('')
const noteContainer = ref<HTMLDivElement | null>(null)
const noteColor = ref<string>(colors[0])
const showColorPanel = ref<boolean>(false)

const toggleColorPanel = () => {
  showColorPanel.value = !showColorPanel.value
}

const changeNoteColor = (color: string) => {
  noteColor.value = color
  showColorPanel.value = false
}

const startResize = (event: MouseEvent) => {
  event.stopPropagation()

  const container = noteContainer.value
  if (!container) return

  const startX = event.clientX
  const startY = event.clientY
  const startWidth = container.offsetWidth
  const startHeight = container.offsetHeight

  const doResize = (e: MouseEvent) => {
    container.style.width = `${startWidth + (e.clientX - startX)}px`
    container.style.height = `${startHeight + (e.clientY - startY)}px`
  }

  const stopResize = () => {
    document.removeEventListener('mousemove', doResize)
    document.removeEventListener('mouseup', stopResize)
  }

  document.addEventListener('mousemove', doResize)
  document.addEventListener('mouseup', stopResize)
}
</script>

<style scoped>
.note-container {
  width: 300px;
  height: 200px;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow: auto;
  display: flex;
  flex-direction: column;
  position: absolute;
}

.note-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  position: relative;
}

.note-header input {
  width: 100%;
  padding: 10px;
  border: none;
  font-family: inherit;
  font-size: 1em;
  box-sizing: border-box;
  outline: none;
}

.note-content {
  flex: 1;
  display: flex;
}

textarea {
  width: 100%;
  height: 100%;
  padding: 10px;
  border: none;
  font-family: inherit;
  font-size: 1em;
  box-sizing: border-box;
  resize: none;
  outline: none;
}

textarea::-webkit-scrollbar {
  width: 4px;
}

textarea::-webkit-scrollbar-track {
  background: #ffff99;
}

textarea::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 6px;
}

textarea::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.resizer {
  width: 16px;
  height: 16px;
  background: linear-gradient(135deg, transparent 0%, transparent 50%, #888 50%, #888 100%);
  position: absolute;
  right: 0;
  bottom: 0;
  cursor: nwse-resize;
  border-bottom-right-radius: 10px;
  opacity: 0.3;
  transition: opacity 0.3s ease;
}

.note-container:hover .resizer {
  opacity: 1;
}

.three-dot-button {
  background: none;
  border: none;
  font-size: 1.2em;
  cursor: pointer;
  padding: 0 5px;
  z-index: 2;
  position: relative;
}

.color-panel {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 5px;
  display: flex;
  flex-wrap: wrap;
  width: 120px;
  z-index: 3;
}

.color-option {
  width: 30px;
  height: 30px;
  margin: 5px;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.2s;
}

.color-option:hover {
  transform: scale(1.1);
}
</style>
