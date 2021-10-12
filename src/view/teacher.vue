<template>
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
              :allowClear="true"
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
              :allowClear="true"
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
          <br /><br />
          <a-form-item>
            <a-input
              placeholder="姓名/学校"
              style="width: 200px"
              v-decorator="['nameorschool']"
            />
          </a-form-item>
          <br /><br />
          <a-form-item>
            <a-button
              type="primary"
              icon="search"
              html-type="submit"
              :loading="loading"
            >
              搜索
            </a-button>
          </a-form-item>
        </a-space>
      </a-form>
      <a-table
        :columns="columns"
        :data-source="data"
        rowKey="tid"
        :pagination="false"
      >
        <template slot="gender" slot-scope="text">
          {{ text === 0 ? '男' : '女' }}
        </template>
        <template slot="teachingItems" slot-scope="record">
          {{
            record.teachingItems[0] == undefined
              ? null
              : itemId.filter((item) => item.iId == record.teachingItems[0]) == []
              ? null
              : itemId.filter((item) => item.iId == record.teachingItems[0])[0]
                  .item
          }}
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
      <teacherVrifyModal
        :modal2Visible="modal2Visible"
        v-on:changeVisible2="changeVisible2"
        v-on:gettable="gettable"
        :TeacherVerify="TeacherVerify"
      ></teacherVrifyModal>
      <!-- <a-button @click="test"></a-button>
      <a-button @click="test2"></a-button> -->
    </div>
  </div>
</template>
<script>
import teachermodal from '../components/teachermodal.vue'
import teacherVrifyModal from '../components/teacherVerifyModal.vue'
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
    key: 'teachingItems',
    ellipsis: true,
    scopedSlots: { customRender: 'teachingItems' },
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
    title: '操作人',
    dataIndex: 'verifyAdmin',
    key: 'verifyAdmin',
    ellipsis: true,
  },
]
var data = []
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
var newTeacherStatus = null
var teachingItem = null
export default {
  created() {
    this.gettable()
  },
  data() {
    return {
      teacherInfo: {
        pageNumber: 1,
        pageSize: 10,
      },
      newTeacherStatus,
      TeacherRegister,
      TeacherVerify,
      areaId,
      itemId,
      teachingItem,
      certificateType,
      collegeStudentGrade,
      graduateEducation,
      gender,
      istrue: true,
      form: this.$form.createForm(this),
      gradeData,
      subjectData,
      subjects,
      modal1Visible: false,
      modal2Visible: false,
      loading: false,
      data,
      columns,
      pagination: {
        displayPage: 1,
        displayRows: 10,
        pageSize: 10, // 默认每页显示数量
        total: 0,
        pageSizeOptions: ['10', '20', '30', '50'],
      },
      formItemLayout: {
        labelCol: {
          span: 7,
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
    teacherVrifyModal,
  },
  methods: {
    handleSearch(e) {
      this.loading = true
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
            this.data = []
            this.data = res.data.records
            console.log(this.data)
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
    gettable() {
      const _this = this
      this.$api.mode
        .getTeachers({
          params: _this.teacherInfo,
        })
        .then((res) => {
          console.log(res)
          _this.data = []
          _this.data = res.data.records
          _this.pagination.total = res.data.total
          console.log(_this.data)
        })
        .catch((error) => {
          console.log(error.response)
        })
    },
    // gettotal() {
    //   console.log(this.data)
    //   let arr = Object.keys(this.data)
    //   this.pagination.total = arr.length
    // },
    changeVisible(value) {
      this.modal1Visible = value
    },
    changeVisible2(value) {
      this.modal2Visible = value
    },
    showModal(userInfo) {
      console.log(userInfo)
      if (userInfo.newTeacherStatus === 0) {
        this.$message.info('该教师还未完成注册')
      } else {
        const _this = this
        _this.$api.mode
          .getRegister(`${userInfo.tid}`)
          .then((res) => {
            console.log(res.data)
            _this.TeacherRegister = {}
            _this.TeacherRegister = res.data
            this.modal1Visible = true
            this.$message.success('成功查看')
            // console.log(_this.TeacherRegister.name)
          })
          .catch((error) => {
            console.log(error.response)
          })
      }
    },
    handleCancel(e) {
      this.modal1Visible = false
    },
    showModal2(userInfo) {
      this.newTeacherStatus = userInfo.newTeacherStatus
      if (userInfo.newTeacherStatus == 0) {
        this.$message.info('该教师还未完成注册')
      } else if (userInfo.verifyStatus == 0) {
        const _this = this
        _this.$api.mode
          .getRegister(`${userInfo.tid}`)
          .then((res) => {
            console.log(res.data)
            _this.TeacherVerify = {}
            _this.TeacherVerify = res.data
            this.modal2Visible = true
             this.$message.success('请编辑')
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
            _this.modal2Visible = true
            this.$message.success('请编辑')
          })
          .catch((error) => {
            console.log(error.response)
          })
      }
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
  },
}
</script>

<style>
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
  margin-left: 340px;
}
.form-ant-form-ant-form-horizontal {
  height: 0;
}
.layout {
  margin-left: 180px;
}
.avater {
  width: 180px;
  position: absolute;
}
</style>
