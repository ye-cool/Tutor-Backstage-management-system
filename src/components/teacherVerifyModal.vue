 <template>
  <a-modal
    :visible="modal2Visible"
    title="教师展示资料"
    :closable="false"
    width="850px"
    :destroyOnClose="true"
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
      <img
        class="avatar"
        :src="'https://wechatapp.cdjjwang.com/' + TeacherVerify.avatar"
      />
      <input
        class="file1"
        type="file"
        accept="image/png,image/gif,image/jpeg"
        @change="update"
      />
      <a-button class="btn1"> 更换头像 </a-button>
      <a-form-item v-bind="formItemLayout" label="称谓">
        <span> {{ TeacherVerify.name }} </span>
        <a-button
          type="primary"
          icon="download"
          class="download"
          @click="download(TeacherVerify.tid)"
        >
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
            v-decorator="[
              'grade',
              {
                initialValue:
                  TeacherVerify.teachingItems[0] == undefined
                    ? null
                    : gradeData[
                        parseInt(TeacherVerify.teachingItems[0] / 10 - 1)
                      ],
              },
            ]"
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
            v-decorator="[
              'subject',
              {
                initialValue:
                  TeacherVerify.teachingItems[0] == undefined
                    ? null
                    : subjectData[
                        gradeData[
                          parseInt(TeacherVerify.teachingItems[0] / 10 - 1)
                        ]
                      ][TeacherVerify.teachingItems[0] % 10],
              },
            ]"
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
            v-decorator="[
              'grade2',
              {
                initialValue:
                  TeacherVerify.teachingItems[1] == undefined
                    ? null
                    : gradeData[
                        parseInt(TeacherVerify.teachingItems[1] / 10 - 1)
                      ],
              },
            ]"
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
            v-decorator="[
              'subject2',
              {
                initialValue:
                  TeacherVerify.teachingItems[1] == undefined
                    ? null
                    : subjectData[
                        gradeData[
                          parseInt(TeacherVerify.teachingItems[1] / 10 - 1)
                        ]
                      ][TeacherVerify.teachingItems[1] % 10],
              },
            ]"
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
            v-decorator="[
              'lowPrice',
              {
                initialValue: TeacherVerify.teachingPriceLow,
              },
            ]"
          ></a-input>
        </a-form-item>
        <a-form-item>
          <span>至</span>
        </a-form-item>
        <a-form-item>
          <a-input
            style="width: 100px"
            v-decorator="[
              'highPrice',
              {
                initialValue: TeacherVerify.teachingPriceHigh,
              },
            ]"
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
          @change="coefficientChange"
          v-decorator="[
            'multiple',
            {
              initialValue:
                TeacherVerify.coefficient == undefined
                  ? null
                  : TeacherVerify.coefficient,
            },
          ]"
        ></a-input>
        <a-space class="layout1">
          <a-form-item>
            <span>价格区间</span>
          </a-form-item>
          <a-form-item>
            <a-input
              style="width: 100px"
              v-decorator="[
                'lowPriceVerified',
                {
                  initialValue:
                    TeacherVerify.teachingPriceLowVerified == undefined
                      ? null
                      : TeacherVerify.teachingPriceLowVerified,
                },
              ]"
            ></a-input>
          </a-form-item>
          <a-form-item>
            <span>至</span>
          </a-form-item>
          <a-form-item>
            <a-input
              style="width: 100px"
              v-decorator="[
                'highPriceVerified',
                {
                  initialValue:
                    TeacherVerify.teachingPriceHighVerified == undefined
                      ? null
                      : TeacherVerify.teachingPriceHighVerified,
                },
              ]"
            ></a-input>
          </a-form-item>
          <a-form-item>
            <span>元/小时</span>
          </a-form-item>
        </a-space>
      </a-form-item>
      <a-form-item v-bind="formItemLayout">
        <span slot="label"> 家教经历 </span>
        <a-textarea
          v-decorator="[
            'teachingExperience',
            {
              initialValue: TeacherVerify.teachingExperience,
            },
          ]"
          style="width: 500px"
          :rows="4"
        ></a-textarea>
      </a-form-item>
      <a-form-item v-bind="formItemLayout">
        <span slot="label"> 自我评价 </span>
        <a-textarea
          v-decorator="[
            'selfEvaluation',
            {
              initialValue: TeacherVerify.selfEvaluation,
            },
          ]"
          style="width: 500px"
          :rows="4"
        ></a-textarea> </a-form-item
      ><a-form-item v-bind="formItemLayout">
        <span slot="label"> 空闲时间 </span>
        <span v-for="time in TeacherVerify.teachingTimes" :key="time"
          >{{ timeId[time] }}；</span
        ></a-form-item
      ><a-form-item v-bind="formItemLayout">
        <span slot="label"> 区域 </span>
        <span>{{ areaId[TeacherVerify.teachingAreas[0]] }}</span>
      </a-form-item>
      <a-form-item v-bind="formItemLayout">
        <span slot="label"> 常住地址 </span>
        <span>{{ TeacherVerify.residentAddress }}</span>
      </a-form-item>
      <a-form-item v-bind="formItemLayout">
        <span slot="label"> 一句话标签 </span>
        <a-input
          v-decorator="[
            'comment',
            {
              initialValue: TeacherVerify.comment,
            },
          ]"
          style="width: 450px"
          placeholder="请输入内容"
        ></a-input>
      </a-form-item>
      <a-form-item v-bind="formItemLayout">
        <span slot="label"> 授课课时数 </span>
        <a-input
          v-decorator="[
            'teachingHours',
            {
              initialValue:
                TeacherVerify.classHours == undefined
                  ? null
                  : TeacherVerify.classHours,
            },
          ]"
          style="width: 450px"
          placeholder="请输入内容"
        ></a-input>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
