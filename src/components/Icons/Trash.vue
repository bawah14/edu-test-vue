<template>
  <svg :height="`${height}px`" :width="`${width}px`" :class="`fill-current  text-${color}`" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M7.50032 0.833496H12.5003C13.4208 0.833496 14.167 1.57969 14.167 2.50016V3.3335H16.667C17.5875 3.3335 18.3337 4.07969 18.3337 5.00016V6.66683C18.3337 7.5873 17.5875 8.3335 16.667 8.3335H16.6002L15.8337 17.5002C15.8337 18.4206 15.0875 19.1668 14.167 19.1668H5.83366C4.91318 19.1668 4.16699 18.4206 4.16987 17.5694L3.40021 8.3335H3.33366C2.41318 8.3335 1.66699 7.5873 1.66699 6.66683V5.00016C1.66699 4.07969 2.41318 3.3335 3.33366 3.3335H5.83366V2.50016C5.83366 1.57969 6.57985 0.833496 7.50032 0.833496ZM3.33366 5.00016H5.83366H14.167H16.667V6.66683H3.33366V5.00016ZM5.0724 8.3335H14.928L14.1699 17.431L14.167 17.5002H5.83366L5.0724 8.3335ZM12.5003 2.50016V3.3335H7.50033V2.50016H12.5003Z"
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
