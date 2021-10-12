<template>
  <div :style="{ padding: '24px', background: '#fff', textAlign: 'center' }">
    <div class="content">
      <div class="search">
        <a-form class="search" :form="form" @submit="handleSearch">
          <a-space>
            <br /><br />
            <a-form-item>
              <span class="search-condition">搜索条件</span>
            </a-form-item>
            <br /><br />
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
                placeholder="补习科目"
                style="width: 150px"
                v-decorator="['StudentSubject']"
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
              <a-input
                placeholder="家长称谓/联系电话"
                style="width: 200px"
                v-decorator="['nameortel']"
            /></a-form-item>
            <br /><br />
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
      </div>
      <a-table
        :columns="columns"
        :data-source="data"
        rowKey="did"
        :pagination="false"
      >
        <template slot="itemId" slot-scope="scope">
          {{
            scope.itemId == undefined
              ? null
              : itemId.filter((item) => item.iId == scope.itemId) == []
              ? null
              : itemId.filter((item) => item.iId == scope.itemId)[0].item
          }}
        </template>
        <template slot="areaId" slot-scope="text">
          <span>{{ areaId[text] }}</span>
        </template>
        <template slot="need" slot-scope="scope">
          <a @click="showModal(scope)">编辑</a>
        </template>
        <template slot="verifyStatus" slot-scope="text">
          <a>{{
            text == 0
              ? '待审核'
              : text == 1
              ? '待审核'
              : text == 2
              ? '已通过'
              : text == 3
              ? '不通过'
              : '不通过'
          }}</a>
        </template>
        <template slot="deliveryStatus" slot-scope="text, scope">
          <a @click="showModal2(scope)">已有{{ text }}人投递</a>
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
      <a-modal
        :visible="modal1Visible"
        title="家长需求"
        on-ok="handleOk"
        :closable="false"
        width="700px"
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
        <a-form :form="form">
          <a-form-item v-bind="formItemLayout" label="家长称谓">
            <span> {{ demandRegister.parentName }} </span>
          </a-form-item>
          <a-form-item v-bind="formItemLayout" label="学生补习科目">
            <span>
              {{
                demandRegister.itemId == undefined
                  ? null
                  : itemId.filter(
                      (item) => item.iId == demandRegister.itemId
                    ) == []
                  ? null
                  : itemId.filter(
                      (item) => item.iId == demandRegister.itemId
                    )[0].item
              }}
            </span>
          </a-form-item>
          <a-form-item v-bind="formItemLayout" label="学生情况与老师要求">
            <a-textarea
              style="width: 500px"
              :rows="4"
              v-decorator="[
                'studentLearningSituation',
                {
                  initialValue: demandRegister.studentLearningSituation,
                },
              ]"
            ></a-textarea>
          </a-form-item>
          <a-form-item v-bind="formItemLayout" label="联系电话" has-feedback>
            <span>{{ demandRegister.phone }} </span>
          </a-form-item>
          <a-form-item v-bind="formItemLayout" label="家庭住址" has-feedback>
            <span> {{ areaId[demandRegister.areaId] }}</span>
          </a-form-item>
          <a-form-item v-bind="formItemLayout">
            <span slot="label"> 详细地址 </span>
            <a-input
              style="width: 500px"
              v-decorator="[
                'detailadress',
                {
                  initialValue: demandRegister.address,
                },
              ]"
            ></a-input> </a-form-item
          ><a-form-item v-bind="formItemLayout">
            <span slot="label"> 预期价格 </span>
            <span>{{ demandRegister.price }}</span>
            <span>元/小时</span> </a-form-item
          ><a-form-item v-bind="formItemLayout">
            <span slot="label"> 展示价格 </span>
            <a-input
              style="width: 50px"
              v-decorator="[
                'verifyPrice',
                {
                  initialValue:
                    demandRegister.verifiedPrice == null
                      ? null
                      : demandRegister.verifiedPrice,
                },
              ]"
            ></a-input
            ><span>元/小时</span>
          </a-form-item>
          <a-form-item v-bind="formItemLayout">
            <span slot="label"> 教师性别要求 </span>
            <span>{{
              demandRegister.teacherGender == 0
                ? '男'
                : demandRegister.teacherGender == 1
                ? '女'
                : '均可'
            }}</span>
          </a-form-item>
          <a-form-item v-bind="formItemLayout">
            <span slot="label"> 补习时长 </span>
            <a-input
              style="width: 500px"
              v-decorator="[
                'studyHours',
                {
                  initialValue:
                    demandRegister.classHours == null
                      ? null
                      : demandRegister.classHours,
                },
              ]"
            ></a-input>
          </a-form-item>
          <a-form-item v-bind="formItemLayout">
            <span slot="label"> 空闲时间 </span>
            <span v-for="time in demandRegister.studyTimes" :key="time"
              >{{ timeId[time] }}；</span
            >
          </a-form-item>
          <a-form-item v-bind="formItemLayout">
            <span slot="label"> 设置优先级 </span>
            <a-select
              placeholder="优先级"
              style="width: 100px"
              v-decorator="[
                'priority',
                {
                  initialValue:
                    demandRegister.priority == null
                      ? null
                      : demandRegister.priority,
                },
              ]"
              :allowClear="true"
            >
              <a-select-option v-for="option in options2" :key="option">
                {{ option }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-form>
      </a-modal>
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
            <div class="teachername">
              <a
                v-for="item in teachers"
                :key="item.name"
                @click="showteacherModal(item)"
                >{{ item.name == undefined ? '无' : item.name }}；</a
              >
              <div v-if="teachers.length == 0">无</div>
            </div>
          </a-form-item>
          <a-form-item v-bind="formItemLayout" label="家长称谓">
            <span>{{ demandRegister.parentName }}</span>
          </a-form-item>
          <a-form-item
            v-bind="formItemLayout"
            label="学生补习科目"
            has-feedback
          >
            <span>{{
              demandRegister.itemId == undefined
                ? null
                : itemId.filter((item) => item.iId == demandRegister.itemId) ==
                  []
                ? null
                : itemId.filter((item) => item.iId == demandRegister.itemId)[0]
                    .item
            }}</span>
          </a-form-item>
          <a-form-item v-bind="formItemLayout" label="学习情况" has-feedback>
            <span>{{ demandRegister.studentLearningSituation }}</span>
          </a-form-item>
          <a-form-item v-bind="formItemLayout" label="联系电话" has-feedback>
            <span>{{ demandRegister.phone }}</span>
          </a-form-item>
          <a-form-item v-bind="formItemLayout" label="家庭住址" has-feedback>
            <span>{{ demandRegister.address }}</span>
          </a-form-item>
          <a-form-item v-bind="formItemLayout" label="期望价格" has-feedback>
            <span>{{ demandRegister.price }}</span
            ><span>元/小时</span>
          </a-form-item>
          <a-form-item v-bind="formItemLayout" label="展示价格" has-feedback>
            <span>{{ demandRegister.verifiedPrice }}</span
            ><span>元/小时</span>
          </a-form-item>
          <a-form-item
            v-bind="formItemLayout"
            label="教师性别要求"
            has-feedback
          >
            <span>{{
              demandRegister.teacherGender == 0
                ? '男'
                : demandRegister.teacherGender == 1
                ? '女'
                : '均可'
            }}</span>
          </a-form-item>
          <a-form-item v-bind="formItemLayout" label="补习时长" has-feedback>
            <span>{{ demandRegister.classHours }}</span>
          </a-form-item>
          <a-form-item v-bind="formItemLayout" label="空闲时间" has-feedback>
            <span v-for="time in demandRegister.studyTimes" :key="time"
              >{{ timeId[time] }}；</span
            >
          </a-form-item>
        </a-form>
      </a-modal>
      <teacherVrifyModal
        :modal2Visible="modal3Visible"
        v-on:changeVisible2="changeVisible2"
        :TeacherVerify="TeacherVerify"
      ></teacherVrifyModal>
    </div>
  </div>
</template>
<script>
import teacherVrifyModal from '../components/teacherVerifyModal.vue'
const columns = [
  {
    title: '家长称谓',
    dataIndex: 'parentName',
    key: 'parentName',
  },
  {
    title: '学生年级与补习科目',
    key: 'itemId',
    width: 200,
    scopedSlots: { customRender: 'itemId' },
  },
  {
    title: '联系电话',
    dataIndex: 'phone',
    key: 'phone',
    ellipsis: true,
  },
  {
    title: '家庭住址范围',
    dataIndex: 'areaId',
    key: 'areaId',
    ellipsis: true,
    scopedSlots: { customRender: 'areaId' },
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
    scopedSlots: { customRender: 'verifyStatus' },
  },
  {
    title: '投递状态',
    dataIndex: 'applyNumber',
    key: 'deliveryStatus',
    ellipsis: true,
    scopedSlots: { customRender: 'deliveryStatus' },
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
const timeId = [
  '周一到周五晚上',
  '周一到周五全天',
  '周六上午',
  '周六下午',
  '周六晚上',
  '周日上午',
  '周日下午',
  '周日晚上',
  '寒暑假均可',
]
var demandRegister = {}
var demandVerify = {}
var TeacherVerify = {}
var verifyStatus = null
var teachers = []
export default {
  created() {
    this.gettable()
  },
  data() {
    return {
      demandInfo: {
        pageNumber: 1,
        pageSize: 10,
      },
      teachers,
      verifyStatus,
      demandRegister,
      demandVerify,
      TeacherVerify,
      areaId,
      itemId,
      timeId,
      data,
      istrue: true,
      loading: false,
      form: this.$form.createForm(this),
      modalVisible: false,
      modal1Visible: false,
      modal2Visible: false,
      modal3Visible: false,
      gradeData,
      subjectData,
      subjects,
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
          span: 6,
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
      options2: [1, 2, 3],
    }
  },
  components: {
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
          if (values.StudentSubject == '') {
            return item.item == values.StudentSubject + ''
          } else {
            return item.item == values.StudentSubject + values.StudentSubject
          }
        })
        this.$api.mode
          .getDemand({
            params: {
              areaId:
                areaId.indexOf(
                  values.StudentArea == undefined ? null : values.StudentArea[0]
                ) == -1
                  ? null
                  : areaId.indexOf(
                      values.StudentArea == undefined
                        ? null
                        : values.StudentArea[0]
                    ),
              itemId: i == undefined ? null : i.iId,
              nameOrPhone: values.nameortel,
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
        // this.secondsubject = subjectData[value][0]
        this.form.setFieldsValue({
          StudentSubject:
            subjectData[value][0] == undefined ? '' : subjectData[value][0],
        })
      }
    },
    gettable() {
      const _this = this
      _this.$api.mode
        .getDemand({
          params: _this.demandInfo,
        })
        .then((res) => {
          console.log(res.data)
          _this.data = []
          _this.data = res.data.records
          _this.pagination.total = res.data.total
          console.log(_this.data)
        })
        .catch((error) => {
          console.log(error.response)
        })
    },
    changeVisible2(value) {
      this.modal3Visible = value
    },
    showteacherModal(userInfo) {
      console.log(userInfo)
      if (userInfo.newTeacherStatus === 1) {
        const _this = this
        _this.$api.mode
          .getRegister(`${userInfo.tid}`)
          .then((res) => {
            console.log(res.data)
            _this.TeacherVerify = {}
            _this.TeacherVerify = res.data
            this.modal3Visible = true
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
            _this.modal3Visible = true
          })
          .catch((error) => {
            console.log(error.response)
          })
      }
    },
    showModal(userInfo) {
      console.log(userInfo)
      this.verifyStatus = userInfo.verifyStatus
      if (userInfo.verifyStatus == 0 || userInfo.verifyStatus == 3) {
        const _this = this
        _this.$api.mode
          .getDemandRegister(`${userInfo.did}`)
          .then((res) => {
            console.log(res.data)
            _this.demandRegister = {}
            _this.demandRegister = res.data
            _this.modal1Visible = true
            this.$message.success('请编辑')
          })
          .catch((error) => {
            console.log(error.response)
          })
      } else {
        const _this = this
        _this.$api.mode
          .getDemandVerify(`${userInfo.did}`)
          .then((res) => {
            console.log(res.data)
            _this.demandRegister = {}
            _this.demandRegister = res.data
            _this.modal1Visible = true
            this.$message.success('请编辑')
          })
          .catch((error) => {
            console.log(error.response)
          })
      }
    },
    handleOk(e) {
      e.preventDefault()
      this.form.validateFields((error, values) => {
        console.log('error', error)
        console.log('Received values of form: ', values)
        if (this.verifyStatus == 0 || this.verifyStatus == 3) {
          this.$api.mode
            .postDemandVerify({
              areaId: this.demandRegister.areaId,
              did: this.demandRegister.did,
              gradeId: this.demandRegister.gradeId,
              itemId: this.demandRegister.itemId,
              parentId: this.demandRegister.parentId,
              parentName: this.demandRegister.parentName,
              price: this.demandRegister.price,
              studyTimes: this.demandRegister.studyTimes,
              teacherGender: this.demandRegister.teacherGender,
              classHours: values.studyHours,
              address: values.detailadress,
              priority: values.priority,
              studentLearningSituation: values.studentLearningSituation,
              verifiedPrice: values.verifyPrice,
              version: this.demandRegister.version,
            })
            .then((res) => {
              console.log(res.data)
              this.$message.success('已发布')
              this.gettable()
            })
            .catch((error) => {
              console.log(error.response)
            })
        } else {
          this.$api.mode
            .putDemandVerify({
              areaId: this.demandRegister.areaId,
              did: this.demandRegister.did,
              gradeId: this.demandRegister.gradeId,
              itemId: this.demandRegister.itemId,
              parentId: this.demandRegister.parentId,
              parentName: this.demandRegister.parentName,
              price: this.demandRegister.price,
              studyTimes: this.demandRegister.studyTimes,
              teacherGender: this.demandRegister.teacherGender,
              classHours: values.studyHours,
              address: values.detailadress,
              priority: values.priority,
              studentLearningSituation: values.studentLearningSituation,
              verifiedPrice: values.verifyPrice,
              version: this.demandRegister.version,
            })
            .then((res) => {
              console.log(res.data)
              this.$message.success('已发布')
              this.gettable()
            })
            .catch((error) => {
              console.log(error.response)
            })
        }
        this.loading = true
        setTimeout(() => {
          this.modal1Visible = false
          this.loading = false
        }, 3000)
      })
    },
    handleCancel(e) {
      this.modal1Visible = false
    },
    showModal2(userInfo) {
      if (this.verifyStatus == 0 || this.verifyStatus == 3) {
        this.$message.warning('该需求还未审核通过')
      } else {
        const _this = this
        _this.$api.mode
          .getDemandVerify(`${userInfo.did}`)
          .then((res) => {
            console.log(res.data)
            _this.demandRegister = {}
            _this.demandRegister = res.data
          })
          .catch((error) => {
            console.log(error.response)
          })
        _this.$api.mode
          .getApplyTeacher(`${userInfo.did}`)
          .then((res) => {
            console.log(res.data)
            _this.teachers = res.data
            _this.modal2Visible = true
            this.$message.success('查看投递状态成功')
          })
          .catch((error) => {
            console.log(error.response)
          })
      }
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
    showSizeChange(current, pagesize) {
      this.pagination.displayRows = pagesize
      this.demandInfo.pageSize = pagesize
      this.gettable()
    },
    handlePageChange(displayPage) {
      console.log(displayPage)
      this.pagination.displayPage = displayPage
      this.demandInfo.pageNumber = displayPage
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
</style>
