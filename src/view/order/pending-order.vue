<template>
  <div :style="{ padding: '24px', background: '#fff', textAlign: 'center' }">
    <div class="content">
      <a-table
        :columns="columns"
        :data-source="data"
        :pagination="false"
        rowKey="did"
      >
        <a slot="verifyStatus" slot-scope="text">{{
          text == 0 ? '未审核' : '已通过'
        }}</a>
        <a slot="applyTeachers" slot-scope="text">已有{{ text }}人投递</a>
        <a slot="need">编辑</a>
        <a slot="operate" slot-scope="scope">
          <a @click="reject(scope)">结束订单 </a>
          <a>添加备注</a>
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
    title: '家长称谓',
    dataIndex: 'parentName',
    key: 'parentName',
  },
  {
    title: '学生年级与补习科目',
    dataIndex: 'SubjectsAndGrand',
    key: 'SubjectsAndGrand',
    width: 200,
  },
  {
    title: '联系电话',
    dataIndex: 'phone',
    key: 'phone',
    ellipsis: true,
  },
  {
    title: '家庭住址范围',
    dataIndex: 'address',
    key: 'address',
    ellipsis: true,
  },
  {
    title: '需求查看',
    key: 'need',
    ellipsis: true,
    scopedSlots: { customRender: 'need' },
  },
  {
    title: '审核状态',
    dataIndex: 'verifyStatus',
    key: 'verifyStatus',
    ellipsis: true,
    scopedSlots: { customRender: 'verifyStatus' },
  },
  {
    title: '投递状态',
    dataIndex: 'applyTeachers',
    key: 'applyTeachers',
    ellipsis: true,
    scopedSlots: { customRender: 'applyTeachers' },
    width: 200,
  },
  {
    title: '操作',
    key: 'operate',
    ellipsis: true,
    width: 200,
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
      orderInfo: {
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
        .getUnmatchedContracts({
          params: _this.orderInfo,
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
    reject(userInfo) {
      console.log(userInfo)
      this.$api.mode
        .deleteDemand(`${userInfo.did}`)
        .then((res) => {
          console.log(res)
          this.gettable()
        })
        .catch((error) => {
          console.log(error.response)
        })
      let key = userInfo.did
      const dataSource = [...this.data]
      this.data = dataSource.filter((item) => item.did !== key)
    },
    showSizeChange(current, pagesize) {
      this.pagination.displayRows = pagesize
      this.orderInfo.pageSize = pagesize
      this.gettable()
    },
    handlePageChange(displayPage) {
      console.log(displayPage)
      this.pagination.displayPage = displayPage
      this.orderInfo.pageNumber = displayPage
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
tr:last-child td {
  padding-bottom: 0;
}
</style>
