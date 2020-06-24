<template lang="pug">
  .list-table
    a-table(rowKey='id', :columns="columns", :loading="!items.pageData", :data-source="items.pageData", :pagination="ipagination" @change="tableChange")
      template(v-for="column in columns" slot-scope="text, record", :slot="column.scopedSlots ? column.scopedSlots.customRender : ''")
        slot(:name="column.scopedSlots ? column.scopedSlots.customRender : ''" v-bind="record")
</template>

<script>
import { Table } from 'ant-design-vue'

export default {
  name: 'ListTable',
  props: {
    items: {
      type: Object,
      default: null
    },
    columns: {
      type: Array,
      required: true
    },
    pagination: {
      type: [ Object, Boolean ],
      dafault: () => ({
        pageSize: 10,
        current: 1
      })
    },
    showSizeChanger: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    ATable: Table
  },
  data() {
    return {
      ipagination: typeof this.pagination === 'object'
        ? Object.assign({}, {
          ...this.pagination,
          total: 0,
          showSizeChanger: this.showSizeChanger,
        }) : this.pagination
    }
  },
  created() {
  },
  watch: {
    items(newVal) {
      this.ipagination.total = newVal.TotalCount
      this.ipagination.pageSize = newVal.pageSize
      this.ipagination.current = newVal.pageNumber
    }
  },
  methods: {
    tableChange(pagination) {
      this.$emit('tableChange', pagination)
    }
  }
}
</script>
