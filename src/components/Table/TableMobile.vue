<template>
  <div class="mobile-table"></div>
</template>
<script>
export default {
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    list: {
      type: Array,
      default: () => []
    }
  }
}
</script>
<style lang="scss"></style>
