<template>
  <div class="carousel-splide">
    <splide :options="options">
      <splide-slide v-for="(item, index) in slides" :key="index">
        <slot name="content" :item="item" :index="index" />
      </splide-slide>
    </splide>
  </div>
</template>
<script>
import { Splide, SplideSlide } from '@splidejs/vue-splide'
import '@splidejs/splide/dist/css/themes/splide-default.min.css'
export default {
  components: {
    Splide,
    SplideSlide
  },
  props: {
    options: {
      type: Object
    },
    slides: {
      type: Array
    }
  }
}
</script>
<style lang="scss" scoped>
.carousel-splide {
  &::v-deep .splide__slide {
    text-align: center;
    & img {
      display: inline-block;
    }
  }
  &::v-deep .splide__pagination {
    position: relative;
    left: 0;
    transform: none;
    width: 100%;
    bottom: 0;
    margin-top: 36px;
    @media screen and (max-width: 767px) {
      margin-top: 16px;
    }
  }
  &::v-deep .splide__pagination__page {
    background-color: transparent;
    border: 1px solid #ccc;
    opacity: 1;
    width: 8px;
    height: 8px;
    margin: 3px 6px;
    @media screen and (max-width: 767px) {
      width: 8px;
      height: 8px;
      margin: 3px 4px;
    }
    &.is-active {
      background: #59c8c1;
      border-color: #59c8c1;
      transform: none;
    }
  }
}
</style>
