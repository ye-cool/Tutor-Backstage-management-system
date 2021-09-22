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
        <a-button key="1" type="primary">
          退出
        </a-button>
      </template></a-page-header>
<a-table :columns="columns" :data-source="data" :pagination="false" rowKey="did">
    <a slot="verifyStatus" slot-scope="text">{{ text == 0 ? '未审核' : '已通过'}}</a>
    <a slot="applyTeachers" slot-scope="text">已有{{ text }}人投递</a>
    <a slot="need">编辑</a>
    <a slot="operate" slot-scope="scope">
      <a @click="reject(scope)">结束订单 </a>
      <a>添加备注</a>
    </a>
</a-table>
</div>
</div>
</template>
<script>
const columns = [
  {
    title: '家长称谓',
    dataIndex: 'parentName',
    key: 'parentName'
  },
  {
    title: '学生年级与补习科目',
    dataIndex: 'SubjectsAndGrand',
    key: 'SubjectsAndGrand',
    width: 200
  },
  {
    title: '联系电话',
    dataIndex: 'phone',
    key: 'phone',
    ellipsis: true
  },
  {
    title: '家庭住址范围',
    dataIndex: 'address',
    key: 'address',
    ellipsis: true
  },
  {
    title: '需求查看',
    key: 'need',
    ellipsis: true,
    scopedSlots: { customRender: 'need' }
  },
  {
    title: '审核状态',
    dataIndex: 'verifyStatus',
    key: 'verifyStatus',
    ellipsis: true,
    scopedSlots: { customRender: 'verifyStatus' }
  },
  {
    title: '投递状态',
    dataIndex: 'applyTeachers',
    key: 'applyTeachers',
    ellipsis: true,
    scopedSlots: { customRender: 'applyTeachers' },
    width: 200
  },
  {
    title: '操作',
    key: 'operate',
    ellipsis: true,
    width: 200,
    scopedSlots: { customRender: 'operate' },
  }
]
var data = []
export default {
  created() {
    this.gettable()
  },
  data () {
    return {
      data,
      columns,
      pagination: {
        pageSize: 10, // 默认每页显示数量
        showTotal: total => `总共有 ${total} 名`// 显示总数
      }
    }
  },
  methods: {
    gettable() {
      const _this = this
      _this.$api.mode.getUnmatchedContracts({
        params: {
          pageNumber: 1,
          pageSize: 5
        }
      })
        .then((res) => {
          console.log(res.data)
          _this.data = []
          _this.data = res.data
          console.log(_this.data)
        })
        .catch((error) => {
          console.log(error.response)
        })
    },
    onChange (value, selectedOptions) {
      console.log(value, selectedOptions)
    },
    filter (inputValue, path) {
      return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1)
    },
    reject(userInfo){
      console.log(userInfo)
      this.$api.mode.deleteDemand(`${userInfo.did}`)
      .then((res) => {
          console.log(res)
          this.gettable()
        })
        .catch((error) => {
          console.log(error.response)
        })
    }
  }
}
</script>

<style>
#components-layout-demo-fixed-sider .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
.teacher,.parent,.book,.interface{
  padding-top: 20px;
}
.comtemt{
  padding: 24px;
}
.search{
  display: flex;
  flex-wrap: wrap;
}
.search-condition{
    display: block;
    text-align:center;
    height: 35px;
    line-height: 35px;
}
tr:last-child td {
  padding-bottom: 0;
}
</style>
