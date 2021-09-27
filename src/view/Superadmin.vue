<template>
  <a-layout id="components-layout-demo-fixed-sider">
    <a-layout-sider
      :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }"
    >
      <div class="logo" />
      <a-menu
        theme="dark"
        mode="inline"
        :default-selected-keys="[this.$route.path]"
        @openChange="onOpenChange"
        :open-keys="openKeys"
        router
      >
        <a-menu-item key="/Superadmin/teacher" class="teacher">
          <a-icon type="team" />
          <span class="nav-text">教师信息管理</span>
          <router-link to="/Superadmin/teacher"></router-link>
        </a-menu-item>
        <a-menu-item key="/Superadmin/parent" class="parent">
          <a-icon type="team" />
          <span class="nav-text">家长需求管理</span>
          <router-link to="/Superadmin/parent"></router-link>
        </a-menu-item>
        <a-sub-menu key="sub1">
          <span slot="title">
            <a-icon type="book" />
            <span class="nav-text">订单信息管理</span>
          </span>
          <a-menu-item key="/Superadmin/matched-order">
            <router-link to="/Superadmin/matched-order"></router-link>
            已匹配订单
          </a-menu-item>
          <a-menu-item key="/Superadmin/pending-order">
            <router-link to="/Superadmin/pending-order"></router-link>
            待匹配订单
          </a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub2">
          <span slot="title"
            ><a-icon type="control" /><span class="nav-text"
              >界面设置管理</span
            ></span
          >
          <a-menu-item key="/Superadmin/admin-teacher">
            <router-link to="/Superadmin/admin-teacher"></router-link>
            首页教师展示
          </a-menu-item>
          <a-menu-item key="/Superadmin/banner">
            <router-link to="/Superadmin/banner"></router-link>
            banner设置
          </a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub3">
          <span slot="title"
            ><a-icon type="control" /><span class="nav-text"
              >人员管理</span
            ></span
          >
          <a-menu-item key="/Superadmin/audit">
            <router-link to="/Superadmin/audit"></router-link>
            审核管理员注册
          </a-menu-item>
          <a-menu-item key="/Superadmin/check">
            <router-link to="/Superadmin/check"></router-link>
            查看管理员信息
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout :style="{ marginLeft: '200px' }">
      <a-layout-header :style="{ background: '#fff', padding: 0 }">
        <a-page-header>
          <template slot="extra">
            <span>{{ admin }}</span>
            <a-button key="1" type="primary" @click="signOut"> 退出 </a-button>
          </template></a-page-header
        >
      </a-layout-header>
      <a-layout-content :style="{ margin: '24px 16px 0', overflow: 'initial' }">
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
export default {
  created() {
    this.admin = this.$route.query.username
  },
  data() {
    return {
      rootSubmenuKeys: ['sub1', 'sub2', 'sub3'],
      openKeys: [],
      admin: ''
    }
  },
  methods: {
    signOut() {
      window.localStorage.clear()
      this.$router.push('/login')
    },
    onOpenChange(openKeys) {
      const latestOpenKey = openKeys.find(
        (key) => this.openKeys.indexOf(key) === -1
      )
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : []
      }
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
</style>
