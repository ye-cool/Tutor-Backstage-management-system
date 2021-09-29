<template>
  <div class="common-layout">
    <div class="top">
      <div class="header">
        <img alt="logo" class="logo" src="@/assets/logo.png" />
      </div>
    </div>
    <div class="login">
      <a-form @submit="onSubmit" :form="form">
        <a-tabs
          size="large"
          :tabBarStyle="{ textAlign: 'center' }"
          style="padding: 0 2px"
        >
          <a-tab-pane tab="账户密码登录" key="1">
            <a-alert
              type="error"
              :closable="true"
              v-show="error"
              :message="error"
              showIcon
              style="margin-bottom: 24px"
            />
            <a-form-item>
              <a-input
                autocomplete="autocomplete"
                size="large"
                placeholder="admin"
                v-decorator="[
                  'name',
                  {
                    rules: [
                      {
                        required: true,
                        message: '请输入账户名',
                        whitespace: true,
                      },
                    ],
                  },
                ]"
              >
                <a-icon slot="prefix" type="user" />
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-input
                size="large"
                placeholder="admin"
                autocomplete="autocomplete"
                type="password"
                v-decorator="[
                  'password',
                  {
                    rules: [
                      {
                        required: true,
                        message: '请输入密码',
                        whitespace: true,
                      },
                    ],
                  },
                ]"
              >
                <a-icon slot="prefix" type="lock" />
              </a-input>
            </a-form-item>
          </a-tab-pane>
        </a-tabs>

        <a-form-item>
          <a-button
            :loading="logging"
            style="width: 100%; margin-top: 24px"
            size="large"
            htmlType="submit"
            type="primary"
            >登录</a-button
          >
        </a-form-item>
        <div>
          <router-link style="float: left" to="/signup">注册新账户</router-link>
        </div>
        <Verify
          @success="success"
          mode="pop"
          captchaType="blockPuzzle"
          :imgSize="{ width: '330px', height: '155px' }"
          ref="verify"
        ></Verify>
      </a-form>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import Verify from '../../components/verifition/Verify'
export default {
  data() {
    return {
      userToken: '',
      logging: false,
      error: '',
      form: this.$form.createForm(this),
      username: '',
      password: '',
    }
  },
  components: {
    Verify,
  },
  methods: {
    success(params) {
      console.log(params)
      // params 返回的二次验证参数, 和登录参数一起回传给登录接口，方便后台进行二次验证
      this.$api.mode
        .login({
          username: this.username,
          password: this.password,
          captchaVerification: params.captchaVerification,
        })
        .then((res) => {
          console.log(res)
          this.logging = true
          this.userToken = res.data
          let strings = this.userToken.split('.') //截取token，获取载体
          let userinfo = JSON.parse(
            decodeURIComponent(
              escape(
                window.atob(strings[1].replace(/-/g, '+').replace(/_/g, '/'))
              )
            )
          ) //解析，需要吧‘_’,'-'进行转换否则会无法解析
          console.log(userinfo)
          // 将用户token保存到vuex中
          localStorage.setItem('admin', this.username)
          this.changeLogin({ Authorization: this.userToken })
          this.logging = false
          if (res.code === 200) {
            this.$message.success('登陆成功')
          } else {
            this.$message.info('密码错误')
          }
          if (userinfo.authority == 0) {
            this.$router.push({
              path: '/Superadmin',
            })
          } else {
            this.$router.push({
              path: '/admin',
            })
          }
        })
    },
    useVerify() {
      this.$refs.verify.show()
    },
    ...mapMutations(['changeLogin']),
    onSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          ;(this.username = values.name),
            (this.password = values.password),
            this.$refs.verify.show()
        }
      })
    },
  },
}
</script>
<style>
.common-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: auto;
}
.common-layout .top {
  margin: 30px;
}
@media (min-width: 768px) {
  .common-layout .top,
  .login {
    padding: 112px 0 24px;
  }
}

.common-layout .top {
  text-align: center;
}
.common-layout .top .header {
  height: 40px;
  line-height: 40px;
}
.common-layout .top .header a {
  text-decoration: none;
}
.common-layout .top .header .logo {
  height: 200 px;
  vertical-align: top;
  margin-right: 16px;
}
.common-layout .top .desc {
  font-size: 14px;
  color: #666;
  margin-top: 12px;
  margin-bottom: 40px;
}
.common-layout .login {
  width: 368px;
  margin: 0 auto;
}
@media screen and (max-width: 576px) {
  .common-layout .login {
    width: 95%;
  }
}
@media screen and (max-width: 320px) {
  .common-layout .login .captcha-button {
    font-size: 14px;
  }
}
.common-layout .login .icon {
  font-size: 24px;
  color: #666;
  margin-left: 16px;
  vertical-align: middle;
  cursor: pointer;
  transition: color 0.3s;
}
.common-layout .login .icon:hover {
  color: #999;
}
</style>
