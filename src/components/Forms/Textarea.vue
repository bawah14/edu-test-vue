<template>
  <div>
    <label v-if="label" class="text-sm text-neutral-700 font-medium mb-1 inline-block">{{ label }}</label>
    <textarea
      v-bind="$attrs"
      @input="$emit('input', $event.target.value)"
      :class="[{ 'is-invalid': hasErrors, 'bg-grey cursor-not-allowed text-neutral-300': disabled }]"
      class="px-3 py-3 focus:outline-none focus:ring focus:ring-primary-500 border border-neutral-300 w-full rounded-lg resize-none h-36"
      :disabled="disabled"
      v-on:keyup.enter="action()"
    ></textarea>
    <span class="text-xs text-gray-500 leading-tight inline-block mt-1" v-if="notes">{{ notes }}</span>
    <transition name="fade" mode="out-in">
      <div class="text-system-error text-left mt-1 text-sm" v-if="error">{{ error }}</div>
    </transition>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    notes: String,
    disabled: Boolean,
    label: String,
    error: {
      type: String,
      default: ''
    },
    withIcon: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    hasErrors() {
      return !!this.errors
    }
  },
  methods: {
    action() {
      this.$emit('enter')
    }
  }
}
</script>
<style lang="scss" scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}
</style>
