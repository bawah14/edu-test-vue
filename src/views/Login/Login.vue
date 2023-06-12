<template>
  <div class="w-full fixed h-full login flex justify-center items-center mdmax:relative overflow-y-auto">
    <div class="w-2/6 bg-white shadow-base relative rounded-lg mdmax:w-full mdmax:h-screen">
      <div class="px-20 py-20 mdmax:px-10 mdmax:py-10">
        <div class="text-left mb-10">
          <p class="font-bold text-4xl mb-2">Selamat datang kembali,</p>
          <p class="text-left">Silahkan login akun kamu</p>
        </div>
        <div class="form mt-4 text-left">
          <div class="mb-8">
            <TextField type="text" v-model="payload.username" label="Username" placeholder="Silahkan masukan username" @enter="doLogin()" :error="errors['username']" />
          </div>
          <div class="mb-8">
            <TextField type="password" v-model="payload.password" label="Password" placeholder="Silahkan masukan password" @enter="doLogin()" :error="errors['password']" />
          </div>
          <div class="login__form-submit mb-10">
            <transition name="fade" mode="out-in">
              <div class="text-system-error mb-4" v-if="generalError">{{ generalError }}</div>
            </transition>
            <Button @action="doLogin()" buttonText="Login" size="full" />
          </div>
          <div class="flex justify-center">
            <img src="@/assets/images/edutest.png" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { isNotEmptyError } from '@/util/form-validator'
const CONFIG = {
  username: 'Username',
  password: 'Password'
}
export default {
  name: 'Login',
  components: {
    TextField: () => import(/* webpackChunkName: "TextField" */ '@/components/Forms/TextField'),
    // Carousel: () => import(/* webpackChunkName: "Carousel" */ '@/components/Carousel/Carousel'),
    Button: () => import(/* webpackChunkName: "Button" */ '@/components/Forms/Button')
  },
  data: () => ({
    slides: [
      {
        image: require('@/assets/images/login-illustration.png'),
        title: 'LinkNau kini terintergasi',
        description:
          'Kami bekerja sama dengan logistik populer dalam negri dan mendukung lebih dari 10 logistik yang telah kami integrasikan ke dalam layanan LinkNau dengan begitu kamu bisa memilih layanan dan komparasi harga tanpa perlu keluar dari aplikasi LinkNau.'
      }
    ],
    payload: {
      username: null,
      password: null
    },
    errors: [],
    generalError: null,
    carouselBannerOptions: {
      rewind: true,
      arrows: false
    }
  }),
  computed: {
    ...mapGetters('auth', ['isLoggedIn', 'userData']),
    ...mapGetters('common', ['isMobile'])
  },
  methods: {
    ...mapActions('auth', ['login']),
    ...mapActions('common', ['showLoading', 'hideLoading']),
    doLogin() {
      if (this.validForm()) {
        const requestBody = {
          username: this.payload.username,
          password: this.payload.password
        }
        this.showLoading()
        this.generalError = null
        this.login({
          payloads: requestBody
        })
          .then(() => {
            this.hideLoading()
            if (this.userData.user.role_type === 'EXTERNAL') {
              this.$router.push('/')
            } else {
              this.$router.push('/dashboard')
            }
          })
          .catch(error => {
            this.hideLoading()
            this.generalError = error.response?.data?.message
          })
      }
    },
    validForm() {
      const error = isNotEmptyError(this.payload)
      this.errors = error.reduce(function(map, obj) {
        map[obj.field] = CONFIG[obj.field] + ' ' + obj.error
        return map
      }, {})
      return Object.keys(this.errors).length === 0
    }
  }
}
</script>
<style lang="scss" scoped>
.login-form {
  max-width: 490px;
  margin: 0 auto;
}
</style>
