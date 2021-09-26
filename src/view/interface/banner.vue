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
        <a slot="operate" slot-scope="scope">
          <a @click="teacherOperate(scope)">编辑</a>
        </a>
      </a-table>
      <a-modal :visible="modalVisible" :closable="false" title="banner设置">
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
          <a-form-item v-bind="formItemLayout" label="海报" has-feedback>
            <img class="previewImg" style :src="valueUrl" v-if="valueUrl" />
            <input
              class="file"
              type="file"
              accept="image/png,image/gif,image/jpeg"
              @change="update"
            />
            <a-button class="btn"> 更换海报 </a-button>
          </a-form-item>
          <a-form-item v-bind="formItemLayout" label="跳转链接" has-feedback>
            <input type="text" v-decorator="['link']" />
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
  },
  {
    title: '链接',
    dataIndex: 'url',
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
      this.modalVisible = true
      this.valueUrl = null
      this.valueUrl = userInfo.image
      this.Url = null
      this.Url = userInfo.url
      this.ciid = null
      this.ciid = userInfo.ciid
      this.form.setFieldsValue({
        link: this.Url,
      })
    },
    teacherOperate(userInfo) {
      console.log(userInfo)
      this.modalVisible = true
      this.valueUrl = null
      this.valueUrl = userInfo.image
      this.Url = null
      this.Url = userInfo.url
      this.ciid = null
      this.ciid = userInfo.ciid
      this.form.setFieldsValue({
        link: this.Url,
      })
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
            url: values.link,
          })
          .then((res) => {
            console.log(res.data)
          })
          .catch((error) => {
            console.log(error.response)
          })
      })
      this.loading = false
      this.modalVisible = false
    },
    update(event) {
      let file = event.target.files[0]
      console.log(file)
      const that = this
      const reader = new FileReader() // 创建读取文件对象
      reader.readAsDataURL(event.target.files[0]) // 发起异步请求，读取文件
      reader.onload = function () {
        // 文件读取完成后
        // 读取完成后，将结果赋值给img的src
        that.valueUrl = this.result
        // console.log(this.result)
      }
      event.preventDefault()
      let formData = new FormData()
      formData.append('uploadFile', file)
      let config = {
        headers: {
          Authorization: localStorage.getItem('Authorization'),
        },
      }
      this.axios
        .post('Api/Admin/Config/Image/Upload', formData, config)
        .then(function (response) {
          if (response.status === 200) {
            // console.log(response.data)
          }
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
.teacher,
.parent,
.book,
.interface {
  padding-top: 20px;
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
.previewImg {
  width: 120px;
}
.file {
  position: absolute;
  margin-top: 6px;
  margin-left: 100px;
  opacity: 0;
  z-index: 100;
}
.btn {
  position: absolute;
  margin-top: 6px;
  margin-left: 100px;
}
</style>
