<template>
  <div :style="{ padding: '24px', background: '#fff', textAlign: 'center' }">
    <div class="content">
      <a-table
        :columns="columns"
        :data-source="data"
        rowKey="ctid"
        :pagination="false"
      >
        <a slot="operate" slot-scope="scope">
          <a @click="change(scope)">更换</a>
        </a>
      </a-table>
      <changeteacher
        :ctmodalVisible="modalVisible"
        v-on:changeVisible="changeVisible"
        :ctid="ctid"
        v-on:refreshList="gettable"
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
      ctid : null,
      modalVisible: false,
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
