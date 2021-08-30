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

<div class="search">
    <a-space>
    <span class="search-condition">搜索条件</span>
  <a-cascader
    :options="options1"
    :show-search="{ filter }"
    placeholder="授课地区"
    @change="onChange"
    class="Teaching-area"
  /><br /><br />
  <a-cascader
    :options="options2"
    :show-search="{ filter }"
    placeholder="授课年级"
    @change="onChange"
    class="Teaching-grade"
  /><br /><br />
  <a-cascader
    :options="options3"
    :show-search="{ filter }"
    placeholder="授课科目"
    @change="onChange"
    class="Subjects-taught"
  /><br /><br />
  <a-cascader
    :options="options4"
    :show-search="{ filter }"
    placeholder="性别"
    @change="onChange"
    class="gender"
  />
    <a-input placeholder="姓名/学校" style="width: 200px" @search="onSearch" />
    <a-button type="primary" icon="search">
      Search
    </a-button>
    </a-space>
</div>
<a-table :columns="columns" :data-source="data">
    <!-- <a slot="name" slot-scope="text">{{ text }}</a> -->
    <a slot="register" slot-scope="text" @click="showModal">{{ text }}</a>
    <a slot="exhibit" slot-scope="text" @click="showModal">{{ text }}</a>
</a-table>
    <a-modal v-model="visible" title="Title" on-ok="handleOk">
    <template slot="footer">
      <a-button key="back" @click="handleCancel">
        Return
      </a-button>
      <a-button key="submit" type="primary" :loading="loading" @click="handleOk">
        Submit
      </a-button>
    </template>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </a-modal>
</div>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
const columns = [
  {
    title: '教师姓名',
    dataIndex: 'name',
    key: 'name',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '性别',
    dataIndex: 'gender',
    key: 'gender',
    width: 50
  },
  {
    title: '学校',
    dataIndex: 'school',
    key: 'school',
    ellipsis: true
  },
  {
    title: '授课年级与科目',
    dataIndex: 'SubjectsAndGrand',
    key: 'SubjectsAndGrand',
    ellipsis: true
  },
  {
    title: '注册资料',
    dataIndex: 'register',
    key: 'register',
    ellipsis: true,
    scopedSlots: { customRender: 'register' }
  },
  {
    title: '展示资料',
    dataIndex: 'exhibit',
    key: 'exhibit',
    ellipsis: true,
    scopedSlots: { customRender: 'exhibit' }
  },
  {
    title: '资料状态',
    dataIndex: 'dataStatus',
    key: 'dataStatus',
    ellipsis: true
  },
  {
    title: '操作人',
    dataIndex: 'operator',
    key: 'operator',
    ellipsis: true
  }
]
const data = [
  {
    key: '1',
    name: 'John Brown',
    gender: '男',
    school: '电子科技大学',
    SubjectsAndGrand: '高中数学',
    register: '查看',
    exhibit: '编辑',
    dataStatus: '待审核',
    operator: '无'
  },
  {
    key: '2',
    name: 'John Brown',
    gender: '男',
    school: '电子科技大学',
    SubjectsAndGrand: '高中数学',
    register: '查看',
    exhibit: '编辑',
    dataStatus: '待审核',
    operator: '无'
  },
  {
    key: '3',
    name: 'John Brown',
    gender: '男',
    school: '电子科技大学',
    SubjectsAndGrand: '高中数学',
    register: '查看',
    exhibit: '编辑',
    dataStatus: '待审核',
    operator: '无'
  }
]
export default {
  data () {
    return {
      visible: false,
      data,
      columns,
      options1: [
        {
          value: '锦江区',
          label: '锦江区'

        },
        {
          value: '金牛区',
          label: '金牛区'

        },
        {
          value: '武侯区',
          label: '武侯区'

        },
        {
          value: '青羊区',
          label: '青羊区'

        },
        {
          value: '成华区',
          label: '成华区'

        },
        {
          value: '高新区',
          label: '高新区'

        },
        {
          value: '天府新区',
          label: '天府新区'

        },
        {
          value: '新都区',
          label: '新都区'

        },
        {
          value: '郫都区',
          label: '郫都区'

        },
        {
          value: '双流区',
          label: '双流区'
        },
        {
          value: '龙泉驿区',
          label: '龙泉驿区'

        },
        {
          value: '温江区',
          label: '温江区'

        },
        {
          value: '其他',
          label: '其他'

        }
      ],
      options2: [
        {
          value: '锦江区',
          label: '锦江区'

        }
      ],
      options3: [
        {
          value: '锦江区',
          label: '锦江区'

        }
      ],
      options4: [
        {
          value: '锦江区',
          label: '锦江区'

        }
      ]
    }
  },
  methods: {
    showModal () {
      this.visible = true
    },
    hideModal () {
      this.visible = false
    },
    onChange (value, selectedOptions) {
      console.log(value, selectedOptions)
    },
    filter (inputValue, path) {
      return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1)
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
</style>
