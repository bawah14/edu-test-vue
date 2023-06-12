<template>
  <div class="flex justify-between">
    <ul class="flex">
      <li>
        <button @click="onPrevious()" :disabled="currentPage === 1" class="w-8 h-8 flex justify-center items-center focus:outline-none" :class="{ 'opacity-30 cursor-not-allowed': currentPage === 1 }">
          <ArrowForward direction="left" />
        </button>
      </li>
      <li v-for="(page, index) in pages" :key="'pages' + index">
        <button
          v-if="page !== DOTS"
          @click="goToPage(page)"
          class="cursor-pointer mx-1 w-8 h-8 flex justify-center items-center rounded font-semibold focus:outline-none"
          :disabled="currentPage === page"
          :class="[currentPage === page ? 'hover:bg-primary-500 bg-primary-500 text-white' : ' bg-transparent text-neutral-700 hover:bg-gray-300']"
        >
          {{ page }}
        </button>
        <span class="font-semibold inline-block mx-1" v-else>{{ page }}</span>
      </li>
      <li>
        <button
          @click="onNext()"
          :disabled="currentPage === atLastPage"
          class="w-8 h-8 flex justify-center items-center focus:outline-none"
          :class="{
            'opacity-30 cursor-not-allowed': currentPage === atLastPage
          }"
        >
          <ArrowForward direction="right" />
        </button>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'Pagination',
  props: {
    totalCount: {
      type: Number,
      default: 0
    },
    currentPage: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 1
    }
  },
  components: {
    ArrowForward: () => import(/* webpackChunkName: "Icons" */ '@/components/Icons/ArrowForward')
  },
  data: () => ({
    siblingCount: 1,
    DOTS: '...'
  }),
  computed: {
    atLastPage() {
      return this.pages[this.pages.length - 1]
    },
    totalPageCount() {
      return Math.ceil(this.totalCount / this.pageSize)
    },
    totalPageNumbers() {
      return this.siblingCount + 5
    },
    firstPageIndex() {
      return 1
    },
    lastPageIndex() {
      return this.totalPageCount
    },
    leftSiblingIndex() {
      return Math.max(this.currentPage - this.siblingCount, 1)
    },
    rightSiblingIndex() {
      return Math.min(this.currentPage + this.siblingCount, this.totalPageCount)
    },
    shouldShowLeftDots() {
      return this.leftSiblingIndex > 2
    },
    shouldShowRightDots() {
      return this.rightSiblingIndex < this.totalPageCount - 2
    },
    pages() {
      if (this.totalPageNumbers >= this.totalPageCount) {
        return this.range(1, this.totalPageCount)
      }
      if (!this.shouldShowLeftDots && this.shouldShowRightDots) {
        const leftItemCount = 3 + 2 * this.siblingCount
        const leftRange = this.range(1, leftItemCount)
        return [...leftRange, this.DOTS, this.totalPageCount]
      }
      if (this.shouldShowLeftDots && !this.shouldShowRightDots) {
        const rightItemCount = 3 + 2 * this.siblingCount
        const rightRange = this.range(this.totalPageCount - rightItemCount + 1, this.totalPageCount)
        return [this.firstPageIndex, this.DOTS, ...rightRange]
      }
      if (this.shouldShowLeftDots && this.shouldShowRightDots) {
        const middleRange = this.range(this.leftSiblingIndex, this.rightSiblingIndex)
        return [this.firstPageIndex, this.DOTS, ...middleRange, this.DOTS, this.lastPageIndex]
      }
      return true
    }
  },
  methods: {
    range(start, end) {
      const length = end - start + 1
      return Array.from({ length }, (_, idx) => idx + start)
    },
    onNext() {
      this.$emit('onPageChange', this.currentPage + 1)
    },
    onPrevious() {
      this.$emit('onPageChange', this.currentPage - 1)
    },
    goToPage(page) {
      this.$emit('onPageChange', page)
    }
  }
}
</script>
