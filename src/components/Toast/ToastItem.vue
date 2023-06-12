<template>
  <div :class="['c-toasts__item']">
    <span class="h-full w-2 inline-block absolute left-0" :class="['c-toasts__item--' + toast.type]">&nbsp;</span>
    <div class="flex items-center gap-4 pl-6 pr-6">
      <component :is="toast.icon" />
      <span class="c-toasts__item-text py-4 pr-4 bg-white text-left">
        <p v-if="toast.primaryText" class="text-neutral-700 font-medium" v-html="toast.primaryText"></p>
        <p v-if="toast.secondaryText" class="text-neutral-500 text-sm">{{ toast.secondaryText }}</p>
      </span>
    </div>
    <span class="inline-block absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer" @click="close(toast.id)"><Close width="28" height="28"/></span>
  </div>
</template>
<script>
export default {
  components: {
    Close: () => import(/* webpackChunkName: "Icons" */ '@/components/Icons/Close')
  },
  props: {
    toast: {
      type: Object,
      required: true
    }
  },
  methods: {
    close(id) {
      this.$emit('close', id)
    }
  }
}
</script>
<style lang="scss" scoped>
.c-toasts__item {
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  margin-bottom: 10px;
  background-color: #fff;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.1);
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
  overflow: hidden;
}

.c-toasts__item-text {
}

.c-toasts__item--success {
  background-color: #00cf53;
}

.c-toasts__item--danger {
  background-color: #cc3300;
}

.c-toasts__item--warning {
  background-color: #ffcc00;
}

.c-toasts__item--info {
  background-color: #40a6ce;
}
</style>
