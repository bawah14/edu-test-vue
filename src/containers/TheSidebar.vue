<template>
  <div class="sidebar bg-blue" :class="{ 'shrink-menu': !sidebarStatus }">
    <div class="pt-5">
      <div class="flex px-4 mb-20 h-8" :class="[!sidebarStatus ? 'justify-start' : 'justify-center']">
        <transition name="fade" :duration="100">
          <router-link to="/">
            <img :src="logoState()" />
          </router-link>
        </transition>
      </div>
      <div v-for="(menu, index) in menuList" :key="index">
        <router-link
          :to="menu.url"
          :class="{ 'active-link': activePath === menu.url }"
          class="flex px-4 py-3 gap-4 items-center transition-all ease-linear duration-200 hover:text-blue-700"
          v-if="!menu.submenu"
        >
          <span class="inline-block flex-shrink-0"><component :is="menu.icon" width="24" height="24"/></span>
          <transition name="fade" :duration="100">
            <div class="font-medium title whitespace-nowrap" v-if="sidebarStatus">{{ menu.title }}</div>
          </transition>
        </router-link>
        <div class="gap-4 justify-between items-start" v-else>
          <input type="checkbox" :id="`checkbox-${index}`" v-model="menu.active" />
          <label class="font-medium py-3 px-4 flex gap-4 items-center justify-between cursor-pointer transition-all duration-200 hover:text-primary-500" :for="`checkbox-${index}`">
            <div class="flex gap-4 items-center justify-start">
              <span class="inline-block flex-shrink-0"><component :is="menu.icon" width="24" height="24"/></span>
              <transition name="fade" :duration="100">
                <p class="font-medium title whitespace-nowrap" v-if="sidebarStatus">{{ menu.title }}</p>
              </transition>
            </div>
            <Chevron color="white" width="12" height="12" :direction="menu.active ? 'up' : 'down'" v-if="sidebarStatus" />
          </label>
          <div class="submenu bg-neutral-600" :class="{ active: menu.active }">
            <router-link
              :to="submenu.url"
              :class="{ 'active-link': activePath === submenu.url }"
              class="flex px-4 py-2 gap-4 items-center transition-all duration-200 hover:text-primary-500"
              v-for="(submenu, idx) in menu.submenu"
              :key="idx"
            >
              <div class="font-medium">{{ submenu.title }}</div>
            </router-link>
          </div>
        </div>
      </div>
      <div>
        <div @click="doLogout" class="flex cursor-pointer px-4 py-3 gap-4 items-center transition-all ease-linear duration-200 hover:text-blue-700">
          <span class="inline-block flex-shrink-0">
            <Logout width="24" height="24" />
          </span>
          <transition name="fade" :duration="100">
            <div class="font-medium title whitespace-nowrap">Logout</div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { externalMenu, internalMenu } from '@/constants'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
    Chevron: () => import(/* webpackChunkName: "Icons" */ '@/components/Icons/Chevron'),
    Logout: () => import(/* webpackChunkName: "Icons" */ '@/components/Icons/Logout')
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
      admin_cabang: externalMenu,
      admin_pusat: internalMenu
    }
  }),
  computed: {
    ...mapGetters('auth', ['userData']),
    menuList() {
      return this.menu[this.userData?.user?.role_type]
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
    },
    sidebarStatus(open) {
      if (!open) {
        this.menuList.forEach(function(item) {
          if (typeof item.active !== 'undefined') {
            item.active = false
          }
        })
      }
    }
  },
  methods: {
    ...mapActions('auth', ['logout']),
    ...mapActions('common', ['showLoading', 'hideLoading']),
    logoState() {
      if (this.sidebarStatus) {
        return require('@/assets/images/logos/Logo-White.png')
      } else {
        return require('@/assets/images/logos/Logo-White.png')
      }
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
