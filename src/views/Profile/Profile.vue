<template>
  <div class="admin-detail">
    <div class="bg-white w-3/4 mx-auto p-6">
      <div class="flex gap-6 items-center">
        <div class="">
          <User width="60" height="60" />
        </div>
        <div class="">
          <p class="text-xl font-medium">{{ userProfile.name }}</p>
          <p class="text-base text-neutral-500 font-medium">{{ userProfile.group }}</p>
        </div>
      </div>
      <div class="flex mt-4 gap-6">
        <p class="text-neutral-500 w-36">Email</p>
        <p>:</p>
        <p>{{ userProfile.email }}</p>
      </div>
      <div class="flex mt-2 gap-6">
        <p class="text-neutral-500 w-36">Username</p>
        <p>:</p>
        <p>{{ userProfile.username }}</p>
      </div>
      <div class="flex mt-2 gap-6">
        <p class="text-neutral-500 w-36">Jenis Kelamin</p>
        <p>:</p>
        <p>{{ userProfile.gender === 'M' ? 'Laki-laki' : 'Perempuan' }}</p>
      </div>
      <div class="flex mt-2 gap-6">
        <p class="text-neutral-500 w-36">Role</p>
        <p>:</p>
        <p>{{ userProfile.role }}</p>
      </div>
      <div class="flex mt-2 gap-6">
        <p class="text-neutral-500 w-36">Activated At</p>
        <p>:</p>
        <p>{{ userProfile.verified_at | formatDateTime }}</p>
      </div>
      <div class="flex mt-2 gap-6">
        <p class="text-neutral-500 w-36">Login Type</p>
        <p>:</p>
        <p>{{ userProfile.login_type }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { formatDateTime } from '@/util'
export default {
  filters: {
    formatDateTime
  },
  components: {
    User: () => import(/* webpackChunkName: "Icons" */ '@/components/Icons/User')
  },
  computed: {
    ...mapGetters('auth', ['userProfile'])
  },
  methods: {
    ...mapActions('auth', ['getProfile']),
    getUserProfile() {
      this.getProfile()
    }
  },
  created() {
    this.getUserProfile()
  }
}
</script>

<style></style>
