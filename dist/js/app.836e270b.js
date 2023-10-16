(function(){"use strict";var e={7619:function(e,t,s){var r=s(9242),n=s(3396),i=s(7139);const a={class:"navbar navbar-expand-lg bg-primary mb-5","data-bs-theme":"dark"},o={class:"container-fluid"},l=(0,n._)("button",{class:"navbar-toggler",type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbarSupportedContent","aria-controls":"navbarSupportedContent","aria-expanded":"false","aria-label":"Toggle navigation"},[(0,n._)("span",{class:"navbar-toggler-icon"})],-1),u={class:"collapse navbar-collapse",id:"navbarSupportedContent"},c={class:"navbar-nav me-auto mb-2 mb-lg-0"},d={class:"nav-item"},m={class:"nav-item"},p={class:"nav-item"},g={class:"nav-item"},f={key:0,class:"d-flex align-items-center"},y={key:1,class:"d-flex align-items-center"},h={class:"container"};function w(e,t,s,r,w,b){const v=(0,n.up)("router-link"),k=(0,n.up)("router-view");return(0,n.wg)(),(0,n.iD)(n.HY,null,[(0,n._)("nav",a,[(0,n._)("div",o,[(0,n.Wm)(v,{to:"/",class:"navbar-brand me-4"},{default:(0,n.w5)((()=>[(0,n.Uk)("Healthy Lifestyle")])),_:1}),l,(0,n._)("div",u,[(0,n._)("ul",c,[(0,n._)("li",d,[(0,n.Wm)(v,{to:"/calendar",class:(0,i.C_)({"nav-link":!0,active:b.isCalendar})},{default:(0,n.w5)((()=>[(0,n.Uk)("Calendar")])),_:1},8,["class"])]),(0,n._)("li",m,[(0,n.Wm)(v,{to:"/workouts",class:(0,i.C_)({"nav-link":!0,active:b.isWorkouts})},{default:(0,n.w5)((()=>[(0,n.Uk)("Workouts")])),_:1},8,["class"])]),(0,n._)("li",p,[(0,n.Wm)(v,{to:"/nutrition",class:(0,i.C_)({"nav-link":!0,active:b.isNutrition})},{default:(0,n.w5)((()=>[(0,n.Uk)("Nutrition")])),_:1},8,["class"])]),(0,n._)("li",g,[(0,n.Wm)(v,{to:"/meditations",class:(0,i.C_)({"nav-link":!0,active:b.isMeditations})},{default:(0,n.w5)((()=>[(0,n.Uk)("Meditations")])),_:1},8,["class"])])]),b.isLogged?((0,n.wg)(),(0,n.iD)("div",f,[(0,n.Wm)(v,{to:"/settings-menu",class:"btn btn-light me-2",role:"button"},{default:(0,n.w5)((()=>[(0,n.Uk)("Settings")])),_:1}),(0,n.Wm)(v,{to:"/logout",class:"btn btn-light me-2",role:"button"},{default:(0,n.w5)((()=>[(0,n.Uk)("Logout")])),_:1})])):((0,n.wg)(),(0,n.iD)("div",y,[(0,n.Wm)(v,{to:"/login",class:"btn btn-light me-2",role:"button"},{default:(0,n.w5)((()=>[(0,n.Uk)("Login")])),_:1}),(0,n.Wm)(v,{to:"/signup",class:"btn btn-light me-2",role:"button"},{default:(0,n.w5)((()=>[(0,n.Uk)("Sign-Up")])),_:1})]))])])]),(0,n._)("div",h,[(0,n.Wm)(k)])],64)}var b={name:"App",computed:{isLogged(){return this.$store.state.isLogged},getCurrentUrl(){return this.$store.state.currentUrl},getPreviousUrl(){return this.$store.state.previousUrl},isCalendar(){return this.$store.state.currentUrl.includes("calendar")},isWorkouts(){return this.$store.state.currentUrl.includes("workouts")},isNutrition(){return this.$store.state.currentUrl.includes("nutrition")},isMeditations(){return this.$store.state.currentUrl.includes("meditations")}}},v=s(89);const k=(0,v.Z)(b,[["render",w]]);var _=k,x=s(678);const P={class:"d-flex flex-column mb-5",style:{width:"90%"}},U=(0,n._)("h3",{class:"mb-4"},"Maintain Habits For Your Health",-1),C=(0,n._)("p",{class:"lead mb-5"},[(0,n.Uk)(" Healthy Lifestyle Assistant is a Ukrainian non-profit startup promoting a healthy lifestyle using digital technologies. Our web application helps people maintain good habits like workouts, nutrition, and mental health activities. "),(0,n._)("br"),(0,n._)("br"),(0,n.Uk)(" A healthy lifestyle is a way of living that lowers the risk of being seriously ill or dying early. Not all diseases are preventable, but a large portion of deaths, particularly those from coronary heart disease and lung cancer, can be avoided. Scientific studies have identified certain types of behavior that contribute to the development of noncommunicable diseases and early death. Health is not just about avoiding disease. It’s also about physical, mental and social wellbeing. When a healthy lifestyle is adopted, a more positive model is provided for other people in the family, particularly children. "),(0,n._)("br"),(0,n._)("br"),(0,n.Uk)(" Web application aims to support people to change their behavior and improve their health in order to live healthier, longer lives. ")],-1);function D(e,t,s,r,a,o){const l=(0,n.up)("metainfo"),u=(0,n.up)("router-link");return(0,n.wg)(),(0,n.iD)(n.HY,null,[(0,n.Wm)(l,null,{title:(0,n.w5)((({content:e})=>[(0,n.Uk)((0,i.zw)(e),1)])),_:1}),(0,n._)("div",P,[U,C,(0,n._)("div",null,[(0,n.Wm)(u,{to:"/signup",class:"btn btn-primary",role:"button"},{default:(0,n.w5)((()=>[(0,n.Uk)("Try Development Version")])),_:1})])])],64)}var W=s(9590),E={name:"HomePage",setup(){(0,W.jq)({title:"Healthy - Home",htmlAttrs:{lang:"en"}})},async created(){this.$store.commit("setCurrentUrl","/")},computed:{isLogged(){return this.$store.state.isLogged}}};const S=(0,v.Z)(E,[["render",D]]);var H=S;const q={class:"d-flex justify-content-center"},T={class:"mb-3"},j=(0,n._)("label",{for:"username",class:"form-label"},"Username",-1),$={class:"mb-3"},A=(0,n._)("label",{for:"email",class:"form-label"},"Email",-1),z={class:"mb-3"},O=(0,n._)("label",{for:"fullName",class:"form-label"},"Full name",-1),B={class:"mb-3"},L=(0,n._)("label",{for:"password",class:"form-label"},"Password",-1),M={class:"mb-3"},N=(0,n._)("label",{for:"confirmPassword",class:"form-label"},"Confirm password",-1),Y=(0,n._)("button",{type:"submit",class:"btn btn-primary mt-4"},"Sign Up",-1);function Z(e,t,s,a,o,l){const u=(0,n.up)("metainfo");return(0,n.wg)(),(0,n.iD)(n.HY,null,[(0,n.Wm)(u,null,{title:(0,n.w5)((({content:e})=>[(0,n.Uk)((0,i.zw)(e),1)])),_:1}),(0,n._)("div",q,[(0,n._)("form",{onSubmit:t[5]||(t[5]=(0,r.iM)(((...e)=>l.submitForm&&l.submitForm(...e)),["prevent"])),style:{width:"fit-content"}},[(0,n._)("div",T,[j,(0,n.wy)((0,n._)("input",{type:"text",class:"form-control",id:"username","onUpdate:modelValue":t[0]||(t[0]=e=>o.username=e),required:""},null,512),[[r.nr,o.username]])]),(0,n._)("div",$,[A,(0,n.wy)((0,n._)("input",{type:"email",class:"form-control",id:"email","onUpdate:modelValue":t[1]||(t[1]=e=>o.email=e),required:""},null,512),[[r.nr,o.email]])]),(0,n._)("div",z,[O,(0,n.wy)((0,n._)("input",{type:"text",class:"form-control",id:"fullName","onUpdate:modelValue":t[2]||(t[2]=e=>o.fullName=e),required:""},null,512),[[r.nr,o.fullName]])]),(0,n._)("div",B,[L,(0,n.wy)((0,n._)("input",{type:"password",class:"form-control",id:"password","onUpdate:modelValue":t[3]||(t[3]=e=>o.password=e),required:""},null,512),[[r.nr,o.password]])]),(0,n._)("div",M,[N,(0,n.wy)((0,n._)("input",{type:"password",class:"form-control",id:"confirmPassword","onUpdate:modelValue":t[4]||(t[4]=e=>o.confirmPassword=e),required:""},null,512),[[r.nr,o.confirmPassword]])]),Y],32),o.message?((0,n.wg)(),(0,n.iD)("p",{key:0,class:(0,i.C_)({"success-message":l.isSuccess,"error-message":l.isError})},(0,i.zw)(o.message),3)):(0,n.kq)("",!0)])],64)}var V={name:"SignupPage",setup(){(0,W.jq)({title:"Healthy - Signup",htmlAttrs:{lang:"en"}})},data(){return{username:"",email:"",fullName:"",password:"",confirmPassword:"",message:""}},async created(){this.$store.commit("setCurrentUrl","/signup")},computed:{isSuccess(){return this.message.includes("success")},isError(){return this.message.includes("error")}},methods:{async submitForm(){const e={username:this.username,email:this.email,fullName:this.fullName,password:this.password,confirmPassword:this.confirmPassword};try{const t=await this.signupApi(e);201===t.status?this.message="Signup successful! Now you can login to your account":this.message="An error occurred while signing up. Try again"}catch(t){this.message="An error occurred while signing up. Try again"}},async signupApi(e){const t=await fetch("/api/v1/users/auth/signup",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}),s=await t.json();return{status:t.status,body:s}}}};const F=(0,v.Z)(V,[["render",Z]]);var R=F;const K={class:"d-flex justify-content-center"},I={class:"mb-3"},J=(0,n._)("label",{for:"usernameOrEmail",class:"form-label"},"Username or email",-1),G={class:"mb-3"},Q=(0,n._)("label",{for:"password",class:"form-label"},"Password",-1),X={class:"mb-3"},ee=(0,n._)("label",{for:"confirmPassword",class:"form-label"},"Confirm password",-1),te=(0,n._)("button",{type:"submit",class:"btn btn-primary mt-4"},"Login",-1);function se(e,t,s,a,o,l){const u=(0,n.up)("metainfo");return(0,n.wg)(),(0,n.iD)(n.HY,null,[(0,n.Wm)(u,null,{title:(0,n.w5)((({content:e})=>[(0,n.Uk)((0,i.zw)(e),1)])),_:1}),(0,n._)("div",K,[(0,n._)("form",{onSubmit:t[3]||(t[3]=(0,r.iM)(((...e)=>l.submitForm&&l.submitForm(...e)),["prevent"])),style:{width:"fit-content"}},[(0,n._)("div",I,[J,(0,n.wy)((0,n._)("input",{type:"text",class:"form-control",id:"usernameOrEmail","onUpdate:modelValue":t[0]||(t[0]=e=>o.usernameOrEmail=e),required:""},null,512),[[r.nr,o.usernameOrEmail]])]),(0,n._)("div",G,[Q,(0,n.wy)((0,n._)("input",{type:"password",class:"form-control",id:"password","onUpdate:modelValue":t[1]||(t[1]=e=>o.password=e),required:""},null,512),[[r.nr,o.password]])]),(0,n._)("div",X,[ee,(0,n.wy)((0,n._)("input",{type:"password",class:"form-control",id:"confirmPassword","onUpdate:modelValue":t[2]||(t[2]=e=>o.confirmPassword=e),required:""},null,512),[[r.nr,o.confirmPassword]])]),te],32),o.message?((0,n.wg)(),(0,n.iD)("p",{key:0,class:(0,i.C_)({"success-message":l.isSuccess,"error-message":l.isError})},(0,i.zw)(o.message),3)):(0,n.kq)("",!0)])],64)}s(7658);var re={name:"LoginPage",setup(){(0,W.jq)({title:"Healthy - Login",htmlAttrs:{lang:"en"}})},data(){return{usernameOrEmail:"",password:"",confirmPassword:"",message:""}},async created(){this.$store.commit("setCurrentUrl","/login")},computed:{isSuccess(){return this.message.includes("success")},isError(){return this.message.includes("error")}},methods:{async submitForm(){const e={usernameOrEmail:this.usernameOrEmail,password:this.password,confirmPassword:this.confirmPassword};try{const t=await this.loginApi(e);200===t.status?(localStorage.setItem("token",JSON.stringify(t.body.token).slice(1,-1)),this.$store.commit("setLogged",!0),this.message="Login successful",this.$router.push(this.$store.state.previousUrl)):this.message="An error occurred while signing up. Try again"}catch(t){this.message="An error occurred while signing up. Try again"}},async loginApi(e){const t=await fetch("/api/v1/users/auth/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}),s=await t.json();return{status:t.status,body:s}}}};const ne=(0,v.Z)(re,[["render",se]]);var ie=ne;function ae(e,t,s,r,i,a){return(0,n.wg)(),(0,n.iD)("div")}var oe={name:"LogoutPage",created(){this.$store.commit("setCurrentUrl","/login"),localStorage.removeItem("token"),this.$store.commit("setLogged",!1),this.$router.push("/login")}};const le=(0,v.Z)(oe,[["render",ae]]);var ue=le;const ce=(0,n._)("div",{class:"d-flex flex-column"},[(0,n._)("p",null,"Comming soon...")],-1);function de(e,t,s,r,a,o){const l=(0,n.up)("metainfo");return(0,n.wg)(),(0,n.iD)(n.HY,null,[(0,n.Wm)(l,null,{title:(0,n.w5)((({content:e})=>[(0,n.Uk)((0,i.zw)(e),1)])),_:1}),ce],64)}var me={name:"CalendarPage",setup(){(0,W.jq)({title:"Healthy - Calendar",htmlAttrs:{lang:"en"}})},async created(){this.$store.commit("setCurrentUrl","calendar")}};const pe=(0,v.Z)(me,[["render",de]]);var ge=pe;const fe={class:"d-flex flex-column align-items-start"},ye={class:"d-flex"},he=(0,n._)("br",null,null,-1),we=(0,n._)("br",null,null,-1),be={key:0,class:"d-flex flex-wrap"};function ve(e,t,s,r,a,o){const l=(0,n.up)("metainfo"),u=(0,n.up)("router-link"),c=(0,n.up)("WorkoutComponent");return(0,n.wg)(),(0,n.iD)(n.HY,null,[(0,n.Wm)(l,null,{title:(0,n.w5)((({content:e})=>[(0,n.Uk)((0,i.zw)(e),1)])),_:1}),(0,n._)("div",fe,[(0,n._)("div",ye,[(0,n.Wm)(u,{to:"",class:"btn btn-primary me-4",role:"button"},{default:(0,n.w5)((()=>[(0,n.Uk)("Create Custom Workout")])),_:1}),(0,n.Wm)(u,{to:"/workouts-exercises",class:"btn btn-primary me-4",role:"button"},{default:(0,n.w5)((()=>[(0,n.Uk)("Exercises")])),_:1}),(0,n.Wm)(u,{to:"",class:"btn btn-primary me-4",role:"button"},{default:(0,n.w5)((()=>[(0,n.Uk)("Reminders")])),_:1}),(0,n.Wm)(u,{to:"/workouts-media",class:"btn btn-primary me-4",role:"button"},{default:(0,n.w5)((()=>[(0,n.Uk)("Media")])),_:1})]),he,we,a.workouts?((0,n.wg)(),(0,n.iD)("div",be,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(a.workouts,(e=>((0,n.wg)(),(0,n.iD)("div",{key:e.id},[(0,n.Wm)(c,{title:e.title,description:e.description,bodyParts:e.bodyParts,type:e.type,exercises:e.exercises},null,8,["title","description","bodyParts","type","exercises"])])))),128))])):(0,n.kq)("",!0)])],64)}const ke={class:"card me-4 mb-4",style:{width:"26rem"}},_e={class:"card-body"},xe={class:"card-title"},Pe={class:"card-subtitle mb-2 text-body-secondary"},Ue={class:"card-text"},Ce={key:0,class:"card-text mb-2"},De={key:1,class:"card-text mb-2"},We={class:"d-flex justify-content-end"};function Ee(e,t,s,r,a,o){const l=(0,n.up)("router-link");return(0,n.wg)(),(0,n.iD)("div",ke,[(0,n._)("div",_e,[(0,n._)("h5",xe,(0,i.zw)(s.title),1),(0,n._)("h6",Pe,(0,i.zw)(s.type),1),(0,n._)("p",Ue,(0,i.zw)(s.description),1),s.bodyParts?((0,n.wg)(),(0,n.iD)("div",Ce,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(s.bodyParts,(e=>((0,n.wg)(),(0,n.iD)("span",{key:e.id},(0,i.zw)(e.name)+" ",1)))),128))])):(0,n.kq)("",!0),s.exercises?((0,n.wg)(),(0,n.iD)("div",De,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(s.exercises,(e=>((0,n.wg)(),(0,n.iD)("span",{key:e.id},[(0,n.Wm)(l,{to:"/workouts-exercises"},{default:(0,n.w5)((()=>[(0,n.Uk)((0,i.zw)(e.title),1)])),_:2},1024),(0,n.Uk)("  ")])))),128))])):(0,n.kq)("",!0),(0,n._)("div",We,[(0,n.Wm)(l,{to:"/workouts",class:"btn btn-primary"},{default:(0,n.w5)((()=>[(0,n.Uk)("Details")])),_:1})])])])}var Se={name:"WorkoutComponent",props:{id:Number,title:String,description:String,bodyParts:Array,type:String,exercises:Array}};const He=(0,v.Z)(Se,[["render",Ee]]);var qe=He,Te={name:"WorkoutsPage",setup(){(0,W.jq)({title:"Healthy - Workouts",htmlAttrs:{lang:"en"}})},data(){return{workouts:null,message:""}},async created(){this.$store.commit("setCurrentUrl","/workouts"),this.workouts=[{id:1,title:"Workout Title 1",description:"Workout Description 1",bodyParts:[{id:1,name:"BodyPart1"},{id:2,name:"BodyPart2"},{id:3,name:"BodyPart3"},{id:4,name:"BodyPart4"}],type:"Default",exercises:[{id:1,title:"Exercise Title 1",description:"Exercise Description 1",bodyParts:[{id:1,name:"BodyPart1"},{id:2,name:"BodyPart2"}],type:"Default"},{id:2,title:"Exercise Title 2",description:"Exercise Description 2",bodyParts:[{id:3,name:"BodyPart3"},{id:4,name:"BodyPart4"}],type:"Default"}]},{id:2,title:"Workout Title 2",description:"Workout Description 2",bodyParts:[{id:1,name:"BodyPart1"},{id:2,name:"BodyPart2"},{id:5,name:"BodyPart5"},{id:6,name:"BodyPart6"}],type:"Default",exercises:[{id:1,title:"Exercise Title 1",description:"Exercise Description 1",bodyParts:[{id:1,name:"BodyPart1"},{id:2,name:"BodyPart2"}],type:"Default"},{id:3,title:"Exercise Title 3",description:"Exercise Description 3",bodyParts:[{id:5,name:"BodyPart5"},{id:6,name:"BodyPart6"}],type:"Default"}]},{id:3,title:"Workout Title 3",description:"Workout Description 3",bodyParts:[{id:3,name:"BodyPart3"},{id:4,name:"BodyPart4"},{id:5,name:"BodyPart5"}],type:"Default",exercises:[{id:2,title:"Exercise Title 2",description:"Exercise Description 2",bodyParts:[{id:3,name:"BodyPart3"},{id:4,name:"BodyPart4"}],type:"Default"},{id:3,title:"Exercise Title 3",description:"Exercise Description 3",bodyParts:[{id:5,name:"BodyPart5"}],type:"Default"}]}]},components:{WorkoutComponent:qe}};const je=(0,v.Z)(Te,[["render",ve]]);var $e=je;const Ae={class:"d-flex flex-column align-items-start"},ze={class:"d-flex"},Oe=(0,n._)("br",null,null,-1),Be=(0,n._)("br",null,null,-1),Le={key:0,class:"d-flex flex-wrap"};function Me(e,t,s,r,a,o){const l=(0,n.up)("metainfo"),u=(0,n.up)("router-link"),c=(0,n.up)("ExerciseComponent");return(0,n.wg)(),(0,n.iD)(n.HY,null,[(0,n.Wm)(l,null,{title:(0,n.w5)((({content:e})=>[(0,n.Uk)((0,i.zw)(e),1)])),_:1}),(0,n._)("div",Ae,[(0,n._)("div",ze,[(0,n.Wm)(u,{to:"/workouts",class:"btn btn-primary me-4",role:"button"},{default:(0,n.w5)((()=>[(0,n.Uk)("Add Custom Exercise")])),_:1}),(0,n.Wm)(u,{to:"/workouts-media",class:"btn btn-primary me-4",role:"button"},{default:(0,n.w5)((()=>[(0,n.Uk)("Media")])),_:1})]),Oe,Be,a.exercises?((0,n.wg)(),(0,n.iD)("div",Le,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(a.exercises,(e=>((0,n.wg)(),(0,n.iD)("div",{key:e.id},[(0,n.Wm)(c,{title:e.title,description:e.description,bodyParts:e.bodyParts,isCustom:e.custom,needsEquipment:e.needsEquipment},null,8,["title","description","bodyParts","isCustom","needsEquipment"])])))),128))])):(0,n.kq)("",!0)]),a.message?((0,n.wg)(),(0,n.iD)("p",{key:0,class:(0,i.C_)({"success-message":o.isSuccess,"error-message":o.isError})},(0,i.zw)(a.message),3)):(0,n.kq)("",!0)],64)}const Ne={class:"card me-4 mb-4",style:{"min-width":"26rem"}},Ye={class:"card-body"},Ze={class:"card-title"},Ve={class:"card-subtitle mb-2 text-body-secondary"},Fe={class:"card-text"},Re={key:0,class:"card-text mb-2"},Ke={class:"d-flex justify-content-end"};function Ie(e,t,s,r,a,o){const l=(0,n.up)("router-link");return(0,n.wg)(),(0,n.iD)("div",Ne,[(0,n._)("div",Ye,[(0,n._)("h5",Ze,(0,i.zw)(s.title),1),(0,n._)("h6",Ve,(0,i.zw)(s.isCustom?"Custom":"Default")+", "+(0,i.zw)(s.needsEquipment?"With Equipment":"Without Equipment"),1),(0,n._)("p",Fe,(0,i.zw)(s.description),1),s.bodyParts?((0,n.wg)(),(0,n.iD)("div",Re,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(s.bodyParts,(e=>((0,n.wg)(),(0,n.iD)("span",{key:e.id},[(0,n._)("small",null,(0,i.zw)(e.name.toLowerCase()),1),(0,n.Uk)(" ")])))),128))])):(0,n.kq)("",!0),(0,n._)("div",Ke,[(0,n.Wm)(l,{to:"/workouts-exercises",class:"btn btn-primary"},{default:(0,n.w5)((()=>[(0,n.Uk)("Details")])),_:1})])])])}var Je={name:"ExerciseComponent",props:{id:Number,title:String,description:String,bodyParts:Array,isCustom:Boolean,needsEquipment:Boolean}};const Ge=(0,v.Z)(Je,[["render",Ie]]);var Qe=Ge,Xe={name:"ExercisesPage",setup(){(0,W.jq)({title:"Healthy - Exercises",htmlAttrs:{lang:"en"}})},data(){return{exercises:null,message:""}},components:{ExerciseComponent:Qe},async created(){this.$store.commit("setCurrentUrl","/workouts-exercises");const e=await this.validateToken();if(e)this.$store.commit("setLogged",!0);else try{this.$store.commit("setLogged",!1);const e=await this.getDefaultExercises();200===e.status?this.exercises=e.body:401===e.status?this.$router.push("/login"):this.message=`Unexpected response status (${e.status})`}catch(t){this.message="An error occurred while signing up. Try again"}},computed:{isSuccess(){return this.message.includes("success")},isError(){return this.message.includes("error")}},methods:{async validateToken(){localStorage.getItem("token");return!1},async getDefaultExercises(){let e="/api/v1/workouts/exercises/default";const t=await fetch(e,{method:"GET",headers:{"Content-Type":"application/json"}}),s=await t.json();return{status:t.status,body:s}}}};const et=(0,v.Z)(Xe,[["render",Me]]);var tt=et;const st={class:"d-flex flex-column align-items-start"},rt={class:"d-flex"},nt=(0,n._)("br",null,null,-1),it=(0,n._)("br",null,null,-1),at={key:0,class:"d-flex flex-wrap"};function ot(e,t,s,r,a,o){const l=(0,n.up)("metainfo"),u=(0,n.up)("router-link"),c=(0,n.up)("MediaComponent");return(0,n.wg)(),(0,n.iD)(n.HY,null,[(0,n.Wm)(l,null,{title:(0,n.w5)((({content:e})=>[(0,n.Uk)((0,i.zw)(e),1)])),_:1}),(0,n._)("div",st,[(0,n._)("div",rt,[(0,n.Wm)(u,{to:"/workouts-media",class:"btn btn-primary me-4",role:"button"},{default:(0,n.w5)((()=>[(0,n.Uk)("Add Custom Media")])),_:1})]),nt,it,a.elements?((0,n.wg)(),(0,n.iD)("div",at,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(a.elements,(e=>((0,n.wg)(),(0,n.iD)("div",{key:e.id},[(0,n.Wm)(c,{name:e.name,description:e.description,isCustom:e.custom,httpRef:e.ref},null,8,["name","description","isCustom","httpRef"])])))),128))])):(0,n.kq)("",!0)]),a.message?((0,n.wg)(),(0,n.iD)("p",{key:0,class:(0,i.C_)({"success-message":o.isSuccess,"error-message":o.isError})},(0,i.zw)(a.message),3)):(0,n.kq)("",!0)],64)}const lt={class:"card me-4 mb-4",style:{"min-width":"26rem"}},ut={class:"card-body"},ct={class:"card-title"},dt={class:"card-subtitle mb-2 text-body-secondary"},mt={class:"card-text"},pt={class:"d-flex justify-content-end"},gt=["href"];function ft(e,t,s,r,a,o){return(0,n.wg)(),(0,n.iD)("div",lt,[(0,n._)("div",ut,[(0,n._)("h5",ct,(0,i.zw)(s.name),1),(0,n._)("h6",dt,(0,i.zw)(s.isCustom?"Custom":"Default"),1),(0,n._)("p",mt,(0,i.zw)(s.description),1),(0,n._)("div",pt,[(0,n._)("a",{href:s.httpRef,class:"btn btn-primary",target:"_blank"},"Visit Media",8,gt)])])])}var yt={name:"ExerciseComponent",props:{id:Number,name:String,httpRef:String,description:String,isCustom:Boolean}};const ht=(0,v.Z)(yt,[["render",ft]]);var wt=ht,bt={name:"MediaPage",setup(){(0,W.jq)({title:"Healthy - Media",htmlAttrs:{lang:"en"}})},data(){return{elements:null,message:""}},components:{MediaComponent:wt},async created(){this.$store.commit("setCurrentUrl","/workouts-media");const e=await this.validateToken();if(e)this.$store.commit("setLogged",!0);else try{this.$store.commit("setLogged",!1);const e=await this.getDefaultHttpRefs();200===e.status?this.elements=e.body:401===e.status?this.$router.push("/login"):this.message=`Unexpected response status (${e.status})`}catch(t){this.message="An error occurred while signing up. Try again"}},computed:{isSuccess(){return this.message.includes("success")},isError(){return this.message.includes("error")}},methods:{async validateToken(){localStorage.getItem("token");return!1},async getDefaultHttpRefs(){let e="/api/v1/workouts/httpRefs/default";const t=await fetch(e,{method:"GET",headers:{"Content-Type":"application/json"}}),s=await t.json();return{status:t.status,body:s}}}};const vt=(0,v.Z)(bt,[["render",ot]]);var kt=vt;const _t=(0,n._)("div",{class:"d-flex"},[(0,n._)("p",null,"Comming soon...")],-1);function xt(e,t,s,r,a,o){const l=(0,n.up)("metainfo");return(0,n.wg)(),(0,n.iD)(n.HY,null,[(0,n.Wm)(l,null,{title:(0,n.w5)((({content:e})=>[(0,n.Uk)((0,i.zw)(e),1)])),_:1}),_t],64)}var Pt={name:"NutritionPage",setup(){(0,W.jq)({title:"Healthy - Nutrition",htmlAttrs:{lang:"en"}})},async created(){this.$store.commit("setCurrentUrl","nutrition")}};const Ut=(0,v.Z)(Pt,[["render",xt]]);var Ct=Ut;const Dt=(0,n._)("div",{class:"d-flex"},[(0,n._)("p",null,"Comming soon...")],-1);function Wt(e,t,s,r,a,o){const l=(0,n.up)("metainfo");return(0,n.wg)(),(0,n.iD)(n.HY,null,[(0,n.Wm)(l,null,{title:(0,n.w5)((({content:e})=>[(0,n.Uk)((0,i.zw)(e),1)])),_:1}),Dt],64)}var Et={name:"MeditationsPage",setup(){(0,W.jq)({title:"Healthy - Meditations",htmlAttrs:{lang:"en"}})},async created(){this.$store.commit("setCurrentUrl","meditations")}};const St=(0,v.Z)(Et,[["render",Wt]]);var Ht=St;const qt=(0,n._)("div",{class:"d-flex flex-column"},[(0,n._)("p",null,"Commin soon...")],-1);function Tt(e,t,s,r,a,o){const l=(0,n.up)("metainfo");return(0,n.wg)(),(0,n.iD)(n.HY,null,[(0,n.Wm)(l,null,{title:(0,n.w5)((({content:e})=>[(0,n.Uk)((0,i.zw)(e),1)])),_:1}),qt],64)}var jt={name:"SettingsPage",setup(){(0,W.jq)({title:"Settings",htmlAttrs:{lang:"en"}})},async created(){this.$store.commit("setCurrentUrl","settings")}};const $t=(0,v.Z)(jt,[["render",Tt]]);var At=$t;const zt=[{path:"/",name:"HomePage",component:H},{path:"/signup",name:"SignupPage",component:R},{path:"/login",name:"LoginPage",component:ie},{path:"/logout",name:"LogoutPage",component:ue},{path:"/calendar",name:"CalendarPage",component:ge},{path:"/workouts",name:"WorkoutsPage",component:$e},{path:"/workouts-exercises",name:"ExercisesPage",component:tt},{path:"/workouts-media",name:"MediaPage",component:kt},{path:"/nutrition",name:"NutritionPage",component:Ct},{path:"/meditations",name:"MeditationsPage",component:Ht},{path:"/settings",name:"SettingsPage",component:At}],Ot=(0,x.p7)({history:(0,x.PO)("/"),routes:zt});var Bt=Ot,Lt=s(65);const Mt=(0,Lt.MT)({state(){return{isLogged:!1,currentUrl:"",previousUrl:""}},mutations:{setLogged(e,t){e.isLogged=t},setCurrentUrl(e,t){e.previousUrl=e.currentUrl,e.currentUrl=t}}});var Nt=Mt;s(5654);const Yt=(0,r.ri)(_);Yt.use(Nt).use(Bt).use((0,W.Bg)()).mount("#app")}},t={};function s(r){var n=t[r];if(void 0!==n)return n.exports;var i=t[r]={exports:{}};return e[r].call(i.exports,i,i.exports,s),i.exports}s.m=e,function(){var e=[];s.O=function(t,r,n,i){if(!r){var a=1/0;for(c=0;c<e.length;c++){r=e[c][0],n=e[c][1],i=e[c][2];for(var o=!0,l=0;l<r.length;l++)(!1&i||a>=i)&&Object.keys(s.O).every((function(e){return s.O[e](r[l])}))?r.splice(l--,1):(o=!1,i<a&&(a=i));if(o){e.splice(c--,1);var u=n();void 0!==u&&(t=u)}}return t}i=i||0;for(var c=e.length;c>0&&e[c-1][2]>i;c--)e[c]=e[c-1];e[c]=[r,n,i]}}(),function(){s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,{a:t}),t}}(),function(){s.d=function(e,t){for(var r in t)s.o(t,r)&&!s.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}}(),function(){s.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){var e={143:0};s.O.j=function(t){return 0===e[t]};var t=function(t,r){var n,i,a=r[0],o=r[1],l=r[2],u=0;if(a.some((function(t){return 0!==e[t]}))){for(n in o)s.o(o,n)&&(s.m[n]=o[n]);if(l)var c=l(s)}for(t&&t(r);u<a.length;u++)i=a[u],s.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return s.O(c)},r=self["webpackChunkfrontend"]=self["webpackChunkfrontend"]||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))}();var r=s.O(void 0,[998],(function(){return s(7619)}));r=s.O(r)})();
//# sourceMappingURL=app.836e270b.js.map