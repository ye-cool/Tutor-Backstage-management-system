(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-bddf5f82"],{"04cc":function(e,t,a){"use strict";a("9fec")},"9fec":function(e,t,a){},eff6:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{style:{padding:"24px",background:"#fff",textAlign:"center"}},[a("div",{staticClass:"content"},[a("a-page-header",{staticStyle:{border:"1px solid rgb(235, 237, 240)"},attrs:{title:"Title","sub-title":"This is a subtitle"}},[a("template",{slot:"extra"},[a("span",[e._v("管理员A")]),a("a-button",{key:"1",attrs:{type:"primary"}},[e._v(" 退出 ")])],1)],2),a("a-table",{attrs:{columns:e.columns,"data-source":e.data},scopedSlots:e._u([{key:"name",fn:function(t){return a("a",{},[e._v(e._s(t))])}}])})],1)])},o=[],s=[{title:"昵称",dataIndex:"name",key:"name",scopedSlots:{customRender:"name"}},{title:"微信号",dataIndex:"wechatid",key:"wechatid",width:200},{title:"账号",dataIndex:"account",key:"account",ellipsis:!0},{title:"密码",dataIndex:"password",key:"password",ellipsis:!0},{title:"操作",dataIndex:"operate",key:"operate",ellipsis:!0}],c=[{key:"1",name:"John Brown",wechatid:"2321443413414",account:"8383872116",password:"888888",operate:"编辑"},{key:"2",name:"Jim Green",wechatid:"2321443413414",account:"8383872116",password:"888888",operate:"编辑"},{key:"3",name:"Joe Black",wechatid:"2321443413414",account:"8383872116",password:"888888",operate:"编辑"}],i={data:function(){return{data:c,columns:s}},methods:{onChange:function(e,t){console.log(e,t)},filter:function(e,t){return t.some((function(t){return t.label.toLowerCase().indexOf(e.toLowerCase())>-1}))}}},r=i,d=(a("04cc"),a("2877")),l=Object(d["a"])(r,n,o,!1,null,null,null);t["default"]=l.exports}}]);