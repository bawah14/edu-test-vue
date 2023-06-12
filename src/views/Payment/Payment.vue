<template>
  <div class="payment">
    <div class="flex justify-between items-center pb-6 mdmax:flex-col mdmax:shadow-none">
      <div class="flex-1 mdmax:flex-auto mdmax:w-full mdmax:mb-2">
        <!-- <LinkButton buttonText="Tambah Kurir" url="/kurir/create" linkType="internal" :size="isMobile ? 'full' : 'regular'" /> -->
        <p class="text-2xl font-bold">Pembayaran</p>
      </div>
      <div class="flex-1 flex justify-end gap-8 mdmax:flex-col mdmax:flex-auto mdmax:w-full mdmax:gap-2">
        <div class="w-full mdmax:w-full flex items-center gap-4 justify-end">
          <div class="flex-1" v-if="userData?.user?.role_type === 'admin_pusat'">
            <label class="text-base text-neutral-700 font-medium mb-1 inline-block">Lokasi Tes</label>
            <v-select :options="testLocation" type="text" label="name" v-model="selectedLocation" @input="setSelected"></v-select>
          </div>
          <div class="flex-1">
            <label class="text-base text-neutral-700 font-medium mb-1 inline-block">Pencarian</label>
            <div class="relative">
              <TextField type="text" :withIcon="true" placeholder="Cari data pembayaran" v-model="searchKeyword" @enter="doSearch()" />
              <div class="absolute left-3 top-1/2 transform -translate-y-1/2">
                <Search />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-between items-center gap-6 mb-6 mdmax:flex-wrap mdmax:gap-2" v-if="income">
      <div class="flex-1 p-5 mdmax:p-4 bg-white rounded-md flex justify-between items-start">
        <div class="">
          <p class="text-neutral-500 mdmax:text-sm">Pendapatan</p>
          <p class="text-lg font-bold mb-6">{{ income.total_income | currencyFormat }}</p>
          <p class="text-xs">Terkahir update, {{ income.last_updated_income | formatDate }}</p>
        </div>
        <span class="flex w-9 h-9 mdmax:flex-shrink-0 justify-center items-center rounded-full bg-blue-50">
          <Income color="dark" height="18" width="18" />
        </span>
      </div>
      <div class="flex-1 p-5 mdmax:p-4 bg-white rounded-md flex justify-between items-start">
        <div class="">
          <p class="text-neutral-500 mdmax:text-sm">Dana Masuk</p>
          <p class="text-lg font-bold mb-6">{{ income.last_payment_amount | currencyFormat }}</p>
          <p class="text-xs">Terkahir update, {{ income.last_updated_payment | formatDate }}</p>
        </div>
        <span class="flex w-9 h-9 mdmax:flex-shrink-0 justify-center items-center rounded-full bg-blue-50">
          <IncomingFund color="dark" height="18" width="18" />
        </span>
      </div>
    </div>
    <TableComponent :columns="columns" :list="paymentList">
      <template slot="table-row" slot-scope="{ entry, column }">
        <LinkButton v-if="column.field === 'action'" buttonText="Lihat rincian" :url="`/payment/${entry.id}`" linkType="internal" type="secondary" size="small" />
        <div v-else-if="column.field === 'booking_code'">
          {{ entry.schedule_info.booking_code }}
        </div>
        <div v-else-if="column.field === 'date'">
          {{ entry.schedule_info.schedule_time | formatDate }}
        </div>
        <div v-else-if="column.field === 'time'">
          {{ entry.schedule_info.schedule_time | formatTime }}
        </div>
        <div v-else-if="column.field === 'price'">
          {{ entry.price | currencyFormat }}
        </div>
        <div v-else-if="column.field === 'status'">
          <span class="inline-block text-sm font-medium px-2 py-1 rounded-md" :class="[entry.status === 'paid' ? 'bg-green-light text-green' : 'bg-yellow-light text-system-warning']">
            {{ entry.status_display }}
          </span>
        </div>
        <span v-else>{{ entry[column.field] }}</span>
      </template>
    </TableComponent>
    <div class="mt-8 flex justify-end items-center mb-6" v-if="paymentList && paymentList.length > 0">
      <pagination :currentPage="currentPage" :totalCount="totalRecords" :pageSize="pageSize" @onPageChange="onPageChange" />
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { currencyFormat, formatDate, formatTime } from '../../util'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
export default {
  filters: {
    currencyFormat,
    formatDate,
    formatTime
  },
  components: {
    TextField: () => import(/* webpackChunkName: "TextField" */ '@/components/Forms/TextField'),
    Search: () => import(/* webpackChunkName: "Icons" */ '@/components/Icons/Search'),
    Income: () => import(/* webpackChunkName: "Icons" */ '@/components/Icons/Income'),
    LinkButton: () => import(/* webpackChunkName: "Button" */ '@/components/Forms/LinkButton'),
    IncomingFund: () => import(/* webpackChunkName: "Icons" */ '@/components/Icons/IncomingFund'),
    TableComponent: () => import(/* webpackChunkName: "Table" */ '@/components/Table/Table'),
    'v-select': vSelect,
    Pagination: () => import(/* webpackChunkName: "Pagination" */ '@/components/Pagination/Pagination')
  },
  data() {
    return {
      columns: [
        { label: 'Payment ID', field: 'id' },
        { label: 'Kode Booking', field: 'booking_code' },
        { label: 'Tanggal', field: 'date' },
        { label: 'Waktu', field: 'time' },
        { label: 'Metode Pembayaran', field: 'payment_method_display' },
        { label: 'Biaya', field: 'price' },
        { label: 'Status', field: 'status' },
        { label: 'Opsi', field: 'action' }
      ],
      searchKeyword: '',
      selectedLocation: null,
      totalRecords: 0,
      currentPage: 1,
      pageSize: 10,
      hasMorePages: true
    }
  },
  created() {
    if (!this.$route.query.page) {
      this.$router.push({ path: '/payment', query: { page: 1 } })
      this.page = 1
      this.currentPage = 1
    } else {
      this.page = parseInt(this.$route.query.page)
      this.currentPage = parseInt(this.$route.query.page)
      this.getPaymentHistoryInformation()
    }
  },
  watch: {
    $route(val) {
      if (val.query.page) {
        this.page = parseInt(val.query.page)
        this.currentPage = parseInt(val.query.page)
        this.getPaymentHistoryInformation()
      } else {
        this.$router.push({ path: '/payment', query: { page: 1 } })
        this.page = 1
        this.currentPage = 1
      }
    }
  },
  computed: {
    ...mapGetters('payment', ['paymentList', 'income']),
    ...mapGetters('applicant', ['testLocation']),
    ...mapGetters('auth', ['userData'])
  },
  methods: {
    ...mapActions('payment', ['getPaymentHistory']),
    ...mapActions('common', ['showLoading', 'hideLoading']),
    ...mapActions('applicant', ['getTestLocation']),
    setSelected(value) {
      this.getPaymentHistoryInformation()
    },
    getPaymentHistoryInformation(search_keyword = '') {
      this.showLoading()
      if (this.userData?.user?.role_type === 'admin_pusat' && !this.selectedLocation) {
        this.getTestLocation().then(() => {
          if (!this.selectedLocation) this.selectedLocation = this.testLocation?.[0]
          this.getPaymentHistory({
            params: {
              search_keyword: search_keyword,
              location_code: this.userData?.user?.role_type === 'admin_pusat' ? this.selectedLocation?.code : '',
              page: this.currentPage,
              per_page: this.pageSize
            }
          }).then(res => {
            this.totalRecords = res.data.meta.total_item
            this.hideLoading()
          })
        })
      } else {
        this.getPaymentHistory({
          params: {
            search_keyword: search_keyword,
            location_code: this.userData?.user?.role_type === 'admin_pusat' ? this.selectedLocation?.code : '',
            page: this.currentPage,
            per_page: this.pageSize
          }
        }).then(res => {
          this.totalRecords = res.data.meta.total_item
          this.hideLoading()
        })
      }
    },
    doSearch() {
      this.getPaymentHistoryInformation(this.searchKeyword)
    },
    onPageChange(page) {
      this.currentPage = page
      this.$router.push({ path: '/payment', query: { page: page } })
    }
  }
}
</script>
<style lang="scss" scoped>
.payment {
  &::v-deep .vs__search {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    border-radius: 0.5rem;
  }
  &::v-deep .vdpComponent {
    font-size: 16px;
    display: block;
  }
  &::v-deep .vdpComponent input {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    border-radius: 0.5rem;
    border-color: rgba(206, 213, 222, 1);
    border-width: 1px;
    border-style: solid;
    width: 100%;
  }
  &::v-deep .vs__dropdown-toggle {
    padding: 0;
    border-radius: 0.5rem;
  }
}
</style>
