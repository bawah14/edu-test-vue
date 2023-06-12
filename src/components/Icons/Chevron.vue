<template>
  <div :class="`arrow-item ${direction}`">
    <svg version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 256 256" :height="`${height}px` || '20px'" :width="`${width}px` || '20px'">
      <g>
        <g>
          <polygon :fill="color" points="79.093,0 48.907,30.187 146.72,128 48.907,225.813 79.093,256 207.093,128" />
        </g>
      </g>
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
.arrow-item {
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