var subjects1 = []
var subjects2 = []
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
export default {
  name: 'modal',
  props: {
    modal2Visible: Boolean,
    TeacherVerify: {},
  },

  data() {
    return {
      itemId,
      timeId,
      areaId,
      subjects1,
      subjects2,
      gradeData,
      subjectData,
      loading: false,
      form: this.$form.createForm(this),
      formItemLayout: {
        labelCol: {
          span: 7,
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      },
    }
  },
  methods: {
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
        if (this.TeacherVerify.verifyStatus == 0) {
          this.$api.mode
            .postVerify({
              awards: this.TeacherVerify.awards,
              certificateType: this.TeacherVerify.certificateType,
              classHours: values.teachingHours,
              coefficient: values.multiple,
              collegeStudentGrade: this.TeacherVerify.collegeStudentGrade,
              comment: values.comment,
              gender: this.TeacherVerify.gender,
              graduateEducation: this.TeacherVerify.graduateEducation,
              graduateProfession: this.TeacherVerify.graduateProfession,
              isCollegeStudent: this.TeacherVerify.isCollegeStudent,
              major: this.TeacherVerify.major,
              name: this.TeacherVerify.name,
              residentAddress: this.TeacherVerify.residentAddress,
              teachingAreas: this.TeacherVerify.teachingAreas,
              teachingExperience: values.teachingExperience,
              selfEvaluation: values.selfEvaluation,
              teachingItem: this.TeacherVerify.teachingItem,
              teachingItems: [
                i == undefined ? null : i.iId,
                j == undefined ? null : j.iId,
              ],
              teachingPriceHigh: values.highPrice,
              teachingPriceLow: values.lowPrice,
              teachingPriceHighVerified: values.highPriceVerified,
              teachingPriceLowVerified: values.lowPriceVerified,
              teachingTimes: this.TeacherVerify.teachingTimes,
              tid: this.TeacherVerify.tid,
              university: this.TeacherVerify.university,
              verifyAdmin: this.TeacherVerify.verifyAdmin,
              version: this.TeacherVerify.version,
            })
            .then((res) => {
              console.log(res.data)
              this.$message.success('审核通过，发布资料')
              this.gettable()
            })
            .catch((error) => {
              console.log(error.response)
            })
        } else {
          this.$api.mode
            .putVerify({
              awards: this.TeacherVerify.awards,
              certificateType: this.TeacherVerify.certificateType,
              classHours: values.teachingHours,
              coefficient: values.multiple,
              collegeStudentGrade: this.TeacherVerify.collegeStudentGrade,
              comment: values.comment,
              gender: this.TeacherVerify.gender,
              graduateEducation: this.TeacherVerify.graduateEducation,
              graduateProfession: this.TeacherVerify.graduateProfession,
              isCollegeStudent: this.TeacherVerify.isCollegeStudent,
              major: this.TeacherVerify.major,
              name: this.TeacherVerify.name,
              residentAddress: this.TeacherVerify.residentAddress,
              teachingAreas: this.TeacherVerify.teachingAreas,
              teachingExperience: values.teachingExperience,
              selfEvaluation: values.selfEvaluation,
              teachingItem: this.TeacherVerify.teachingItem,
              teachingItems: [
                i == undefined ? null : i.iId,
                j == undefined ? null : j.iId,
              ],
              teachingPriceHigh: values.highPrice,
              teachingPriceLow: values.lowPrice,
              teachingPriceHighVerified: values.highPriceVerified,
              teachingPriceLowVerified: values.lowPriceVerified,
              teachingTimes: this.TeacherVerify.teachingTimes,
              tid: this.TeacherVerify.tid,
              university: this.TeacherVerify.university,
              version: this.TeacherVerify.version,
            })
            .then((res) => {
              console.log(res.data)
              this.$message.success('审核通过，发布资料')
              this.gettable()
            })
            .catch((error) => {
              console.log(error.response)
            })
        }
        this.loading = true
        setTimeout(() => {
          this.modal2Visible = false
          this.loading = false
        }, 3000)
      })
    },
    gettable() {
      this.$emit('gettable')
    },
    handleCancel2() {
      this.$emit('changeVisible2', false)
    },
    handlegradeChange1(value) {
      this.istrue = false
      this.subjects1 = subjectData[value]
    },
    handlegradeChange2(value) {
      this.istrue = false
      this.subjects2 = subjectData[value]
    },
    update(event) {
      let file = event.target.files[0]
      event.preventDefault()
      let formData = new FormData()
      formData.append('uploadFile', file)
      let config = {
        headers: {
          Authorization: localStorage.getItem('Authorization'),
        },
      }
      this.$api.mode
        .postAvatar(this.TeacherVerify.tid, formData, config)
        .then((res) => {
          console.log(res.data)
          this.TeacherVerify.avatar = res.data
        })
        .catch((error) => {
          console.log(error.response)
        })
    },
    download(tid) {
      window.open(`https://wechatapp.cdjjwang.com/Api/Admin/Pdf/${tid}`)
    },
    coefficientChange(e) {
      console.log(e.target.value)
      this.form.setFieldsValue({
        multiple: 0,
      })
      if (e.target.value == 0) {
      } else {
        this.form.setFieldsValue({
          lowPriceVerified: parseInt(
            this.TeacherVerify.teachingPriceLow * e.target.value
          ),
          highPriceVerified: parseInt(
            this.TeacherVerify.teachingPriceHigh * e.target.value
          ),
        })
      }
    },
  },
}
</script>

<style >
.layout {
  margin-left: 180px;
}
.layout1 {
  margin-right: 80px;
}
.avatar {
  width: 160px;
  position: absolute;
}
.file1 {
  position: absolute;
  top: 300px;
  left: 40px;
  width: 100px;
  height: 30px;
  opacity: 0;
  z-index: 10;
}
.btn1 {
  position: absolute;
  width: 100px;
  height: 30px;
  top: 300px;
  left: 40px;
}
.download {
  margin-left: 300px;
}
</style>