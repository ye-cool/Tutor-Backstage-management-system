<template>
  <a-form :form="form" @submit="handleSubmit" class="form">
      <a-form-item v-bind="formItemLayout" class="nickname">
      <span slot="label">
        昵称
      </span>
      <a-input
        v-decorator="[
          'nickname',
          {
            rules: [
              {
                required: true,
                message: '请输入昵称!',
                whitespace: true,
              },
            ],
          },
        ]"
      />
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label="微信号" class="WeChatid">
      <a-input
        v-decorator="[
          'WeChat ID',
          {
            rules: [
              {
                type: 'WeChat ID',
                message: '请输入正确的微信号码!',
              },
              {
                required: true,
                message: '请输入微信号!',
              },
            ],
          },
        ]"
      />
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label="密码" has-feedback class="pwd">
      <a-input
        v-decorator="[
          'password',
          {
            rules: [
              {
                required: true,
                message: '请输入密码!',
              },
              {
                validator: validateToNextPassword,
              },
            ],
          },
        ]"
        type="password"
      />
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label="确认密码" has-feedback class="cpwd">
      <a-input
        v-decorator="[
          'confirm',
          {
            rules: [
              {
                required: true,
                message: '请确认你的密码!',
              },
              {
                validator: compareToFirstPassword,
              },
            ],
          },
        ]"
        type="password"
        @blur="handleConfirmBlur"
      />
    </a-form-item>
    <a-form-item v-bind="tailFormItemLayout" class="signup">
      <a-button type="primary" @click="showModal"> 注册 </a-button>
    </a-form-item>
    <a-modal v-model="visible" title="提醒" ok-text="确认" cancel-text="取消" @ok="hideModal">
      <p>注册成功，请等待管理员审核</p>
    </a-modal>
    <br />
    <br />
  </a-form>
</template>

<script>
export default {
  data () {
    return {
      visible: false,
      confirmDirty: false,
      autoCompleteResult: [],
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 }
        }
      },
      tailFormItemLayout: {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0
          },
          sm: {
            span: 16,
            offset: 8
          }
        }
      }
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this, { name: 'register' })
  },
  methods: {
    showModal () {
      this.visible = true
    },
    hideModal () {
      this.visible = false
    },
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
    },
    handleConfirmBlur (e) {
      const value = e.target.value
      this.confirmDirty = this.confirmDirty || !!value
    },
    compareToFirstPassword (rule, value, callback) {
      const form = this.form
      if (value && value !== form.getFieldValue('password')) {
        callback(new Error('两次输入的密码不一致!'))
      } else {
        callback()
      }
    },
    validateToNextPassword (rule, value, callback) {
      const form = this.form
      if (value && this.confirmDirty) {
        form.validateFields(['confirm'], { force: true })
      }
      callback()
    }
  }
}
</script>

<style>
.form{
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: auto;
  margin-top: 150px;
}
.nickname,.pwd,.cpwd,.WeChatid{
  width: 60%;
  margin-left:160px;
  overflow: hidden;
}
.signup{
  width: 100%;
  margin-left:160px;
}
</style>
