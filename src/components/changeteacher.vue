<template>
  <a-modal :visible="ctmodalVisible" :closable="false" width="1100px">
    <template slot="footer">
      <a-button key="back" @click="cthandleCancel"> 取消 </a-button>
    </template>
    <div :style="{ padding: '24px', background: '#fff', textAlign: 'center' }">
      <div class="content">
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
              <a-button
                :loading="loading"
                type="primary"
                icon="search"
                html-type="submit"
              >
                搜索
              </a-button>
            </a-form-item>
          </a-space>
        </a-form>
        <a-table
          :columns="columns"
          :data-source="datas"
          rowKey="tid"
          :pagination="false"
        >
          <template slot="gender" slot-scope="text">
            {{ text === 0 ? '男' : '女' }}
          </template>
          <template slot="verifyStatus" slot-scope="text">
            {{ text === 0 ? '待审核' : '已通过' }}
          </template>
          <template slot="register" slot-scope="scope">
            <a @click="showModal(scope)">查看</a>
          </template>
          <template slot="exhibit" slot-scope="scope">
            <a @click="showModal2(scope)">编辑</a>
          </template>
          <template slot="operate" slot-scope="scope">
            <a @click="replace(scope)">更换</a>
          </template>
        </a-table>
        <a-pagination
          :current="pagination.displayPage"
          :pageSize="pagination.displayRows"
          :total="pagination.total"
          :pageSizeOptions="pagination.pageSizeOptions"
          :showTotal="(total) => `共 ${total} 条数据`"
          showSizeChanger
          showQuickJumper
          @change="handlePageChange"
          @showSizeChange="showSizeChange"
          style="margin: 16px 0; text-align: right"
        />
        <teachermodal
          :modalVisible="modal1Visible"
          v-on:changeVisible="changeVisible"
          :teacherRegister="TeacherRegister"
        ></teachermodal>
        <a-modal
          :visible="modal2Visible"
          title="Title"
          on-ok="handleOk2"
          :closable="false"
          width="900px"
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
          <a-form :form="form">
            <a-form-item v-bind="formItemLayout" label="称谓">
              <span> {{ TeacherVerify.name }} </span>
              <a-button type="primary" icon="download" class="download">
                下载展示资料
              </a-button>
            </a-form-item>
            <a-form-item v-bind="formItemLayout" label="学校">
              <span>{{ TeacherVerify.university }} </span>
            </a-form-item>
            <a-form-item v-bind="formItemLayout" label="学历">
              <span>
                {{
                  TeacherVerify.graduateEducation == 0
                    ? '专科生'
                    : TeacherVerify.graduateEducation == 1
                    ? '本科生'
                    : TeacherVerify.graduateEducation == 2
                    ? '硕士生'
                    : '博士生'
                }}</span
              >
            </a-form-item>
            <a-space class="layout">
              <a-form-item>
                <span slot="label">授课科目</span>
              </a-form-item>
              <a-form-item>
                <a-select
                  placeholder="授课年级"
                  style="width: 120px"
                  @change="handlegradeChange1"
                  v-decorator="['grade']"
                >
                  <a-select-option v-for="grade in gradeData" :key="grade">
                    {{ grade }}
                  </a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item>
                <a-select
                  placeholder="授课科目"
                  style="width: 120px"
                  v-decorator="['subject']"
                >
                  <a-select-option v-for="subject in subjects1" :key="subject">
                    {{ subject }}
                  </a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item>
                <a-select
                  placeholder="授课年级"
                  style="width: 120px"
                  @change="handlegradeChange2"
                  v-decorator="['grade2']"
                >
                  <a-select-option v-for="grade in gradeData" :key="grade">
                    {{ grade }}
                  </a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item>
                <a-select
                  placeholder="授课科目"
                  style="width: 120px"
                  v-decorator="['subject2']"
                >
                  <a-select-option v-for="subject in subjects2" :key="subject">
                    {{ subject }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-space>
            <a-space class="layout">
              <a-form-item>
                <span slot="label">价格区间</span>
              </a-form-item>
              <a-form-item>
                <a-input
                  style="width: 100px"
                  v-decorator="['lowPrice']"
                ></a-input>
              </a-form-item>
              <a-form-item>
                <span>至</span>
              </a-form-item>
              <a-form-item>
                <a-input
                  style="width: 100px"
                  v-decorator="['highPrice']"
                ></a-input>
              </a-form-item>
              <a-form-item>
                <span>元/小时</span>
              </a-form-item>
            </a-space>
            <a-form-item v-bind="formItemLayout">
              <span slot="label">展示价格</span>
              <span>倍数设置 </span>
              <a-input
                style="width: 100px"
                v-decorator="['multiple']"
              ></a-input>
            </a-form-item>
            <a-space class="layout">
              <a-form-item>
                <span slot="label">价格区间</span>
              </a-form-item>
              <a-form-item>
                <a-input
                  style="width: 100px"
                  v-decorator="['lowPriceVerified']"
                ></a-input>
              </a-form-item>
              <a-form-item>
                <span>至</span>
              </a-form-item>
              <a-form-item>
                <a-input
                  style="width: 100px"
                  v-decorator="['highPriceVerified']"
                ></a-input>
              </a-form-item>
              <a-form-item>
                <span>元/小时</span>
              </a-form-item>
            </a-space>
            <a-form-item v-bind="formItemLayout">
              <span slot="label"> 家教经历 </span>
              <a-textarea
                v-decorator="['teachingExperience']"
                style="width: 500px"
                :rows="4"
              ></a-textarea> </a-form-item
            ><a-form-item v-bind="formItemLayout">
              <span slot="label"> 空闲时间 </span>
              <span>{{ TeacherVerify.teachingTimes }}</span> </a-form-item
            ><a-form-item v-bind="formItemLayout">
              <span slot="label"> 区域 </span>
              <span>{{ TeacherVerify.teachingAreas }}</span>
            </a-form-item>
            <a-form-item v-bind="formItemLayout">
              <span slot="label"> 常住地址 </span>
              <span>{{ TeacherVerify.residentAddress }}</span>
            </a-form-item>
            <a-form-item v-bind="formItemLayout">
              <span slot="label"> 一句话标签 </span>
              <a-input
                v-decorator="['comment']"
                style="width: 450px"
                placeholder="请输入内容"
              ></a-input>
            </a-form-item>
            <a-form-item v-bind="formItemLayout">
              <span slot="label"> 授课课时数 </span>
              <a-input
                v-decorator="['teachingHours']"
                style="width: 450px"
                placeholder="请输入内容"
              ></a-input>
            </a-form-item>
          </a-form>
        </a-modal>
        <!-- <a-button @click="test"></a-button>
      <a-button @click="test2"></a-button> -->
      </div>
    </div>
  </a-modal>
</template>
<script>
import teachermodal from './teachermodal.vue'
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
    scopedSlots: { customRender: 'gender' },
  },
  {
    title: '学校',
    dataIndex: 'university',
    key: 'university',
    ellipsis: true,
  },
  {
    title: '授课年级与科目',
    dataIndex: 'teachingItem',
    key: 'teachingItem',
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
    key: 'exhibit',
    ellipsis: true,
    scopedSlots: { customRender: 'exhibit' },
  },
  {
    title: '资料状态',
    dataIndex: 'verifyStatus',
    key: 'verifyStatus',
    ellipsis: true,
    scopedSlots: { customRender: 'verifyStatus' },
  },
  {
    title: '操作',
    key: 'operate',
    ellipsis: true,
    scopedSlots: { customRender: 'operate' },
  },
]
var datas = []
var data = [
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
var subjects = []
var subjects1 = []
var subjects2 = []
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
const graduateEducation = ['专科生', '本科生', '硕士生', '博士生']
const gender = ['男', '女']
var TeacherRegister = {}
var TeacherVerify = {}
export default {
  name: 'modal',
  props: {
    ctmodalVisible: Boolean,
    ctid: Number,
  },
  created() {
    this.gettable()
  },
  data() {
    return {
      teacherInfo: {
        pageNumber: 1,
        pageSize: 10,
      },
      TeacherRegister,
      TeacherVerify,
      areaId,
      itemId,
      certificateType,
      collegeStudentGrade,
      graduateEducation,
      gender,
      istrue: true,
      form: this.$form.createForm(this),
      gradeData,
      subjectData,
      subjects,
      subjects1,
      subjects2,
      modal1Visible: false,
      modal2Visible: false,
      loading: false,
      data,
      datas,
      columns,
      pagination: {
        displayPage: 1,
        displayRows: 10,
        pageSize: 10, // 默认每页显示数量
        total: 10,
        pageSizeOptions: ['10', '20', '30', '50'],
      },
      formItemLayout: {
        labelCol: {
          span: 5,
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
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
  components: {
    teachermodal,
  },
  methods: {
    handleSearch(e) {
      e.preventDefault()
      this.form.validateFields((error, values) => {
        console.log('error', error)
        console.log('Received values of form: ', values)
        var i = itemId.find(function (item) {
          if (values.TeachingSubject == '') {
            return item.item == values.TeachingGrade + ''
          } else {
            return item.item == values.TeachingGrade + values.TeachingSubject
          }
        })
        this.$api.mode
          .getTeachers({
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
            this.datas = res.data.records
            console.log(this.datas)
            this.pagination.total = res.data.total
            this.$message.success('搜索成功')
            this.loading = false
          })
          .catch((error) => {
            console.log(error.response)
          })
      })
    },
    handlegradeChange(value) {
      this.istrue = false
      if (value == undefined) this.subjects = []
      else {
        this.subjects = subjectData[value]
        this.form.setFieldsValue({
          TeachingSubject:
            subjectData[value][0] == undefined ? '' : subjectData[value][0],
        })
      }
    },
    handlegradeChange1(value) {
      this.istrue = false
      this.subjects1 = subjectData[value]
    },
    handlegradeChange2(value) {
      this.istrue = false
      this.subjects2 = subjectData[value]
    },
    gettable() {
      const _this = this
      this.$api.mode
        .getTeachers({
          params: _this.teacherInfo,
        })
        .then((res) => {
          console.log(res)
          _this.datas = []
          _this.datas = res.data.records
          _this.pagination.total = res.data.total
          console.log(_this.datas)
        })
        .catch((error) => {
          console.log(error.response)
        })
    },
    // gettotal() {
    //   console.log(this.datas)
    //   let arr = Object.keys(this.datas)
    //   this.pagination.total = arr.length
    // },
    changeVisible(value) {
      this.modal1Visible = value
    },
    showModal(userInfo) {
      console.log(userInfo)
      this.modal1Visible = true
      const _this = this
      _this.$api.mode
        .getRegister(`${userInfo.tid}`)
        .then((res) => {
          console.log(res.data)
          _this.TeacherRegister = {}
          _this.TeacherRegister = res.data
          // console.log(_this.TeacherRegister.name)
        })
        .catch((error) => {
          console.log(error.response)
        })
    },
    hideModal() {
      this.modal1Visible = false
    },
    cthandleCancel() {
      this.$emit('refreshList')
      this.$emit('changeVisible', false)
    },
    showModal2(userInfo) {
      console.log(userInfo.verifyStatus)
      this.modal2Visible = true
      if (userInfo.verifyStatus === 0) {
        const _this = this
        _this.$api.mode
          .getRegister(`${userInfo.tid}`)
          .then((res) => {
            console.log(res.data)
            _this.TeacherVerify = {}
            _this.TeacherVerify = res.data
            _this.form.setFieldsValue({
              teachingExperience: _this.TeacherVerify.teachingExperience,
              comment: _this.TeacherVerify.comment,
            })
          })
          .catch((error) => {
            console.log(error.response)
          })
      } else {
        const _this = this
        _this.$api.mode
          .getVerify(`${userInfo.tid}`)
          .then((res) => {
            console.log(res.data)
            _this.TeacherVerify = {}
            _this.TeacherVerify = res.data
          })
          .catch((error) => {
            console.log(error.response)
          })
      }
    },
    hideModal2() {
      this.modal2Visible = false
    },
    handleOk2(e) {
      e.preventDefault()
      this.form.validateFields((error, values) => {
        console.log('error', error)
        console.log('Received values of form: ', values)
        var i = itemId.find(function (item) {
          return item.item == values.grade + values.subject
        })
        var j = itemId.find(function (item) {
          return item.item == values.grade2 + values.subject2
        })
        console.log(i)
        this.$api.mode
          .postVerify({
            avatar: this.TeacherVerify.avatar,
            awards: this.TeacherVerify.awards,
            certificateType: this.TeacherVerify.certificateType,
            coefficient: values.multiple,
            collegeStudentGrade: this.TeacherVerify.collegeStudentGrade,
            comment: values.comment,
            gender: this.TeacherVerify.gender,
            graduateEducation: this.TeacherVerify.graduateEducation,
            graduateProfession: this.TeacherVerify.graduateProfession,
            isCollegeStudent: this.TeacherVerify.isCollegeStudent,
            isOnBusiness: this.TeacherVerify.isOnBusiness,
            major: this.TeacherVerify.major,
            name: this.TeacherVerify.name,
            residentAddress: this.TeacherVerify.residentAddress,
            teachingAreas: this.TeacherVerify.teachingAreas,
            teachingExperience: values.teachingExperience,
            teachingItem: this.TeacherVerify.teachingItem,
            teachingItems: [
              i == undefined ? null : i.iId,
              j == undefined ? null : j.iId,
            ],
            teachingPriceHigh: values.highPrice,
            teachingPriceHighVerified: values.highPriceVerify,
            teachingPriceLow: values.lowPrice,
            teachingPriceLowVerified: values.lowPriceVerify,
            teachingTimes: this.TeacherVerify.teachingTimes,
            tid: this.TeacherVerify.tid,
            university: this.TeacherVerify.university,
            verifyAdmin: this.TeacherVerify.verifyAdmin,
            version: 0,
          })
          .then((res) => {
            console.log(res.data)
          })
          .catch((error) => {
            console.log(error.response)
          })
        this.loading = true
        setTimeout(() => {
          this.modal2Visible = false
          this.loading = false
        }, 3000)
      })
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
    showSizeChange(current, pagesize) {
      this.pagination.displayRows = pagesize
      this.teacherInfo.pageSize = pagesize
      this.gettable()
    },
    handlePageChange(displayPage) {
      console.log(displayPage)
      this.pagination.displayPage = displayPage
      this.teacherInfo.pageNumber = displayPage
      this.gettable()
    },
    replace(userInfo) {
      console.log(userInfo.tid)
      console.log(this.ctid)
      this.$api.mode
        .putAdminTeacher({
          ctid: this.ctid,
          tid: userInfo.tid,
        })
        .then((res) => {
          console.log(res.data)
          this.$message.success('已更换教师')
        })
        .catch((error) => {
          console.log(error.response)
        })
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
  width: 100%;
}
.download {
  margin-left: 410px;
}
.form-ant-form-ant-form-horizontal {
  height: 0;
}
.layout {
  margin-left: 110px;
}
</style>