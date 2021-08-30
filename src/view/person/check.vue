<template>
  <a-layout id="components-layout-demo-fixed-sider">
    <a-layout-sider :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }">
      <div class="logo" />
      <a-menu theme="dark" mode="inline"
      :default-selected-keys="['$route.path']"
      :default-open-keys="['$route.path']">
        <a-menu-item key="1" class="teacher">
          <router-link to="/teacher"></router-link>
          <a-icon type="team" />
          <span class="nav-text">教师信息管理</span>
        </a-menu-item>
        <a-menu-item key="2" class="parent">
          <router-link to="/parent"></router-link>
          <a-icon type="team" />
          <span class="nav-text">家长需求管理</span>
        </a-menu-item>
        <a-sub-menu key="sub1">
          <span slot="title">
          <a-icon type="book" />
          <span class="nav-text">订单信息管理</span>
          </span>
          <a-menu-item key="3">
          <router-link to="/matched-order"></router-link>
          已匹配订单
        </a-menu-item>
        <a-menu-item key="4">
        <router-link to="/pending-order"></router-link>
          待匹配订单
        </a-menu-item>
      </a-sub-menu>
        <a-sub-menu key="sub2">
          <span slot="title"><a-icon type="control" /><span class="nav-text">界面设置管理</span></span>
          <a-menu-item key="5">
          <router-link to="/home-teacher"></router-link>
          首页教师展示
        </a-menu-item>
        <a-menu-item key="6">
          <router-link to="/banner"></router-link>
          banner设置
        </a-menu-item>
      </a-sub-menu>
        <a-sub-menu key="sub3">
          <span slot="title"><a-icon type="control" /><span class="nav-text">人员管理</span></span>
          <a-menu-item key="7">
            <router-link to="/audit"></router-link>
          审核管理员注册
        </a-menu-item>
        <a-menu-item key="8">
          <router-link to="/check"></router-link>
          查看管理员信息
        </a-menu-item>
      </a-sub-menu>

      </a-menu>
    </a-layout-sider>
    <a-layout :style="{ marginLeft: '200px' }">
      <a-layout-header :style="{ background: '#fff', padding: 0 }" />
      <a-layout-content :style="{ margin: '24px 16px 0', overflow: 'initial' }">
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
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
const columns = [
  {
    title: '昵称',
    dataIndex: 'name',
    key: 'name',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '微信号',
    dataIndex: 'age',
    key: 'age',
    width: 200
  },
  {
    title: '账号',
    dataIndex: 'address',
    key: 'school',
    ellipsis: true
  },
  {
    title: '密码',
    dataIndex: 'address',
    key: 'school',
    ellipsis: true
  },
  {
    title: '操作',
    dataIndex: 'address',
    key: 'address 6',
    ellipsis: true
  }
]
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park, New York No. 1 Lake Park',
    tags: ['nice', 'developer']
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 2 Lake Park, London No. 2 Lake Park',
    tags: ['loser']
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park, Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher']
  }
]
export default {
  data () {
    return {
      data,
      columns
    }
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
