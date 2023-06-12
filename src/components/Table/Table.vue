<template>
  <div class="table-component" :class="{ compact: compact }">
    <template v-if="!isMobile">
      <table class="w-full">
        <thead>
          <tr>
            <td v-for="(column, index) in columns" :key="'columns-' + index" class="whitespace-nowrap">{{ column.label }}</td>
          </tr>
        </thead>
        <tbody>
          <template v-if="list?.length > 0">
            <tr v-for="(entry, idx) in list" :key="'entry-' + idx">
              <td v-for="(column, index) in columns" :key="'columns-' + index" class="align-middle leading-5">
                <slot name="table-row" :entry="entry" :column="column" :index="idx" />
              </td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td :colspan="columns?.length" class="text-center empty">
                <div class="flex justify-center items-center w-full flex-col gap-2">
                  <p class="">Data tidak tersedia</p>
                </div>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </template>
    <template v-else>
      <div v-for="(entry, idx) in list" :key="'entry-' + idx" class="mb-6 row">
        <div class="flex items-stretch row-item" v-for="(column, index) in columns" :key="'columns-' + index">
          <div class="w-36 flex items-center flex-shrink-0 font-medium bg-neutral-100 px-3 py-4 text-sm shadow-border-b">{{ column.label }}</div>
          <div class="w-full px-3 py-4 text-sm shadow-border-b bg-white break-all">
            <slot name="table-row" :entry="entry" :column="column" :index="idx" />
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    list: {
      type: Array,
      default: () => []
    },
    compact: Boolean
  },
  computed: {
    ...mapGetters('common', ['isMobile'])
  }
}
</script>
<style lang="scss">
.table-component {
  min-height: 480px;
  thead {
    tr {
      td {
        color: #101840;
        font-weight: 500;
        background-color: #e7e7e7;
        padding: 12px 8px;
        box-shadow: inset 0px -1px 0px rgba(206, 213, 222, 0.5);
      }
    }
  }
  tbody {
    tr {
      td {
        background-color: #fff;
        padding: 12px 8px;
        box-shadow: inset 0px -1px 0px rgba(206, 213, 222, 0.5);
      }
    }
  }
}
.row {
  &-item {
    &:last-child {
      .shadow-border-b {
        // box-shadow: none;
      }
    }
  }
}
.compact {
  min-height: 0 !important;
}
.empty {
  height: 400px;
}
</style>
