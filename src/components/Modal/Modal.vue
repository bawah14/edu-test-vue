<template>
  <div :id="`modal-${id}`">
    <transition name="fade" appear>
      <div class="modal-wrapper" v-if="modalVisible">
        <div class="modal-overlay" @click="closeModal" v-if="modalVisible"></div>
        <div class="modal max-h-9/10 mdmax:max-h-4/5" :class="[type === 'full' ? 'p-0' : 'p-6', { 'rounded-md': corner === 'rounded' }]" :style="{ maxWidth: width }" role="dialog">
          <div
            class="absolute cursor-pointer flex justify-center items-center z-10"
            :class="[type === 'full' ? '-right-4 -top-4 bg-white w-8 h-8 rounded-full shadow-small text-yellow' : 'right-4 top-4']"
            @click="closeModal"
            v-if="closeIconVisible"
          >
            <Close />
          </div>
          <div class="modal-body">
            <slot name="modal-content"></slot>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import { enableScrollLock, disableScrollLock } from '@/util'
export default {
  components: {
    Close: () => import(/* webpackChunkName: "Icons" */ '@/components/Icons/Close')
  },
  props: {
    modalVisible: {
      type: Boolean,
      default: false
    },
    closeIconVisible: {
      type: Boolean,
      default: true
    },
    id: {
      type: String
    },
    initFunction: {
      type: Function
    },
    width: {
      type: String,
      default: '500px'
    },
    type: {
      type: String,
      default: 'regular'
    },
    corner: {
      type: String,
      default: 'rounded'
    }
  },
  watch: {
    modalVisible(val) {
      if (val) {
        enableScrollLock()
        if (this.initFunction) this.initFunction()
      } else {
        disableScrollLock()
      }
    }
  },
  methods: {
    closeModal() {
      this.$emit('close')
    }
  }
}
</script>
<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 200ms linear;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.modal-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  height: 100%;
}
.modal-body {
  max-height: 100%;
  overflow-y: auto;
  width: 100%;
}
.modal {
  position: relative;
  display: flex;
  top: 50%;
  right: 0;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  width: 90%;
  // max-width: 500px;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
  background: #fff;
  z-index: 999;
  height: auto;
  &-overlay {
    content: '';
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 998;
    background: #2c3e50;
    opacity: 0.6;
    cursor: pointer;
  }
}
</style>
