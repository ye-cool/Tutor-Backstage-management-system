<template>
<div :style="{ padding: '24px', background: '#fff', textAlign: 'center' }">
<div class="content">
    <a-page-header
    style="border: 1px solid rgb(235, 237, 240)"
    title="家长端banner"
    sub-title="This is a subtitle"
  >
   <template slot="extra">
       <span>管理员A</span>
        <a-button key="1" type="primary">
          退出
        </a-button>
      </template></a-page-header>
<a-table :columns="columns" :data-source="datas1" rowKey=ciid :pagination="pagination">
    <a slot="operate">
      <a>编辑</a>
    </a>
</a-table>
</div>
<div class="content">
    <a-page-header
    style="border: 1px solid rgb(235, 237, 240)"
    title="教师端banner"
    sub-title="This is a subtitle"
  >
   <template slot="extra">
      </template></a-page-header>
<a-table :columns="columns" :data-source="datas2" rowKey=ciid :pagination="pagination">
    <a slot="operate">
      <a>编辑</a>
    </a>
</a-table>
</div>
</div>
</template>
<script>
const columns = [
  {
    title: '序号',
    dataIndex: 'ciid'
  },
  {
    title: 'banner海报',
    dataIndex: 'image'
  },
  {
    title: '链接',
    dataIndex: 'url'
  },
  {
    title: '操作',
    ellipsis: true,
    scopedSlots: { customRender: 'operate' }
  }
]
const datas1 = []
const datas2 = []
// const data = [
// {
//   key: '1',
//   bannerPoster: 'banner1.png',
//   link: 'https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg',
//   operate: '编辑'
// },
// {
//   key: '2',
//   bannerPoster: 'banner1.png',
//   link: 'https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg',
//   operate: '编辑'
// },
// {
//   key: '3',
//   bannerPoster: 'banner1.png',
//   link: 'https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg',
//   operate: '编辑'
// }
// ]
export default {
  created() {
    this.gettable()
  },
  data () {
    return {
      datas1,
      datas2,
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
      _this.axios.get('/Api/Admin/Config/Images', {
      })
        .then((res) => {
          console.log(res.data)
          _this.datas1 = []
          _this.datas2 = []
          res.data.data.forEach((item, ciid) => {
            if (ciid <= 2) {
              _this.datas1.push(item)
            } else {
              _this.datas2.push(item)
            }
          })
          //   _this.datas1 = res.data.data
          console.log(_this.datas1)
          // _this.datas2 = res.data.data
          console.log(_this.datas2)
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
