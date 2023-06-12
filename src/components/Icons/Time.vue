<template>
  <svg :height="`${height}px`" :width="`${width}px`" :class="`fill-current  text-${color}`" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M6 11.5C2.96243 11.5 0.5 9.03757 0.5 6C0.5 2.96243 2.96243 0.5 6 0.5C9.03757 0.5 11.5 2.96243 11.5 6C11.5 9.03757 9.03757 11.5 6 11.5ZM6.00001 10.5C8.48529 10.5 10.5 8.48525 10.5 5.99997C10.5 3.51469 8.48529 1.49997 6.00001 1.49997C3.51472 1.49997 1.50001 3.51469 1.50001 5.99997C1.50001 8.48525 3.51472 10.5 6.00001 10.5ZM8.50002 5.50007H6.50002V3.00007H5.50002V6.50007H8.50002V5.50007Z"
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
      default: '12'
    },
    height: {
      type: String,
      default: '12'
    }
  }
}
</script>
