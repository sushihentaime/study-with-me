import type { DirectiveBinding } from 'vue'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('draggable', {
    mounted(el: HTMLElement, binding: DirectiveBinding) {
      const id = binding.value || 'draggable'

      el.style.position = 'absolute'

      interface ContainerPosition {
        left: string
        top: string
      }

      // Retrieve the saved position
      const savedPosition = localStorage.getItem(`${id}-position`)
      if (savedPosition) {
        const { left, top } = JSON.parse(savedPosition) as ContainerPosition
        el.style.left = left
        el.style.top = top
      }
      else {
        el.style.left = '0px'
        el.style.top = '0px'
      }

      let startX: number, startY: number, initialMouseX: number, initialMouseY: number

      // Handle the start of dragging
      function handleMouseDown(event: MouseEvent) {
        const target = event.target as HTMLElement
        if (
          target.tagName === 'INPUT'
          || target.tagName === 'BUTTON'
          || target.tagName === 'TEXTAREA'
          || target.classList.contains('resizer')
        )
          return

        event.preventDefault()

        startX = el.offsetLeft
        startY = el.offsetTop
        initialMouseX = event.clientX
        initialMouseY = event.clientY

        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseup', handleMouseUp)
      }

      // Handle the dragging
      function handleMouseMove(event: MouseEvent) {
        const dx = event.clientX - initialMouseX
        const dy = event.clientY - initialMouseY

        el.style.left = `${startX + dx}px`
        el.style.top = `${startY + dy}px`
      }

      // Handle the end of dragging
      function handleMouseUp() {
        localStorage.setItem(
          `${id}-position`,
          JSON.stringify({
            left: el.style.left,
            top: el.style.top,
          }),
        )

        document.removeEventListener('mousemove', handleMouseMove)
      }

      // Attach the mousedown event to the element
      el.addEventListener('mousedown', handleMouseDown)
    },
    unmounted(el: HTMLElement) {
      el.removeEventListener('mousedown', () => {})
    },
  })
})
