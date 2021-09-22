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
      <a-table
        :columns="columns"
        :data-source="data"
        rowKey="tid"
        :pagination="pagination"
      >
        <a slot="operate" slot-scope="scope">
          <a @click="change(scope)">更换</a>
        </a>
      </a-table>
      <changeteacher
        :ctmodalVisible="modalVisible"
        v-on:changeVisible="changeVisible"
        :ctid="ctid"
      >
      </changeteacher>
    </div>
  </div>
</template>
<script>
import changeteacher from '../../components/changeteacher.vue'
const columns = [
  {
    title: '序号',
    dataIndex: 'ctid',
  },
  {
    title: '展示教师',
    dataIndex: 'info.name',
  },
  {
    title: '操作',
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
      data,
      columns,
      ctid : Number,
      modalVisible: false,
      pagination: {
        pageSize: 10, // 默认每页显示数量
        showTotal: (total) => `总共有 ${total} 名`, // 显示总数
      },
    }
  },
  components: {
    changeteacher,
  },
  methods: {
    gettable() {
      const _this = this
      _this.$api.mode
        .getAdminTeacher()
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
    onChange(value, selectedOptions) {
      console.log(value, selectedOptions)
    },
    changeVisible(value) {
      this.modalVisible = value
    },
    change(userInfo) {
      console.log(userInfo.ctid)
      this.modalVisible = true
      this.ctid = null
      this.ctid = userInfo.ctid
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
