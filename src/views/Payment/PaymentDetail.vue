<template>
  <div class="payment-detail">
    <div class="flex items-center justify-between mb-6 mdmax:flex-col mdmax:gap-4">
      <p class="text-2xl font-bold mdmax:text-lg">{{ paymentDetail.id }} / {{ paymentDetail?.schedule_info?.booking_code }}</p>
      <div class="flex gap-2">
        <LinkButton buttonText="Kembali" url="/payment" type="secondary" />
        <Button
          buttonText="Set Lunas"
          type="primary"
          :icon="() => import(/* webpackChunkName: 'icon' */ '@/components/Icons/CheckMark')"
          @action="update()"
          v-if="paymentDetail?.status !== 'settlement'"
        />
      </div>
    </div>
    <div class="bg-white">
      <div class="flex items-stretch shadow-border-b mdmax:flex-col">
        <div class="w-3/5 shadow-border-r p-4 mdmax:shadow-none mdmax:w-full">
          <p class="font-bold text-lg mb-8 mdmax:text-base">Data Diri</p>
          <div class="flex items-start mb-4 mdmax:gap-6">
            <div class="flex-1">
              <label class="text-sm text-secondary mb-1 block">Nama</label>
              <p class="text-lg mdmax:text-base">{{ paymentDetail?.applicant_info?.name }}</p>
            </div>
            <div class="flex-1">
              <label class="text-sm text-secondary mb-1 block">Alamat Email</label>
              <p class="text-lg mdmax:text-base">{{ paymentDetail?.applicant_info?.email }}</p>
            </div>
          </div>
          <div class="flex items-start mb-4 mdmax:gap-6">
            <div class="flex-1">
              <label class="text-sm text-secondary mb-1 block">Nomor KTP</label>
              <p class="text-lg mdmax:text-base mdmax:break-all">{{ paymentDetail?.applicant_info?.id_card_no }}</p>
            </div>
            <div class="flex-1">
              <label class="text-sm text-secondary mb-1 block">Nomor Handphone</label>
              <p class="text-lg mdmax:text-base">{{ paymentDetail?.applicant_info?.phone_no }}</p>
            </div>
          </div>
          <div class="flex items-start mb-4 mdmax:gap-6">
            <div class="flex-1">
              <label class="text-sm text-secondary mb-1 block">Tempat Lahir</label>
              <p class="text-lg mdmax:text-base">{{ paymentDetail?.applicant_info?.pob }}</p>
            </div>
            <div class="flex-1">
              <label class="text-sm text-secondary mb-1 block">Alamat rumah</label>
              <p class="text-lg mdmax:text-base">{{ paymentDetail?.applicant_info?.address }}</p>
            </div>
          </div>
          <div class="flex items-start mb-4 mdmax:gap-6">
            <div class="flex-1">
              <label class="text-sm text-secondary mb-1 block">Tanggal Lahir</label>
              <p class="text-lg mdmax:text-base">{{ paymentDetail?.applicant_info?.dob | formatDate }}</p>
            </div>
            <div class="flex-1">
              <label class="text-sm text-secondary mb-1 block">RT/RW</label>
              <p class="text-lg mdmax:text-base">{{ paymentDetail?.applicant_info?.rtrw }}</p>
            </div>
          </div>
          <div class="flex items-start mb-4 mdmax:gap-6">
            <div class="flex-1">
              <label class="text-sm text-secondary mb-1 block">Jenis Kelamin</label>
              <p class="text-lg mdmax:text-base">{{ paymentDetail?.applicant_info?.gender === 'M' ? 'Laki-laki' : 'Perempuan' }}</p>
            </div>
            <div class="flex-1">
              <label class="text-sm text-secondary mb-1 block">Kel / Desa</label>
              <p class="text-lg mdmax:text-base">{{ paymentDetail?.applicant_info?.village }}</p>
            </div>
          </div>
          <div class="flex items-start mb-4 mdmax:gap-6">
            <div class="flex-1">
              <label class="text-sm text-secondary mb-1 block">Golongan Darah</label>
              <p class="text-lg mdmax:text-base">{{ paymentDetail?.applicant_info?.blood_type }}</p>
            </div>
            <div class="flex-1">
              <label class="text-sm text-secondary mb-1 block">Kecamatan</label>
              <p class="text-lg mdmax:text-base">{{ paymentDetail?.applicant_info?.subdistrict }}</p>
            </div>
          </div>
          <div class="flex items-start mb-4 mdmax:gap-6">
            <div class="flex-1">
              <label class="text-sm text-secondary mb-1 block">Pekerjaan</label>
              <p class="text-lg mdmax:text-base">{{ paymentDetail?.applicant_info?.job_type }}</p>
            </div>
            <div class="flex-1">
              <label class="text-sm text-secondary mb-1 block">Kode Pos</label>
              <p class="text-lg mdmax:text-base">{{ paymentDetail?.applicant_info?.postal_code }}</p>
            </div>
          </div>
        </div>
        <div class="w-2/5 p-4 mdmax:w-full">
          <div class="mb-8">
            <p class="font-bold text-lg mb-8">Foto Selfie</p>
            <img :src="paymentDetail?.applicant_info?.selfie_pict" class=" mdmax:w-full max-h-44" />
          </div>
          <div class="mb-8">
            <p class="font-bold text-lg mb-8">Foto KTP</p>
            <img :src="paymentDetail?.applicant_info?.selfie_id_pict" class=" mdmax:w-full max-h-44" />
          </div>
        </div>
      </div>
      <div class="p-4">
        <p class="font-bold text-lg mb-8">Jadwal booking test</p>
        <div class="flex gap-6 mdmax:flex-col">
          <div class="flex-1">
            <div class="flex items-start mb-4 mdmax:gap-6">
              <div class="flex-1">
                <label class="text-sm text-secondary mb-1 block">Wilayah</label>
                <p class="text-lg mdmax:text-base">{{ paymentDetail?.schedule_info?.area_display }}</p>
              </div>
            </div>
            <div class="flex items-start mb-4 mdmax:gap-6 mdmax:mb-0">
              <div class="flex-1">
                <label class="text-sm text-secondary mb-1 block">Lokasi Test</label>
                <p class="text-lg mdmax:text-base">{{ paymentDetail?.schedule_info?.location_test_display }}</p>
              </div>
            </div>
          </div>
          <div class="flex-1">
            <div class="flex items-start mb-4 mdmax:gap-6">
              <div class="flex-1">
                <label class="text-sm text-secondary mb-1 block">Tanggal Booking Test</label>
                <p class="text-lg mdmax:text-base">{{ paymentDetail?.schedule_info?.schedule_time | formatDate }}</p>
              </div>
            </div>
            <div class="flex items-start mb-4 mdmax:gap-6 mdmax:mb-0">
              <div class="flex-1">
                <label class="text-sm text-secondary mb-1 block">Waktu Test</label>
                <p class="text-lg mdmax:text-base">{{ paymentDetail?.schedule_info?.schedule_time | formatTime }} WIB</p>
              </div>
            </div>
          </div>
          <div class="flex-1">
            <div class="flex items-start mb-4 mdmax:gap-6">
              <div class="flex-1">
                <label class="text-sm text-secondary mb-1 block">Kode Booking </label>
                <p class="text-lg mdmax:text-base">{{ paymentDetail?.schedule_info?.booking_code }}</p>
              </div>
            </div>
            <div class="flex items-start mb-4 mdmax:gap-6 mdmax:mb-0">
              <div class="flex-1">
                <label class="text-sm text-secondary mb-1 block">Status Pembayaran</label>
                <span
                  class="inline-block text-sm font-medium px-2 py-1 rounded-md"
                  :class="[paymentDetail?.status === 'settlement' ? 'bg-green-light text-green' : 'bg-yellow-light text-system-warning']"
                >
                  {{ paymentDetail?.status_display }}
                </span>
              </div>
            </div>
          </div>
          <div class="flex-1">
            <div class="flex items-start mb-4 mdmax:gap-6">
              <div class="flex-1">
                <label class="text-sm text-secondary mb-1 block">Metode Pembayaran</label>
                <p class="text-lg mdmax:text-base">{{ paymentDetail?.payment_method_display }}</p>
              </div>
            </div>
            <!-- <div class="flex items-start mb-4 mdmax:gap-6">
              <div class="flex-1">
                <Button buttonText="Update Pembayaran" type="primary" @action="toggleConfirmation()" v-if="paymentDetail?.payment_method === 'OFFLINE'" />
              </div>
            </div> -->
          </div>
        </div>
      </div>
    </div>
    <Modal :modalVisible="visibleConfirmationModal" @close="toggleConfirmation()" width="600px" id="confirmation-modal">
      <template slot="modal-content">
        <div class="flex items-center justify-start gap-6 mb-6">
          <span class="flex-shrink-0"><Alert color="neutral-700"/></span>
          <div class="flex-col flex gap-2 items-start">
            <p class="text-2xl font-bold">Anda Yakin?</p>
            <p class="text-sm text-neutral-500 text-left">Apakah Anda yakin akan mengubah status pembayaran menjadi "<strong>Pembayaran Diterima</strong>"?</p>
          </div>
        </div>
        <div class="flex justify-end gap-4">
          <Button buttonText="Tidak" type="secondary" @action="toggleConfirmation()" />
          <Button buttonText="Ya" type="primary" @action="confirmEdit()" />
        </div>
      </template>
    </Modal>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { currencyFormat, formatDate, formatTime } from '../../util'
