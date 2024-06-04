import{i as e,a}from"./ipcRenderer-a60b93ba.js";import{a as s}from"./index-391e0bf6.js";import{_ as l,r as o,o as t,b as n,g as r,a as i,w as c,e as d,p as u,f as p}from"./index-d16ae546.js";const f={data:()=>({type:1,serverUrl:""}),methods:{info(){e.invoke(a.crossInfo,{}).then((e=>{console.log("res:",e)}))},getUrl(){e.invoke(a.getCrossUrl,{name:"javaapp"}).then((e=>{this.serverUrl=e,this.$message.info(`服务地址: ${e}`)}))},kill(){e.invoke(a.killCrossServer,{type:"one",name:"javaapp"})},killAll(){e.invoke(a.killCrossServer,{type:"all",name:"javaapp"})},create(){e.invoke(a.createCrossServer,{program:"java"})},request(l){if(1!=l||""!=this.serverUrl)if(1==l){const e=this.serverUrl+"/test1/get";s({method:"get",url:e,params:{id:"1111111"},timeout:1e3}).then((e=>{console.log("res:",e);const a=e.data||null;this.$message.info(`服务返回: ${a}`)}))}else e.invoke(a.requestApi,{name:"javaapp",urlPath:"/test1/get",params:{id:"1111111"}}).then((e=>{console.log("res:",e);const a=e||null;this.$message.info(`服务返回: ${a}`)}));else this.$message.info("请先获取服务地址")}}},k=e=>(u("data-v-aedf1e71"),e=e(),p(),e),v={id:"app-cross-java"},m=k((()=>r("div",{class:"one-block-1"},[r("span",null," 1. 基础控制 ")],-1))),g={class:"one-block-2"},h=k((()=>r("div",{class:"one-block-1"},[r("span",null," 2. 发送http请求 ")],-1))),_={class:"one-block-2"},C=k((()=>r("div",{class:"one-block-1"},[r("span",null," 3. 多个服务 ")],-1))),b={class:"one-block-2"};const j=l(f,[["render",function(e,a,s,l,u,p){const f=o("a-button"),k=o("a-space");return t(),n("div",v,[m,r("div",g,[i(k,null,{default:c((()=>[i(f,{onClick:a[0]||(a[0]=e=>p.create())},{default:c((()=>[d(" 启动 ")])),_:1}),i(f,{onClick:a[1]||(a[1]=e=>p.getUrl())},{default:c((()=>[d(" 获取地址 ")])),_:1}),i(f,{onClick:a[2]||(a[2]=e=>p.kill())},{default:c((()=>[d(" kill ")])),_:1}),i(f,{onClick:a[3]||(a[3]=e=>p.info())},{default:c((()=>[d(" 查看 ")])),_:1})])),_:1})]),h,r("div",_,[i(k,null,{default:c((()=>[i(f,{onClick:a[4]||(a[4]=e=>p.request(1))},{default:c((()=>[d(" 前端发送 ")])),_:1}),i(f,{onClick:a[5]||(a[5]=e=>p.request(2))},{default:c((()=>[d(" 主进程发送 ")])),_:1})])),_:1})]),C,r("div",b,[i(k,null,{default:c((()=>[i(f,{onClick:a[6]||(a[6]=e=>p.create())},{default:c((()=>[d(" 再启动一个 ")])),_:1}),i(f,{onClick:a[7]||(a[7]=e=>p.killAll())},{default:c((()=>[d(" kill所有 ")])),_:1})])),_:1})])])}],["__scopeId","data-v-aedf1e71"]]);export{j as default};
