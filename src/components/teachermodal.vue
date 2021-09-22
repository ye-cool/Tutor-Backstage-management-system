    <template>
  <a-modal :visible="modalVisible" :closable="false">
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
        teacherRegister.graduateEducation
      }}</a-descriptions-item>
      <a-descriptions-item label="学校">
        {{ teacherRegister.university }}
      </a-descriptions-item>
      <a-descriptions-item label="所教科目">
        {{ teacherRegister.university }}
      </a-descriptions-item>
      <a-descriptions-item label="家教经历">
        {{ teacherRegister.teachingExperience }}
      </a-descriptions-item>
      <a-descriptions-item label="自我评价">
        {{ teacherRegister.comment }}
      </a-descriptions-item>
      <a-descriptions-item label="价格区间" :span="2">
        {{ teacherRegister.teachingPrice }}
      </a-descriptions-item>
      <a-descriptions-item label="空闲时间">
        {{ teacherRegister.teachingtimes }}
      </a-descriptions-item>
      <a-descriptions-item label="授课区域">
        {{ teacherRegister.teachingAreas }}
      </a-descriptions-item>
      <a-descriptions-item label="常住地址">
        {{ teacherRegister.residentAddress }}
      </a-descriptions-item>
    </a-descriptions>
  </a-modal>
</template>

<script>
export default {
  name: 'modal',
  props: {
    modalVisible: Boolean,
    teacherRegister: {}
  },
  data() {
    return {
      loading: false
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
