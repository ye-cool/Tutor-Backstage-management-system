<template>
  <div :style="{ padding: '24px', background: '#fff', textAlign: 'center' }">
    <div class="content">
      <a-page-header
        style="border: 1px solid rgb(235, 237, 240)"
        title="家长端banner"
      >
        <template slot="extra"> </template
      ></a-page-header>
      <a-table
        :columns="columns"
        :data-source="data1"
        rowKey="ciid"
        :pagination="false"
      >
        <a slot="banner" slot-scope="text">
          <img class="image" :src="'https://wechatapp.cdjjwang.com/' + text" />
        </a>
        <a slot="url" slot-scope="text">{{ text }}</a>
        <span slot="customTitle">
          <a-tooltip placement="topLeft" title="只允许绑定公众号链接">
            <a-icon type="info-circle" />
          </a-tooltip>
          链接</span
        >
        <a slot="operate" slot-scope="scope">
          <a @click="parentOperate(scope)">编辑</a>
        </a>
      </a-table>
    </div>
    <div class="content">
      <a-page-header
        style="border: 1px solid rgb(235, 237, 240)"
        title="教师端banner"
      >
        <template slot="extra"> </template
      ></a-page-header>
      <a-table
        :columns="columns"
        :data-source="data2"
        rowKey="ciid"
        :pagination="false"
      >
        <a slot="banner" slot-scope="text">
          <img class="image" :src="'https://wechatapp.cdjjwang.com/' + text" />
        </a>
        <a slot="url" slot-scope="text">{{ text }}</a>
        <span slot="customTitle">
          <a-tooltip placement="topLeft" title="只允许绑定公众号链接">
            <a-icon type="info-circle" />
          </a-tooltip>
          链接</span
        >
        <a slot="operate" slot-scope="scope">
          <a @click="teacherOperate(scope)">编辑</a>
        </a>
      </a-table>
      <a-modal
        width="800px"
        :visible="modalVisible"
        :closable="false"
        title="banner设置"
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
          <a-form-item v-bind="formItemLayout" label="海报">
            <img class="previewImg" style :src="valueUrl" v-if="valueUrl" />
            <input
              class="file"
              type="file"
              accept="image/png,image/gif,image/jpeg"
              @change="update"
            />
            <a-button class="btn">更换海报</a-button>
          </a-form-item>
          <a-form-item v-bind="formItemLayout" label="跳转链接">
            <input
              type="text"
              v-decorator="[
                'link',
                {
                  initialValue: this.Url,
                },
              ]"
            />
          </a-form-item>
        </a-form>
      </a-modal>
    </div>
  </div>
</template>
<script>
const columns = [
  {
    title: '序号',
    dataIndex: 'ciid',
  },
  {
    title: 'banner海报',
    dataIndex: 'image',
    scopedSlots: { customRender: 'banner' },
  },
  {
    dataIndex: 'url',
    slots: { title: 'customTitle' },
    scopedSlots: { customRender: 'url' },
  },
  {
    title: '操作',
    ellipsis: true,
    scopedSlots: { customRender: 'operate' },
  },
]
var data1 = []
var data2 = []
var Url = null
var ciid = null
export default {
  created() {
    this.gettable()
  },
  data() {
    return {
      data1,
      data2,
      columns,
      form: this.$form.createForm(this),
      modalVisible: false,
      loading: false,
      formItemLayout: {
        labelCol: {
          span: 6,
        },
      },
      Url,
      ciid,
      valueUrl: null,
      image: '',
    }
  },
  methods: {
    gettable() {
      const _this = this
      _this.$api.mode
        .getImages()
        .then((res) => {
          console.log(res.data)
          _this.data1 = []
          _this.data2 = []
          res.data.forEach((item, ciid) => {
            if (ciid <= 2) {
              _this.data1.push(item)
            } else {
              _this.data2.push(item)
            }
          })
          console.log(_this.data1)
          console.log(_this.data2)
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
    parentOperate(userInfo) {
      console.log(userInfo)
      this.image = userInfo.image
      this.valueUrl = null
      if (userInfo.image == null) {
        this.valueUrl = ''
      } else {
        this.valueUrl = 'https://wechatapp.cdjjwang.com/' + userInfo.image
      }
      this.Url = null
      this.Url = userInfo.url
      this.ciid = null
      this.ciid = userInfo.ciid
      this.modalVisible = true
    },
    teacherOperate(userInfo) {
      console.log(userInfo)
      this.image = userInfo.image
      this.valueUrl = null
      this.valueUrl = 'https://wechatapp.cdjjwang.com/' + userInfo.image
      this.Url = null
      this.Url = userInfo.url
      this.ciid = null
      this.ciid = userInfo.ciid
      this.modalVisible = true
    },
    handleCancel() {
      this.modalVisible = false
    },
    handleOk(e) {
      this.loading = true
      e.preventDefault()
      this.form.validateFields((error, values) => {
        console.log('error', error)
        console.log('Received values of form: ', values)
        this.$api.mode
          .putImage({
            ciid: this.ciid,
            image: this.image,
            url: values.link,
          })
          .then((res) => {
            console.log(res.data)
            this.$message.success('已保存')
            this.gettable()
          })
          .catch((error) => {
            console.log(error.response)
          })
      })
      this.loading = false
      this.gettable()
      this.modalVisible = false
    },
    update(event) {
      let file = event.target.files[0]
      console.log(file)
      event.preventDefault()
      let formData = new FormData()
      formData.append('uploadFile', file)
      let config = {
        headers: {
          Authorization: localStorage.getItem('Authorization'),
        },
      }
      this.$api.mode
        .postImage(formData, config)
        .then((res) => {
          console.log(res.data)
          this.image = res.data
          this.valueUrl = 'https://wechatapp.cdjjwang.com/' + res.data
        })
        .catch((error) => {
          console.log(error.response)
        })
    },
  },
}
</script>
<style>
.previewImg {
  width: 120px;
}
.file {
  position: absolute;
  width: 100px;
  height: 30px;
  margin-top: 0px;
  left: 290px;
  top: -30px;
  opacity: 0;
  z-index: 10;
}
.btn {
  width: 100px;
  height: 30px;
  margin-top: 0px;
  position: absolute;
  left: 290px;
  top: -30px;
}
.image {
  width: 100px;
}
</style>
