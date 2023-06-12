<template>
  <div class="order-card">
    <div class="px-6 py-4 flex justify-between items-center shadow-border-b mdmax:px-4 mdmax:py-4">
      <div class="flex gap-3 mdmax:items-start mdmax:gap-1 mdmax:flex-col justify-between items-center">
        <span>
          <span class="inline-flex px-2 py-1 text-sm rounded-md mdmax:flex-shrink-0 capitalize" :class="statusClass || 'text-neutral-500 bg-neutral-300'">{{ data.internal }}</span>
        </span>
        <div>
          <span class="text-neutral-500 mdmax:text-sm block text-xs mb-1">{{ data.order_delivery_schedule | formatDate }} / {{ data.id }}</span>
          <span class="text-neutral-500 mdmax:text-sm block text-xs">Kode Booking: {{ data.order_booking_code }}</span>
        </div>
      </div>
      <div class="flex gap-6">
        <span v-if="isMobile" class="inline-block cursor-pointer" @click="expand()">
          <Chevron direction="down" />
        </span>
        <div class="courier flex items-center gap-6" v-if="data?.courier_assigned?.id && !isMobile">
          <div class="partner w-10 h-10 rounded-full flex justify-center items-center">
            <img :src="data?.courier_assigned.partner_icon" class="rounded-full" />
          </div>
          <div class="flex gap-3 items-center">
            <div class="w-7 h-7 rounded-full flex justify-center items-center">
              <img :src="data?.courier_assigned?.photo" class="rounded-full" />
            </div>
            <div class="">
              <p class="text-sm">{{ data?.courier_assigned?.name }}</p>
              <p class="text-neutral-500 text-xs">{{ data?.courier_assigned?.phone_number }}</p>
            </div>
          </div>
        </div>
        <Button disabled buttonText="Assign Otomatis" v-else v-show="!isMobile" />
        <Button buttonText="Lebih Rinci" type="secondary" @action="goToDetail(data.id)" v-if="!isMobile" />
      </div>
    </div>
    <div class="flex justify-between items-start shadow-border-b text-neutral-500 mdmax:flex-col mdmax:shadow-none" :class="{ hidden: !visibleContent && isMobile }">
      <div class="w-2/5 border-r p-6 mdmax:w-full mdmax:p-4 mdmax:border-none mdmax:shadow-border-b">
        <div class="py-2 mb-2" v-if="isMobile">
          <Button buttonText="Lebih Rinci" type="secondary" size="full" @action="goToDetail(data.id)" />
        </div>
        <div class="flex justify-between items-start gap-6 mdmax:gap-2">
          <div class="w-2/5 mdmax:w-1/2">
            <p class="text-sm font-medium mb-1 text-neutral-700">Nama Pengirim</p>
            <p class="font-medium mb-1">{{ data.sender.name }}</p>
            <p>{{ data.sender.phone_number }}</p>
          </div>
          <div class="w-3/5 mdmax:w-1/2">
            <p class="text-sm font-medium mb-1 text-neutral-700">Alamat Pengirim</p>
            <p class="ellipsis overflow-hidden mdmax:h-auto mdmax:overflow-auto">{{ data.sender.address }}</p>
          </div>
        </div>
        <div class="mt-4 p-2 bg-neutral-200 rounded-md">
          <p class="text-sm font-medium mb-1 text-neutral-700">Detail Pickup</p>
          <p>{{ data.sender.address_detail_instruction || '-' }}</p>
        </div>
      </div>
      <div class="w-2/5 border-r p-6 mdmax:border-none mdmax:p-4 mdmax:w-full mdmax:shadow-border-b">
        <div class="flex justify-between items-start gap-6 mdmax:gap-2">
          <div class="w-2/5 mdmax:w-1/2">
            <p class="text-sm font-medium mb-1 text-neutral-700 whitespace-nowrap">Nama Penerima</p>
            <p class="font-medium mb-1">{{ data.receiver.name }}</p>
            <p>{{ data.receiver.phone_number }}</p>
          </div>
          <div class="w-3/5 mdmax:w-1/2">
            <p class="text-sm font-medium mb-1 text-neutral-700">Alamat Penerima</p>
            <p class="ellipsis overflow-hidden mdmax:h-auto mdmax:overflow-auto">{{ data.receiver.address }}</p>
          </div>
        </div>
        <div class="mt-4 p-2 bg-neutral-200 rounded-md">
          <p class="text-sm font-medium mb-1 text-neutral-700">Detail Pengiriman</p>
          <p>{{ data.receiver.address_detail_instruction || '-' }}</p>
        </div>
      </div>
      <div class="w-1/5 p-6 mdmax:w-full mdmax:shadow-border-b">
        <div class="mb-6">
          <p class="text-sm font-medium mb-1 text-neutral-700">Berat Barang</p>
          <p>{{ data.package_weight_kilos }} kg</p>
        </div>
        <div class="">
          <p class="text-sm font-medium mb-1 text-neutral-700">Jenis Paket</p>
          <p>{{ data.package_goods_category_display }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { formatDate } from '@/util'
export default {
  filters: {
    formatDate
  },
  components: {
    Button: () => import(/* webpackChunkName: "Button" */ '@/components/Forms/Button'),
    Chevron: () => import(/* webpackChunkName: "Icons" */ '@/components/Icons/Chevron')
  },
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      visibleContent: false,
      status: {
        internal: 'text-primary-500 bg-primary-100',
        external: 'text-secondary-500 bg-secondary-200'
      }
    }
  },
  methods: {
    goToDetail(id) {
      this.$router.push(`/order/pickup/detail/${id}`)
    },
    expand() {
      this.visibleContent = !this.visibleContent
    }
  },
  computed: {
    ...mapGetters('common', ['isMobile']),
    statusClass() {
      return this.status[this.data.internal]
    }
  }
}
</script>
<style lang="scss" scoped>
.ellipsis {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.25;
  height: 60px;
  word-break: break-all;
}
</style>
