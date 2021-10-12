<template>
  <div :style="{ padding: '24px', background: '#fff', textAlign: 'center' }">
    <div class="content">
      <a-table
        :columns="columns"
        :data-source="data"
        :pagination="false"
        rowKey="did"
      >
        <template slot="teacherProfile" slot-scope="scope">
          <a @click="showModal2(scope)">查看</a>
        </template>
        <template slot="parentneed" slot-scope="scope">
          <a @click="showModal1(scope)">查看</a>
        </template>
        <template slot="contractStatus" slot-scope="text">
          <span>{{ text == 1 ? '家长预约' : '教师投递' }}</span>
        </template>
        <template slot="processStatus" slot-scope="text">
          <a>{{ text == 0 ? '待处理' : '已完成' }}</a>
        </template>
        <template slot="operate" slot-scope="scope">
          <a @click="reject(scope)">
            {{ scope.processStatus == 0 ? '结束订单' : '已完成' }}
          </a>
          <a @click="AddNotes(scope)">{{
            scope.remark == null ? '添加备注' : '查看备注'
          }}</a>
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
          <a-button key="back" @click="handleCancel2"> 返回 </a-button>
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
            <span>
              {{ demandRegister.studentLearningSituation }}
            </span>
          </a-form-item>
          <a-form-item v-bind="formItemLayout" label="联系电话" has-feedback>
            <span>{{ demandRegister.phone }} </span>
          </a-form-item>
          <a-form-item v-bind="formItemLayout" label="家庭住址" has-feedback>
            <span> {{ areaId[demandRegister.areaId] }}</span>
          </a-form-item>
          <a-form-item v-bind="formItemLayout">
            <span slot="label"> 详细地址 </span>
            <span> {{ demandRegister.address }}</span> </a-form-item
          ><a-form-item v-bind="formItemLayout">
            <span slot="label"> 预期价格 </span>
            <span>{{ demandRegister.price }}</span>
            <span>元/小时</span> </a-form-item
          ><a-form-item v-bind="formItemLayout">
            <span slot="label"> 展示价格 </span>
            <span>{{ demandRegister.verifiedPrice }}</span
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
            <span>{{ demandRegister.classHours }}</span>
          </a-form-item>
          <a-form-item v-bind="formItemLayout">
            <span slot="label"> 空闲时间 </span>
            <span v-for="time in demandRegister.studyTimes" :key="time">{{
              timeId[time]
            }}；</span>
          </a-form-item>
        </a-form>
      </a-modal>
      <a-modal
        :visible="modal3Visible"
        title="家长需求"
        on-ok="handleOk"
        :closable="false"
        width="700px"
      >
        <template slot="footer">
          <a-button key="back" @click="handleCancel3"> 返回 </a-button>
        </template>
        <a-form :form="form">
          <a-form-item v-bind="formItemLayout" label="家长称谓">
            <span> {{ demandRegister.parentName }} </span>
          </a-form-item>
          <a-form-item v-bind="formItemLayout" label="联系电话">
            <span>{{ demandRegister.phone }} </span>
          </a-form-item>
          <a-form-item v-bind="formItemLayout" label="附加备注">
            <span>{{ demandRegister.remark }} </span>
          </a-form-item>
        </a-form>
      </a-modal>
      <teacherVrifyModal
        :modal2Visible="modal2Visible"
        v-on:changeVisible2="changeVisible2"
        :TeacherVerify="TeacherVerify"
      ></teacherVrifyModal>
      <a-modal
        :visible="modalVisible"
        :closable="false"
        title="备注"
        width="700px"
      >
        <template slot="footer">
          <a-button key="back" type="primary" @click="handleCancel">
            返回
          </a-button>
          <a-button
            key="submit"
            type="primary"
            :loading="loading"
            @click="handleOk"
          >
            保存
          </a-button>
        </template>
        <a-form class="form" :form="form">
          <a-form-item v-bind="formItemLayout" label="备注">
            <a-textarea
              v-decorator="[
                'notes',
                {
                  initialValue: notes,
                },
              ]"
              style="width: 500px"
              :rows="4"
            ></a-textarea>
          </a-form-item>
        </a-form>
      </a-modal>
    </div>
  </div>
