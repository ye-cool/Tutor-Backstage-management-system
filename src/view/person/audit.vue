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
          <a class="agree" @click="agree(scope)">通过</a>
          <a @click="reject(scope)">拒绝</a>
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
    </div>
  </div>
</template>
<script>
const columns = [
  {
    title: '用户名',
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
      pagination: {
        displayPage: 1,
        displayRows: 10,
        pageSize: 10, // 默认每页显示数量
        total: 0,
        pageSizeOptions: ['10', '20', '30', '50'],
      },
    }
  },

  methods: {
    gettable() {
      const _this = this
      _this.$api.mode
        .getVerifyAdmins({
          params: _this.adminInfo,
        })
        .then((res) => {
          console.log(res.data)
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
    agree(userInfo) {
      console.log(userInfo)
      const _this = this
      _this.$api.mode
        .putAdmin(userInfo.aid)
        .then((res) => {
          console.log(res.data)
        })
        .catch((error) => {
          console.log(error.response)
        })
      let key = userInfo.aid
      const dataSource = [...this.data]
      this.data = dataSource.filter(item => item.aid !== key)
    },
    reject(userInfo) {
      console.log(userInfo)
      this.$api.mode
        .deleteAdmin(userInfo.aid)
        .then((res) => {
          console.log(res.data)
        })
        .catch((error) => {
          console.log(error.response)
        })
      let key = userInfo.aid
      const dataSource = [...this.data]
      this.data = dataSource.filter((item) => item.aid !== key)
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
.agree {
  margin-right: 5px;
}
tr:last-child td {
  padding-bottom: 0;
}
</style>
