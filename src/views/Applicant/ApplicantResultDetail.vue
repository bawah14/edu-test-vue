<template>
  <div class="result-detail">
    <div class="flex justify-between items-center mb-10 mdmax:flex-col mdmax:gap-4 mdmax:mb-6">
      <p class="text-2xl font-bold">{{ applicantResultDetail?.applicant_info?.name }}</p>
      <Button buttonText="Download PDF" :size="isMobile ? 'big_full' : 'compact'" @action="download()" />
    </div>
    <div class="bg-white p-6">
      <div class="flex justify-between gap-6 items-stretch mdmax:flex-col mdmax:w-full">
        <div class="w-3/5 flex items-stretch gap-6 mdmax:w-full mdmax:flex-col">
          <div class="flex-1">
            <p class="font-bold text-lg mb-8">Data Diri</p>
            <div class="mb-6">
              <label class="text-sm text-secondary mb-1 block">Nama</label>
              <p class="text-lg mdmax:text-base">{{ applicantResultDetail?.applicant_info?.name }}</p>
            </div>
            <div class="mb-6">
              <label class="text-sm text-secondary mb-1 block">Nomor Kependudukan (KTP)</label>
              <p class="text-lg mdmax:text-base">{{ applicantResultDetail?.applicant_info?.id_card_no }}</p>
            </div>
            <div class="">
              <label class="text-sm text-secondary mb-1 block">Jenis Kelamin</label>
              <p class="text-lg mdmax:text-base">{{ applicantResultDetail?.applicant_info?.gender === 'M' ? 'Pria' : 'Wanita' }}</p>
            </div>
          </div>
          <div class="flex-1">
            <p class="font-bold text-lg mb-8">Lokasi Test</p>
            <div class="mb-6">
              <label class="text-sm text-secondary mb-1 block">Lokasi Test</label>
              <p class="text-lg mdmax:text-base">{{ applicantResultDetail?.schedule_info?.location_test_display }}</p>
            </div>
            <div class="mb-6">
              <label class="text-sm text-secondary mb-1 block">Penanggung Jawab Psikolog</label>
              <p class="text-lg mdmax:text-base">{{ applicantResultDetail?.responsible_psychologist }}</p>
            </div>
            <div class="">
              <label class="text-sm text-secondary mb-1 block">Tanggal Test</label>
              <p class="text-lg mdmax:text-base">{{ applicantResultDetail?.schedule_info?.schedule_time | formatDate }}</p>
            </div>
          </div>
        </div>
        <div class="w-2/5 flex justify-end mdmax:w-full mdmax:justify-center">
          <div class="text-right mdmax:text-center">
            <span
              class="inline-block text-3xl whitespace-nowrap font-medium px-2 py-2 rounded-md"
              :class="[applicantResultDetail?.score_status === 'passed' ? 'bg-green-light text-green border-4 border-green' : 'bg-red-light text-system-error border-4 border-system-error']"
            >
              {{ applicantResultDetail?.score_status_display }}
            </span>
            <div class="mt-32 mdmax:mt-10">
              <qrcode-vue :value="applicantResultDetail.qr_content" :size="200" level="H" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import QrcodeVue from 'qrcode.vue'
import { formatDate } from '../../util'
import dayjs from 'dayjs'
export default {
  filters: {
    formatDate
  },
  components: {
    QrcodeVue,
    Button: () => import(/* webpackChunkName: "Button" */ '@/components/Forms/Button')
  },
  mounted() {
    this.getDetail()
  },
  computed: {
    ...mapGetters('applicant', ['applicantResultDetail']),
    ...mapGetters('common', ['isMobile']),
    applicantId() {
      return this.$route.params.id
    },
    resultId() {
      return this.$route.params.resultId
    }
  },
  methods: {
    ...mapActions('applicant', ['getApplicantResultDetail', 'downloadPDF']),
    ...mapActions('common', ['showLoading', 'hideLoading']),
    getDetail() {
      this.showLoading()
      this.getApplicantResultDetail({
        applicantId: this.applicantId,
        resultId: this.resultId
      }).then(() => {
        this.hideLoading()
      })
    },
    download() {
      // this.showLoading()
      // console.log(this.applicantResultDetail)
      const data = this.applicantResultDetail
      const sex = data.applicant_info.gender === 'M' ? 'Laki-Laki' : 'Perempuan'
      const result = data.score_status === 'passed' ? 'Memenuhi Syarat' : 'Tidak Memenuhi Syarat'
      const date = dayjs(data.created_time).format('DD/MM/YYYY')
      const area = data.schedule_info.area_display.split(' ').join('-')
      const location = data.schedule_info.location_test_display.split(' ').join('-')
      window.open(
        `${process.env.VUE_APP_BASE_HOST}/index.html?name=${data.applicant_info.name}&sex=${sex}&ktp=${data.applicant_info.id_card_no}&reg=${data.id}&date=${date}&location=${location}&area=${area}&psikolog=${data.psikolog_name}&sipp=${data.psikolog_reg_no}&sign=${data.psikolog_signature_url}&qrcode=${data.qr_content}&status=${result}`
      )
      // this.downloadPDF({
      //   applicantId: this.applicantId,
      //   resultId: this.resultId
      // }).then(response => {
      //   this.hideLoading()
      //   // window.open(URL.createObjectURL(response.data))
      //   const url = URL.createObjectURL(response.data)
      //   const a = document.createElement('a')
      //   a.download = 'Test Result.pdf'
      //   a.href = url
      //   a.target = '_self'

      //   a.click()

      //   setTimeout(function() {
      //     a.remove()
      //     URL.revokeObjectURL(url)
      //   }, 100)
      // })
    }
  }
}
</script>
