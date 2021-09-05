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
</a-table>
</div>
        </div>
</template>
<script>
const columns = [
  {
    title: '家长联系方式',
    dataIndex: 'parentContact',
    key: 'parentContact'
  },
  {
    title: '教师联系方式',
    dataIndex: 'teacherContact',
    key: 'teacherContact',
    width: 200
  },
  {
    title: '教师资料',
    dataIndex: 'teacherProfile',
    key: 'teacherProfile',
    ellipsis: true
  },
  {
    title: '家长需求',
    dataIndex: 'parentneed',
    key: 'parentneed',
    ellipsis: true
  },
  {
    title: '匹配方式',
    dataIndex: 'matchingMethod',
    key: 'matchingMethod',
    ellipsis: true
  },
  {
    title: '匹配时间',
    dataIndex: 'matchingTime',
    key: 'matchingTime',
    ellipsis: true
  },
  {
    title: '处理状态',
    dataIndex: 'processingStatus',
    key: 'processingStatus',
    ellipsis: true
  },
  {
    title: '操作人',
    dataIndex: 'operater',
    key: 'operater',
    ellipsis: true
  },
  {
    title: '操作',
    dataIndex: 'operate',
    key: 'operate',
    ellipsis: true,
    width: 200
  },
]
const data = [
  {
    key: '1',
    parentContact: '15837483728',
    teacherContact: '17584739483',
    teacherProfile: '查看',
    parentneed: '查看',
    matchingMethod: '家长预约',
    matchingTime: '2021.8.9 17.45',
    processingStatus: '待处理',
    operater: '无',
    operate: '结束订单 添加备注'
  },
  {
    key: '2',
    parentContact: '15837483728',
    teacherContact: '17584739483',
    teacherProfile: '查看',
    parentneed: '查看',
    matchingMethod: '家长预约',
    matchingTime: '2021.8.9 17.45',
    processingStatus: '待处理',
    operater: '无',
    operate: '结束订单 添加备注'
  },
  {
    key: '3',
    parentContact: '15837483728',
    teacherContact: '17584739483',
    teacherProfile: '查看',
    parentneed: '查看',
    matchingMethod: '家长预约',
    matchingTime: '2021.8.9 17.45',
    processingStatus: '待处理',
    operater: '无',
    operate: '结束订单 添加备注'
  },
]
export default {
  data() {
    return {
      data,
      columns,
    }
  },

  methods: {
    onChange(value, selectedOptions) {
      console.log(value, selectedOptions)
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
