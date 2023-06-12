<template>
  <transition-group name="toasts" tag="div" class="c-toasts">
    <ToastItem class="toasts-item" v-for="toast in toasts" :toast="toast" :key="toast.id" @close="removeToast" />
  </transition-group>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  components: {
    ToastItem: () => import(/* webpackChunkName: "ToastItem" */ '@/components/Toast/ToastItem')
  },
  data: () => ({
    toasts: [],
    toastID: 0
  }),
  computed: {
    ...mapGetters('common', ['toast'])
  },
  methods: {
    addToast({ type = 'info', duration = 4000, primaryText, secondaryText, callback = () => {}, icon = null }) {
      const id = this.toastID++
      this.toasts.push({ id, type, primaryText, secondaryText, icon })
      setTimeout(() => {
        this.removeToast(id)
        callback()
      }, duration)
    },
    removeToast(id) {
      this.toasts = this.toasts.filter(m => m.id !== id)
    }
  },
  watch: {
    toast(options) {
      if (options) {
        this.addToast(options)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.toasts-item {
  transition: all 0.5s;
}

.toasts-enter,
.toasts-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.toasts-leave-active {
  position: absolute;
  z-index: -1;
}
.c-toasts {
  position: fixed;
  top: 130px;
  right: 10px;
  z-index: 9999;
  width: 500px;
  @media screen and (max-width: 767px) {
    max-width: 90%;
  }
  //   pointer-events: none;
}
</style>
