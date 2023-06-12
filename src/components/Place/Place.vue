<template>
  <div>
    <input type="text" v-model="location" />
    <ul>
      <li v-for="(result, i) in searchResults" :key="i">{{ result }} // list of all places</li>
    </ul>
  </div>
</template>
<script>
export default {
  data: () => ({
    location: '',
    searchResults: [],
    service: null // will reveal this later 🕵️
  }),
  metaInfo() {
    return {
      script: [
        {
          src: `https://maps.googleapis.com/maps/api/js?key=AIzaSyB1odTCP46WYchzizHJuT28iRT4Cu9YdBA&libraries=places`,
          async: true,
          defer: true,
          callback: () => this.MapsInit() // will declare it in methods
        }
      ]
    }
  },
  methods: {
    MapsInit() {
      this.service = new window.google.maps.places.AutocompleteService()
      console.log('here', this.service)
    },
    displaySuggestions(predictions, status) {
      if (status !== window.google.maps.places.PlacesServiceStatus.OK) {
        this.searchResults = []
        return
      }
      this.searchResults = predictions.map(prediction => prediction.description)
    }
  },
  watch: {
    location(newValue) {
      if (newValue) {
        if (!this.service) {
          this.MapsInit()
        }
        this.service.getPlacePredictions(
          {
            input: this.location,
            types: ['(cities)']
          },
          this.displaySuggestions
        )
      }
    }
  }
}
</script>
