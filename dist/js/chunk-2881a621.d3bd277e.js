(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2881a621"],{"989c":function(e,t,a){},fc67:function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{style:{padding:"24px",background:"#fff",textAlign:"center"}},[a("div",{staticClass:"content"},[a("a-table",{attrs:{columns:e.columns,"data-source":e.data,pagination:!1,rowKey:"did"},scopedSlots:e._u([{key:"teacherProfile",fn:function(t){return[a("a",{on:{click:function(a){return e.showModal2(t)}}},[e._v("查看")])]}},{key:"parentneed",fn:function(t){return[a("a",{on:{click:function(a){return e.showModal1(t)}}},[e._v("查看")])]}},{key:"contractStatus",fn:function(t){return[a("span",[e._v(e._s(1==t?"家长预约":"教师投递"))])]}},{key:"processStatus",fn:function(t){return[a("a",[e._v(e._s(0==t?"待处理":1==t?"管理员删除":"已完成"))])]}},{key:"operate",fn:function(t){return[a("a",{on:{click:function(a){return e.reject(t)}}},[e._v(" "+e._s(0==t.processStatus?"结束订单":"已完成")+" ")]),a("a",{on:{click:function(a){return e.AddNotes(t)}}},[e._v(e._s(null==t.remark?"添加备注":"查看备注"))])]}}])}),a("a-pagination",{staticStyle:{margin:"16px 0","text-align":"right"},attrs:{current:e.pagination.displayPage,pageSize:e.pagination.displayRows,total:e.pagination.total,pageSizeOptions:e.pagination.pageSizeOptions,showTotal:function(e){return"共 "+e+" 条数据"},showSizeChanger:"",showQuickJumper:""},on:{change:e.handlePageChange,showSizeChange:e.showSizeChange}}),a("a-modal",{attrs:{visible:e.modal1Visible,title:"家长需求","on-ok":"handleOk",closable:!1,width:"700px"}},[a("template",{slot:"footer"},[a("a-button",{key:"back",on:{click:e.handleCancel2}},[e._v(" 返回 ")])],1),a("a-form",{attrs:{form:e.form}},[a("a-form-item",e._b({attrs:{label:"家长称谓"}},"a-form-item",e.formItemLayout,!1),[a("span",[e._v(" "+e._s(e.demandRegister.parentName)+" ")])]),a("a-form-item",e._b({attrs:{label:"学生补习科目"}},"a-form-item",e.formItemLayout,!1),[a("span",[e._v(" "+e._s(void 0==e.demandRegister.itemId||e.itemId.filter((function(t){return t.iId==e.demandRegister.itemId}))==[]?null:e.itemId.filter((function(t){return t.iId==e.demandRegister.itemId}))[0].item)+" ")])]),a("a-form-item",e._b({attrs:{label:"学生情况与老师要求"}},"a-form-item",e.formItemLayout,!1),[a("span",[e._v(" "+e._s(e.demandRegister.studentLearningSituation)+" ")])]),a("a-form-item",e._b({attrs:{label:"联系电话","has-feedback":""}},"a-form-item",e.formItemLayout,!1),[a("span",[e._v(e._s(e.demandRegister.phone)+" ")])]),a("a-form-item",e._b({attrs:{label:"家庭住址","has-feedback":""}},"a-form-item",e.formItemLayout,!1),[a("span",[e._v(" "+e._s(e.areaId[e.demandRegister.areaId]))])]),a("a-form-item",e._b({},"a-form-item",e.formItemLayout,!1),[a("span",{attrs:{slot:"label"},slot:"label"},[e._v(" 详细地址 ")]),a("span",[e._v(" "+e._s(e.demandRegister.address))])]),a("a-form-item",e._b({},"a-form-item",e.formItemLayout,!1),[a("span",{attrs:{slot:"label"},slot:"label"},[e._v(" 预期价格 ")]),a("span",[e._v(e._s(e.demandRegister.price))]),a("span",[e._v("元/小时")])]),a("a-form-item",e._b({},"a-form-item",e.formItemLayout,!1),[a("span",{attrs:{slot:"label"},slot:"label"},[e._v(" 展示价格 ")]),a("span",[e._v(e._s(e.demandRegister.verifiedPrice))]),a("span",[e._v("元/小时")])]),a("a-form-item",e._b({},"a-form-item",e.formItemLayout,!1),[a("span",{attrs:{slot:"label"},slot:"label"},[e._v(" 教师性别要求 ")]),a("span",[e._v(e._s(0==e.demandRegister.teacherGender?"男":1==e.demandRegister.teacherGender?"女":"均可"))])]),a("a-form-item",e._b({},"a-form-item",e.formItemLayout,!1),[a("span",{attrs:{slot:"label"},slot:"label"},[e._v(" 补习时长 ")]),a("span",[e._v(e._s(e.demandRegister.classHours))])]),a("a-form-item",e._b({},"a-form-item",e.formItemLayout,!1),[a("span",{attrs:{slot:"label"},slot:"label"},[e._v(" 空闲时间 ")]),e._l(e.demandRegister.studyTimes,(function(t){return a("span",{key:t},[e._v(e._s(e.timeId[t])+"；")])}))],2)],1)],2),a("a-modal",{attrs:{visible:e.modal3Visible,title:"家长需求","on-ok":"handleOk",closable:!1,width:"700px"}},[a("template",{slot:"footer"},[a("a-button",{key:"back",on:{click:e.handleCancel3}},[e._v(" 返回 ")])],1),a("a-form",{attrs:{form:e.form}},[a("a-form-item",e._b({attrs:{label:"家长称谓"}},"a-form-item",e.formItemLayout,!1),[a("span",[e._v(" "+e._s(e.demandRegister.parentName)+" ")])]),a("a-form-item",e._b({attrs:{label:"联系电话"}},"a-form-item",e.formItemLayout,!1),[a("span",[e._v(e._s(e.demandRegister.phone)+" ")])]),a("a-form-item",e._b({attrs:{label:"附加备注"}},"a-form-item",e.formItemLayout,!1),[a("span",[e._v(e._s(e.demandRegister.remark)+" ")])])],1)],2),a("teacherVrifyModal",{attrs:{modal2Visible:e.modal2Visible,TeacherVerify:e.TeacherVerify},on:{changeVisible2:e.changeVisible2}}),a("a-modal",{attrs:{visible:e.modalVisible,closable:!1,title:"备注",width:"700px"}},[a("template",{slot:"footer"},[a("a-button",{key:"back",attrs:{type:"primary"},on:{click:e.handleCancel}},[e._v(" 返回 ")]),a("a-button",{key:"submit",attrs:{type:"primary",loading:e.loading},on:{click:e.handleOk}},[e._v(" 保存 ")])],1),a("a-form",{staticClass:"form",attrs:{form:e.form}},[a("a-form-item",e._b({attrs:{label:"备注"}},"a-form-item",e.formItemLayout,!1),[a("a-textarea",{directives:[{name:"decorator",rawName:"v-decorator",value:["notes",{initialValue:e.notes}],expression:"[\n              'notes',\n              {\n                initialValue: notes,\n              },\n            ]"}],staticStyle:{width:"500px"},attrs:{rows:4}})],1)],1)],2)],1)])},o=[],n=a("a4c8"),s=[{title:"家长联系方式",dataIndex:"parentPhone",key:"parentPhone",width:150},{title:"教师联系方式",dataIndex:"teacherPhone",key:"teacherPhone",width:150},{title:"教师资料",key:"teacherProfile",ellipsis:!0,scopedSlots:{customRender:"teacherProfile"}},{title:"家长需求",key:"parentneed",ellipsis:!0,scopedSlots:{customRender:"parentneed"}},{title:"匹配方式",dataIndex:"contractStatus",key:"contractStatus",ellipsis:!0,scopedSlots:{customRender:"contractStatus"}},{title:"匹配时间",dataIndex:"contractTime",key:"contractTime",ellipsis:!0,width:180},{title:"订单状态",dataIndex:"processStatus",key:"processStatus",ellipsis:!0,scopedSlots:{customRender:"processStatus"}},{title:"操作人",dataIndex:"admin",key:"admin",ellipsis:!0},{title:"操作",key:"operate",ellipsis:!0,width:200,scopedSlots:{customRender:"operate"}}],r=[{iId:10,item:"小学全科"},{iId:11,item:"小学语文"},{iId:12,item:"小学奥数"},{iId:13,item:"小学数学"},{iId:14,item:"小学英语"},{iId:15,item:"小学作业辅导"},{iId:20,item:"初中全科"},{iId:21,item:"初中语文"},{iId:22,item:"初中英语"},{iId:23,item:"初中数学"},{iId:24,item:"初中物理"},{iId:25,item:"初中化学"},{iId:30,item:"高中数学"},{iId:31,item:"高中语文"},{iId:32,item:"高中英语"},{iId:33,item:"高中物理"},{iId:34,item:"高中化学"},{iId:35,item:"高中生物"},{iId:36,item:"高中历史"},{iId:37,item:"高中政治"},{iId:38,item:"高中地理"},{iId:40,item:"小语种法语"},{iId:41,item:"小语种德语"},{iId:42,item:"小语种西班牙语"},{iId:43,item:"小语种日语"},{iId:44,item:"小语种葡萄牙语"},{iId:45,item:"小语种韩语"},{iId:50,item:"艺体类音乐"},{iId:51,item:"艺体类美术"},{iId:52,item:"艺体类舞蹈"},{iId:53,item:"艺体类体育"},{iId:54,item:"艺体类其他"},{iId:60,item:"其他"}],l=["周一到周五晚上","周一到周五全天","周六上午","周六下午","周六晚上","周日上午","周日下午","周日晚上","寒暑假均可"],d=["锦江区","金牛区","武侯区","青羊区","成华区","高新区","天府新区","新都区","郫都区","双流区","龙泉驿区","温江区","其他"],m=[],c={},f={},u={created:function(){this.gettable()},data:function(){return{orderInfo:{pageNumber:1,pageSize:10},data:m,columns:s,itemId:r,areaId:d,timeId:l,notes:"",did:null,loading:!1,modalVisible:!1,modal1Visible:!1,modal2Visible:!1,modal3Visible:!1,TeacherVerify:c,demandRegister:f,pagination:{displayPage:1,displayRows:10,pageSize:10,total:0,pageSizeOptions:["10","20","30","50"]},form:this.$form.createForm(this),formItemLayout:{labelCol:{span:5},wrapperCol:{xs:{span:24},sm:{span:16}}}}},components:{teacherVrifyModal:n["a"]},methods:{gettable:function(){var e=this;e.$api.mode.getMatchedContracts({params:e.orderInfo}).then((function(t){console.log(t),e.data=[],e.data=t.data.records,e.pagination.total=t.data.total,console.log(e.data)})).catch((function(e){console.log(e.response)}))},onChange:function(e,t){console.log(e,t)},filter:function(e,t){return t.some((function(t){return t.label.toLowerCase().indexOf(e.toLowerCase())>-1}))},reject:function(e){var t=this;console.log(e),this.$api.mode.deleteDemand("".concat(e.did)).then((function(e){console.log(e),t.gettable(),t.$message.success("已结束订单")})).catch((function(e){console.log(e.response)}))},showSizeChange:function(e,t){this.pagination.displayRows=t,this.orderInfo.pageSize=t,this.gettable()},handlePageChange:function(e){console.log(e),this.pagination.displayPage=e,this.orderInfo.pageNumber=e,this.gettable()},showModal1:function(e){var t=this;if(1==e.contractStatus){var a=this;a.$api.mode.getDemandRegister("".concat(e.did)).then((function(e){console.log(e.data),a.demandRegister={},a.demandRegister=e.data,a.modal3Visible=!0,t.$message.success("查看成功")})).catch((function(e){console.log(e.response)}))}else{var i=this;i.$api.mode.getDemandVerify("".concat(e.did)).then((function(e){console.log(e.data),i.demandRegister={},i.demandRegister=e.data,i.modal1Visible=!0,t.$message.success("查看成功")})).catch((function(e){console.log(e.response)}))}},showModal2:function(e){var t=this,a=this;a.$api.mode.getVerify("".concat(e.tid)).then((function(e){console.log(e.data),a.TeacherVerify={},a.TeacherVerify=e.data,a.modal2Visible=!0,t.$message.success("查看成功")})).catch((function(e){console.log(e.response)}))},changeVisible2:function(e){this.modal2Visible=e},AddNotes:function(e){console.log(e),this.notes=e.remark,this.did=e.did,this.modalVisible=!0,this.$message.success("查看备注")},handleOk:function(e){var t=this;this.loading=!0,e.preventDefault(),this.form.validateFields((function(e,a){console.log("error",e),console.log("Received values of form: ",a),t.$api.mode.putRemark(t.did,{remark:a.notes}).then((function(e){console.log(e),t.gettable(),t.$message.success("已保存")})).catch((function(e){console.log(e.response)})),setTimeout((function(){t.modalVisible=!1,t.loading=!1}),3e3)}))},handleCancel:function(){this.modalVisible=!1},handleCancel2:function(){this.modal1Visible=!1},handleCancel3:function(){this.modal3Visible=!1}}},p=u,h=(a("fe2f"),a("2877")),g=Object(h["a"])(p,i,o,!1,null,null,null);t["default"]=g.exports},fe2f:function(e,t,a){"use strict";a("989c")}}]);