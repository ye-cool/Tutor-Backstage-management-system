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
<a-table :columns="columns" :data-source="data">
    <a slot="name" slot-scope="text">{{ text }}</a>
</a-table>
</div>
        </div>
</template>
<script>
const columns = [
  {
    title: '序号',
    dataIndex: 'key'
  },
  {
    title: '展示教师',
    dataIndex: 'showTeacher',
    key: 'showTeacher'
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
    showTeacher: '王老师',
    operate: '更换'
  },
  {
    key: '2',
    showTeacher: '王老师',
    operate: '更换'
  },
  {
    key: '3',
    showTeacher: '王老师',
    operate: '更换'
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
