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
<a-table :columns="columns" :data-source="data" :pagination="pagination">
    <a slot="operate" slot-scope="">
      <a>更换密码</a>
    </a>
</a-table>
</div>
        </div>
</template>
<script>
const columns = [
  {
    title: '昵称',
    dataIndex: 'username',
    key: 'username'
  },
  {
    title: '微信昵称',
    dataIndex: 'wechat',
    key: 'wechat',
    width: 200
  },
  {
    title: '账号',
    dataIndex: 'aid',
    key: 'aid',
    ellipsis: true
  },
  {
    title: '密码',
    dataIndex: 'password',
    key: 'password',
    ellipsis: true
  },
  {
    title: '操作',
    key: 'operate',
    ellipsis: true,
    scopedSlots: { customRender: 'operate' }
  }
]
var data = [
  // {
  //   key: '1',
  //   name: 'John Brown',
  //   wechatid: '2321443413414',
  //   account: '8383872116',
  //   password: '888888',
  //   operate: '修改密码'
  // },
  // {
  //   key: '2',
  //   name: 'Jim Green',
  //   wechatid: '2321443413414',
  //   account: '8383872116',
  //   password: '888888',
  //   operate: '修改密码'
  // },
  // {
  //   key: '3',
  //   name: 'Joe Black',
  //   wechatid: '2321443413414',
  //   account: '8383872116',
  //   password: '888888',
  //   operate: '修改密码'
  // }
]
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
      _this.axios.get('/Api/Admin/Admins', {
        params: {
          pageNumber: 1,
          pageSize: 10
        }
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