export default {
  filters: {
    currencyFormat,
    formatDate,
    formatTime
  },
  components: {
    Button: () => import(/* webpackChunkName: "Button" */ '@/components/Forms/Button'),
    LinkButton: () => import(/* webpackChunkName: "Button" */ '@/components/Forms/LinkButton'),
    Modal: () => import(/* webpackChunkName: "Modal" */ '@/components/Modal/Modal'),
    Alert: () => import(/* webpackChunkName: "Icons" */ '@/components/Icons/Alert')
  },
  data() {
    return {
      visibleConfirmationModal: false
    }
  },
  computed: {
    ...mapGetters('payment', ['paymentDetail']),
    paymentId() {
      return this.$route.params.id
    },
    bookingCode() {
      return this.paymentDetail?.schedule_info?.booking_code
    }
  },
  mounted() {
    this.getPaymentDetailInformation()
  },
  methods: {
    ...mapActions('payment', ['getPaymentDetail', 'setPaymentComplete']),
    ...mapActions('common', ['showLoading', 'hideLoading', 'setToast']),
    ...mapActions('applicant', ['updatePaymentStatus']),
    confirmEdit() {
      this.showLoading()
      this.toggleConfirmation()
      this.updatePaymentStatus({
        booking_id: this.bookingCode,
        payload: {
          payment_status: 'paid'
        }
      }).then(() => {
        this.hideLoading()
        this.getPaymentDetailInformation()
      })
    },
    toggleConfirmation() {
      this.visibleConfirmationModal = !this.visibleConfirmationModal
    },
    getPaymentDetailInformation() {
      this.showLoading()
      this.getPaymentDetail({ id: this.paymentId }).then(() => {
        this.hideLoading()
      })
    },
    update() {
      this.showLoading()
      this.setPaymentComplete({
        id: this.paymentId
      }).then(() => {
        this.hideLoading()
        this.setToast({
          options: {
            type: 'success',
            duration: 2000,
            primaryText: 'Status pembayaran telah berhasil berubah',
            secondaryText: '',
            callback: this.handleCallback,
            icon: () => import('@/components/Icons/Success')
          }
        })
      })
    },
    handleCallback() {
      this.getPaymentDetailInformation()
    }
  }
}
</script>
