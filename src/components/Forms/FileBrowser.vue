<template>
  <div>
    <p v-if="label" class="text-sm text-neutral-700 font-medium mb-1 inline-block">{{ label }}</p>
    <div class="relative">
      <label :for="id" v-if="button" class="label absolute right-0 p-3 cursor-pointer shadow-border-l mdmax:text-xs">{{ button }}</label>
      <div class="input pl-3 pr-24 py-3 focus:outline-none focus:ring focus:ring-primary-500 border border-neutral-300 w-full rounded-lg text-neutral-300 mdmax:text-xs">{{ selectedImage }}</div>
      <input type="file" :id="id" :accept="accept" class="absolute -z-1 opacity-0" @change="selectFile($event)" />
    </div>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  data: () => ({
    selectedImage: ''
  }),
  props: {
    disabled: Boolean,
    label: String,
    id: String,
    button: String,
    placeholder: String,
    accept: String
  },
  mounted() {
    this.selectedImage = this.placeholder
  },
  methods: {
    selectFile(event) {
      const file = event.target.files[0]
      this.selectedImage = file.name
      this.$emit('change', file)
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
.label {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 767px) {
    height: auto;
  }
}

/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}
</style>
