<template>
  <div class="password">
    <p class="text-2xl font-bold mb-6">Update Password</p>
    <div class="bg-white rounded-md px-6 py-10">
      <p class="text-center mb-6">Masukan informasi yang dibutuhkan untuk melakukan pengubahan password dari user terkait.</p>
      <div class="flex flex-col items-center gap-6 max-w-sm mx-auto mb-10">
        <div class="w-full">
          <TextField label="Username (Email)" placeholder="Masukan email" v-model="payload.username" :error="errors['username']" />
        </div>
        <div class="w-full">
          <TextField label="Password" placeholder="Masukan password" v-model="payload.password" :error="errors['password']" />
        </div>
        <div class="w-full">
          <TextField label="Konfirmasi Password" placeholder="Masukan konfirmasi password" v-model="payload.confirm_password" :error="errors['confirm_password']" />
        </div>
      </div>
      <div class="flex justify-center items-center flex-col">
        <transition name="fade" mode="out-in">
          <div class="text-system-error mb-6" v-if="generalError">{{ generalError }}</div>
        </transition>
        <Button buttonText="Update Password" type="primary" @action="doUpdate()" />
      </div>
    </div>
  </div>
</template>
<script>
import { isNotEmptyError } from '@/util/form-validator'
import { mapActions } from 'vuex'
const CONFIG = {
  username: 'Username',
  password: 'Password',
  confirm_password: 'Konfirmasi Password'
}
export default {
  components: {
    TextField: () => import(/* webpackChunkName: "TextField" */ '@/components/Forms/TextField'),
    Button: () => import(/* webpackChunkName: "Button" */ '@/components/Forms/Button')
  },
  data() {
    return {
      payload: {
        username: '',
        password: '',
        confirm_password: ''
      },
      errors: [],
      generalError: null
    }
  },
  methods: {
    ...mapActions('common', ['showLoading', 'hideLoading', 'setToast', 'updatePassword']),
    doUpdate() {
      if (this.validForm()) {
        this.generalError = null
        // eslint-disable-next-line no-useless-escape
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if (!regex.test(this.payload.username)) {
          this.errors['username'] = 'Email format salah!'
          return
        } else if (this.payload.password !== this.payload.confirm_password) {
          this.generalError = 'Konfirmasi Password Anda tidak sesuai!'
        } else {
          this.showLoading()
          this.updatePassword({
            payloads: this.payload
          })
            .then(() => {
              this.resetData()
              this.hideLoading()
              this.setToast({
                options: {
                  type: 'success',
                  duration: 3000,
                  primaryText: `Password untuk <strong>${this.payload.username}</strong> telah berhasil diupdate.`,
                  secondaryText: '',
                  callback: () => {},
                  icon: () => import('@/components/Icons/Success')
                }
              })
            })
            .catch(() => {
              this.hideLoading()
              this.setToast({
                options: {
                  type: 'danger',
                  duration: 3000,
                  primaryText: `Maaf, password untuk <strong>${this.payload.username}</strong> gagal diupdate! Silakan coba lagi.`,
                  secondaryText: '',
                  callback: () => {},
                  icon: () => import('@/components/Icons/Success')
                }
              })
            })
        }
      }
    },
    resetData() {
      this.payload = {
        username: '',
        password: '',
        confirm_password: ''
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
