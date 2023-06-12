<template>
  <button @click="handleClick" :class="[buttonSize, buttonType, { disabled: disabled }]" class="font-medium rounded border transition-all flex gap-2 items-center justify-center" :disabled="disabled">
    <component :is="icon" v-if="icon" />
    {{ buttonText }}
  </button>
</template>
<script>
export default {
  props: {
    buttonText: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'primary'
    },
    size: {
      type: String,
      default: 'regular'
    },
    icon: Function
  },
  data: () => ({
    buttonClass: {
      primary: 'bg-blue text-white border-blue hover:bg-blue-500 hover:border-blue-500',
      secondary: 'bg-transparent border-blue text-blue hover:border-blue-500 hover:text-blue-500',
      delete: 'bg-system-error text-white border-system-error'
    },
    buttonCLassSize: {
      full: 'w-full py-2 px-6',
      regular: 'py-2 px-6',
      small: 'py-1 px-3',
      big: 'text-base py-3 px-6',
      big_full: 'w-full text-base py-3 px-6',
      compact: 'text-xs py-2 px-4'
    }
  }),
  computed: {
    buttonType() {
      return this.buttonClass[this.type]
    },
    buttonSize() {
      return this.buttonCLassSize[this.size]
    }
  },
  methods: {
    handleClick() {
      this.$emit('action')
    }
  }
}
</script>
<style lang="scss" scoped>
.disabled {
  background-color: #d6d6d6;
  color: #fff;
  border-color: #d6d6d6;
  cursor: not-allowed;
}
</style>
