<template>
  <div class="dropdown bg-white">
    <div class="selector">
      <div class="relative" @click.stop="toggle($event)" ref="dropdown">
        <div class="cursor-pointer block p-3 text-neutral-700">
          <span v-if="placeholderText" class="placeholder">{{ placeholderText }}</span>
          <template v-else>
            <span v-if="optionLabel">{{ selected[optionLabel] }}</span>
            <span v-else>{{ selected }}</span>
          </template>
        </div>
        <span class="drop-arrow absolute right-3 top-1/2 transform -translate-y-1/2 leading-0" :class="{ expanded: visible }">
          <Chevron direction="down" width="14" height="14" />
        </span>
      </div>
      <div :class="{ hidden: !visible, visible }" class="content">
        <ul>
          <li class="p-3 text-neutral-700 hover:bg-neutral-200 cursor-pointer">
            <Search />
            <input type="text" />
          </li>
          <li
            class="p-3 text-neutral-700 hover:bg-neutral-200 cursor-pointer"
            :class="{ 'bg-neutral-200': item === selected }"
            v-for="(item, index) in options"
            @click="select(item)"
            :key="'option-' + index"
          >
            <span v-if="optionLabel">{{ item[optionLabel] }}</span>
            <span v-else>{{ item }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'aselect',
  components: {
    Chevron: () => import(/* webpackChunkName: "Icons" */ '@/components/Icons/Chevron'),
    Search: () => import(/* webpackChunkName: "Icons" */ '@/components/Icons/Search')
  },
  props: {
    options: {
      type: Array,
      default: () => []
    },
    optionLabel: {
      type: String,
      default: null
    },
    defaultValue: {
      required: false,
      default: null
    },
    borderEnabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: 'Pilih'
    }
  },
  data() {
    return {
      selected: this.defaultValue ? this.defaultValue : '',
      visible: false,
      placeholderText: this.defaultValue ? null : this.placeholder
    }
  },
  watch: {
    defaultValue() {
      this.placeholderText = this.defaultValue ? null : this.placeholder
      this.selected = this.defaultValue ? this.defaultValue : ''
    }
  },
  methods: {
    toggle(e) {
      console.log(e.target.parentElement)
      console.dir(this.$refs.dropdown)
      this.visible = true
      this.resetScroll()
    },
    close(e) {
      if (this.$el !== e.target && !this.$el.contains(e.target)) {
        this.visible = false
        this.resetScroll()
      }
    },
    resetScroll() {
      const el = document.querySelector('.content')
      el.scrollTop = 0
    },
    select(option) {
      this.selected = option
      this.placeholderText = null
      this.$emit('input', option)
    }
  },
  mounted() {
    this.$emit('input', this.selected)
  },
  created() {
    document.addEventListener('click', this.close)
  },
  beforeDestroy() {
    document.removeEventListener('click', this.close)
  }
}
</script>
<style lang="scss" scoped>
.dropdown {
  width: 100%;
  .selector {
    border: 1px solid #ced5de;
    border-radius: 8px;
    background: #fff;
    position: relative;
    z-index: 1;
    .drop-arrow {
      transition-duration: 0.3s;
      transition-timing-function: cubic-bezier(0.59, 1.39, 0.37, 1.01);
    }
    .expanded {
      transform: rotateZ(180deg) translateY(7px);
    }
  }
  ul {
    width: 100%;
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
  .content {
    border: 1px solid #ced5de;
    max-height: 200px;
    overflow-y: auto;
    width: 100%;
    position: absolute;
    z-index: 1;
    background: #fff;
  }
}
.placeholder {
  color: #9ca3af;
}
</style>
