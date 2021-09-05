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

<div class="search">
    <a-space>
    <span class="search-condition">搜索条件</span>
  <a-cascader
    :options="options1"
    :show-search="{ filter }"
    placeholder="授课地区"
    @change="onChange"
    class="Teaching-area"
  /><br /><br />
  <a-cascader
    :options="options2"
    :show-search="{ filter }"
    placeholder="授课年级"
    @change="onChange"
    class="Teaching-grade"
  /><br /><br />
  <a-cascader
    :options="options3"
    :show-search="{ filter }"
    placeholder="授课科目"
    @change="onChange"
    class="Subjects-taught"
  /><br /><br />
  <a-cascader
    :options="options4"
    :show-search="{ filter }"
    placeholder="性别"
    @change="onChange"
    class="gender"
  />
    <a-input placeholder="姓名/学校" style="width: 200px" @search="onSearch" />
    <a-button type="primary" icon="search">
      Search
    </a-button>
    </a-space>
</div>
<a-table :columns="columns" :data-source="data">
    <template slot="register">
      <a-modal :visible="modal1Visible" on-ok="handleOk" :closable="false">
    <template slot="footer">
      <a-button key="back" type="primary" @click="handleCancel">
        返回
      </a-button>
    </template>
 <a-descriptions title="注册资料" bordered>
    <a-descriptions-item label="姓名">
      小晞
    </a-descriptions-item>
    <a-descriptions-item label="学历">
      本科生
    </a-descriptions-item>
    <a-descriptions-item label="学校">
      电子科技大学
    </a-descriptions-item>
    <a-descriptions-item label="所教科目">
      高中数学
    </a-descriptions-item>
    <a-descriptions-item label="家教经历">
      每天打电动
    </a-descriptions-item>
    <a-descriptions-item label="自我评价">
      人美心善
    </a-descriptions-item>
    <a-descriptions-item label="价格区间" :span="2">
      90元/小时-120元/小时
    </a-descriptions-item>
    <a-descriptions-item label="空闲时间">
      寒暑假均可
    </a-descriptions-item>
    <a-descriptions-item label="授课区域">
      成华区
    </a-descriptions-item>
    <a-descriptions-item label="常住地址">
      电子科技大学欣苑学生公寓
    </a-descriptions-item>
  </a-descriptions>
    </a-modal>
      <a @click="showModal">查看</a>
    </template>
    <template slot="exhibit">
      <a-modal :visible="modal2Visible" title="Title" on-ok="handleOk2" :closable="false">
    <template slot="footer">
      <a-button key="back" @click="handleCancel2">
        取消
      </a-button>
      <a-button key="submit" type="primary" :loading="loading" @click="handleOk2">
        审核通过，发布资料
      </a-button>
    </template>
    <a-form class="form">
      <a-form-item v-bind="formItemLayout" label="称谓">
      <span>
        王老师
      </span>
    <a-button type="primary" icon="download" class="download">
      下载展示资料
    </a-button>
    </a-form-item>
      <a-form-item v-bind="formItemLayout" label="学校">
      <span>
        四川大学
      </span>
      <span>本科生</span>
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label="授课科目">
      <a-cascader
    :options="options1"
    :show-search="{ filter }"
    placeholder="授课年级"
    @change="onChange"
    style="width: 200px"
  />
      <a-cascader
    :options="options2"
    :show-search="{ filter }"
    placeholder="授课科目"
    @change="onChange"
    style="width: 200px"
  />
      <a-cascader
    :options="options1"
    :show-search="{ filter }"
    placeholder="授课年级"
    @change="onChange"
    style="width: 200px"
  />
      <a-cascader
    :options="options2"
    :show-search="{ filter }"
    placeholder="授课科目"
    @change="onChange"
    style="width: 200px"
  />
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label="价格区间" has-feedback>
      <div>
      <a-input style="width: 100px"></a-input>
      <span>至</span>
      <a-input style="width: 100px"></a-input>
      <span>元/小时</span>
      </div>
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label="展示价格" has-feedback>
      <span>倍数设置</span>
      <a-input style="width: 100px"></a-input>
      <br>
      <span>价格区间</span>
      <br>
      <div>
      <a-input style="width: 100px"></a-input>
      <span>至</span>
      <a-input style="width: 100px"></a-input>
      <span>元/小时</span>
      </div>
    </a-form-item>
    <a-form-item v-bind="formItemLayout">
      <span slot="label">
        家教经历
      </span>
      <a-textarea style="width: 500px" :rows="4"></a-textarea>
    </a-form-item><a-form-item v-bind="formItemLayout">
      <span slot="label">
        空闲时间
      </span>
      <span>周一至周五晚</span>
    </a-form-item><a-form-item v-bind="formItemLayout">
      <span slot="label">
        区域
      </span>
      <span>金牛区 成华区 锦江区</span>
    </a-form-item>
    <a-form-item v-bind="formItemLayout">
      <span slot="label">
        常住地址
      </span>
      <span>金牛区二十中附近</span>
    </a-form-item>
    <a-form-item v-bind="formItemLayout">
      <span slot="label">
        一句话标签
      </span>
      <a-input style="width: 450px" placeholder="请输入内容"></a-input>
    </a-form-item>
    <a-form-item v-bind="formItemLayout">
      <span slot="label">
        授课课时数
      </span>
      <a-input style="width: 450px" placeholder="请输入内容"></a-input>
    </a-form-item>
  </a-form>
    </a-modal>
      <a @click="showModal2">编辑</a>
    </template>
