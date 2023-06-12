<template>
  <div class="order-card">
    <div class="px-6 py-4 flex justify-between items-center shadow-border-b mdmax:px-4 mdmax:py-4">
      <div class="flex gap-3 mdmax:items-start mdmax:gap-1 mdmax:flex-col justify-between items-center">
        <span>
          <span class="inline-flex px-2 py-1 text-sm rounded-md mdmax:flex-shrink-0" :style="'backgroundColor: ' + data.status_color + '; color: white;'">{{ data.status_display }}</span>
        </span>
        <div>
          <span class="text-neutral-500 mdmax:text-sm block text-xs mb-1">{{ data.created_time_display }} / {{ data.order_id }}</span>
          <span class="text-neutral-500 mdmax:text-sm block text-xs">AWB: {{ data.awb }}</span>
        </div>
      </div>

      <span v-if="isMobile" class="inline-block cursor-pointer" @click="expand()">
        <Chevron direction="down" />
      </span>
      <Button buttonText="Lebih Rinci" type="secondary" @action="goToDetail(data.order_id)" v-if="!isMobile" />
    </div>
    <div class="flex justify-between items-start shadow-border-b text-neutral-500 mdmax:flex-col mdmax:shadow-none" :class="{ hidden: !visibleContent && isMobile }">
      <div class="w-2/5 border-r p-6 mdmax:w-full mdmax:p-4 mdmax:border-none mdmax:shadow-border-b">
        <div class="py-2 mb-2" v-if="isMobile">
          <Button buttonText="Lebih Rinci" type="secondary" size="full" @action="goToDetail(data.order_id)" />
        </div>
        <div class="flex justify-between items-start gap-6 mdmax:gap-2">
          <div class="w-2/5 mdmax:w-1/2">
            <p class="text-sm font-medium mb-1 text-neutral-700">Nama Pengirim</p>
            <p class="font-medium mb-1">{{ data.sender_name }}</p>
            <p>{{ data.sender_phoneno }}</p>
          </div>
          <div class="w-3/5 mdmax:w-1/2">
            <p class="text-sm font-medium mb-1 text-neutral-700">Alamat Pengirim</p>
            <p class="ellipsis overflow-hidden mdmax:h-auto mdmax:overflow-auto">{{ data.pickup_address }}</p>
          </div>
        </div>
        <div class="mt-4 p-2 bg-neutral-200 rounded-md">
          <p class="text-sm font-medium mb-1 text-neutral-700">Detail Pickup</p>
          <p>{{ data.pickup_detail || '-' }}</p>
        </div>
      </div>
      <div class="w-2/5 border-r p-6 mdmax:border-none mdmax:p-4 mdmax:w-full mdmax:shadow-border-b">
        <div class="flex justify-between items-start gap-6 mdmax:gap-2">
          <div class="w-2/5 mdmax:w-1/2">
            <p class="text-sm font-medium mb-1 text-neutral-700 whitespace-nowrap">Nama Penerima</p>
            <p class="font-medium mb-1">{{ data.receiver_name }}</p>
            <p>{{ data.receiver_phoneno }}</p>
          </div>
          <div class="w-3/5 mdmax:w-1/2">
            <p class="text-sm font-medium mb-1 text-neutral-700">Alamat Penerima</p>
            <p class="ellipsis overflow-hidden mdmax:h-auto mdmax:overflow-auto">{{ data.destination_address }}</p>
          </div>
        </div>
        <div class="mt-4 p-2 bg-neutral-200 rounded-md">
          <p class="text-sm font-medium mb-1 text-neutral-700">Detail Pengiriman</p>
          <p>{{ data.destination_detail || '-' }}</p>
        </div>
      </div>
      <div class="w-1/5 p-6 mdmax:w-full mdmax:shadow-border-b">
        <div class="mb-6">
          <p class="text-sm font-medium mb-1 text-neutral-700">Berat Barang</p>
          <p>{{ data.goods_weight }} kg</p>
        </div>
        <div class="">
          <p class="text-sm font-medium mb-1 text-neutral-700">Jenis Paket</p>
          <p>{{ data.goods_category }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
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
        PYMWAI: 'text-neutral-500 bg-neutral-300',
        PYMCNF: 'text-white bg-system-warning',
        DLVD: 'text-white bg-system-success',
        CNC: 'text-white bg-system-error',
        HUBPRCD: 'text-white bg-system-warning',
        HUBRJCT: 'text-white bg-system-error'
      }
    }
  },
  methods: {
    goToDetail(id) {
      this.$router.push(`/order/detail/${id}`)
    },
    expand() {
      this.visibleContent = !this.visibleContent
    }
  },
  computed: {
    ...mapGetters('common', ['isMobile']),
    statusClass() {
      return this.status[this.data.status]
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
