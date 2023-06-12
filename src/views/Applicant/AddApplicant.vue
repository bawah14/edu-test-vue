<template>
  <div class="create-applicant">
    <p class="text-2xl font-bold mb-10">Data Pemohon</p>
    <div class="bg-white">
      <div class="flex items-stretch shadow-border-b mdmax:flex-col">
        <div class="flex-1 p-6 shadow-border-r mdmax:pb-0">
          <div class="mb-6">
            <TextField label="Tanggal saat ini" v-model="payload.currentDate" disabled />
          </div>
          <div class="mb-6">
            <TextField label="Nama Lengkap" v-model="payload.applicantName" placeholder="Masukan nama lengkap" />
          </div>
          <div class="mb-6">
            <TextField label="Nomor Kependudukan (KTP)" v-model="payload.applicantIdCardNumber" placeholder="Masukan nomor KTP" />
          </div>
          <div class="">
            <label class="text-sm text-neutral-700 font-medium mb-1 inline-block">Jenis Kelamin</label>
            <CustomSelect :options="genders" optionLabel="value" v-model="payload.selectedGender" placeholder="Pilih jenis kelamin" />
          </div>
        </div>
        <div class="flex-1 p-6 shadow-border-r">
          <div class="mb-6">
            <label class="text-sm text-neutral-700 font-medium mb-1 inline-block">Hasil Kelulusan</label>
            <CustomSelect :options="result" optionLabel="value" v-model="payload.selectedResult" placeholder="Pilih lulus atau tidak lulus" />
          </div>
          <div class="mb-6" v-if="payload.selectedLocation">
            <!-- <TextField label="Lokasi Test" v-model="payload.selectedLocation.name" disabled /> -->
            <label class="text-sm text-neutral-700 font-medium mb-1 inline-block">Lokasi Test</label>
            <div class="flex items-center gap-2">
              <Place />
              <p class="text-neutral-500">{{ payload.selectedLocation.name }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-end items-center gap-2 p-6">
        <LinkButton buttonText="Batal" :url="`/applicant`" linkType="internal" type="secondary" />
        <Button buttonText="Submit" @action="submit()" :disabled="isDisabled" />
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { formatDate, formatTime, formatRCF } from '../../util'
import { isNotEmptyError } from '@/util/form-validator'
const NOW = new Date()
export default {
  filters: {
    formatDate,
    formatTime,
    formatRCF
  },
  components: {
    TextField: () => import(/* webpackChunkName: "TextField" */ '@/components/Forms/TextField'),
    CustomSelect: () => import(/* webpackChunkName: "Select" */ '@/components/Forms/CustomSelect'),
    LinkButton: () => import(/* webpackChunkName: "Button" */ '@/components/Forms/LinkButton'),
    Button: () => import(/* webpackChunkName: "Button" */ '@/components/Forms/Button'),
    Place: () => import(/* webpackChunkName: "Icons" */ '@/components/Icons/Place')
  },
  data() {
    return {
      genders: [
        {
          value: 'Pria',
          code: 'M'
        },
        {
          value: 'Wanita',
          code: 'F'
        }
      ],
      result: [
        {
          value: 'Lulus',
          code: 'passed'
        },
        {
          value: 'Tidak Lulus',
          code: 'failed'
        }
      ],
      payload: {
        selectedGender: null,
        selectedResult: null,
        applicantName: null,
        applicantIdCardNumber: null,
        currentDate: this.$options.filters.formatDate(NOW),
        selectedLocation: null
      }
    }
  },
  computed: {
    ...mapGetters('applicant', ['testLocation']),
    isDisabled() {
      return !this.validForm()
    }
  },
  mounted() {
    this.getLocation()
  },
  methods: {
    ...mapActions('applicant', ['getTestLocation', 'addApplicant']),
    ...mapActions('common', ['showLoading', 'hideLoading']),
    getLocation() {
      this.showLoading()
      this.getTestLocation().then(() => {
        this.payload.selectedLocation = this.testLocation?.[0]
        this.hideLoading()
      })
    },
    submit() {
      const constructedPayload = {
        score_status: this.payload.selectedResult.code,
        applicant_info: {
          name: this.payload.applicantName,
          gender: this.payload.selectedGender.code,
          id_card_no: this.payload.applicantIdCardNumber
        },
        schedule_info: {
          location_test_code: this.payload.selectedLocation.code,
          schedule_time: this.$options.filters.formatRCF(this.payload.currentDate)
        }
      }
      this.showLoading()
      this.addApplicant({
        payload: constructedPayload
      }).then(() => {
        this.hideLoading()
        this.$router.push('/applicant')
      })
    },
    validForm() {
      const error = isNotEmptyError(this.payload)
      return Object.keys(error).length === 0
    }
  }
}
</script>
