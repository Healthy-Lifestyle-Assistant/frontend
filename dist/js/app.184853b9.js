(function(){"use strict";var e={444:function(e,n,o){var r=o(9242),t=o(3396);const s=(0,t._)("h2",null,"Healthy Lifestyle App",-1),i=(0,t._)("p",null,"Your assistant to track workouts and nutrition",-1);function a(e,n,o,r,a,u){const l=(0,t.up)("router-link"),c=(0,t.up)("router-view");return(0,t.wg)(),(0,t.iD)(t.HY,null,[s,i,(0,t.Wm)(l,{to:"/about"},{default:(0,t.w5)((()=>[(0,t.Uk)("About")])),_:1}),(0,t.Uk)(" | "),(0,t.Wm)(l,{to:"/hello"},{default:(0,t.w5)((()=>[(0,t.Uk)("Hello")])),_:1}),(0,t.Uk)(" | "),(0,t.Wm)(l,{to:"/signup"},{default:(0,t.w5)((()=>[(0,t.Uk)("Signup")])),_:1}),(0,t.Wm)(c)],64)}var u={name:"App"},l=o(89);const c=(0,l.Z)(u,[["render",a]]);var p=c,d=o(678);const m=(0,t._)("h2",null,"About",-1),f=(0,t._)("p",null,"Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi optio commodi modi minus sed iusto, incidunt reprehenderit minima esse! Reiciendis?",-1);function w(e,n,o,r,s,i){const a=(0,t.up)("router-link");return(0,t.wg)(),(0,t.iD)(t.HY,null,[m,f,(0,t.Wm)(a,{to:"/hello"},{default:(0,t.w5)((()=>[(0,t.Uk)("HelloView")])),_:1})],64)}var g={name:"AboutView"};const h=(0,l.Z)(g,[["render",w]]);var v=h,y=o(7139);const b={class:"hello"};function _(e,n,o,r,s,i){return(0,t.wg)(),(0,t.iD)("div",b,[(0,t._)("h1",null,(0,y.zw)(o.message),1),(0,t._)("p",null,(0,y.zw)(this.apiMessage),1)])}var k={name:"HelloView",props:{message:String},data(){return{apiMessage:Object}},methods:{async getHelloWorld(){const e=await fetch("/api/v1/helloworld",{method:"GET",headers:{"Content-Type":"application/json"}}),n=await e.json();return console.log("Response data:"),console.log(n),n}},async created(){this.apiMessage=await this.getHelloWorld()}};const O=(0,l.Z)(k,[["render",_],["__scopeId","data-v-2a516a79"]]);var U=O;const S=(0,t._)("h2",null,"Sign Up",-1),P=(0,t._)("label",{for:"username"},"Username:",-1),j=(0,t._)("label",{for:"email"},"Email:",-1),A=(0,t._)("label",{for:"fullName"},"Full name:",-1),H=(0,t._)("label",{for:"password"},"Password:",-1),N=(0,t._)("label",{for:"confirmPassword"},"Confirm password:",-1),V=(0,t._)("button",{type:"submit"},"Sign Up",-1);function T(e,n,o,s,i,a){return(0,t.wg)(),(0,t.iD)("div",null,[S,(0,t._)("form",{onSubmit:n[5]||(n[5]=(0,r.iM)(((...e)=>a.submitForm&&a.submitForm(...e)),["prevent"]))},[(0,t._)("div",null,[P,(0,t.wy)((0,t._)("input",{type:"text",id:"username","onUpdate:modelValue":n[0]||(n[0]=e=>i.username=e),required:""},null,512),[[r.nr,i.username]])]),(0,t._)("div",null,[j,(0,t.wy)((0,t._)("input",{type:"email",id:"email","onUpdate:modelValue":n[1]||(n[1]=e=>i.email=e),required:""},null,512),[[r.nr,i.email]])]),(0,t._)("div",null,[A,(0,t.wy)((0,t._)("input",{type:"text",id:"fullName","onUpdate:modelValue":n[2]||(n[2]=e=>i.fullName=e),required:""},null,512),[[r.nr,i.fullName]])]),(0,t._)("div",null,[H,(0,t.wy)((0,t._)("input",{type:"password",id:"password","onUpdate:modelValue":n[3]||(n[3]=e=>i.password=e),required:""},null,512),[[r.nr,i.password]])]),(0,t._)("div",null,[N,(0,t.wy)((0,t._)("input",{type:"password",id:"confirmPassword","onUpdate:modelValue":n[4]||(n[4]=e=>i.confirmPassword=e),required:""},null,512),[[r.nr,i.confirmPassword]])]),V],32),i.message?((0,t.wg)(),(0,t.iD)("p",{key:0,class:(0,y.C_)({"success-message":a.isSuccess,"error-message":a.isError})},(0,y.zw)(i.message),3)):(0,t.kq)("",!0)])}var q={name:"SignupView",data(){return{username:"",email:"",fullName:"",password:"",confirmPassword:"",message:""}},computed:{isSuccess(){return this.message.includes("success")},isError(){return this.message.includes("error")}},methods:{async submitForm(){const e={username:this.username,email:this.email,fullName:this.fullName,password:this.password,confirmPassword:this.confirmPassword};try{const n=await this.signupApi(e);console.log("submitForm():"),console.log(n),201===n.status?this.message="Signup successful! Now you can login to your account":this.message="An error occurred while signing up. Try again"}catch(n){this.message="An error occurred while signing up. Try again",console.error(n)}},async signupApi(e){const n=await fetch("/api/v1/users/auth/signup",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}),o=await n.json();return console.log("signupApi():"),console.log(o),{status:n.status,body:o}}}};const x=(0,l.Z)(q,[["render",T]]);var W=x;const C=[{path:"/about",name:"About",component:v},{path:"/hello",name:"Hello",component:U},{path:"/signup",name:"Signup",component:W}],F=(0,d.p7)({history:(0,d.PO)("/"),routes:C});var D=F;(0,r.ri)(p).use(D).mount("#app")}},n={};function o(r){var t=n[r];if(void 0!==t)return t.exports;var s=n[r]={exports:{}};return e[r].call(s.exports,s,s.exports,o),s.exports}o.m=e,function(){var e=[];o.O=function(n,r,t,s){if(!r){var i=1/0;for(c=0;c<e.length;c++){r=e[c][0],t=e[c][1],s=e[c][2];for(var a=!0,u=0;u<r.length;u++)(!1&s||i>=s)&&Object.keys(o.O).every((function(e){return o.O[e](r[u])}))?r.splice(u--,1):(a=!1,s<i&&(i=s));if(a){e.splice(c--,1);var l=t();void 0!==l&&(n=l)}}return n}s=s||0;for(var c=e.length;c>0&&e[c-1][2]>s;c--)e[c]=e[c-1];e[c]=[r,t,s]}}(),function(){o.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(n,{a:n}),n}}(),function(){o.d=function(e,n){for(var r in n)o.o(n,r)&&!o.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:n[r]})}}(),function(){o.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){o.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)}}(),function(){var e={143:0};o.O.j=function(n){return 0===e[n]};var n=function(n,r){var t,s,i=r[0],a=r[1],u=r[2],l=0;if(i.some((function(n){return 0!==e[n]}))){for(t in a)o.o(a,t)&&(o.m[t]=a[t]);if(u)var c=u(o)}for(n&&n(r);l<i.length;l++)s=i[l],o.o(e,s)&&e[s]&&e[s][0](),e[s]=0;return o.O(c)},r=self["webpackChunkfrontend"]=self["webpackChunkfrontend"]||[];r.forEach(n.bind(null,0)),r.push=n.bind(null,r.push.bind(r))}();var r=o.O(void 0,[998],(function(){return o(444)}));r=o.O(r)})();
//# sourceMappingURL=app.184853b9.js.map