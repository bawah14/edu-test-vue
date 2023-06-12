import Vue from 'vue'
import VueRouter from 'vue-router'
import TheLayout from '@/containers/TheLayout.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    name: 'page-not-found',
    component: () => import(/* webpackChunkName: "404" */ '@/views/404/404.vue')
  },
  {
    path: '/',
    redirect: '/dashboard',
    component: TheLayout,
    children: [
      {
        path: '/dashboard',
        name: 'Beranda',
        meta: {
          submenu: false
        },
        component: () => import(/* webpackChunkName: "Dashboard" */ '../views/Dashboard/DashboardNew.vue')
      },
      {
        path: '/applicant',
        name: 'Pemohon',
        meta: {
          submenu: false
        },
        component: () => import(/* webpackChunkName: "Applicant" */ '../views/Applicant/Applicant.vue')
      },
      {
        path: '/applicant/detail/:id',
        name: 'Detail Pemohon',
        meta: {
          submenu: false
        },
        component: () => import(/* webpackChunkName: "ApplicantDetail" */ '../views/Applicant/ApplicantDetail.vue')
      },
      {
        path: '/applicant/detail/:id/result/:resultId',
        name: 'Detail Hasil Test',
        meta: {
          submenu: false
        },
        component: () => import(/* webpackChunkName: "ApplicantResultDetail" */ '../views/Applicant/ApplicantResultDetail.vue')
      },
      {
        path: '/applicant/add',
        name: 'Tambah Pemohon',
        meta: {
          submenu: false
        },
        component: () => import(/* webpackChunkName: "AddApplicant" */ '../views/Applicant/AddApplicant.vue')
      },
      {
        path: '/payment',
        name: 'Pembayaran',
        meta: {
          submenu: false
        },
        component: () => import(/* webpackChunkName: "Payment" */ '../views/Payment/Payment.vue')
      },
      {
        path: '/payment/:id',
        name: 'Detail Pembayaran',
        meta: {
          submenu: false
        },
        component: () => import(/* webpackChunkName: "PaymentDetail" */ '../views/Payment/PaymentDetail.vue')
      },
      {
        path: '/update-password',
        name: 'Update Password',
        meta: {
          submenu: false
        },
        component: () => import(/* webpackChunkName: "UpdatePassword" */ '../views/User/UpdatePassword.vue')
      },
      {
        path: '/Question/add',
        name: 'Tambah Pertanyaan',
        meta: {
          submenu: false
        },
        component: () => import(/* webpackChunkName: "AddApplicant" */ '../views/Question/AddQuestion.vue')
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '../views/Login/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  store.dispatch('auth/getCurrentUser')
  const tokenExpire = store.getters['auth/userData']?.token?.expired_at
  if (new Date().getTime() > new Date(tokenExpire).getTime()) {
    store.dispatch('auth/removeUserData')
    next({
      name: 'Login'
    })
    return
  }
  if (!store.getters['auth/isLoggedIn'] && to.name !== 'Login') {
    next({
      name: 'Login'
    })
    return
  }
  if (store.getters['auth/isLoggedIn'] && to.name === 'Login') {
    next({
      name: 'Beranda'
    })
    return
  }
  next()
})

router.afterEach((to, from) => {
  if (store.getters['common/isMobile']) {
    store.dispatch('common/expandMenu', true)
  }
})

export default router
