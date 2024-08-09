<template>
  <div>
    <div class="home-page" v-if="quote">
      <h1>Home Page</h1>
      <select id="select-category" v-model="category" @change="onCategoryChange">
        <option v-for="cat in categories" :key="cat" :value="cat">
          {{ cat.charAt(0).toUpperCase() + cat.slice(1) }}
        </option>
      </select>
      <div v-if="quote && quote.length">
        <p>{{ quote[0].quote }}</p>
        <p>
          <strong>- {{ quote[0].author }}</strong>
        </p>
      </div>
      <div v-else>
        <p>Loading...</p>
      </div>
      <button @click="generateRandomCategory()">Generate a quote in a random category</button>
    </div>
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
      refreshInterval: 60 * 1000,
      categories: [
        'age',
        'alone',
        'amazing',
        'anger',
        'architecture',
        'art',
        'attitude',
        'beauty',
        'best',
        'birthday',
        'business',
        'car',
        'change',
        'communication',
        'computers',
        'cool',
        'courage',
        'dad',
        'dating',
        'death',
        'design',
        'dreams',
        'education',
        'environmental',
        'equality',
        'experience',
        'failure',
        'faith',
        'family',
        'famous',
        'fear',
        'fitness',
        'food',
        'forgiveness',
        'freedom',
        'friendship',
        'funny',
        'future',
        'god',
        'good',
        'government',
        'graduation',
        'great',
        'happiness',
        'health',
        'history',
        'home',
        'hope',
        'humor',
        'imagination',
        'inspirational',
        'intelligence',
        'jealousy',
        'knowledge',
        'leadership',
        'learning',
        'legal',
        'life',
        'love',
        'marriage',
        'medical',
        'men',
        'mom',
        'money',
        'morning',
        'movies',
        'success'
      ]
    }
  },
  methods: {
    async fetchQuote(category) {
      const lastFetchKey = `lastFetch_${category}`
      const quoteKey = `quote_${category}`
      const lastFetch = localStorage.getItem(lastFetchKey)
      const cachedData = localStorage.getItem(quoteKey)
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
        console.log('fetched quote', this.quote)
        localStorage.setItem(quoteKey, JSON.stringify(this.quote))
        localStorage.setItem(lastFetchKey, Date.now())
      } catch (error) {
        console.error(error)
      }
    },
    onCategoryChange() {
      localStorage.setItem('selectedCategory', this.category)
      this.fetchQuote(this.category)
    },
    generateRandomCategory() {
      const randomIndex = Math.floor(Math.random() * this.categories.length)
      const randomCategory = this.categories[randomIndex]

      // Only fetch if the random category is different from the current one
      if (randomCategory !== this.category) {
        this.category = randomCategory
        console.log('random category', randomCategory)
        localStorage.setItem('selectedCategory', this.category)
        this.fetchQuote(this.category)
      }
    }
  },
  /* watch: {
    category(newCategory) {
      this.fetchQuote(newCategory)
    }
  }, */

  mounted() {
    const savedCategory = localStorage.getItem('selectedCategory')
    if (savedCategory) {
      console.log('using saved category', savedCategory)
      this.category = savedCategory // Set the category to the saved value
    }
    this.fetchQuote(this.category) // Fetch the quote for the current category
  }
}
</script>
