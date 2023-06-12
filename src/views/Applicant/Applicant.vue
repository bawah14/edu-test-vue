<template>
  <div class="applicant">
    <div class="flex justify-between items-center pb-6 gap-6 shadow-border-b mdmax:flex-col mdmax:shadow-none">
      <div class="w-2/6 mdmax:flex-auto mdmax:w-full mdmax:mb-2">
        <!-- <LinkButton buttonText="Tambah Kurir" url="/kurir/create" linkType="internal" :size="isMobile ? 'full' : 'regular'" /> -->
        <p class="text-2xl font-bold">{{ userData?.user?.group }}</p>
      </div>
      <div class="w-4/6 flex justify-end gap-6 mdmax:flex-col mdmax:flex-auto mdmax:w-full mdmax:gap-2">
        <div class="mdmax:w-full">
          <LinkButton buttonText="Tambah Pemohon" :url="`/applicant/add`" linkType="internal" type="primary" :size="isMobile ? 'big_full' : 'big'" />
        </div>
        <div class="mdmax:w-full">
          <!-- <label class="text-base text-neutral-700 font-medium mb-1 inline-block">Rentang Tanggal</label> -->
          <div class="date-range relative">
            <div class="absolute left-3 top-1/2 transform -translate-y-1/2 z-1">
              <Calendar color="neutral-700" />
            </div>
            <date-range-picker v-model="dateRange" :showDropdowns="false" :timePicker="false" :timePicker24Hour="false" :ranges="false"></date-range-picker>
          </div>
        </div>
        <div class="mdmax:w-full">
          <!-- <label class="text-base text-neutral-700 font-medium mb-1 inline-block">Pencarian</label> -->
          <div class="relative">
            <TextField type="text" :withIcon="true" placeholder="Cari data" v-model="searchKeyword" @enter="doSearch()" />
            <div class="absolute left-3 top-1/2 transform -translate-y-1/2">
              <Search />
            </div>
          </div>
        </div>
      </div>
    </div>
    <TableComponent :columns="columns" :list="applicantList">
      <template slot="table-row" slot-scope="{ entry, column }">
        <LinkButton v-if="column.field === 'action'" buttonText="Lihat rincian" :url="`/applicant/detail/${entry.id}`" linkType="internal" type="secondary" size="small" />
        <div v-else-if="column.field === 'date'" class="whitespace-nowrap">
          {{ entry?.latest_test_schedule?.schedule_time | formatDate }}
        </div>
        <div v-else-if="column.field === 'time'">
          {{ entry?.latest_test_schedule?.schedule_time | formatTime }}
        </div>
        <div v-else-if="column.field === 'location'">
          {{ entry?.latest_test_schedule?.location_test_display }}
        </div>
        <span v-else>{{ entry[column.field] }}</span>
      </template>
    </TableComponent>
    <div class="mt-8 flex justify-end items-center mb-6" v-if="applicantList && applicantList.length > 0">
      <pagination :currentPage="currentPage" :totalCount="totalRecords" :pageSize="pageSize" @onPageChange="onPageChange" />
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import DateRangePicker from 'vue2-daterange-picker'
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'
import { currencyFormat, formatDate, formatTime, formatRCF } from '../../util'
import dayjs from 'dayjs'
const NOW = new Date()
export default {
  filters: {
    currencyFormat,
    formatDate,
    formatTime,
    formatRCF
  },
  components: {
    DateRangePicker,
    TextField: () => import(/* webpackChunkName: "TextField" */ '@/components/Forms/TextField'),
    Calendar: () => import(/* webpackChunkName: "Icons" */ '@/components/Icons/Calendar'),
    LinkButton: () => import(/* webpackChunkName: "Button" */ '@/components/Forms/LinkButton'),
    Search: () => import(/* webpackChunkName: "Icons" */ '@/components/Icons/Search'),
    TableComponent: () => import(/* webpackChunkName: "Table" */ '@/components/Table/Table'),
    Pagination: () => import(/* webpackChunkName: "Pagination" */ '@/components/Pagination/Pagination')
  },
  data() {
    return {
      dateRange: {
        startDate: new Date(NOW.getFullYear(), NOW.getMonth(), NOW.getDate() - 7),
        endDate: NOW
      },
      columns: [
        { label: 'ID', field: 'id' },
        { label: 'Tanggal', field: 'date' },
        { label: 'Waktu Test', field: 'time' },
        { label: 'Nama', field: 'name' },
        { label: 'Alamat Email', field: 'email' },
        { label: 'Lokasi Test', field: 'location' },
        { label: 'Opsi', field: 'action' }
      ],
      searchKeyword: '',
      totalRecords: 0,
      currentPage: 1,
      pageSize: 10,
      hasMorePages: true
    }
  },
  computed: {
    ...mapGetters('common', ['isMobile']),
    ...mapGetters('auth', ['userData']),
    ...mapGetters('applicant', ['applicantList'])
  },
  created() {
    if (!this.$route.query.page) {
      this.$router.push({ path: '/applicant', query: { page: 1 } })
      this.page = 1
      this.currentPage = 1
    } else {
      this.page = parseInt(this.$route.query.page)
      this.currentPage = parseInt(this.$route.query.page)
      this.getList()
    }
  },
  watch: {
    $route(val) {
      if (val.query.page) {
        this.page = parseInt(val.query.page)
        this.currentPage = parseInt(val.query.page)
        this.getList()
      } else {
        this.$router.push({ path: '/applicant', query: { page: 1 } })
        this.page = 1
        this.currentPage = 1
      }
    }
  },
  methods: {
    ...mapActions('applicant', ['getApplicantList']),
    ...mapActions('common', ['showLoading', 'hideLoading']),
    getList(searchTerm = '') {
      const startDate = this.$options.filters.formatRCF(this.dateRange.startDate)
      const endDate = this.$options.filters.formatRCF(this.dateRange.endDate)
      this.showLoading()
      this.getApplicantList({
        params: {
          search_keyword: searchTerm,
          start_date: startDate,
          end_date: endDate,
          page: this.currentPage,
          per_page: this.pageSize
        }
      }).then(res => {
        this.totalRecords = res.data.meta.total_item
        this.hideLoading()
      })
    },
    doSearch() {
      this.getList(this.searchKeyword)
    },
    onPageChange(page) {
      this.currentPage = page
      this.$router.push({ path: '/applicant', query: { page: page } })
    }
  }
}
</script>
<style lang="scss" scoped>
.date-range {
  &::v-deep .reportrange-text {
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    padding-left: 2.75rem;
    padding-right: 0.75rem;
    border-radius: 0.5rem;
    border-color: rgba(206, 213, 222, 1);
    border-width: 1px;
    border-style: solid;
    width: 100%;
  }
  &::v-deep .vue-daterange-picker {
    display: block;
  }
}
</style>
