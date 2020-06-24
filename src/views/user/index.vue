<template lang="pug">
  div
    filter-form(:filterFormStates="getFilterFormStates()", @search="search")
    list-table(:items="dataItems", :columns="getColumns()", :pagination="pagination" @tableChange="paginationChange")
      template(slot="id" slot-scope="item")
        router-link(:to="{name: 'userDetail', params:{id: item.id}}") {{ item.id }}
      template(slot="status" slot-scope="item")
        span {{ ConvertNormalStatus(item.status) }}
      template(slot="action" slot-scope="item")
        a-button(size="small" @click="resetPassword(item)") 重置密码
        a-button(size="small" @click="updateInfo(item)") 修改信息
    reset-password(ref="resetPassword", :user="user")
    update-info(ref="updateInfo", :user="user", @afterClose="afterClose")
</template>

<script>
import { FilterMixin, ListMixin } from 'components/mixin/list-filter'
import ResetPassword from 'components/modals/user-reset-password'
import UpdateInfo from 'components/modals/user-update-info'
import { ConvertNormalStatus } from 'components/converters/normal-status'

import { datetime, normalStatus } from 'utils/form'

import userApi from 'apis/user'

export default {
  name: 'User',
  components: {
    ResetPassword,
    UpdateInfo
  },
  mixins: [
    FilterMixin,
    ListMixin
  ],
  data() {
    return {
      user: {},
      ConvertNormalStatus
    }
  },
  methods: {
    afterClose() {
      this.loadItems()
    },
    getColumns() {
      return [
        {
          title: 'id',
          dataIndex: 'id',
          scopedSlots: { customRender: 'id' }
        },
        {
          title: '用户名',
          dataIndex: 'username'
        },
        {
          title: '手机',
          dataIndex: 'mobile'
        },
        {
          title: '邮箱',
          dataIndex: 'email'
        },
        {
          title: '状态',
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' }
        },
        {
          title: '操作',
          key: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ]
    },
    getFilterFormStates() {
      return {
        form: {
          layout: 'inline'
        },
        username: {
          label: '用户名'
        },
        mobile: {
          label: '手机'
        },
        status: normalStatus(),
        datetime: datetime()
      }
    },
    loadItems() {
      const params = {
        pagenumber: this.pagination.current,
        pagesize: this.pagination.pageSize,
        ...this.params
      }
      userApi.listUser(params).then(data => {
        this.dataItems = data
      })
    },
    resetPassword(user) {
      this.user = user
      this.$refs.resetPassword.show()
    },
    updateInfo(user) {
      this.user = user
      this.$refs.updateInfo.show()
    }
  }
}
</script>
