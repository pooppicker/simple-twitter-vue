(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-66f688dc"],{"2b52":function(t,s,a){},a5c2:function(t,s,a){"use strict";a("2b52")},d946:function(t,s,a){"use strict";a.r(s);var i=function(){var t=this,s=t._self._c;return s("div",{staticClass:"container admin-signin-container"},[s("form",{staticClass:"d-flex flex-column align-items-center",on:{submit:function(s){return s.stopPropagation(),s.preventDefault(),t.handleSubmit.apply(null,arguments)}}},[s("div",{staticClass:"text-center mb-4"},[s("AcLogo",{staticClass:"mb-4"}),s("h3",{staticClass:"mb-4"},[t._v("後台登入")])],1),s("div",{staticClass:"input-style mb-2"},[s("label",{staticClass:"signin-label",attrs:{for:"account"}},[t._v("Email")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.account,expression:"account"}],staticClass:"signin-input",attrs:{id:"account",type:"account",autofocus:"",required:""},domProps:{value:t.account},on:{input:function(s){s.target.composing||(t.account=s.target.value)}}}),s("div",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}],staticClass:"error-message"},[t._v("帳號不存在")])]),s("div",{staticClass:"input-style mb-2"},[s("label",{staticClass:"signin-label",attrs:{for:"password"}},[t._v("密碼")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],staticClass:"signin-input",attrs:{id:"password",type:"password",autofocus:"",required:""},domProps:{value:t.password},on:{input:function(s){s.target.composing||(t.password=s.target.value)}}})]),t.isProcessing?s("button",{staticClass:"signin-btn mb-3",attrs:{type:"submit",disabled:""},on:{click:function(s){return s.stopPropagation(),s.preventDefault(),t.handleSubmit.apply(null,arguments)}}},[t._v(" 驗證中 ... ")]):s("button",{staticClass:"signin-btn mb-3",attrs:{type:"submit"},on:{click:function(s){return s.stopPropagation(),s.preventDefault(),t.handleSubmit.apply(null,arguments)}}},[t._v(" 登入 ")]),s("div",{staticClass:"a-link"},[s("router-link",{staticClass:"admin-signin-link",attrs:{to:"/signin"}},[t._v("前台登入")])],1)])])},n=[],e=(a("d9e2"),a("14d9"),a("ce2c")),o=a("2fa3"),r={SignIn({email:t,password:s}){return o["b"].post("/admin/signin",{email:t,password:s})}},c={components:{AcLogo:e["a"]},data(){return{account:"",password:"",isProcessing:!1}},methods:{async handleSubmit(){try{if(this.isProcessing=!0,!this.account||!this.password)return o["a"].fire({icon:"warning",title:"請填入 Email 和 密碼"}),void(this.isProcessing=!1);const{data:t}=await r.SignIn({email:this.account,password:this.password});if("success"!==t.status)throw new Error(t.message);o["a"].fire({icon:"success",title:"登入成功"}),localStorage.setItem("admin-token",t.token),this.$router.push("/admin/main")}catch(t){this.account="",this.password="",this.isProcessing=!1,o["a"].fire({icon:"warning",title:"請確認您輸入了正確的Email和密碼"})}}}},l=c,u=(a("a5c2"),a("2877")),p=Object(u["a"])(l,i,n,!1,null,null,null);s["default"]=p.exports}}]);
//# sourceMappingURL=chunk-66f688dc.ab37995f.js.map