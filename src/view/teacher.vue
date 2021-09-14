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
      <a-form class="search" :form="form" @submit="handleSearch">
        <a-space>
          <a-form-item>
            <span class="search-condition" style="width: 90px">搜索条件</span>
          </a-form-item>
          <a-form-item>
            <a-cascader
              :options="options1"
              :show-search="{ filter }"
              placeholder="授课地区"
              v-decorator="['TeachingArea']"
            />
          </a-form-item>
          <br /><br />
          <a-form-item>
            <a-select
              placeholder="授课年级"
              style="width: 120px"
              @change="handlegradeChange"
              v-decorator="['TeachingGrade']"
            >
              <a-select-option v-for="grade in gradeData" :key="grade">
                {{ grade }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <br /><br />
          <a-form-item>
            <a-select
              placeholder="授课科目"
              style="width: 150px"
              v-decorator="['TeachingSubject']"
            >
              <a-select-option v-if="istrue" :key="1000000" disabled>
                请先选择授课年级
              </a-select-option>
              <a-select-option v-for="subject in subjects" :key="subject">
                {{ subject }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <br /><br />
          <a-form-item>
            <a-cascader
              :options="options3"
              :show-search="{ filter }"
              placeholder="性别"
              class="gender"
              v-decorator="['gender']"
            />
          </a-form-item>
          <a-form-item>
            <a-input
              placeholder="姓名/学校"
              style="width: 200px"
              v-decorator="['nameorschool']"
            />
          </a-form-item>
          <a-form-item>
            <a-button type="primary" icon="search" html-type="submit">
              Search
            </a-button>
          </a-form-item>
        </a-space>
      </a-form>
      <a-table
        :columns="columns"
        :data-source="datas"
        rowKey="tid"
        :pagination="pagination"
      >
        <template slot="register" slot-scope="scope">
          <a-modal :visible="modal1Visible" on-ok="handleOk" :closable="false">
            <template slot="footer">
              <a-button key="back" type="primary" @click="handleCancel">
                返回
              </a-button>
            </template>
            <a-descriptions title="注册资料" bordered>
              <a-descriptions-item label="姓名">{{
                TeacherRegister.name
              }}</a-descriptions-item>
              <a-descriptions-item label="学历">{{
                TeacherRegister.graduateEducation
              }}</a-descriptions-item>
              <a-descriptions-item label="学校">
                {{ TeacherRegister.university }}
              </a-descriptions-item>
              <a-descriptions-item label="所教科目">
                {{ TeacherRegister.university }}
              </a-descriptions-item>
              <a-descriptions-item label="家教经历">
                {{ TeacherRegister.teachingExperience }}
              </a-descriptions-item>
              <a-descriptions-item label="自我评价">
                {{ TeacherRegister.comment }}
              </a-descriptions-item>
              <a-descriptions-item label="价格区间" :span="2">
                {{ TeacherRegister.teachingPrice }}
              </a-descriptions-item>
              <a-descriptions-item label="空闲时间">
                {{ TeacherRegister.teachingTimes }}
              </a-descriptions-item>
              <a-descriptions-item label="授课区域">
                {{ TeacherRegister.teachingAreas }}
              </a-descriptions-item>
              <a-descriptions-item label="常住地址">
                {{ TeacherRegister.residentAddress }}
              </a-descriptions-item>
            </a-descriptions>
          </a-modal>
          <a @click="showModal(scope)">查看</a>
        </template>
        <template slot="exhibit" slot-scope="scope">
          <a-modal
            :visible="modal2Visible"
            title="Title"
            on-ok="handleOk2"
            :closable="false"
          >
            <template slot="footer">
              <a-button key="back" @click="handleCancel2"> 取消 </a-button>
              <a-button
                key="submit"
                type="primary"
                :loading="loading"
                @click="handleOk2"
              >
                审核通过，发布资料
              </a-button>
            </template>
            <a-form class="form">
              <a-form-item v-bind="formItemLayout" label="称谓">
                <span> 王老师 </span>
                <a-button type="primary" icon="download" class="download">
                  下载展示资料
                </a-button>
              </a-form-item>
              <a-form-item v-bind="formItemLayout" label="学校">
                <span> 四川大学 </span>
                <span>本科生</span>
              </a-form-item>
              <a-form-item v-bind="formItemLayout" label="授课科目">
                <a-select
                  placeholder="授课年级"
                  style="width: 120px"
                  @change="handlegradeChange"
                >
                  <a-select-option v-for="grade in gradeData" :key="grade">
                    {{ grade }}
                  </a-select-option>
                </a-select>
                <a-select
                  placeholder="授课科目"
                  v-model="secondsubject"
                  style="width: 120px"
                >
                  <a-select-option v-for="subject in subjects" :key="subject">
                    {{ subject }}
                  </a-select-option> </a-select
                ><br />
                <a-select
                  placeholder="授课年级"
                  style="width: 120px"
                  @change="handlegradeChange"
                >
                  <a-select-option v-for="grade in gradeData" :key="grade">
                    {{ grade }}
                  </a-select-option>
                </a-select>
                <a-select
                  placeholder="授课科目"
                  v-model="secondsubject"
                  style="width: 120px"
                >
                  <a-select-option v-for="subject in subjects" :key="subject">
                    {{ subject }}
                  </a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item
                v-bind="formItemLayout"
                label="价格区间"
                has-feedback
              >
                <div>
                  <a-input style="width: 100px"></a-input>
                  <span>至</span>
                  <a-input style="width: 100px"></a-input>
                  <span>元/小时</span>
                </div>
              </a-form-item>
              <a-form-item
                v-bind="formItemLayout"
                label="展示价格"
                has-feedback
              >
                <span>倍数设置</span>
                <a-input style="width: 100px"></a-input>
                <br />
                <span>价格区间</span>
                <br />
                <div>
                  <a-input style="width: 100px"></a-input>
                  <span>至</span>
                  <a-input style="width: 100px"></a-input>
                  <span>元/小时</span>
                </div>
              </a-form-item>
              <a-form-item v-bind="formItemLayout">
                <span slot="label"> 家教经历 </span>
                <a-textarea
                  style="width: 500px"
                  :rows="4"
                ></a-textarea> </a-form-item
              ><a-form-item v-bind="formItemLayout">
                <span slot="label"> 空闲时间 </span>
                <span>周一至周五晚</span> </a-form-item
              ><a-form-item v-bind="formItemLayout">
                <span slot="label"> 区域 </span>
                <span>金牛区 成华区 锦江区</span>
              </a-form-item>
              <a-form-item v-bind="formItemLayout">
                <span slot="label"> 常住地址 </span>
                <span>金牛区二十中附近</span>
              </a-form-item>
              <a-form-item v-bind="formItemLayout">
                <span slot="label"> 一句话标签 </span>
                <a-input
                  style="width: 450px"
                  placeholder="请输入内容"
                ></a-input>
              </a-form-item>
              <a-form-item v-bind="formItemLayout">
                <span slot="label"> 授课课时数 </span>
                <a-input
                  style="width: 450px"
                  placeholder="请输入内容"
                ></a-input>
              </a-form-item>
            </a-form>
          </a-modal>
          <a @click="showModal2(scope)">编辑</a>
        </template>
      </a-table>
      <a-button @click="test"></a-button>
      <a-button @click="test2"></a-button>
    </div>
  </div>
</template>
<script>
const columns = [
  {
    title: '教师姓名',
    dataIndex: 'name',
    key: 'name',
    scopedSlots: { customRender: 'name' },
  },
  {
    title: '性别',
    dataIndex: 'gender',
    key: 'gender',
    width: 100,
  },
  {
    title: '学校',
    dataIndex: 'university',
    key: 'university',
    ellipsis: true,
  },
  {
    title: '授课年级与科目',
    dataIndex: 'teachingItems',
    key: 'teachingItems',
    ellipsis: true,
  },
  {
    title: '注册资料',
    key: 'register',
    ellipsis: true,
    scopedSlots: { customRender: 'register' },
  },
  {
    title: '展示资料',
    dataIndex: 'exhibit',
    key: 'exhibit',
    ellipsis: true,
    scopedSlots: { customRender: 'exhibit' },
  },
  {
    title: '资料状态',
    dataIndex: 'verifyStatus',
    key: 'verifyStatus',
    ellipsis: true,
  },
  {
    title: '操作人',
    dataIndex: 'operator',
    key: 'operator',
    ellipsis: true,
  },
]
const datas = []
const data = [
  // {
  //   key: '1',
  //   name: 'John Brown',
  //   gender: '男',
  //   school: '电子科技大学',
  //   SubjectsAndGrand: '高中数学',
  //   // register: '查看',
  //   // exhibit: '编辑',
  //   dataStatus: '待审核',
  //   operator: '无'
  // },
  // {
  //   key: '2',
  //   name: 'John Brown',
  //   gender: '男',
  //   school: '电子科技大学',
  //   SubjectsAndGrand: '高中数学',
  //   // register: '查看',
  //   // exhibit: '编辑',
  //   dataStatus: '待审核',
  //   operator: '无'
  // },
  // {
  //   key: '3',
  //   name: 'John Brown',
  //   gender: '男',
  //   school: '电子科技大学',
  //   SubjectsAndGrand: '高中数学',
  //   // register: '查看',
  //   // exhibit: '编辑',
  //   dataStatus: '待审核',
  //   operator: '无'
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
const areaId = [
  '锦江区',
  '金牛区',
  '武侯区',
  '青羊区',
  '成华区',
  '高新区',
  '天府新区',
  '新都区',
  '郫都区',
  '双流区',
  '龙泉驿区',
  '温江区',
  '其他',
]
const itemId = [
  { iId: 10, item: '小学全科' },
  { iId: 11, item: '小学语文' },
  { iId: 12, item: '小学奥数' },
  { iId: 13, item: '小学数学' },
  { iId: 14, item: '小学英语' },
  { iId: 15, item: '小学作业辅导' },
  { iId: 20, item: '初中全科' },
  { iId: 21, item: '初中语文' },
  { iId: 22, item: '初中英语' },
  { iId: 23, item: '初中数学' },
  { iId: 24, item: '初中物理' },
  { iId: 25, item: '初中化学' },
  { iId: 30, item: '高中数学' },
  { iId: 31, item: '高中语文' },
  { iId: 32, item: '高中英语' },
  { iId: 33, item: '高中物理' },
  { iId: 34, item: '高中化学' },
  { iId: 35, item: '高中生物' },
  { iId: 36, item: '高中历史' },
  { iId: 37, item: '高中政治' },
  { iId: 38, item: '高中地理' },
  { iId: 40, item: '小语种法语' },
  { iId: 41, item: '小语种德语' },
  { iId: 42, item: '小语种西班牙语' },
  { iId: 43, item: '小语种日语' },
  { iId: 44, item: '小语种葡萄牙语' },
  { iId: 45, item: '小语种韩语' },
  { iId: 50, item: '艺体类音乐' },
  { iId: 51, item: '艺体类美术' },
  { iId: 52, item: '艺体类舞蹈' },
  { iId: 53, item: '艺体类体育' },
  { iId: 54, item: '艺体类其他' },
  { iId: 60, item: '其他' },
]
const certificateType = [
  '无证',
  '幼儿园教师资格证',
  '小学教师资格证',
  '初级中学教师资格证',
  '高级中学教师资格证',
  '中等职业学校教师资格证',
  '中等职业学校实习指导教师资格证',
  '高等学校教师资格证',
  '成人教育教师资格证',
]
const collegeStudentGrade = [
  '大一',
  '大二',
  '大三',
  '大四',
  '硕士在读',
  '博士在读',
]
const gender = ['男', '女']
const TeacherRegister = {}
const TeacherVerify = {}
export default {
  created() {
    this.gettable()
  },
  data() {
    return {
      teacherInfo: {
        // areaId: 0,
        // itemId: 0,
        // gender: 0,
        // nameOrUniversity: 'string',
        pageNumber: 1,
        pageSize: 10,
      },
      TeacherRegister,
      TeacherVerify,
      areaId,
      itemId,
      certificateType,
      collegeStudentGrade,
      gender,
      istrue: true,
      form: this.$form.createForm(this),
      gradeData,
      subjectData,
      subjects,
      secondsubject,
      modal1Visible: false,
      modal2Visible: false,
      loading: false,
      data,
      datas,
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
      options3: [
        {
          value: '男',
          label: '男',
        },
        {
          value: '女',
          label: '女',
        },
      ],
    }
  },

  methods: {
    handleSearch(e) {
      e.preventDefault()
      this.form.validateFields((error, values) => {
        console.log('error', error)
        console.log('Received values of form: ', values)
        var i = itemId.find(function (item) {
          return item.item == values.TeachingGrade + values.TeachingSubject
        })
        console.log(values.nameorschool)
        this.axios
          .get('/Api/Admin/Teachers', {
            params: {
              areaId:
                areaId.indexOf(
                  values.TeachingArea == undefined
                    ? null
                    : values.TeachingArea[0]
                ) == -1
                  ? null
                  : areaId.indexOf(
                      values.TeachingArea == undefined
                        ? null
                        : values.TeachingArea[0]
                    ),
              itemId: i == undefined ? null : i.iId,
              gender:
                gender.indexOf(
                  values.gender == undefined ? null : values.gender[0]
                ) == -1
                  ? null
                  : gender.indexOf(
                      values.gender == undefined ? null : values.gender[0]
                    ),
              nameOrUniversity: values.nameorschool,
              pageNumber: 1,
              pageSize: 10,
            },
          })
          .then((res) => {
            console.log(res.data)
            this.datas = []
            this.datas = res.data.data
            console.log(this.datas)
          })
          .catch((error) => {
            console.log(error.response)
          })
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
        .get('/Api/Admin/Teachers', {
          params: _this.teacherInfo,
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
      _this
        .axios({
          method: 'POST',
          url: '/Api/Admin/Teacher/Verify',
          data: {
            awards: 'string',
            certificateType: 0,
            collegeStudentGrade: 0,
            comment: 'string',
            gender: 0,
            graduateEducation: 0,
            graduateProfession: 0,
            isCollegeStudent: 0,
            major: 'string',
            name: 'string',
            residentAddress: 'string',
            teachingAreas: [0],
            teachingExperience: 'string',
            teachingItem: 'string',
            teachingItems: [0],
            teachingPriceVerified: 0,
            teachingTimes: [0],
            tid: 'test',
            university: 'string',
            version: 0,
          },
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
        .get('/Api/Admin/Teachers', {
          params: {
            pageNumber: 1,
            pageSize: 5,
          },
        })
        .then((res) => {
          console.log(res.data)
        })
        .catch((error) => {
          console.log(error.response)
        })
    },
    showModal(userInfo) {
      console.log(userInfo)
      this.modal1Visible = true
        const _this = this
        _this.axios
          .get(`/Api/Admin/Teacher/Register/${userInfo.tid}`)
          .then((res) => {
            console.log(res.data.data)
            _this.TeacherRegister = {}
            _this.TeacherRegister = res.data.data
            // console.log(_this.TeacherRegister.name)
          })
          .catch((error) => {
            console.log(error.response)
          })
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
    showModal2(userInfo) {
      console.log(userInfo)
      this.modal2Visible = true
      if(userInfo.verifyStatus == 0){
      const _this = this
        _this.axios
          .get(`/Api/Admin/Teacher/Register/${userInfo.tid}`)
          .then((res) => {
            console.log(res.data.data)
            _this.TeacherVerify = {}
            _this.TeacherVerify = res.data.data
            // console.log(_this.TeacherRegister.name)
          })
          .catch((error) => {
            console.log(error.response)
          })
      }
      const _this = this
        _this.axios
          .get(`/Api/Admin/Teacher/Verify/${userInfo.tid}`)
          .then((res) => {
            console.log(res.data.data)
            _this.TeacherVerify = {}
            _this.TeacherVerify = res.data.data
            // console.log(_this.TeacherRegister.name)
          })
          .catch((error) => {
            console.log(error.response)
          })
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
.download {
  margin-left: 380px;
}
.form-ant-form-ant-form-horizontal {
  height: 0;
}
</style>
