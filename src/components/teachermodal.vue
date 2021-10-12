    <template>
  <a-modal :visible="modalVisible" :closable="false" width="900px">
    <template slot="footer">
      <a-button key="back" type="primary" @click="handleCancel">
        返回
      </a-button>
    </template>
    <a-descriptions title="注册资料" bordered>
      <a-descriptions-item label="姓名">{{
        teacherRegister.name
      }}</a-descriptions-item>
      <a-descriptions-item label="学历">{{
        teacherRegister.graduateEducation == 0
          ? '专科生'
          : teacherRegister.graduateEducation == 1
          ? '本科生'
          : teacherRegister.graduateEducation == 2
          ? '硕士生'
          : '博士生'
      }}</a-descriptions-item>
      <a-descriptions-item label="学校">
        {{ teacherRegister.university }}
      </a-descriptions-item>
      <a-descriptions-item label="所教科目">
        {{
          teacherRegister.teachingItems.length == 0
            ? null
            : itemId.filter(
                (item) => item.iId == teacherRegister.teachingItems[0]
              )[0].item
        }}
      </a-descriptions-item>
      <a-descriptions-item label="家教经历" :span="2">
        {{ teacherRegister.teachingExperience }}
      </a-descriptions-item>
      <a-descriptions-item label="自我评价" :span="2">
        {{ teacherRegister.selfEvaluation }}
      </a-descriptions-item>
      <a-descriptions-item label="价格区间">
        {{ teacherRegister.teachingPriceLow+"至"+teacherRegister.teachingPriceHigh+"元/小时" }}
      </a-descriptions-item>
      <a-descriptions-item label="空闲时间">
        <span v-for="time in teacherRegister.teachingTimes" :key="time"
          >{{ timeId[time] }}；</span
        >
      </a-descriptions-item>
      <a-descriptions-item label="授课区域">
        {{ areaId[teacherRegister.teachingAreas[0]] }}
      </a-descriptions-item>
      <a-descriptions-item label="常住地址">
        {{ teacherRegister.residentAddress }}
      </a-descriptions-item>
    </a-descriptions>
  </a-modal>
</template>

<script>
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
export default {
  name: 'modal',
  props: {
    modalVisible: Boolean,
    teacherRegister: {},
  },
  data() {
    return {
      loading: false,
      itemId,
      timeId,
      areaId
    }
  },
  methods: {
    handleCancel() {
      this.$emit('changeVisible', false)
    },
  },
}
</script>

<style>
</style>
