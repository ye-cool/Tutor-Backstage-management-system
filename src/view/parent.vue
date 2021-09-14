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
          <a-button key="1" type="primary"> 退出 </a-button>
        </template></a-page-header
      >
      <div class="search">
        <a-form class="search" :form="form" @submit="handleSearch">
          <a-space>
            <a-form-item>
              <span class="search-condition">搜索条件</span>
            </a-form-item>
            <a-form-item>
              <a-cascader
                :options="options1"
                :show-search="{ filter }"
                placeholder="所在地区"
                @change="onChange"
                v-decorator="['StudentArea']"
              />
            </a-form-item>
            <br /><br />
            <a-form-item>
              <a-select
                placeholder="学生年级"
                style="width: 120px"
                @change="handlegradeChange"
                v-decorator="['StudentGrade']"
              >
                <a-select-option v-for="grade in gradeData" :key="grade">
                  {{ grade }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <br /><br />
            <a-form-item>
              <a-select
                placeholder="补习科目"
                style="width: 150px"
                v-decorator="['StudentSubject']"
              >
                <a-select-option v-if="istrue" :key="1000000" disabled>
                  请先选择授课年级
                </a-select-option>
                <a-select-option v-for="subject in subjects" :key="subject">
                  {{ subject }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item>
              <a-input
                placeholder="家长称谓/联系电话"
                style="width: 200px"
                @search="onSearch"
                v-decorator="['nameortel']"
            /></a-form-item>
            <a-form-item>
              <a-button type="primary" icon="search" html-type="submit">
                Search
              </a-button>
            </a-form-item>
          </a-space>
        </a-form>
      </div>
      <a-table :columns="columns" :data-source="datas" :pagination="pagination">
        <template slot="need">
          <a-modal
            :visible="modal1Visible"
            title="家长需求"
            on-ok="handleOk"
            :closable="false"
          >
            <template slot="footer">
              <a-button key="back" @click="handleCancel"> 返回 </a-button>
              <a-button
                key="submit"
                type="primary"
                :loading="loading"
                @click="handleOk"
              >
                发布
              </a-button>
            </template>
            <a-form class="form">
              <a-form-item v-bind="formItemLayout" label="家长称谓">
                <span> 李雷 </span>
              </a-form-item>
              <a-form-item v-bind="formItemLayout" label="学生补习科目">
                <span> 高中数学 </span>
              </a-form-item>
              <a-form-item v-bind="formItemLayout" label="学生情况与老师要求">
                <a-textarea style="width: 500px" :rows="4"></a-textarea>
              </a-form-item>
              <a-form-item
                v-bind="formItemLayout"
                label="联系电话"
                has-feedback
              >
                <div>
                  <span>13498574832</span>
                </div>
              </a-form-item>
              <a-form-item
                v-bind="formItemLayout"
                label="家庭住址"
                has-feedback
              >
                <span>金牛区</span>
              </a-form-item>
              <a-form-item v-bind="formItemLayout">
                <span slot="label"> 详细地址 </span>
                <a-input style="width: 500px"></a-input> </a-form-item
              ><a-form-item v-bind="formItemLayout">
                <span slot="label"> 预期价格 </span>
                <span>90元/小时</span> </a-form-item
              ><a-form-item v-bind="formItemLayout">
                <span slot="label"> 展示价格 </span>
                <span>80元/小时</span>
              </a-form-item>
              <a-form-item v-bind="formItemLayout">
                <span slot="label"> 教师性别要求 </span>
                <span>均可</span>
              </a-form-item>
              <a-form-item v-bind="formItemLayout">
                <span slot="label"> 补习时长 </span>
                <a-input style="width: 500px"></a-input>
              </a-form-item>
              <a-form-item v-bind="formItemLayout">
                <span slot="label"> 空闲时间 </span>
                <span>周一至周五</span>
              </a-form-item>
              <a-form-item v-bind="formItemLayout">
                <span slot="label"> 设置优先级 </span>
                <a-cascader
                  :options="options2"
                  :show-search="{ filter }"
                  placeholder="优先级"
                  @change="onChange"
                  style="width: 200px"
                />
              </a-form-item>
            </a-form>
          </a-modal>
          <a @click="showModal">编辑</a>
        </template>
        <template slot="deliveryStatus" slot-scope="text">
          <a-modal
            :visible="modal2Visible"
            title="Title"
            on-ok="handleOk2"
            :closable="false"
          >
            <template slot="footer">
              <a-button key="back" @click="handleCancel2" type="primary">
                返回
              </a-button>
            </template>
            <a-form class="form">
              <a-form-item v-bind="formItemLayout" label="投递老师">
                <teachermodal
                  :modalVisible="modalVisible"
                  v-on:changeVisible="changeVisible"
                ></teachermodal>
                <div class="taechername">
                  <a
                    style="float: left; margin-right: 10px"
                    @click="showteacherModal"
                    >王老师</a
                  >
                  <a
                    style="float: left; margin-right: 10px"
                    @click="showteacherModal"
                    >李老师</a
                  >
                </div>
              </a-form-item>
              <a-form-item v-bind="formItemLayout" label="家长称谓">
                <span>李雷</span>
              </a-form-item>
              <a-form-item
                v-bind="formItemLayout"
                label="学生补习科目"
                has-feedback
              >
                <span>高中数学</span>
              </a-form-item>
              <a-form-item
                v-bind="formItemLayout"
                label="学习情况"
                has-feedback
              >
                <span>数学基础不扎实</span>
              </a-form-item>
              <a-form-item
                v-bind="formItemLayout"
                label="联系电话"
                has-feedback
              >
                <span>13789574832</span>
              </a-form-item>
              <a-form-item
                v-bind="formItemLayout"
                label="家庭住址"
                has-feedback
              >
                <span>金牛区</span>
              </a-form-item>
              <a-form-item
                v-bind="formItemLayout"
                label="期望价格"
                has-feedback
              >
                <span>90</span><span>元/小时</span>
              </a-form-item>
              <a-form-item
                v-bind="formItemLayout"
                label="展示价格"
                has-feedback
              >
                <span>80</span><span>元/小时</span>
              </a-form-item>
              <a-form-item
                v-bind="formItemLayout"
                label="教师性别要求"
                has-feedback
              >
                <span>均可</span>
              </a-form-item>
              <a-form-item
                v-bind="formItemLayout"
                label="补习时长"
                has-feedback
              >
                <span>无</span>
              </a-form-item>
              <a-form-item
                v-bind="formItemLayout"
                label="空闲时间"
                has-feedback
              >
                <span>周一至周五晚上</span>
              </a-form-item>
            </a-form>
          </a-modal>
          <a @click="showModal2">{{ text }}</a>
        </template>
      </a-table>
      <a-button @click="test"></a-button>
      <a-button @click="test2"></a-button>
    </div>
  </div>
</template>
<script>
import teachermodal from '../components/teachermodal.vue'
const columns = [
  {
    title: '家长称谓',
    dataIndex: 'parentName',
    key: 'parentName',
  },
  {
    title: '学生年级与补习科目',
    dataIndex: 'itemId',
    key: 'itemId',
    width: 200,
  },
  {
    title: '联系电话',
    dataIndex: 'phone',
    key: 'phone',
    ellipsis: true,
  },
  {
    title: '家庭住址范围',
    dataIndex: 'studyArea',
    key: 'studyArea',
    ellipsis: true,
  },
  {
    title: '需求查看',
    key: 'need',
    ellipsis: true,
    scopedSlots: { customRender: 'need' },
  },
  {
    title: '审核状态',
    dataIndex: 'verifyStatus',
    key: 'verifyStatus',
    ellipsis: true,
  },
  {
    title: '投递状态',
    dataIndex: 'demandStatus',
    key: 'demandStatus',
    ellipsis: true,
    scopedSlots: { customRender: 'deliveryStatus' },
  },
]
const datas = []
const data = [
  // {
  //   key: '1',
  //   name: 'John Brown',
  //   SubjectsAndGrand: '高中数学',
  //   TEL: '13235983145',
  //   home: '成华区',
  //   // need: '编辑',
  //   dataStatus: '待审核',
  //   deliveryStatus: '已有0人投递'
  // },
  // {
  //   key: '2',
  //   name: 'Jim Green',
  //   SubjectsAndGrand: '高中数学',
  //   TEL: '13235983145',
  //   home: '成华区',
  //   // need: '编辑',
  //   dataStatus: '待审核',
  //   deliveryStatus: '已有0人投递'
  // },
  // {
  //   key: '3',
  //   name: 'Joe Black',
  //   SubjectsAndGrand: '高中数学',
  //   TEL: '13235983145',
  //   home: '成华区',
  //   // need: '编辑',
  //   dataStatus: '待审核',
  //   deliveryStatus: '已有0人投递'
  // }
]
const gradeData = ['小学', '初中', '高中', '小语种', '艺术类', '其他']
const subjectData = {
  小学: ['全科', '语文', '奥数', '数学', '英语', '作业辅导'],
  初中: ['全科', '语文', '英语', '数学', '物理', '化学'],
  高中: [
    '数学',
    '语文',
    '英语',
    '物理',
    '化学',
    '生物',
    '历史',
    '政治',
    '地理',
  ],
  小语种: ['法语', '德语', '西班牙语', '日语', '葡萄牙语', '韩语'],
  艺术类: ['音乐', '美术', '舞蹈', '体育', '其他'],
  其他: [],
}
const subjects = []
const secondsubject = []
export default {
  created() {
    this.gettable()
  },
  data() {
    return {
      data,
      datas,
      istrue: true,
      loading: false,
      form: this.$form.createForm(this),
      modalVisible: false,
      modal1Visible: false,
      modal2Visible: false,
      gradeData,
      subjectData,
      subjects,
      secondsubject,
      columns,
      pagination: {
        pageSize: 10, // 默认每页显示数量
        showTotal: (total) => `总共有 ${total} 名`, // 显示总数
      },
      formItemLayout: {
        labelCol: {
          span: 6,
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      },
      tailFormItemLayout: {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        },
      },
      options1: [
        {
          value: '锦江区',
          label: '锦江区',
        },
        {
          value: '金牛区',
          label: '金牛区',
        },
        {
          value: '武侯区',
          label: '武侯区',
        },
        {
          value: '青羊区',
          label: '青羊区',
        },
        {
          value: '成华区',
          label: '成华区',
        },
        {
          value: '高新区',
          label: '高新区',
        },
        {
          value: '天府新区',
          label: '天府新区',
        },
        {
          value: '新都区',
          label: '新都区',
        },
        {
          value: '郫都区',
          label: '郫都区',
        },
        {
          value: '双流区',
          label: '双流区',
        },
        {
          value: '龙泉驿区',
          label: '龙泉驿区',
        },
        {
          value: '温江区',
          label: '温江区',
        },
        {
          value: '其他',
          label: '其他',
        },
      ],
      options2: [
        {
          value: '小学',
          label: '小学',
        },
        {
          value: '初中',
          label: '初中',
        },
        {
          value: '高中',
          label: '高中',
        },
        {
          value: '小语种',
          label: '小语种',
        },
        {
          value: '艺术类',
          label: '艺术类',
        },
        {
          value: '其他',
          label: '其他',
        },
      ],
      options3: [
        {
          value: '锦江区',
          label: '锦江区',
        },
      ],
    }
  },
  components: {
    teachermodal,
  },
  methods: {
    handleSearch(e) {
      e.preventDefault()
      this.form.validateFields((error, values) => {
        console.log('error', error)
        console.log('Received values of form: ', values)
      })
    },
    handlegradeChange(value) {
      this.istrue = false
      this.subjects = subjectData[value]
      this.secondsubject = subjectData[value][0]
      this.form.setFieldsValue({
        TeachingSubject: secondsubject,
      })
    },
    gettable() {
      const _this = this
      _this.axios
        .get('/Api/Admin/Demands', {
          params: {
            pageNumber: 1,
            pageSize: 5,
          },
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
    test() {
      const _this = this
      _this.axios
        .post('/Api/User/Admin/SignUp', {
          adminStatus: 0,
          adminType: 0,
          aid: 'string',
          nickname: '1',
          password: 'string',
          uid: 'string',
          username: 'string',
          wechat: 'string'
        })
        .then((res) => {
          console.log(res.data)
        })
        .catch((error) => {
          console.log(error.response)
        })
    },
    test2() {
      const _this = this
      _this.axios
        .get('')
        .then((res) => {
          console.log(res.data)
        })
        .catch((error) => {
          console.log(error.response)
        })
    },
    changeVisible(value) {
      this.modalVisible = value
    },
    onSearch() {},
    showteacherModal() {
      this.modalVisible = true
    },
    showModal() {
      this.modal1Visible = true
    },
    hideModal() {
      this.modal1Visible = false
    },
    handleOk(e) {
      this.loading = true
      setTimeout(() => {
        this.modal1Visible = false
        this.loading = false
      }, 3000)
    },
    handleCancel(e) {
      this.modal1Visible = false
    },
    showModal2() {
      this.modal2Visible = true
    },
    hideModal2() {
      this.modal2Visible = false
    },
    handleOk2(e) {
      this.loading = true
      setTimeout(() => {
        this.modal2Visible = false
        this.loading = false
      }, 3000)
    },
    handleCancel2(e) {
      this.modal2Visible = false
    },
    onChange(value, selectedOptions) {
      console.log(value, selectedOptions)
    },
    filter(inputValue, path) {
      return path.some(
        (option) =>
          option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
      )
    },
  },
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
.ant-modal-content {
  width: 900px;
}
</style>
