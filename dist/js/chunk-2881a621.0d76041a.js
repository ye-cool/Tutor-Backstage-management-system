(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2881a621"],{"989c":function(t,e,a){},fc67:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{style:{padding:"24px",background:"#fff",textAlign:"center"}},[a("div",{staticClass:"content"},[a("a-page-header",{staticStyle:{border:"1px solid rgb(235, 237, 240)"},attrs:{title:"Title","sub-title":"This is a subtitle"}},[a("template",{slot:"extra"},[a("span",[t._v("管理员A")]),a("a-button",{key:"1",attrs:{type:"primary"}},[t._v(" 退出 ")])],1)],2),a("a-table",{attrs:{columns:t.columns,"data-source":t.data,pagination:!1},scopedSlots:t._u([{key:"contractStatus",fn:function(e){return[a("a",[t._v(t._s(1==e?"家长预约":"教师投递"))])]}},{key:"processStatus",fn:function(e){return[a("a",[t._v(t._s(0==e?"待处理":"已完成"))])]}},{key:"operate",fn:function(e){return[a("a",{on:{click:function(a){return t.reject(e)}}},[t._v("结束订单 ")]),a("a",[t._v("添加备注")])]}}])},[a("template",{slot:"teacherProfile"},[a("a",{on:{click:t.showModal1}},[t._v("查看")])]),a("template",{slot:"parentneed"},[a("a",{on:{click:t.showModal2}},[t._v("查看")])])],2),a("a-pagination",{staticStyle:{margin:"16px 0","text-align":"right"},attrs:{current:t.pagination.displayPage,pageSize:t.pagination.displayRows,total:t.pagination.total,pageSizeOptions:t.pagination.pageSizeOptions,showTotal:function(t){return"共 "+t+" 条数据"},showSizeChanger:"",showQuickJumper:""},on:{change:t.handlePageChange,showSizeChange:t.showSizeChange}})],1)])},o=[],i=[{title:"家长联系方式",dataIndex:"parentPhone",key:"parentPhone",width:150},{title:"教师联系方式",dataIndex:"teacherPhone",key:"teacherPhone",width:150},{title:"教师资料",key:"teacherProfile",ellipsis:!0,scopedSlots:{customRender:"teacherProfile"}},{title:"家长需求",key:"parentneed",ellipsis:!0,scopedSlots:{customRender:"parentneed"}},{title:"匹配方式",dataIndex:"contractStatus",key:"contractStatus",ellipsis:!0,scopedSlots:{customRender:"contractStatus"}},{title:"匹配时间",dataIndex:"contractTime",key:"contractTime",ellipsis:!0},{title:"处理状态",dataIndex:"processStatus",key:"processStatus",ellipsis:!0,scopedSlots:{customRender:"processStatus"}},{title:"操作人",dataIndex:"admin",key:"admin",ellipsis:!0},{title:"操作",key:"operate",ellipsis:!0,width:200,scopedSlots:{customRender:"operate"}}],s=[],l={created:function(){this.gettable()},data:function(){return{orderInfo:{pageNumber:1,pageSize:10},data:s,columns:i,pagination:{displayPage:1,displayRows:10,pageSize:10,total:0,pageSizeOptions:["10","20","30","50"]}}},methods:{gettable:function(){var t=this;t.$api.mode.getMatchedContracts({params:t.orderInfo}).then((function(e){console.log(e),t.data=[],t.data=e.data.records,t.pagination.total=e.data.total,console.log(t.data)})).catch((function(t){console.log(t.response)}))},onChange:function(t,e){console.log(t,e)},filter:function(t,e){return e.some((function(e){return e.label.toLowerCase().indexOf(t.toLowerCase())>-1}))},reject:function(t){var e=this;console.log(t),this.$api.mode.deleteDemand("".concat(t.did)).then((function(t){console.log(t),e.gettable()})).catch((function(t){console.log(t.response)}))},showSizeChange:function(t,e){this.pagination.displayRows=e,this.orderInfo.pageSize=e,this.gettable()},handlePageChange:function(t){console.log(t),this.pagination.displayPage=t,this.orderInfo.pageNumber=t,this.gettable()},showModal1:function(){},showModal2:function(){}}},c=l,r=(a("fe2f"),a("2877")),d=Object(r["a"])(c,n,o,!1,null,null,null);e["default"]=d.exports},fe2f:function(t,e,a){"use strict";a("989c")}}]);