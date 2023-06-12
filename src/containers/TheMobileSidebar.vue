<template>
  <div class="sidebar bg-blue">
    <div class="pt-5">
      <div class="flex px-5 mb-9 h-8 items-center justify-between">
        <transition name="fade" :duration="100">
          <img src="~@/assets/images/logos/Logo-White.png" />
        </transition>
        <span class="cursor-pointer inline-block -mr-2" @click="toggleMenu()">
          <Close width="40" height="40" />
        </span>
      </div>
      <router-link to="/profile" class="menu flex items-center justify-between gap-4 px-5 mb-10 bg-blue-700 p-2">
        <div class="flex gap-4 items-center">
          <User width="24" height="24" />
          <div class="text-left">
            <p class="text-white text-base font-bold leading-tight">{{ user.name }}</p>
            <p class="text-xs text-white">{{ user.group }}</p>
          </div>
        </div>
        <div class="relative text-left user-item">
          <span class="inline-block absolute top-1/2 leading-0 transform -translate-y-1/2 right-0 cursor-pointer" @click="toggleUser()">
            <Chevron width="16" height="16" direction="right" color="#ffffff" />
          </span>
        </div>
      </router-link>
      <div class="relative" v-if="expandUser">
        <!-- <div class="mb-2">
          <router-link to="/profile" class="block text-yellow text-sm">Profile</router-link>
        </div> -->
        <div class="">
          <div class="cursor-pointer text-yellow text-sm" @click="doLogout()">Logout</div>
        </div>
      </div>
      <div v-for="(menu, index) in menuList" :key="index">
        <router-link
          :to="menu.url"
          :class="{ 'active-link': activePath === menu.url }"
          class="flex px-5 py-3 gap-4 items-center transition-all ease-linear duration-200 hover:text-primary-500"
          v-if="!menu.submenu"
        >
          <span class="inline-block flex-shrink-0"><component :is="menu.icon" width="24" height="24"/></span>
          <transition name="fade" :duration="100">
            <div class="font-medium title whitespace-nowrap ">{{ menu.title }}</div>
          </transition>
        </router-link>
        <div class="gap-4 justify-between items-start" v-else>
          <input type="checkbox" :id="`checkbox-${index}`" v-model="menu.active" />
          <label class="font-medium py-3 px-5 flex gap-4 items-center justify-between cursor-pointer transition-all duration-200 hover:text-primary-500" :for="`checkbox-${index}`">
            <div class="flex gap-4 items-center justify-start">
              <span class="inline-block flex-shrink-0"><component :is="menu.icon" width="24" height="24"/></span>
              <transition name="fade" :duration="100">
                <p class="font-medium title whitespace-nowrap ">{{ menu.title }}</p>
              </transition>
            </div>
            <Chevron color="white" width="12" height="12" :direction="menu.active ? 'up' : 'down'" />
          </label>
          <div class="submenu" :class="{ active: menu.active }">
            <router-link
              :to="submenu.url"
              :class="{ 'active-link': activePath === submenu.url }"
              class="flex px-6 py-2 gap-4 items-center transition-all duration-200 hover:text-primary-500"
              v-for="(submenu, idx) in menu.submenu"
              :key="idx"
            >
              <div class="font-medium">{{ submenu.title }}</div>
            </router-link>
          </div>
        </div>
      </div>
      <div class="cursor-pointer text-white border border-white text-sm p-2 rounded mx-5 mt-5" @click="doLogout()">Logout</div>
    </div>
  </div>
</template>
<script>
import { externalMenu, internalMenu } from '@/constants'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
    Chevron: () => import(/* webpackChunkName: "Icons" */ '@/components/Icons/Chevron'),
    User: () => import(/* webpackChunkName: "Icons" */ '@/components/Icons/User'),
    Close: () => import(/* webpackChunkName: "Icons" */ '@/components/Icons/Close')
  },
  props: {
    sidebarStatus: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    activePath: '',
    menu: {
      EXTERNAL: externalMenu,
      INTERNAL: internalMenu
    },
    expandUser: false
  }),
  computed: {
    ...mapGetters('auth', ['userData']),
    ...mapGetters('common', ['expandedMenu']),
    menuList() {
      return this.menu['INTERNAL']
    },
    user() {
      return this.userData?.user
    }
  },
  mounted() {
    this.activePath = this.$route.path
    if (this.$route?.meta?.submenu) {
      const parent = this.$route.path.split('/')[1]
      const activeParentIndex = this.menuList.findIndex(item => item.id === parent)
      this.menuList[activeParentIndex].active = true
    }
  },
  watch: {
    $route(val) {
      this.activePath = val.path
    }
  },
  methods: {
    ...mapActions('auth', ['logout']),
    ...mapActions('common', ['showLoading', 'hideLoading', 'expandMenu']),
    toggleMenu() {
      this.expandMenu(!this.expandedMenu)
    },
    toggleUser() {
      this.expandUser = !this.expandUser
    },
    doLogout() {
      this.showLoading()
      this.logout().then(res => {
        this.hideLoading()
        this.$router.push('/login')
      })
    }
  }
}
</script>
<style lang="scss" scoped>
input {
  position: absolute;
  opacity: 0;
  z-index: -1;
}
input:checked {
  // ~ .submenu {
  //   max-height: 100vh;
  // }
  ~ label svg {
    transform: rotate(0deg);
  }
}
.submenu {
  max-height: 0;
  padding: 0 0px;
  transition: all 0.35s;
  text-align: left;
  overflow: hidden;
  a {
    padding-left: 64px !important;
  }
  &.active {
    max-height: 100vh;
  }
}

.active-link,
.router-link-active {
  color: #15506d;
}
.sidebar {
  overflow: auto;
  z-index: 4;
  padding-bottom: 75px;
  width: 200px;
  display: block;
  z-index: 5;
  color: #fff;
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  transition: all ease-in 300ms;
  @media screen and (max-width: 767px) {
    width: 100%;
    position: relative;
  }
}
.shrink-menu {
  width: 56px;
  overflow: hidden;
}
</style>
