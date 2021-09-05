<template>
<Menu>
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
<a-table :columns="columns" :data-source="data">
    <a slot="name" slot-scope="text">{{ text }}</a>
</a-table>
</div>
        </div>
</Menu>
</template>
<script>
import Menu from '../../components/menu.vue'
const columns = [
  {
    title: '昵称',
    dataIndex: 'name',
    key: 'name',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '微信号',
    dataIndex: 'wechatid',
    key: 'wechatid',
    width: 200
  },
  {
    title: '账号',
    dataIndex: 'account',
    key: 'account',
    ellipsis: true
  },
  {
    title: '操作',
    dataIndex: 'operate',
    key: 'operate',
    ellipsis: true
  }
]
const data = [
  {
    key: '1',
    name: 'John Brown',
    wechatid: '2321443413414',
    account: '8383872116',
    operate: '修改密码'
  },
  {
    key: '2',
    name: 'Jim Green',
    wechatid: '2321443413414',
    account: '8383872116',
    operate: '修改密码'
  },
  {
    key: '3',
    name: 'Joe Black',
    wechatid: '2321443413414',
    account: '8383872116',
    operate: '修改密码'
  }
]
export default {
  data () {
    return {
      data,
      columns
    }
  },
  components: {
    Menu
  },
  methods: {
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
