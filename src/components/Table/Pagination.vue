<template>
  <div class="flex justify-end">
    <ul class="pagination">
      <li class="pagination-item">
        <span class="flex w-8 h-8 justify-center items-center cursor-not-allowed no-underline opacity-30 text-sm" v-if="isInFirstPage">
          <img class="w-4" src="@/assets/images/icons/chevron-double-left.svg" />
        </span>
        <a v-else @click.prevent="onClickFirstPage" class="flex w-8 h-8 justify-center items-center text-sm text-gray-600 hover:bg-gray-100 no-underline" href="#" role="button" rel="prev">
          <img class="w-4" src="@/assets/images/icons/chevron-double-left.svg" />
        </a>
      </li>

      <li class="pagination-item">
        <button
          type="button"
          @click="onClickPreviousPage"
          :disabled="isInFirstPage"
          aria-label="Go to previous page"
          class="flex w-8 h-8 justify-center items-center hover:bg-gray-100 no-underline text-sm"
          :class="{ 'cursor-not-allowed opacity-30': isInFirstPage }"
        >
          <img class="w-4" src="@/assets/images/icons/chevron-left.svg" />
        </button>
      </li>

      <li v-for="page in pages" class="pagination-item" :key="page.name">
        <span class="rounded flex w-8 h-8 justify-center items-center bg-primary-500 no-underline text-white cursor-not-allowed font-bold mx-1 text-sm" v-if="isPageActive(page.name)">
          {{ page.name }}
        </span>
        <a class="rounded flex w-8 h-8 justify-center items-center hover:bg-gray-100 text-neutral-600 no-underline mx-1 text-sm" href="#" v-else @click.prevent="onClickPage(page.name)" role="button">
          {{ page.name }}
        </a>
      </li>

      <li class="pagination-item">
        <button
          type="button"
          @click="onClickNextPage"
          :disabled="isInLastPage"
          aria-label="Go to next page"
          class="rounded flex w-8 h-8 justify-center items-center hover:bg-gray-100 text-gray-600 no-underline text-sm"
          :class="{ 'cursor-not-allowed opacity-30': isInLastPage }"
        >
          <img class="w-4" src="@/assets/images/icons/chevron-right.svg" />
        </button>
      </li>

      <li class="pagination-item">
        <a
          class="rounded flex w-8 h-8 justify-center items-center hover:bg-gray-100 text-gray-600 no-underline text-sm"
          href="#"
          @click.prevent="onClickLastPage"
          rel="next"
          role="button"
          v-if="hasMorePages"
          :class="{ 'cursor-not-allowed opacity-30': isInLastPage }"
        >
          <img class="w-4" src="@/assets/images/icons/chevron-double-right.svg" />
        </a>
        <span class="rounded flex w-8 h-8 justify-center items-center hover:bg-gray-100 text-gray-600 no-underline cursor-not-allowed opacity-30 text-sm" v-else>
          <img class="w-4" src="@/assets/images/icons/chevron-double-right.svg" />
        </span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 3
    },
    totalPages: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    },
    perPage: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    },
    hasMorePages: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    startPage() {
      if (this.currentPage === 1) {
        return 1
      }
      if (this.currentPage === this.totalPages) {
        return this.totalPages - this.maxVisibleButtons + 1
      }
      return this.currentPage - 1
    },
    endPage() {
      return Math.min(this.startPage + this.maxVisibleButtons - 1, this.totalPages)
    },
    pages() {
      const range = []
      for (let i = this.startPage; i <= this.endPage; i += 1) {
        range.push({
          name: i,
          isDisabled: i === this.currentPage
        })
      }
      return range
    },
    isInFirstPage() {
      return this.currentPage === 1
    },
    isInLastPage() {
      return this.currentPage === this.totalPages
    }
  },
  methods: {
    onClickFirstPage() {
      this.$emit('pagechanged', 1)
    },
    onClickPreviousPage() {
      this.$emit('pagechanged', this.currentPage - 1)
    },
    onClickPage(page) {
      this.$emit('pagechanged', page)
    },
    onClickNextPage() {
      this.$emit('pagechanged', this.currentPage + 1)
    },
    onClickLastPage() {
      this.$emit('pagechanged', this.totalPages)
    },
    isPageActive(page) {
      return this.currentPage === page
    }
  }
}
</script>
<style lang="scss" scoped>
.pagination {
  list-style-type: none;
}

.pagination-item {
  display: inline-block;
  vertical-align: middle;
  line-height: 0;
  border-radius: 4px;
}

// .active {
//   @apply .border-t .border-b .border-l .border-blue-100 .px-3 .py-2 .bg-blue-100 .no-underline .text-blue-500 .text-sm;
// }
</style>