</a-table>
</div>
        </div>
</template>
<script>
const columns = [
  {
    title: '教师姓名',
    dataIndex: 'name',
    key: 'name',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '性别',
    dataIndex: 'gender',
    key: 'gender',
    width: 50
  },
  {
    title: '学校',
    dataIndex: 'school',
    key: 'school',
    ellipsis: true
  },
  {
    title: '授课年级与科目',
    dataIndex: 'SubjectsAndGrand',
    key: 'SubjectsAndGrand',
    ellipsis: true
  },
  {
    title: '注册资料',
    key: 'register',
    ellipsis: true,
    scopedSlots: { customRender: 'register' }
  },
  {
    title: '展示资料',
    dataIndex: 'exhibit',
    key: 'exhibit',
    ellipsis: true,
    scopedSlots: { customRender: 'exhibit' }
  },
  {
    title: '资料状态',
    dataIndex: 'dataStatus',
    key: 'dataStatus',
    ellipsis: true
  },
  {
    title: '操作人',
    dataIndex: 'operator',
    key: 'operator',
    ellipsis: true
  }
]
const data = [
  {
    key: '1',
    name: 'John Brown',
    gender: '男',
    school: '电子科技大学',
    SubjectsAndGrand: '高中数学',
    // register: '查看',
    // exhibit: '编辑',
    dataStatus: '待审核',
    operator: '无'
  },
  {
    key: '2',
    name: 'John Brown',
    gender: '男',
    school: '电子科技大学',
    SubjectsAndGrand: '高中数学',
    // register: '查看',
    // exhibit: '编辑',
    dataStatus: '待审核',
    operator: '无'
  },
  {
    key: '3',
    name: 'John Brown',
    gender: '男',
    school: '电子科技大学',
    SubjectsAndGrand: '高中数学',
    // register: '查看',
    // exhibit: '编辑',
    dataStatus: '待审核',
    operator: '无'
  }
]
export default {
  data () {
    return {
      modal1Visible: false,
      modal2Visible: false,
      loading: false,
      data,
      columns,
      formItemLayout: {
        labelCol: {
          span: 6
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 }
        }
      },
      tailFormItemLayout: {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0
          },
          sm: {
            span: 16,
            offset: 8
          }
        }
      },
      options1: [
        {
          value: '锦江区',
          label: '锦江区'

        },
        {
          value: '金牛区',
          label: '金牛区'

        },
        {
          value: '武侯区',
          label: '武侯区'

        },
        {
          value: '青羊区',
          label: '青羊区'

        },
        {
          value: '成华区',
          label: '成华区'

        },
        {
          value: '高新区',
          label: '高新区'

        },
        {
          value: '天府新区',
          label: '天府新区'

        },
        {
          value: '新都区',
          label: '新都区'

        },
        {
          value: '郫都区',
          label: '郫都区'

        },
        {
          value: '双流区',
          label: '双流区'
        },
        {
          value: '龙泉驿区',
          label: '龙泉驿区'

        },
        {
          value: '温江区',
          label: '温江区'

        },
        {
          value: '其他',
          label: '其他'

        }
      ],
      options2: [
        {
          value: '锦江区',
          label: '锦江区'

        }
      ],
      options3: [
        {
          value: '锦江区',
          label: '锦江区'

        }
      ],
      options4: [
        {
          value: '锦江区',
          label: '锦江区'

        }
      ]
    }
  },
  methods: {
    onSearch () {

    },
    showModal () {
      this.modal1Visible = true
    },
    hideModal () {
      this.modal1Visible = false
    },
    handleOk (e) {
      this.loading = true
      setTimeout(() => {
        this.modal1Visible = false
        this.loading = false
      }, 3000)
    },
    handleCancel (e) {
      this.modal1Visible = false
    },
    showModal2 () {
      this.modal2Visible = true
    },
    hideModal2 () {
      this.modal2Visible = false
    },
    handleOk2 (e) {
      this.loading = true
      setTimeout(() => {
        this.modal2Visible = false
        this.loading = false
      }, 3000)
    },
    handleCancel2 (e) {
      this.modal2Visible = false
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
.ant-modal-content{
  width:900px;
}
.download{
  margin-left: 380px;
}
</style>
