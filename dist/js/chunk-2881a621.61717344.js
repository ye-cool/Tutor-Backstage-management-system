(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2881a621"],{"989c":function(e,t,n){},fc67:function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{style:{padding:"24px",background:"#fff",textAlign:"center"}},[n("div",{staticClass:"content"},[n("a-table",{attrs:{columns:e.columns,"data-source":e.data,pagination:!1,rowKey:"did"},scopedSlots:e._u([{key:"contractStatus",fn:function(t){return[n("a",[e._v(e._s(1==t?"家长预约":"教师投递"))])]}},{key:"processStatus",fn:function(t){return[n("a",[e._v(e._s(0==t?"待处理":"已完成"))])]}},{key:"operate",fn:function(t){return[n("a",{on:{click:function(n){return e.reject(t)}}},[e._v("结束订单 ")]),n("a",[e._v("添加备注")])]}}])},[n("template",{slot:"teacherProfile"},[n("a",{on:{click:e.showModal1}},[e._v("查看")])]),n("template",{slot:"parentneed"},[n("a",{on:{click:e.showModal2}},[e._v("查看")])])],2),n("a-pagination",{staticStyle:{margin:"16px 0","text-align":"right"},attrs:{current:e.pagination.displayPage,pageSize:e.pagination.displayRows,total:e.pagination.total,pageSizeOptions:e.pagination.pageSizeOptions,showTotal:function(e){return"共 "+e+" 条数据"},showSizeChanger:"",showQuickJumper:""},on:{change:e.handlePageChange,showSizeChange:e.showSizeChange}})],1)])},o=[],i=[{title:"家长联系方式",dataIndex:"parentPhone",key:"parentPhone",width:150},{title:"教师联系方式",dataIndex:"teacherPhone",key:"teacherPhone",width:150},{title:"教师资料",key:"teacherProfile",ellipsis:!0,scopedSlots:{customRender:"teacherProfile"}},{title:"家长需求",key:"parentneed",ellipsis:!0,scopedSlots:{customRender:"parentneed"}},{title:"匹配方式",dataIndex:"contractStatus",key:"contractStatus",ellipsis:!0,scopedSlots:{customRender:"contractStatus"}},{title:"匹配时间",dataIndex:"contractTime",key:"contractTime",ellipsis:!0},{title:"处理状态",dataIndex:"processStatus",key:"processStatus",ellipsis:!0,scopedSlots:{customRender:"processStatus"}},{title:"操作人",dataIndex:"admin",key:"admin",ellipsis:!0},{title:"操作",key:"operate",ellipsis:!0,width:200,scopedSlots:{customRender:"operate"}}],s=[],c={created:function(){this.gettable()},data:function(){return{orderInfo:{pageNumber:1,pageSize:10},data:s,columns:i,pagination:{displayPage:1,displayRows:10,pageSize:10,total:0,pageSizeOptions:["10","20","30","50"]}}},methods:{gettable:function(){var e=this;e.$api.mode.getMatchedContracts({params:e.orderInfo}).then((function(t){console.log(t),e.data=[],e.data=t.data.records,e.pagination.total=t.data.total,console.log(e.data)})).catch((function(e){console.log(e.response)}))},onChange:function(e,t){console.log(e,t)},filter:function(e,t){return t.some((function(t){return t.label.toLowerCase().indexOf(e.toLowerCase())>-1}))},reject:function(e){var t=this;console.log(e),this.$api.mode.deleteDemand("".concat(e.did)).then((function(e){console.log(e),t.gettable()})).catch((function(e){console.log(e.response)}))},showSizeChange:function(e,t){this.pagination.displayRows=t,this.orderInfo.pageSize=t,this.gettable()},handlePageChange:function(e){console.log(e),this.pagination.displayPage=e,this.orderInfo.pageNumber=e,this.gettable()},showModal1:function(){},showModal2:function(){}}},l=c,r=(n("fe2f"),n("2877")),d=Object(r["a"])(l,a,o,!1,null,null,null);t["default"]=d.exports},fe2f:function(e,t,n){"use strict";n("989c")}}]);