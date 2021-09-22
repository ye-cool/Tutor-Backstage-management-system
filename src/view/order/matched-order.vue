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
      <a-table :columns="columns" :data-source="data" :pagination="pagination">
        <template slot="teacherProfile" slot-scope="text">
          <a @click="showModal1">{{ text }}</a>
        </template>
        <template slot="parentneed" slot-scope="text">
          <a @click="showModal2">{{ text }}</a>
        </template>
        <template slot="operate" slot-scope="text">
          <a>{{ text }}</a>
        </template>
      </a-table>
    </div>
  </div>
</template>
<script>
const columns = [
  {
    title: '家长联系方式',
    dataIndex: 'parentContact',
    key: 'parentContact',
    width: 150,
  },
  {
    title: '教师联系方式',
    dataIndex: 'teacherContact',
    key: 'teacherContact',
    width: 150,
  },
  {
    title: '教师资料',
    dataIndex: 'teacherProfile',
    key: 'teacherProfile',
    ellipsis: true,
    scopedSlots: { customRender: 'teacherProfile' },
  },
  {
    title: '家长需求',
    dataIndex: 'parentneed',
    key: 'parentneed',
    ellipsis: true,
    scopedSlots: { customRender: 'parentneed' },
  },
  {
    title: '匹配方式',
    dataIndex: 'matchingMethod',
    key: 'matchingMethod',
    ellipsis: true,
  },
  {
    title: '匹配时间',
    dataIndex: 'matchingTime',
    key: 'matchingTime',
    ellipsis: true,
  },
  {
    title: '处理状态',
    dataIndex: 'processingStatus',
    key: 'processingStatus',
    ellipsis: true,
  },
  {
    title: '操作人',
    dataIndex: 'operater',
    key: 'operater',
    ellipsis: true,
  },
  {
    title: '操作',
    dataIndex: 'operate',
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
      data,
      columns,
      pagination: {
        pageSize: 10, // 默认每页显示数量
        showTotal: (total) => `总共有 ${total} 名`, // 显示总数
      },
    }
  },

  methods: {
    gettable() {
      const _this = this
      _this.axios
        .get('/Api/Admin/MatchedContracts', {
          params: {
            pageNumber: 1,
            pageSize: 5,
          },
        })
        .then((res) => {
          console.log(res.data)
          _this.data = []
          _this.data = res.data.data
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
