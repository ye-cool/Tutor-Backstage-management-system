(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6820e180"],{"12a5":function(e,a,t){"use strict";t.r(a);var r=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("a-form",{staticClass:"form",attrs:{form:e.form},on:{submit:e.handleSubmit}},[t("a-form-item",e._b({staticClass:"nickname"},"a-form-item",e.formItemLayout,!1),[t("span",{attrs:{slot:"label"},slot:"label"},[e._v(" 昵称 ")]),t("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["nickname",{rules:[{required:!0,message:"请输入昵称!",whitespace:!0}]}],expression:"[\n        'nickname',\n        {\n          rules: [\n            {\n              required: true,\n              message: '请输入昵称!',\n              whitespace: true,\n            },\n          ],\n        },\n      ]"}]})],1),t("a-form-item",e._b({staticClass:"WeChatid",attrs:{label:"微信号"}},"a-form-item",e.formItemLayout,!1),[t("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["WeChat ID",{rules:[{type:"WeChat ID",message:"请输入正确的微信号码!"},{required:!0,message:"请输入微信号!"}]}],expression:"[\n        'WeChat ID',\n        {\n          rules: [\n            {\n              type: 'WeChat ID',\n              message: '请输入正确的微信号码!',\n            },\n            {\n              required: true,\n              message: '请输入微信号!',\n            },\n          ],\n        },\n      ]"}]})],1),t("a-form-item",e._b({staticClass:"pwd",attrs:{label:"密码","has-feedback":""}},"a-form-item",e.formItemLayout,!1),[t("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["password",{rules:[{required:!0,message:"请输入密码!"},{validator:e.validateToNextPassword}]}],expression:"[\n        'password',\n        {\n          rules: [\n            {\n              required: true,\n              message: '请输入密码!',\n            },\n            {\n              validator: validateToNextPassword,\n            },\n          ],\n        },\n      ]"}],attrs:{type:"password"}})],1),t("a-form-item",e._b({staticClass:"cpwd",attrs:{label:"确认密码","has-feedback":""}},"a-form-item",e.formItemLayout,!1),[t("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["confirm",{rules:[{required:!0,message:"请确认你的密码!"},{validator:e.compareToFirstPassword}]}],expression:"[\n        'confirm',\n        {\n          rules: [\n            {\n              required: true,\n              message: '请确认你的密码!',\n            },\n            {\n              validator: compareToFirstPassword,\n            },\n          ],\n        },\n      ]"}],attrs:{type:"password"},on:{blur:e.handleConfirmBlur}})],1),t("a-form-item",e._b({staticClass:"signup"},"a-form-item",e.tailFormItemLayout,!1),[t("a-button",{attrs:{type:"primary"},on:{click:e.showModal}},[e._v(" 注册 ")])],1),t("a-modal",{attrs:{title:"提醒","ok-text":"确认","cancel-text":"取消"},on:{ok:e.hideModal},model:{value:e.visible,callback:function(a){e.visible=a},expression:"visible"}},[t("p",[e._v("注册成功，请等待管理员审核")])]),t("br"),t("br")],1)},s=[],n={data:function(){return{visible:!1,confirmDirty:!1,autoCompleteResult:[],formItemLayout:{labelCol:{xs:{span:24},sm:{span:8}},wrapperCol:{xs:{span:24},sm:{span:16}}},tailFormItemLayout:{wrapperCol:{xs:{span:24,offset:0},sm:{span:16,offset:8}}}}},beforeCreate:function(){this.form=this.$form.createForm(this,{name:"register"})},methods:{showModal:function(){this.visible=!0},hideModal:function(){this.visible=!1},handleSubmit:function(e){e.preventDefault(),this.form.validateFieldsAndScroll((function(e,a){e||console.log("Received values of form: ",a)}))},handleConfirmBlur:function(e){var a=e.target.value;this.confirmDirty=this.confirmDirty||!!a},compareToFirstPassword:function(e,a,t){var r=this.form;a&&a!==r.getFieldValue("password")?t(new Error("两次输入的密码不一致!")):t()},validateToNextPassword:function(e,a,t){var r=this.form;a&&this.confirmDirty&&r.validateFields(["confirm"],{force:!0}),t()}}},o=n,i=(t("f9c1"),t("2877")),l=Object(i["a"])(o,r,s,!1,null,null,null);a["default"]=l.exports},ba7e:function(e,a,t){},f9c1:function(e,a,t){"use strict";t("ba7e")}}]);