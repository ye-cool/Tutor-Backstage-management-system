    <template>
    <a-modal :visible="modalVisible" on-ok="handleOk" :closable="false">
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
</template>

<script>
export default {
  name: 'modal',
  props: {
    modalVisible: Boolean
  },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    handleCancel () {
      this.$emit('changeVisible', false)
    }
  }
}
</script>

<style>

</style>
