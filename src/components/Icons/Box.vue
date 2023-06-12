<template>
  <svg :height="`${height}px`" :width="`${width}px`" :class="`fill-current  text-${color}`" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M16.6667 15.8333V7.5C17.5872 7.5 18.3334 6.75381 18.3334 5.83333V4.16667C18.3334 3.24619 17.5872 2.5 16.6667 2.5H3.33341C2.41294 2.5 1.66675 3.24619 1.66675 4.16667V5.83333C1.66675 6.75381 2.41294 7.5 3.33341 7.5V15.8333C3.33341 16.7538 4.07961 17.5 5.00008 17.5H15.0001C15.9206 17.5 16.6667 16.7538 16.6667 15.8333ZM5.00008 15.8333V7.5H15.0001V15.8333H5.00008ZM7.50008 10V8.33333H12.5001V10H7.50008ZM3.33341 5.83333V4.16667H16.6667V5.83333H3.33341Z"
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
      default: '20'
    },
    height: {
      type: String,
      default: '20'
    }
  }
}
</script>
