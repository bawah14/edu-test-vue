<template>
  <div class="applicant-detail">
    <p class="text-2xl font-bold mb-10">{{ applicantDetail?.name }}</p>
    <div class="bg-white mb-10">
      <div class="flex items-stretch shadow-border-b mdmax:flex-col">
        <div class="w-3/5 shadow-border-r p-4 mdmax:shadow-none mdmax:w-full">
          <p class="font-bold text-lg mb-8 mdmax:text-base">Data Diri</p>
          <div class="flex items-start mb-4 mdmax:gap-6">
            <div class="flex-1">
              <label class="text-sm text-secondary mb-1 block">Nama</label>
              <p class="text-lg mdmax:text-base">{{ applicantDetail?.name }}</p>
            </div>
            <div class="flex-1">
              <label class="text-sm text-secondary mb-1 block">Alamat Email</label>
              <p class="text-lg mdmax:text-base">{{ applicantDetail?.email }}</p>
            </div>
          </div>
          <div class="flex items-start mb-4 mdmax:gap-6">
            <div class="flex-1">
              <label class="text-sm text-secondary mb-1 block">Nomor KTP</label>
              <p class="text-lg mdmax:text-base mdmax:break-all">{{ applicantDetail?.id_card_no }}</p>
            </div>
            <div class="flex-1">
              <label class="text-sm text-secondary mb-1 block">Nomor Handphone</label>
              <p class="text-lg mdmax:text-base">{{ applicantDetail?.phone_no }}</p>
            </div>
          </div>
          <div class="flex items-start mb-4 mdmax:gap-6">
            <div class="flex-1">
              <label class="text-sm text-secondary mb-1 block">Tempat Lahir</label>
              <p class="text-lg mdmax:text-base">{{ applicantDetail?.pob }}</p>
            </div>
            <div class="flex-1">
              <label class="text-sm text-secondary mb-1 block">Alamat rumah</label>
              <p class="text-lg mdmax:text-base">{{ applicantDetail?.address }}</p>
            </div>
          </div>
          <div class="flex items-start mb-4 mdmax:gap-6">
            <div class="flex-1">
              <label class="text-sm text-secondary mb-1 block">Tanggal Lahir</label>
              <p class="text-lg mdmax:text-base">{{ applicantDetail?.dob | formatDate }}</p>
            </div>
            <div class="flex-1">
              <label class="text-sm text-secondary mb-1 block">RT/RW</label>
              <p class="text-lg mdmax:text-base">{{ applicantDetail?.rtrw }}</p>
            </div>
          </div>
          <div class="flex items-start mb-4 mdmax:gap-6">
            <div class="flex-1">
              <label class="text-sm text-secondary mb-1 block">Jenis Kelamin</label>
              <p class="text-lg mdmax:text-base">{{ applicantDetail?.gender === 'M' ? 'Laki-laki' : 'Perempuan' }}</p>
            </div>
            <div class="flex-1">
              <label class="text-sm text-secondary mb-1 block">Kel / Desa</label>
              <p class="text-lg mdmax:text-base">{{ applicantDetail?.village }}</p>
            </div>
          </div>
          <div class="flex items-start mb-4 mdmax:gap-6">
            <div class="flex-1">
              <label class="text-sm text-secondary mb-1 block">Golongan Darah</label>
              <p class="text-lg mdmax:text-base">{{ applicantDetail?.blood_type }}</p>
            </div>
            <div class="flex-1">
              <label class="text-sm text-secondary mb-1 block">Kecamatan</label>
              <p class="text-lg mdmax:text-base">{{ applicantDetail?.subdistrict }}</p>
            </div>
          </div>
          <div class="flex items-start mb-4 mdmax:gap-6">
            <div class="flex-1">
              <label class="text-sm text-secondary mb-1 block">Pekerjaan</label>
              <p class="text-lg mdmax:text-base">{{ applicantDetail?.job_type }}</p>
            </div>
            <div class="flex-1">
              <label class="text-sm text-secondary mb-1 block">Kode Pos</label>
              <p class="text-lg mdmax:text-base">{{ applicantDetail?.postal_code }}</p>
            </div>
          </div>
        </div>
        <div class="w-2/5 p-4 mdmax:w-full">
          <div class="mb-8">
            <p class="font-bold text-lg mb-8">Foto Selfie</p>
            <a :href="applicantDetail?.selfie_pict" target="_blank" class="inline-block">
              <img :src="applicantDetail?.selfie_pict" class="max-h-48 mdmax:max-w-full" />
            </a>
          </div>
          <div class="mb-8">
            <p class="font-bold text-lg mb-8">Foto KTP</p>
            <a :href="applicantDetail?.selfie_id_pict" target="_blank" class="inline-block">
              <img :src="applicantDetail?.selfie_id_pict" class="max-h-48 mdmax:max-w-full" />
            </a>
          </div>
        </div>
      </div>
    </div>
    <TableComponent :columns="columns" :list="applicantResult" compact>
      <template slot="table-row" slot-scope="{ entry, column }">
        <LinkButton v-if="column.field === 'action'" buttonText="Lihat rincian" :url="`/applicant/detail/${applicantId}/result/${entry.id}`" linkType="internal" type="secondary" size="small" />
        <div v-else-if="column.field === 'date'" class="whitespace-nowrap">
          {{ entry?.schedule_info?.schedule_time | formatDate }}
        </div>
        <div v-else-if="column.field === 'time'">
          {{ entry?.schedule_info?.schedule_time | formatTime }}
        </div>
        <div v-else-if="column.field === 'status'">
          <span class="inline-block text-sm font-medium px-2 py-1 rounded-md" :class="[entry.score_status === 'passed' ? 'bg-green-light text-green' : 'bg-red-light text-system-error']">
            {{ entry.score_status_display }}
          </span>
        </div>
        <div v-else-if="column.field === 'location'">
          {{ entry?.schedule_info?.location_test_display }}
        </div>
        <span v-else>{{ entry[column.field] }}</span>
      </template>
    </TableComponent>
    <div class="mt-8 flex justify-end items-center mb-6" v-if="applicantResult && applicantResult.length > 0">
      <pagination :currentPage="currentPage" :totalCount="totalRecords" :pageSize="pageSize" @onPageChange="onPageChange" />
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { currencyFormat, formatDate, formatTime, formatRCF } from '../../util'
export default {
  filters: {
    currencyFormat,
    formatDate,
    formatTime,
    formatRCF
  },
  components: {
    TableComponent: () => import(/* webpackChunkName: "Table" */ '@/components/Table/Table'),
    LinkButton: () => import(/* webpackChunkName: "Button" */ '@/components/Forms/LinkButton'),
    Pagination: () => import(/* webpackChunkName: "Pagination" */ '@/components/Pagination/Pagination')
  },
  data() {
    return {
      columns: [
        { label: 'ID', field: 'id' },
        { label: 'Tanggal', field: 'date' },
        { label: 'Waktu Test', field: 'time' },
        { label: 'Status', field: 'status' },
        { label: 'Nilai', field: 'score' },
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
    ...mapGetters('applicant', ['applicantDetail', 'applicantResult']),
    applicantId() {
      return this.$route.params.id
    }
  },
  mounted() {
    this.getDetail()
  },
  methods: {
    ...mapActions('applicant', ['getApplicantDetail', 'getApplicantResult']),
    ...mapActions('common', ['showLoading', 'hideLoading']),
    getDetail() {
      this.showLoading()
      this.getApplicantDetail({
        id: this.applicantId
      }).then(() => {
        this.getApplicantResult({
          id: this.applicantId
        }).then(res => {
          this.totalRecords = res.data.meta.total_item
          this.hideLoading()
        })
      })
    },
    onPageChange(page) {
      this.currentPage = page
    }
  }
}
</script>
