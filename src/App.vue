<template>
  <div id="app">
    <router-view />
    <transition name="fade" mode="out-in">
      <Loading v-if="isLoading" />
    </transition>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { detectMobile } from '@/util'
export default {
  components: {
    Loading: () => import(/* webpackChunkName: "loading" */ '@/components/Illustration/Loading')
  },
  computed: {
    ...mapGetters('common', ['isLoading', 'isMobile'])
  },
  async mounted() {
    this.checkPlatform()
  },
  methods: {
    checkPlatform() {
      if (detectMobile()) {
        this.$store.commit('common/setIsMobile', true)
      } else {
        this.$store.commit('common/setIsMobile', false)
      }
    }
  }
}
</script>