</template>
<script>
import teacherVrifyModal from '../../components/teacherVerifyModal.vue'
const columns = [
  {
    title: '家长联系方式',
    dataIndex: 'parentPhone',
    key: 'parentPhone',
    width: 150,
  },
  {
    title: '教师联系方式',
    dataIndex: 'teacherPhone',
    key: 'teacherPhone',
    width: 150,
  },
  {
    title: '教师资料',
    key: 'teacherProfile',
    ellipsis: true,
    scopedSlots: { customRender: 'teacherProfile' },
  },
  {
    title: '家长需求',
    key: 'parentneed',
    ellipsis: true,
    scopedSlots: { customRender: 'parentneed' },
  },
  {
    title: '匹配方式',
    dataIndex: 'contractStatus',
    key: 'contractStatus',
    ellipsis: true,
    scopedSlots: { customRender: 'contractStatus' },
  },
  {
    title: '匹配时间',
    dataIndex: 'contractTime',
    key: 'contractTime',
    ellipsis: true,
    width: 180,
  },
  {
    title: '处理状态',
    dataIndex: 'processStatus',
    key: 'processStatus',
    ellipsis: true,
    scopedSlots: { customRender: 'processStatus' },
  },
  {
    title: '操作人',
    dataIndex: 'admin',
    key: 'admin',
    ellipsis: true,
  },
  {
    title: '操作',
    key: 'operate',
    ellipsis: true,
    width: 200,
    scopedSlots: { customRender: 'operate' },
  },
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
var data = []
var TeacherVerify = {}
var demandRegister = {}
export default {
  created() {
    this.gettable()
  },
  data() {
    return {
      orderInfo: {
        pageNumber: 1,
        pageSize: 10,
      },
      data,
      columns,
      itemId,
      areaId,
      timeId,
      notes: '',
      did: null,
      loading: false,
      modalVisible: false,
      modal1Visible: false,
      modal2Visible: false,
      modal3Visible: false,
      TeacherVerify,
      demandRegister,
      pagination: {
        displayPage: 1,
        displayRows: 10,
        pageSize: 10, // 默认每页显示数量
        total: 0,
        pageSizeOptions: ['10', '20', '30', '50'],
      },
      form: this.$form.createForm(this),
      formItemLayout: {
        labelCol: {
          span: 5,
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      },
    }
  },
  components: {
    teacherVrifyModal,
  },
  methods: {
    gettable() {
      const _this = this
      _this.$api.mode
        .getMatchedContracts({
          params: _this.orderInfo,
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
    onChange(value, selectedOptions) {
      console.log(value, selectedOptions)
    },
    filter(inputValue, path) {
      return path.some(
        (option) =>
          option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
      )
    },
    reject(userInfo) {
      console.log(userInfo)
      this.$api.mode
        .deleteDemand(`${userInfo.did}`)
        .then((res) => {
          console.log(res)
          this.gettable()
          this.$message.success('已结束订单')
        })
        .catch((error) => {
          console.log(error.response)
        })
    },
    showSizeChange(current, pagesize) {
      this.pagination.displayRows = pagesize
      this.orderInfo.pageSize = pagesize
      this.gettable()
    },
    handlePageChange(displayPage) {
      console.log(displayPage)
      this.pagination.displayPage = displayPage
      this.orderInfo.pageNumber = displayPage
      this.gettable()
    },
    showModal1(userInfo) {
      if (userInfo.contractStatus == 1) {
        const _this = this
        _this.$api.mode
          .getDemandRegister(`${userInfo.did}`)
          .then((res) => {
            console.log(res.data)
            _this.demandRegister = {}
            _this.demandRegister = res.data
            _this.modal3Visible = true
            this.$message.success('查看成功')
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
            this.$message.success('查看成功')
          })
          .catch((error) => {
            console.log(error.response)
          })
      }
    },
    showModal2(userInfo) {
      const _this = this
      _this.$api.mode
        .getVerify(`${userInfo.tid}`)
        .then((res) => {
          console.log(res.data)
          _this.TeacherVerify = {}
          _this.TeacherVerify = res.data
          _this.modal2Visible = true
          this.$message.success('查看成功')
        })
        .catch((error) => {
          console.log(error.response)
        })
    },
    changeVisible2(value) {
      this.modal2Visible = value
    },
    AddNotes(userInfo) {
      console.log(userInfo)
      this.notes = userInfo.remark
      this.did = userInfo.did
      this.modalVisible = true
      this.$message.success('查看备注')
    },
    handleOk(e) {
      this.loading = true
      e.preventDefault()
      this.form.validateFields((error, values) => {
        console.log('error', error)
        console.log('Received values of form: ', values)
        this.$api.mode
          .putRemark(this.did, {
            remark: values.notes,
          })
          .then((res) => {
            console.log(res)
            this.gettable()
            this.$message.success('已保存')
          })
          .catch((error) => {
            console.log(error.response)
          })
        setTimeout(() => {
          this.modalVisible = false
          this.loading = false
        }, 3000)
      })
    },
    handleCancel() {
      this.modalVisible = false
    },
    handleCancel2() {
      this.modal1Visible = false
    },
    handleCancel3() {
      this.modal3Visible = false
    },
  },
}
</script>

<style>
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
