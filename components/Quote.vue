<template>
  <div v-draggable="'quote'">
    <div class="quote-container">
      <div
        v-if="quote"
        class="quote-content"
      >
        <blockquote>
          <p>{{ quote.q }}</p>
          <footer>— {{ quote.a }}</footer>
        </blockquote>
      </div>
      <div
        v-else
        class="loading"
      >
        Loading quote...
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { QuoteArray } from '~/types/quote'

const { data } = useFetch<QuoteArray>('/api/quotes')
const quote = computed(() => data.value?.[0])
</script>

<style scoped>
.quote-container {
  background-color: rgba(30, 30, 30, 0.8);
  color: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 385px;
  margin: 0 auto;
}

.quote-content {
  text-align: center;
}

blockquote {
  margin: 0;
  padding: 0;
}

blockquote p {
  font-size: 1.2rem;
  line-height: 1.6;
  font-weight: 500;
}

blockquote footer {
  font-size: 1rem;
  color: #4caf50;
  text-align: center;
  margin-top: 10px;
}

.loading {
  font-size: 1rem;
  text-align: center;
  color: #888;
}
</style>
