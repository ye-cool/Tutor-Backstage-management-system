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
    title: '家长称谓',
    dataIndex: 'name',
    key: 'name',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '学生年级与补习科目',
    dataIndex: 'SubjectsAndGrand',
    key: 'SubjectsAndGrand',
    width: 200
  },
  {
    title: '联系电话',
    dataIndex: 'TEL',
    key: 'TEL',
    ellipsis: true
  },
  {
    title: '家庭住址范围',
    dataIndex: 'home',
    key: 'home',
    ellipsis: true
  },
  {
    title: '需求查看',
    dataIndex: 'need',
    key: 'need',
    ellipsis: true
  },
  {
    title: '审核状态',
    dataIndex: 'dataStatus',
    key: 'dataStatus',
    ellipsis: true
  },
  {
    title: '投递状态',
    dataIndex: 'deliveryStatus',
    key: 'deliveryStatus',
    ellipsis: true
  },
  {
    title: '操作',
    dataIndex: 'operate',
    key: 'operate',
    ellipsis: true,
    width: 200
  }
]
const data = [
  {
    key: '1',
    name: 'John Brown',
    SubjectsAndGrand: '高中数学',
    TEL: '13235983145',
    home: '成华区',
    need: '编辑',
    dataStatus: '待审核',
    deliveryStatus: '已通过',
    operate: '结束订单 添加备注'
  },
  {
    key: '2',
    name: 'Jim Green',
    SubjectsAndGrand: '高中数学',
    TEL: '13235983145',
    home: '成华区',
    need: '编辑',
    dataStatus: '待审核',
    deliveryStatus: '已通过',
    operate: '结束订单 添加备注'
  },
  {
    key: '3',
    name: 'Joe Black',
    SubjectsAndGrand: '高中数学',
    TEL: '13235983145',
    home: '成华区',
    need: '编辑',
    dataStatus: '待审核',
    deliveryStatus: '已通过',
    operate: '结束订单 添加备注'
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
