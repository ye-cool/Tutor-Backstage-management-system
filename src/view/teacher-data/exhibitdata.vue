<template>
  <a-layout id="components-layout-demo-fixed-sider">
    <a-layout-sider :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }">
      <div class="logo" />
      <a-menu theme="dark" mode="inline"
      :default-selected-keys="['1']"
      :default-open-keys="[1]">
        <a-menu-item key="1" class="teacher">
          <router-link to="/teacher"></router-link>
          <a-icon type="team" />
          <span class="nav-text">教师信息管理</span>
        </a-menu-item>
        <a-menu-item key="2" class="parent">
          <router-link to="/parent"></router-link>
          <a-icon type="team" />
          <span class="nav-text">家长需求管理</span>
        </a-menu-item>
        <a-sub-menu key="sub1">
          <span slot="title">
          <a-icon type="book" />
          <span class="nav-text">订单信息管理</span>
          </span>
          <a-menu-item key="3">
          <router-link to="/matched-order"></router-link>
          已匹配订单
        </a-menu-item>
        <a-menu-item key="4">
        <router-link to="/pending-order"></router-link>
          待匹配订单
        </a-menu-item>
      </a-sub-menu>
        <a-sub-menu key="sub2">
          <span slot="title"><a-icon type="control" /><span class="nav-text">界面设置管理</span></span>
          <a-menu-item key="5">
          <router-link to="/home-teacher"></router-link>
          首页教师展示
        </a-menu-item>
        <a-menu-item key="6">
          <router-link to="/banner"></router-link>
          banner设置
        </a-menu-item>
      </a-sub-menu>
        <a-sub-menu key="sub3">
          <span slot="title"><a-icon type="control" /><span class="nav-text">人员管理</span></span>
          <a-menu-item key="7">
            <router-link to="/audit"></router-link>
          审核管理员注册
        </a-menu-item>
        <a-menu-item key="8">
          <router-link to="/check"></router-link>
          查看管理员信息
        </a-menu-item>
      </a-sub-menu>

      </a-menu>
    </a-layout-sider>
    <a-layout :style="{ marginLeft: '200px' }">
      <a-layout-header :style="{ background: '#fff', padding: 0 }" />
      <a-layout-content :style="{ margin: '24px 16px 0', overflow: 'initial' }">
        <div :style="{ padding: '24px', background: '#fff', textAlign: 'center' }">
<div class="content">
    <a-page-header
    style="border: 1px solid rgb(235, 237, 240)"
    title="Title"
    sub-title="This is a subtitle"
  >
   <template slot="extra">
       <span>管理员A</span>
        <a-button key="1" type="primary">
          退出
        </a-button>
      </template></a-page-header>
     <a-form :form="form" class="form">
      <a-form-item v-bind="formItemLayout" class="nickname">
      <span slot="label">
        王老师
      </span>
    </a-form-item>
      <a-form-item v-bind="formItemLayout" class="nickname">
      <span slot="label">
        四川大学
      </span>
      <span>本科生</span>
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label="授课科目" class="WeChatid">
      <a-cascader
    :options="options1"
    :show-search="{ filter }"
    placeholder="授课年级"
    @change="onChange"
    class="Teaching-area"
  />
      <a-cascader
    :options="options2"
    :show-search="{ filter }"
    placeholder="授课科目"
    @change="onChange"
    class="Teaching-area"
  />
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label="价格区间" has-feedback class="pwd">
      <div>
      <a-input></a-input>
      <span>至</span>
      <a-input></a-input>
      <span>元/小时</span>
      </div>
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label="展示价格" has-feedback class="pwd">
      <span>倍数设置</span>
      <a-input></a-input>
      <span>价格区间</span>
      <div>
      <a-input></a-input>
      <span>至</span>
      <a-input></a-input>
      <span>元/小时</span>
      </div>
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
      <a-button type="primary" @click="showModal"> 审核通过，发布资料 </a-button>
    </a-form-item>
  </a-form>
</div>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
export default {
  data () {
    return {
      options1: [
        {
          value: '高中',
          label: '高中'
        },
        {
          value: '初中',
          label: '初中'
        }
      ],
      options2: [
        {
          value: '数学',
          label: '数学'
        },
        {
          value: '物理',
          label: '物理'
        }
      ],
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
    onChange (value, selectedOptions) {
      console.log(value, selectedOptions)
    },
    filter (inputValue, path) {
      return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1)
    },
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
#components-layout-demo-fixed-sider .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
.teacher,.parent,.book,.interface{
  padding-top: 20px;
}
.comtemt{
  padding: 24px;
}
.search{
  display: flex;
  flex-wrap: wrap;
}
.search-condition{
    display: block;
    text-align:center;
    height: 35px;
    line-height: 35px;
}
tr:last-child td {
  padding-bottom: 0;
}
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
