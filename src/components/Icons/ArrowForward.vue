<template>
  <div :class="`arrow ${direction}`">
    <svg :height="`${height}px` || '20px'" :width="`${width}px` || '20px'" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.5625 1.25L16.3125 8L9.5625 14.75M15.375 8H1.6875" stroke="#58595B" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  </div>
</template>
<script>
export default {
  props: {
    direction: {
      type: String,
      default: 'right'
    },
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
<style lang="scss" scoped>
.arrow {
  display: inline-block;
  line-height: 0;
}
.down {
  transform: rotate(90deg);
}
.up {
  transform: rotate(-90deg);
}
.left {
  transform: rotate(-180deg);
}
.right {
  transform: none;
}
</style>
