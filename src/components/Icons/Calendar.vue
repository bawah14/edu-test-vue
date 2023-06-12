<template>
  <svg :height="`${height}px`" :width="`${width}px`" :class="`fill-current  text-${color}`" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M5.6665 3.99999H3.99984V3.16666H2.33317V5.66666H15.6665V3.16666H13.9998V3.99999H12.3332V3.16666H5.6665V3.99999ZM15.6665 7.33332H2.33317V15.6667H15.6665V7.33332ZM12.3332 1.49999H5.6665V0.666656H3.99984V1.49999H2.33317C1.4127 1.49999 0.666504 2.24618 0.666504 3.16666V15.6667C0.666504 16.5871 1.4127 17.3333 2.33317 17.3333H15.6665C16.587 17.3333 17.3332 16.5871 17.3332 15.6667V3.16666C17.3332 2.24618 16.587 1.49999 15.6665 1.49999H13.9998V0.666656H12.3332V1.49999ZM6.49984 10.6667H4.83317V8.99999H6.49984V10.6667ZM8.1665 10.6667H9.83317V8.99999H8.1665V10.6667ZM13.1665 10.6667H11.4998V8.99999H13.1665V10.6667ZM4.83317 14H6.49984V12.3333H4.83317V14ZM9.83317 14H8.1665V12.3333H9.83317V14Z"
    />
  </svg>
</template>
<script>
export default {
  props: {
    color: {
      type: String,
      default: '#333'
    },
    width: {
      type: String,
      default: '18'
    },
    height: {
      type: String,
      default: '18'
    }
  }
}
</script>
