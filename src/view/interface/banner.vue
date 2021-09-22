<template>
  <div :style="{ padding: '24px', background: '#fff', textAlign: 'center' }">
    <div class="content">
      <a-page-header
        style="border: 1px solid rgb(235, 237, 240)"
        title="家长端banner"
        sub-title="This is a subtitle"
      >
        <template slot="extra">
          <span>管理员A</span>
          <a-button key="1" type="primary"> 退出 </a-button>
        </template></a-page-header
      >
      <a-table
        :columns="columns"
        :data-source="data1"
        rowKey="ciid"
        :pagination="pagination"
      >
        <a slot="operate">
          <a @click="parentOperate">编辑</a>
        </a>
      </a-table>
    </div>
    <div class="content">
      <a-page-header
        style="border: 1px solid rgb(235, 237, 240)"
        title="教师端banner"
        sub-title="This is a subtitle"
      >
        <template slot="extra"> </template
      ></a-page-header>
      <a-table
        :columns="columns"
        :data-source="data2"
        rowKey="ciid"
        :pagination="pagination"
      >
        <a slot="operate">
          <a @click="teacherOperate">编辑</a>
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
        <a-form class="form">
          <a-form-item v-bind="formItemLayout" label="海报" has-feedback>
            <a-upload
              name="avatar"
              list-type="picture-card"
              class="avatar-uploader"
              :show-upload-list="false"
              action=""
              :before-upload="beforeUpload"
              @change="handleChange"
            >
              <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
              <div v-else>
                <a-icon :type="loading ? 'loading' : 'plus'" />
                <div class="ant-upload-text">Upload</div>
              </div>
            </a-upload>
          </a-form-item>
          <a-form-item v-bind="formItemLayout" label="链接" has-feedback>
            <input />
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
function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
export default {
  created() {
    this.gettable()
  },
  data() {
    return {
      data1,
      data2,
      columns,
      modalVisible: false,
      loading: false,
      imageUrl: '',
      pagination: {
        pageSize: 10, // 默认每页显示数量
        showTotal: (total) => `总共有 ${total} 名`, // 显示总数
      },
      formItemLayout: {
        labelCol: {
          span: 6,
        },
      },
    }
  },
  methods: {
    gettable() {
      const _this = this
      _this.axios
        .get('/Api/Admin/Config/Images', {})
        .then((res) => {
          console.log(res.data)
          _this.data1 = []
          _this.data2 = []
          res.data.data.forEach((item, ciid) => {
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
    parentOperate() {
      this.modalVisible = true
    },
    teacherOperate() {
      this.modalVisible = true
    },
    handleCancel() {
      this.modalVisible = false
    },
    handleOk() {
      ;(this.loading = true),
        (this.loading = false),
        (this.modalVisible = false)
    },
    handleChange(info) {
      if (info.file.status === 'uploading') {
        this.loading = true
        return
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, (imageUrl) => {
          this.imageUrl = imageUrl
          this.loading = false
        })
      }
    },
    beforeUpload(file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJpgOrPng) {
        this.$message.error('You can only upload JPG file!')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('Image must smaller than 2MB!')
      }
      return isJpgOrPng && isLt2M
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
.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
