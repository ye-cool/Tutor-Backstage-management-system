<template>
  <div :style="{ padding: '24px', background: '#fff', textAlign: 'center' }">
    <div class="content">
      <a-table
        :columns="columns"
        :data-source="data"
        :pagination="false"
        rowKey="aid"
      >
        <a slot="operate" slot-scope="scope">
          <a @click="showModal(scope)">更换密码</a>
        </a>
      </a-table>
      <a-pagination
        :current="pagination.displayPage"
        :pageSize="pagination.displayRows"
        :total="pagination.total"
        :pageSizeOptions="pagination.pageSizeOptions"
        :showTotal="(total) => `共 ${total} 条数据`"
        showSizeChanger
        showQuickJumper
        @change="handlePageChange"
        @showSizeChange="showSizeChange"
        style="margin: 16px 0; text-align: right"
      />
      <a-modal width="500px" :visible="modalVisible" :closable="false" title="更换密码">
        <template slot="footer">
          <a-button key="back" type="primary" @click="handleCancel">
            返回
          </a-button>
          <a-button
            key="submit"
            type="primary"
            :loading="loading"
            @click="handleOk"
          >
            保存
          </a-button>
        </template>
        <a-form class="form" :form="form">
          <a-form-item label="新密码">
            <a-input v-decorator="['NewPassword']" type="text" />
          </a-form-item>
        </a-form>
      </a-modal>
    </div>
  </div>
</template>
<script>
const columns = [
  {
    title: '昵称',
    dataIndex: 'username',
    key: 'username',
  },
  {
    title: '微信昵称',
    dataIndex: 'wechat',
    key: 'wechat',
    width: 200,
  },
  {
    title: '账号',
    dataIndex: 'aid',
    key: 'aid',
    ellipsis: true,
  },
  {
    title: '密码',
    dataIndex: 'password',
    key: 'password',
    ellipsis: true,
  },
  {
    title: '操作',
    key: 'operate',
    ellipsis: true,
    scopedSlots: { customRender: 'operate' },
  },
]
var data = []
export default {
  created() {
    this.gettable()
  },
  data() {
    return {
      adminInfo: {
        pageNumber: 1,
        pageSize: 10,
      },
      data,
      columns,
      aid: null,
      form: this.$form.createForm(this),
      loading: false,
      pagination: {
        displayPage: 1,
        displayRows: 10,
        pageSize: 10, // 默认每页显示数量
        total: 0,
        pageSizeOptions: ['10', '20', '30', '50'],
      },
      modalVisible: false,
    }
  },
  methods: {
    gettable() {
      const _this = this
      _this.$api.mode
        .getAdmins({
          params: _this.adminInfo,
        })
        .then((res) => {
          console.log(res)
          _this.data = []
          _this.data = res.data.records
          _this.pagination.total = res.data.total
          console.log(_this.data)
        })
        .catch((error) => {
          console.log(error.response)
        })
    },
    onChange(value, selectedOptions) {
      console.log(value, selectedOptions)
    },
    filter(inputValue, path) {
      return path.some(
        (option) =>
          option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
      )
    },
    showModal(userInfo) {
      this.aid = null
      this.aid = userInfo.aid
      this.modalVisible = true
    },
    showSizeChange(current, pagesize) {
      this.pagination.displayRows = pagesize
      this.adminInfo.pageSize = pagesize
      this.gettable()
    },
    handlePageChange(displayPage) {
      console.log(displayPage)
      this.pagination.displayPage = displayPage
      this.adminInfo.pageNumber = displayPage
      this.gettable()
    },
    handleCancel() {
      this.modalVisible = false
    },
    handleOk(e) {
      this.loading = true
      e.preventDefault()
      this.form.validateFields((error, values) => {
        console.log('error', error)
        console.log('Received values of form: ', values)
        this.$api.mode
          .changePassword({
            aid: this.aid,
            newPassword: values.newPassword,
          })
          .then((res) => {
            console.log(res.data)
            this.gettable()
          })
          .catch((error) => {
            console.log(error.response)
          })
      })
      this.loading = false
      this.modalVisible = false
    },
  },
}
</script>

<style>
#components-layout-demo-fixed-sider .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
.teacher,
.parent,
.book,
.interface {
  padding-top: 20px;
}
.comtemt {
  padding: 24px;
}
.search {
  display: flex;
  flex-wrap: wrap;
}
.search-condition {
  display: block;
  text-align: center;
  height: 35px;
  line-height: 35px;
}
tr:last-child td {
  padding-bottom: 0;
}
</style>
