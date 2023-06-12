<template>
  <svg :height="`${height}px`" :width="`${width}px`" :class="`fill-current  text-${color}`" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M2 24C2 36.1503 11.8497 46 24 46C36.1503 46 46 36.1503 46 24C46 11.8497 36.1503 2 24 2C11.8497 2 2 11.8497 2 24ZM42 24C42 33.9411 33.9411 42 24 42C14.0589 42 6 33.9411 6 24C6 14.0589 14.0589 6 24 6C33.9411 6 42 14.0589 42 24ZM24.0007 35.9967C25.1056 35.9967 26.0013 35.1013 26.0013 33.9967C26.0013 32.8921 25.1056 31.9967 24.0007 31.9967C22.8957 31.9967 22 32.8921 22 33.9967C22 35.1013 22.8957 35.9967 24.0007 35.9967ZM26.0072 11.9967H22.0059V27.9967H26.0072V11.9967Z"
    />
  </svg>
</template>
<script>
export default {
  props: {
    color: {
      type: String,
      default: '#333'
    },
    width: {
      type: String,
      default: '48'
    },
    height: {
      type: String,
      default: '48'
    }
  }
}
</script>
