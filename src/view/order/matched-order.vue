<template>
  <div :style="{ padding: '24px', background: '#fff', textAlign: 'center' }">
    <div class="content">
      <a-page-header
        style="border: 1px solid rgb(235, 237, 240)"
        title="Title"
        sub-title="This is a subtitle"
      >
        <template slot="extra">
          <span>管理员A</span>
          <a-button key="1" type="primary"> 退出 </a-button>
        </template></a-page-header
      >
      <a-table :columns="columns" :data-source="data" :pagination="false">
        <template slot="teacherProfile">
          <a @click="showModal1">查看</a>
        </template>
        <template slot="parentneed">
          <a @click="showModal2">查看</a>
        </template>
        <template slot="contractStatus" slot-scope="text">
          <a>{{ text == 1 ? '家长预约' : '教师投递' }}</a>
        </template>
        <template slot="processStatus" slot-scope="text">
          <a>{{ text == 0 ? '待处理' : '已完成' }}</a>
        </template>
        <template slot="operate" slot-scope="scope">
          <a @click="reject(scope)">结束订单 </a>
          <a>添加备注</a>
        </template>
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
    title: '家长联系方式',
    dataIndex: 'parentPhone',
    key: 'parentPhone',
    width: 150,
  },
  {
    title: '教师联系方式',
    dataIndex: 'teacherPhone',
    key: 'teacherPhone',
    width: 150,
  },
  {
    title: '教师资料',
    key: 'teacherProfile',
    ellipsis: true,
    scopedSlots: { customRender: 'teacherProfile' },
  },
  {
    title: '家长需求',
    key: 'parentneed',
    ellipsis: true,
    scopedSlots: { customRender: 'parentneed' },
  },
  {
    title: '匹配方式',
    dataIndex: 'contractStatus',
    key: 'contractStatus',
    ellipsis: true,
    scopedSlots: { customRender: 'contractStatus' },
  },
  {
    title: '匹配时间',
    dataIndex: 'contractTime',
    key: 'contractTime',
    ellipsis: true,
  },
  {
    title: '处理状态',
    dataIndex: 'processStatus',
    key: 'processStatus',
    ellipsis: true,
    scopedSlots: { customRender: 'processStatus' },
  },
  {
    title: '操作人',
    dataIndex: 'admin',
    key: 'admin',
    ellipsis: true,
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
        .getMatchedContracts({
          params: _this.orderInfo,
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
    showModal1() {},
    showModal2() {},
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
