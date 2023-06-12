<template>
  <div class="custom-select" :tabindex="tabindex" @blur="handleBlur($event)">
    <div class="selected cursor-pointer block p-3 text-neutral-700" :class="{ open: open }" @click="open = !open">
      <span v-if="placeholderText" class="placeholder">{{ placeholderText }}</span>
      <template v-else>
        <span v-if="optionLabel">{{ selected[optionLabel] }}</span>
        <span v-else>{{ selected }}</span>
      </template>
      <span class="drop-arrow absolute right-3 top-1/2 transform -translate-y-1/2 leading-0" :class="{ expanded: open }">
        <Chevron direction="down" width="14" height="14" />
      </span>
    </div>
    <div class="content" :class="{ selectHide: !open }">
      <div class="p-4 bg-neutral-200 shadow-border-b flex gap-2 items-center" v-if="enableSearch">
        <span class="flex-shrink-0"><Search width="16" height="16"/></span>
        <input type="text" class="w-full bg-transparent outline-none border-none text-sm" placeholder="Cari" v-on:keyup.enter="search()" v-model="searchKeyword" />
      </div>
      <template v-if="options && options.length > 0">
        <div v-for="(option, i) of options" :key="i" class="p-3 text-neutral-700 hover:bg-neutral-200 cursor-pointer" :class="{ 'bg-neutral-200': option === selected }" @click="selectItem(option)">
          <span v-if="optionLabel">{{ option[optionLabel] }}</span>
          <span v-else>{{ option }}</span>
        </div>
      </template>
      <template v-else>
        <span class="flex justify-center items-center py-2 text-neutral-500 text-sm">No data is available</span>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    Chevron: () => import(/* webpackChunkName: "Icons" */ '@/components/Icons/Chevron'),
    Search: () => import(/* webpackChunkName: "Icons" */ '@/components/Icons/Search')
  },
  props: {
    enableSearch: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: 'Pilih'
    },
    optionLabel: {
      type: String,
      default: null
    },
    options: [Array, null],
    default: {
      required: false,
      default: null
    },
    tabindex: {
      type: Number,
      required: false,
      default: 0
    }
  },
  data() {
    return {
      selected: this.default ? this.default : null,
      open: false,
      placeholderText: this.default ? null : this.placeholder,
      searchKeyword: ''
    }
  },
  watch: {
    default() {
      this.placeholderText = this.default ? null : this.placeholder
      this.selected = this.default ? this.default : ''
    }
  },
  mounted() {
    this.$emit('input', this.selected)
  },
  methods: {
    handleBlur(event) {
      if (!event.currentTarget.contains(event.relatedTarget)) {
        this.open = false
      } else {
        this.open = true
      }
    },
    selectItem(option) {
      this.selected = option
      this.open = false
      this.placeholderText = null
      this.$emit('input', option)
      this.$emit('change', option)
    },
    search() {
      this.$emit('search', this.searchKeyword)
    }
  }
}
</script>

<style lang="scss" scoped>
.custom-select {
  position: relative;
  width: 100%;
  text-align: left;
  outline: none;
}

.custom-select .selected {
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid #ced5de;
  position: relative;
  cursor: pointer;
  user-select: none;
  z-index: 1;
  .drop-arrow {
    transition-duration: 0.3s;
    transition-timing-function: cubic-bezier(0.59, 1.39, 0.37, 1.01);
  }
  .expanded {
    transform: rotateZ(180deg) translateY(7px);
  }
  &.open {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
}

.selectHide {
  display: none;
}
.placeholder {
  color: #9ca3af;
}
.content {
  border: 1px solid #ced5de;
  max-height: 250px;
  overflow-y: auto;
  width: 100%;
  position: absolute;
  z-index: 10;
  background: #fff;
  margin-top: -1px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}
</style>
