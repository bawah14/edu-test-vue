<template>
  <div class="nav-top border-b border-neutral-300">
    <div class="flex justify-between py-4 px-5 bg-white">
      <div class="w-60 flex gap-4 items-center ">
        <div class="flex items-center gap-12">
          <div class="cursor-pointer" @click="toggleMenu()">
            <Hamburger />
          </div>
          <!-- <div class="flex items-center gap-2">
            <Search />
            <input type="text" placeholder="Search here..." class="outline-none py-2 px-2" />
          </div> -->
        </div>
      </div>
      <div class="menu flex items-center gap-2" v-if="!isMobile">
        <div class="">
          <User width="40" height="40" />
        </div>
        <div class="relative text-left pr-10 cursor-pointer user-item">
          <p class="text-neutral-700 text-lg font-bold leading-tight">{{ user.name }}</p>
          <p class="text-sm text-neutral-500">{{ user.group }}</p>
          <span class="inline-block absolute top-1/2 leading-0 transform -translate-y-1/2 right-0"><Chevron width="16" height="16" direction="down" color="#101840"/></span>
          <div class="header__nav__menu-item-submenu invisible opacity-0 ease-linear transition-all duration-300 pt-6 left-2/4 top-full transform -translate-x-2/4 absolute cursor-default z-10">
            <div class="user-menu bg-white shadow-xl border border-grey-darker rounded relative">
              <div class="relative z-10 rounded bg-white p-6 text-black">
                <!-- <div class="mb-2">
                  <router-link to="/profile" class="block text-yellow text-sm">Profile</router-link>
                </div> -->
                <div class="">
                  <div class="cursor-pointer text-yellow text-sm" @click="doLogout()">Logout</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
    Chevron: () => import(/* webpackChunkName: "Icons" */ '@/components/Icons/Chevron'),
    User: () => import(/* webpackChunkName: "Icons" */ '@/components/Icons/User'),
    Hamburger: () => import(/* webpackChunkName: "Icons" */ '@/components/Icons/Hamburger')
    // Search: () => import(/* webpackChunkName: "Icons" */ '@/components/Icons/Search')
  },
  computed: {
    ...mapGetters('auth', ['userData']),
    ...mapGetters('common', ['expandedMenu', 'isMobile']),
    user() {
      return this.userData?.user
    }
  },
  methods: {
    ...mapActions('auth', ['logout']),
    ...mapActions('common', ['showLoading', 'hideLoading', 'expandMenu']),
    doLogout() {
      this.showLoading()
      this.logout().then(res => {
        this.hideLoading()
        this.$router.push('/login')
      })
    },
    toggleMenu() {
      const state = this.expandedMenu
      this.expandMenu(!state)
    }
  }
}
</script>
<style lang="scss" scoped>
.user-item:hover .header__nav__menu-item-submenu {
  visibility: visible;
  opacity: 1;
  padding-top: 15px;
}
.user-item .header__nav__menu-item-submenu {
  left: auto;
  right: 0;
  transform: none;
}
.user-menu {
  width: 180px;
  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    top: 0;
    box-sizing: border-box;
    border: 6px solid black;
    border-color: transparent transparent #fff #fff;
    transform-origin: 0 0;
    transform: rotate(-225deg);
    box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.5);
    z-index: 1;
    left: auto;
    margin-left: 0;
    right: 0;
    margin-right: 20px;
  }
}
</style>
