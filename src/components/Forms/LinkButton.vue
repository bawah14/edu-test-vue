<template>
  <router-link
    :to="!disabled ? url : ''"
    class="whitespace-nowrap text-center inline-block font-medium rounded border transition-all"
    :class="[buttonSize, buttonType, { disabled: disabled }]"
    v-if="isInternal"
  >
    {{ buttonText }}
  </router-link>
  <a
    :href="!disabled ? url : ''"
    target="_blank"
    class="text-center whitespace-nowrap inline-block font-medium rounded border transition-all"
    :class="[buttonSize, buttonType, { disabled: disabled }]"
    v-else
  >
    {{ buttonText }}</a
  >
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
    url: {
      required: true
    },
    linkType: {
      type: String,
      default: 'internal'
    },
    size: {
      type: String,
      default: 'regular'
    }
  },
  data: () => ({
    buttonClass: {
      primary: 'bg-blue text-white border-blue hover:bg-blue-500 hover:border-blue-500',
      secondary: 'bg-transparent border-blue text-blue hover:border-blue-500 hover:text-blue-500',
      tertiary: ''
    },
    buttonCLassSize: {
      full: 'w-full py-2 px-6 text-base',
      regular: 'py-2 px-6 text-base',
      small: 'py-1 px-3 text-sm',
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
    },
    isInternal() {
      return this.linkType === 'internal'
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
