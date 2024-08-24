import type { QuoteArray } from '~/types/quote'

export default defineEventHandler(async (event) => {
  try {
    const response: QuoteArray = await $fetch('https://zenquotes.io/api/random')
    return response
  }
  catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'
    return { error: errorMessage }
  }
})
