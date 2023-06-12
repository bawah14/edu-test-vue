<template>
  <svg viewBox="0 0 24 24" :height="`${height}px` || '24px'" :width="`${width}px` || '24px'" :class="`fill-current  text-${color}`">
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M3.38672 2.50781H20.6133C21.0987 2.50781 21.4922 2.90131 21.4922 3.38672V20.6133C21.4922 21.0987 21.0987 21.4922 20.6133 21.4922H3.38672C2.90131 21.4922 2.50781 21.0987 2.50781 20.6133V3.38672C2.50781 2.90131 2.90131 2.50781 3.38672 2.50781ZM0.75 3.38672C0.75 1.9305 1.9305 0.75 3.38672 0.75H20.6133C22.0695 0.75 23.25 1.9305 23.25 3.38672V20.6133C23.25 22.0695 22.0695 23.25 20.6133 23.25H3.38672C1.9305 23.25 0.75 22.0695 0.75 20.6133V3.38672ZM15.6914 4.70508H8.30859V6.46289H15.6914V4.70508Z"
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
      default: '24'
    },
    height: {
      type: String,
      default: '24'
    }
  }
}
</script>
