import{i as a,a as e}from"./ipcRenderer-a60b93ba.js";import{_ as o,r as t,o as i,b as s,g as n,a as r,w as d,t as l,e as g}from"./index-d16ae546.js";const c={id:"effect-login-window"},m={class:"block-1"},p={key:1};const h=o({data:()=>({loading:!1,loginText:"正在登陆......"}),methods:{login(){this.loading=!0,setTimeout((()=>{this.$router.push({name:"Framework",params:{}}),a.invoke(e.restoreWindow,{width:980,height:650}).then((a=>{}))}),2e3)}}},[["render",function(a,e,o,h,u,f){const k=t("a-button");return i(),s("div",c,[n("div",m,[u.loading?(i(),s("span",p,l(u.loginText),1)):(i(),s("a",{key:0,onClick:e[0]||(e[0]=(...a)=>f.login&&f.login(...a))},[r(k,{type:"primary"},{default:d((()=>[g(" 登录 ")])),_:1})]))])])}],["__scopeId","data-v-be47062b"]]);export{h as default};
