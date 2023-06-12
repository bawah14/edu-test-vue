<template>
  <svg :height="`${height}px` || '18px'" :width="`${width}px` || '16px'" :class="`fill-current  text-${color}`" viewBox="0 0 18 16" fill="none">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M0 0.5V3.5H18V0.5H0ZM0 9.5V6.5H18V9.5H0ZM0 15.5V12.5H18V15.5H0Z" />
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
      default: '18'
    },
    height: {
      type: String,
      default: '16'
    }
  }
}
</script>
