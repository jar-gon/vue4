import { Button } from 'ant-design-vue'
import FilterForm from 'components/utils/filter-form'
import ListTable from 'components/utils/list-table'

export const FilterMixin = {
  data() {
    return {
      params: {}
    }
  },
  components: {
    FilterForm
  },
  methods: {
    search(values) {
      this.params = values
      this.pagination.current = 1
      this.loadItems()
    }
  }
}

export const ListMixin = {
  data() {
    return {
      dataItems: {},
      pagination: {
        pageSize: 2,
        current: 1
      }
    }
  },
  components: {
    AButton: Button,
    ListTable
  },
  created() {
    this.loadItems()
  },
  methods: {
    paginationChange(pagination) {
      this.pagination.current = pagination.current
      this.pagination.pageSize = pagination.pageSize
      this.loadItems()
    }
  }
}
