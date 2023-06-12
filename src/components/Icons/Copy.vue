<template>
  <svg :height="`${height}px`" :width="`${width}px`" :class="`fill-current  text-${color}`" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M8.33332 1.6665H16.6667C17.6269 1.6665 18.3333 2.37293 18.3333 3.33317V11.6665C18.3333 12.6267 17.6269 13.3332 16.6667 13.3332H13.3333V16.6665C13.3333 17.6267 12.6269 18.3332 11.6667 18.3332H3.33332C2.37309 18.3332 1.66666 17.6267 1.66666 16.6665V8.33317C1.66666 7.37293 2.37309 6.6665 3.33332 6.6665H6.66666V3.33317C6.66666 2.37293 7.37309 1.6665 8.33332 1.6665ZM6.66666 8.33317H3.33332V16.6665H11.6667V13.3332H8.33332C7.37309 13.3332 6.66666 12.6267 6.66666 11.6665V8.33317ZM8.33332 3.33317V11.6665H16.6667V3.33317H8.33332Z"
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
