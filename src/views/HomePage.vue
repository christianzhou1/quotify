<template>
  <div class="home-page" v-if="quote">
    <h1>Home Page</h1>
    <p>{{ quote[0].quote }}</p>
    <p>- {{ quote[0].author }}</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      quote: null,
      apiKey: import.meta.env.VITE_X_API_KEY,
      category: 'happiness'
    }
  },
  methods: {
    async fetchQuote(category) {
      try {
        const response = await fetch(`https://api.api-ninjas.com/v1/quotes?category=${category}`, {
          headers: {
            'X-Api-Key': this.apiKey
          }
        })
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        this.quote = await response.json()
      } catch (error) {
        console.error(error)
      }
    }
  },
  mounted() {
    this.fetchQuote(this.category)
  }
}
</script>
