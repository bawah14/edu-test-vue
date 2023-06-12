<template>
  <div>
    <div class="tabs flex justify-center items-center  w-1/2 gap-2 text-primary-500">
      <div v-for="(tab, index) in tabs" :key="index" class="flex-1">
        <a
          :href="tab.href"
          @click="selectTab(tab)"
          :class="{ 'is-active bg-primary-500 text-white font-medium': tab.isActive }"
          class="text-center border border-primary-500 border-b-0 py-2 rounded-t-lg block transition-all"
          >{{ tab.name }}</a
        >
      </div>
    </div>
    <div class="tabs-details border p-6 border-primary-500 rounded-b-md">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    tabs: []
  }),
  created() {
    this.tabs = this.$children
  },
  methods: {
    selectTab: function(selectedTab) {
      this.tabs.forEach(tab => {
        tab.isActive = tab.name == selectedTab.name
      })
    }
  }
}
</script>
