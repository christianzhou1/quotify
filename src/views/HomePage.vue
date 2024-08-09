<template>
  <div class="home-page" v-if="quote">
    <h1>Home Page</h1>
    <p>{{ quote[0].quote }}</p>
    <p>- {{ quote[0].author }}</p>
  </div>
</template>
<script>
// import _ from 'lodash'

export default {
  data() {
    return {
      quote: null,
      apiKey: import.meta.env.VITE_X_API_KEY,
      category: 'happiness',
      refreshInterval: 60 * 1000
    }
  },
  methods: {
    async fetchQuote(category) {
      const lastFetch = localStorage.getItem('lastFetch')
      const cachedData = localStorage.getItem('quote')
      if (lastFetch && Date.now() - lastFetch < this.refreshInterval && cachedData) {
        this.quote = JSON.parse(cachedData)
        console.log('using cached data', this.quote)
        return
      }
      try {
        const response = await fetch(`https://api.api-ninjas.com/v1/quotes?category=${category}`, {
          headers: {
            'X-Api-Key': this.apiKey
          }
        })
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await response.json()
        this.quote = data
        localStorage.setItem('lastFetch', Date.now())
        localStorage.setItem('quote', JSON.stringify(data))
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
