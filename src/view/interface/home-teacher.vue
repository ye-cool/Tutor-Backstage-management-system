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
<a-table :columns="columns" :data-source="datas" rowKey=tid :pagination="pagination">
    <a slot="operate">
       <a>更换</a>
    </a>
</a-table>
</div>
        </div>
</template>
<script>
const columns = [
  {
    title: '序号',
    dataIndex: 'ctid'
  },
  {
    title: '展示教师',
    dataIndex: 'info'
  },
  {
    title: '操作',
    dataIndex: 'operate',
    ellipsis: true,
    scopedSlots: { customRender: 'operate' }
  }
]
const datas = []
const data = [
  // {
  //   key: '1',
  //   showTeacher: '王老师',
  //   operate: '更换'
  // },
  // {
  //   key: '2',
  //   showTeacher: '王老师',
  //   operate: '更换'
  // },
  // {
  //   key: '3',
  //   showTeacher: '王老师',
  //   operate: '更换'
  // }
]
export default {
  created() {
    this.gettable()
  },
  data () {
    return {
      data,
      datas,
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
      _this.axios.get('/Api/Admin/Config/Teachers', {
      })
        .then((res) => {
          console.log(res.data)
          _this.datas = []
          _this.datas = res.data.data
          console.log(_this.datas)
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
