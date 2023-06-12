<template>
  <div class="dashboard">
    <div class="flex justify-between mb-6 mdmax:flex-col">
      <p class="text-2xl font-bold">Beranda</p>
      <div class="date-range relative">
        <div class="absolute left-3 top-1/2 transform -translate-y-1/2 z-1">
          <Calendar color="neutral-700" />
        </div>
        <date-range-picker v-model="dateRange" :showDropdowns="false" :timePicker="false" :timePicker24Hour="false" :ranges="false"></date-range-picker>
      </div>
    </div>
    <div class="flex justify-between gap-6 mb-6 flex-wrap md:flex-nowrap mdmax:gap-2">
      <div class="w-full md:w-1/3">
        <div class="bg-white rounded-md p-5 mdmax:p-4 mb-4">
          <h3 class="text-lg font-bold">Total Pemohon</h3>
          <div class="flex items-center py-6 border-b">
            <div class="flex-1 mb-6">
              <Reports color="neutral-700" />
            </div>
            <div class="flex-1">
              <p class="text-2xl md:text-5xl font-black mb-2">3413</p>
              <p class="text-sm text-secondary">Total pemohon berdasarkan data di 7 hari terkahir</p>
            </div>
          </div>
          <div class="flex items-end py-6">
            <div class="flex-1">
              <div class="flex items-end gap-4">
                <div class="w-full h-16 rounded-t bg-blue-700"></div>
                <div class="w-full h-24 rounded-t bg-blue"></div>
              </div>
            </div>
            <div class="flex-1">
              <div class="px-8">
                <div class="flex items-center mb-4">
                  <div class="w-4 h-4 bg-blue rounded"></div>
                  <div class="ml-3">
                    <p class="text-lg font-medium">2213</p>
                    <p class="text-xs">Pria</p>
                  </div>
                </div>
                <div class="flex items-center">
                  <div class="w-4 h-4 bg-blue-700 rounded"></div>
                  <div class="ml-3">
                    <p class="text-lg font-medium">1200</p>
                    <p class="text-xs">Wanita</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-md p-5 mdmax:p-4 mb-4">
          <h3 class="text-lg font-bold mb-4">Usia Pemohon</h3>
          <div v-for="(data, idx) in applicantAge" :key="idx" class="flex justify-between mb-2">
            <p class="font-medium">{{ data.label }}</p>
            <p class="font-light">{{ data.value }}</p>
          </div>
        </div>
        <div class="bg-white rounded-md p-5 mdmax:p-4 mb-4">
          <h3 class="text-lg font-bold mb-4">Jenis Test</h3>
          <div v-for="(data, idx) in testType" :key="idx" class="flex justify-between mb-2">
            <p class="font-medium">{{ data.label }}</p>
            <p class="font-light">{{ data.value }}</p>
          </div>
        </div>
        <div class="bg-white rounded-md p-5 mdmax:p-4 mb-4">
          <div class="flex justify-between mb-6 items-center">
            <h3 class="text-lg font-bold">Total Hasil Test</h3>
            <router-link to="/" class="text-xs text-blue hover:text-blue-500">Lihat Semua</router-link>
          </div>
          <div class="flex mb-6">
            <Male color="neutral-700" height="96" width="96" />
            <div class="flex-1 ml-4">
              <h4 class="text-lg font-bold mb-4">Pria</h4>
              <div class="flex justify-between mb-2">
                <p class="font-medium">Lulus</p>
                <p class="font-light">3100</p>
              </div>
              <div class="flex justify-between mb-2">
                <p class="font-medium">Tidak Lulus</p>
                <p class="font-light">113</p>
              </div>
            </div>
          </div>
          <div class="flex">
            <Female color="neutral-700" height="96" width="96" />
            <div class="flex-1 ml-4">
              <h4 class="text-lg font-bold mb-4">Wanita</h4>
              <div class="flex justify-between mb-2">
                <p class="font-medium">Lulus</p>
                <p class="font-light">1200</p>
              </div>
              <div class="flex justify-between mb-2">
                <p class="font-medium">Tidak Lulus</p>
                <p class="font-light">90</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full md:w-2/3">
        <div class="px-3 py-4 bg-white mb-6 p-5 mdmax:p-4 bg-white rounded-md">
          <p class="text-lg font-bold mb-4">Pemohonan Test</p>
          <LineChart :data="lineChartData" :options="lineChartOption" />
        </div>
        <div class="px-3 py-4 bg-white mb-6 p-5 mdmax:p-4 bg-white rounded-md">
          <p class="text-lg font-bold mb-4">Demography Pemohon SIM</p>
          <PieChart :data="pieChartData" :options="lineChartOption" />
        </div>
        <div class="md:flex gap-6 mdmax:gap-2 flex-col md:flex-row">
          <div class="bg-white rounded-md p-5 mdmax:p-4 mb-4 flex-1">
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-lg font-bold">Polda Terbanyak</h3>
              <router-link to="/" class="text-xs text-blue hover:text-blue-500">Lihat Semua</router-link>
            </div>
            <div v-for="(data, idx) in mostPolda" :key="idx" class="flex justify-between mb-2">
              <p class="font-medium">{{ data.label }}</p>
              <p class="font-light">{{ data.value }}</p>
            </div>
          </div>
          <div class="bg-white rounded-md p-5 mdmax:p-4 mb-4 flex-1">
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-lg font-bold">Polres Terbanyak</h3>
              <router-link to="/" class="text-xs text-blue hover:text-blue-500">Lihat Semua</router-link>
            </div>
            <div v-for="(data, idx) in mostPolres" :key="idx" class="flex justify-between mb-2">
              <p class="font-medium">{{ data.label }}</p>
              <p class="font-light">{{ data.value }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { formatDate } from '@/util'
import DateRangePicker from 'vue2-daterange-picker'
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'
const NOW = new Date()

export default {
  filters: {
    formatDate
  },
  components: {
    DateRangePicker,
    Male: () => import(/* webpackChunkName: "icon" */ '@/components/Icons/Male'),
    Female: () => import(/* webpackChunkName: "icon" */ '@/components/Icons/Female'),
    Calendar: () => import(/* webpackChunkName: "Forms" */ '@/components/Icons/Calendar'),
    Reports: () => import(/* webpackChunkName: "chart" */ '@/components/Icons/Reports'),
    LineChart: () => import(/* webpackChunkName: "chart" */ '@/components/Chart/LineChart'),
    PieChart: () => import(/* webpackChunkName: "chart" */ '@/components/Chart/PieChart')
  },
  data: () => ({
    lineChartData: {
      labels: ['4 Des', '5 Des', '6 Des', '7 Des', '8 Des', '9 Des', '10 Des'],
      datasets: [
        {
          label: 'Pria',
          backgroundColor: 'transparent',
          borderColor: '#299FD9',
          data: [200, 305, 100, 230, 190, 150, 430]
        },
        {
          label: 'Wanita',
          backgroundColor: 'transparent',
          borderColor: '#15506D',
          data: [300, 430, 100, 300, 200, 115, 600]
        }
      ]
    },
    pieChartData: {
      labels: ['P. Jawa', 'P. Sumatera', 'P. Kalimantan', 'P. Sulawesi', 'Bali'],
      datasets: [
        {
          backgroundColor: ['#1c9bef', '#00e396', '#feaf1a', '#fe4560', '#775dd0'],
          data: [300, 105, 100, 130, 190]
        }
      ]
    },
    dateRange: {
      startDate: new Date(NOW.getFullYear(), NOW.getMonth(), NOW.getDate() - 7),
      endDate: NOW
    },
    lineChartOption: { responsive: true, maintainAspectRatio: false },
    applicantAge: [
      { label: '< 17 Tahun', value: 222 },
      { label: '18 - 23 Tahun', value: 1869 },
      { label: '24 - 34 Tahun', value: 914 },
      { label: '35 - 44 Tahun', value: 325 },
      { label: '> 45 Tahun', value: 83 }
    ],
    testType: [
      { label: 'On Site (Di Tempat)', value: 230 },
      { label: 'On App', value: 3125 }
    ],
    mostPolres: [
      { label: 'Metro Jaya', value: 1011 },
      { label: 'Jakarta Utara', value: 991 },
      { label: 'Jakarta Barat', value: 981 },
      { label: 'Jakarta Selatan', value: 892 },
      { label: 'Jakarta Timur', value: 851 }
    ],
    mostPolda: [
      { label: 'Metro Jaya', value: 4021 },
      { label: 'Jawa Barat', value: 3100 },
      { label: 'Jawa Tengah', value: 2121 },
      { label: 'Jawa Timur', value: 1780 },
      { label: 'Bali', value: 1102 }
    ],
    dataIsReady: false
  }),
  computed: {
    ...mapGetters('auth', ['userData']),
    partnerId() {
      return this.userData?.user?.group_id
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
