<template>
  <div class="content flex w-full h-full">
    <div class="navbar" :class="{ 'shrink-menu': !expandedMenu }" v-if="!isMobile">
      <TheSidebar :sidebarStatus="expandedMenu" />
    </div>
    <div class="mobile-sidebar" :class="{ 'expand-menu': !expandedMenu }" v-else>
      <TheMobileSidebar :sidebarStatus="expandedMenu" />
    </div>
    <div class="overlay" v-if="isMobile && !expandedMenu" @click="toggleMenu()"></div>
    <div class="content_wrapper w-full">
      <div class="header" :class="{ 'shrink-header': !expandedMenu && !this.isMobile }">
        <TheHeader />
        <div class="text-left flex px-3 py-3 bg-white items-center">
          <div class="texl-lg font-bold py-1 border-r-2 border-neutral-700 leading-none pr-2">{{ $route.name }}</div>
          <router-link to="/dashboard" class="pl-2 text-xs text-neutral-500 pr-2">Beranda</router-link>
          <span v-if="$route.name !== 'Dashboard'" class="inline-block text-xs text-neutral-700">/ {{ $route.name
          }}</span>
        </div>
      </div>
      <div class="panel h-full flex-col">
        <div class="w-full mx-auto py-6 md:w-3/4 mdmax:mx-0 px-4 mdmax:py-4">
          <router-view></router-view>
        </div>
      </div>
      <Toast />
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { enableScrollLock, disableScrollLock } from '@/util'
export default {
  components: {
    TheHeader: () => import(/* webpackChunkName: "header" */ '@/containers/TheHeader'),
    Toast: () => import(/* webpackChunkName: "Toast" */ '@/components/Toast/Toast'),
    TheSidebar: () => import(/* webpackChunkName: "sidebar" */ '@/containers/TheSidebar'),
    TheMobileSidebar: () => import(/* webpackChunkName: "sidebar" */ '@/containers/TheMobileSidebar')
  },
  computed: {
    ...mapGetters('common', ['expandedMenu', 'isMobile'])
  },
  watch: {
    expandedMenu(value) {
      if (this.isMobile) {
        if (value) {
          disableScrollLock()
        } else {
          enableScrollLock()
        }
      }
    }
  },
  methods: {
    ...mapActions('common', ['showLoading', 'hideLoading', 'expandMenu']),
    toggleMenu() {
      const state = this.expandedMenu
      this.expandMenu(!state)
    }
  }
}
</script>
<style lang="scss" scoped>
.navbar {
  flex: 0 0 200px;
  position: relative;
  transition: all ease-in 300ms;
}

.shrink-menu {
  flex: 0 0 56px;
}

.header {
  position: fixed;
  width: 100%;
  color: #101840;
  transition: all ease-in 300ms;
  padding-left: 200px;
  left: 0;
  top: 0;
  z-index: 10;

  @media screen and (max-width: 767px) {
    padding: 0;
  }
}

.expand-menu {
  transform: translateX(0) !important;
}

.mobile-sidebar {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 20;
  width: 280px;
  height: 100%;
  transform: translateX(-100%);
  transition: transform 300ms ease-in-out;
}

.overlay {
  background-color: rgba(0, 0, 0, 0.75);
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 15;
}

.shrink-header {
  padding-left: 56px;
}

.panel {
  z-index: 2;
  text-align: left;
  padding-top: 123px;
}
</style>
