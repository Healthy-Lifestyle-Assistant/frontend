(function(){"use strict";var e={3345:function(e,t,s){var r=s(9242),n=s(3396);const a={class:"container"};function o(e,t,s,r,o,i){const l=(0,n.up)("NavbarComponent"),u=(0,n.up)("router-view");return(0,n.wg)(),(0,n.iD)(n.HY,null,[(0,n.Wm)(l),(0,n._)("div",a,[(0,n.Wm)(u)])],64)}var i=s(7139);const l={class:"navbar navbar-expand-lg bg-primary mb-5","data-bs-theme":"dark"},u={class:"container-fluid"},c=(0,n._)("button",{class:"navbar-toggler",type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbarSupportedContent","aria-controls":"navbarSupportedContent","aria-expanded":"false","aria-label":"Toggle navigation"},[(0,n._)("span",{class:"navbar-toggler-icon"})],-1),d={class:"collapse navbar-collapse",id:"navbarSupportedContent"},m={class:"navbar-nav me-auto mb-2 mb-lg-0"},p={class:"nav-item"},g={class:"nav-item dropdown"},h={class:"dropdown-menu"},w={class:"nav-item"},f={class:"nav-item"},b={class:"nav-item"},y={class:"nav-item"},v={class:"nav-item"},k={class:"nav-item"},_={key:0,class:"d-flex align-items-center"},x={key:1,class:"d-flex align-items-center"};function U(e,t,s,r,a,o){const U=(0,n.up)("router-link");return(0,n.wg)(),(0,n.iD)("nav",l,[(0,n._)("div",u,[(0,n.Wm)(U,{to:"/",class:"navbar-brand me-4"},{default:(0,n.w5)((()=>[(0,n.Uk)("Healthy Lifestyle")])),_:1}),c,(0,n._)("div",d,[(0,n._)("ul",m,[(0,n._)("li",p,[(0,n.Wm)(U,{to:"/calendar",class:(0,i.C_)({"nav-link":!0,active:o.isCalendar})},{default:(0,n.w5)((()=>[(0,n.Uk)("Calendar")])),_:1},8,["class"])]),(0,n._)("li",g,[(0,n._)("a",{class:(0,i.C_)({"nav-link":!0,"dropdown-toggle":!0,active:o.isWorkouts}),href:"",role:"button","data-bs-toggle":"dropdown","aria-expanded":"false"}," Workouts ",2),(0,n._)("ul",h,[(0,n._)("li",w,[(0,n.Wm)(U,{to:"/workouts",class:"dropdown-item"},{default:(0,n.w5)((()=>[(0,n.Uk)("Workouts")])),_:1})]),(0,n._)("li",f,[(0,n.Wm)(U,{to:"/workouts-exercises",class:"dropdown-item"},{default:(0,n.w5)((()=>[(0,n.Uk)("Exercises")])),_:1})]),(0,n._)("li",b,[(0,n.Wm)(U,{to:"/workouts-reminders",class:"dropdown-item"},{default:(0,n.w5)((()=>[(0,n.Uk)("Reminders")])),_:1})]),(0,n._)("li",y,[(0,n.Wm)(U,{to:"/workouts-media",class:"dropdown-item"},{default:(0,n.w5)((()=>[(0,n.Uk)("Media")])),_:1})])])]),(0,n._)("li",v,[(0,n.Wm)(U,{to:"/nutrition",class:(0,i.C_)({"nav-link":!0,active:o.isNutrition})},{default:(0,n.w5)((()=>[(0,n.Uk)("Nutrition")])),_:1},8,["class"])]),(0,n._)("li",k,[(0,n.Wm)(U,{to:"/meditations",class:(0,i.C_)({"nav-link":!0,active:o.isMeditations})},{default:(0,n.w5)((()=>[(0,n.Uk)("Meditations")])),_:1},8,["class"])])]),o.isLogged?((0,n.wg)(),(0,n.iD)("div",_,[(0,n.Wm)(U,{to:"/settings-menu",class:"btn btn-light me-2",role:"button"},{default:(0,n.w5)((()=>[(0,n.Uk)("Settings")])),_:1}),(0,n.Wm)(U,{to:"/logout",class:"btn btn-light me-2",role:"button"},{default:(0,n.w5)((()=>[(0,n.Uk)("Logout")])),_:1})])):((0,n.wg)(),(0,n.iD)("div",x,[(0,n.Wm)(U,{to:"/login",class:"btn btn-light me-2",role:"button"},{default:(0,n.w5)((()=>[(0,n.Uk)("Login")])),_:1}),(0,n.Wm)(U,{to:"/signup",class:"btn btn-light me-2",role:"button"},{default:(0,n.w5)((()=>[(0,n.Uk)("Sign-Up")])),_:1})]))])])])}var C={name:"NavbarComponent",computed:{isLogged(){return this.$store.state.isLogged},getCurrentUrl(){return this.$store.state.currentUrl},getPreviousUrl(){return this.$store.state.previousUrl},isCalendar(){return this.$store.state.currentUrl.includes("calendar")},isWorkouts(){return this.$store.state.currentUrl.includes("workouts")},isNutrition(){return this.$store.state.currentUrl.includes("nutrition")},isMeditations(){return this.$store.state.currentUrl.includes("meditations")}}},E=s(89);const P=(0,E.Z)(C,[["render",U]]);var W=P,D={name:"App",components:{NavbarComponent:W}};const q=(0,E.Z)(D,[["render",o]]);var $=q,S=s(678);const H={class:"d-flex flex-column mb-5",style:{width:"90%"}},j=(0,n._)("h3",{class:"mb-4"},"Maintain Habits For Your Health",-1),z=(0,n._)("p",{class:"lead mb-5"},[(0,n.Uk)(" Healthy Lifestyle Assistant is a Ukrainian non-profit startup promoting a healthy lifestyle using digital technologies. Our web application helps people maintain good habits like workouts, nutrition, and mental health activities. "),(0,n._)("br"),(0,n._)("br"),(0,n.Uk)(" A healthy lifestyle is a way of living that lowers the risk of being seriously ill or dying early. Not all diseases are preventable, but a large portion of deaths, particularly those from coronary heart disease and lung cancer, can be avoided. Scientific studies have identified certain types of behavior that contribute to the development of noncommunicable diseases and early death. Health is not just about avoiding disease. It’s also about physical, mental and social wellbeing. When a healthy lifestyle is adopted, a more positive model is provided for other people in the family, particularly children. "),(0,n._)("br"),(0,n._)("br"),(0,n.Uk)(" Web application aims to support people to change their behavior and improve their health in order to live healthier, longer lives. ")],-1);function A(e,t,s,r,a,o){const l=(0,n.up)("metainfo"),u=(0,n.up)("router-link");return(0,n.wg)(),(0,n.iD)(n.HY,null,[(0,n.Wm)(l,null,{title:(0,n.w5)((({content:e})=>[(0,n.Uk)((0,i.zw)(e),1)])),_:1}),(0,n._)("div",H,[j,z,(0,n._)("div",null,[(0,n.Wm)(u,{to:"/signup",class:"btn btn-primary",role:"button"},{default:(0,n.w5)((()=>[(0,n.Uk)("Try Development Version")])),_:1})])])],64)}var T=s(9590),R={name:"HomePage",setup(){(0,T.jq)({title:"Healthy - Home",htmlAttrs:{lang:"en"}})},async created(){this.$store.commit("setCurrentUrl","/")},computed:{isLogged(){return this.$store.state.isLogged}}};const L=(0,E.Z)(R,[["render",A]]);var N=L;const O={class:"d-flex flex-column align-items-center"},M={class:"mb-3"},I=(0,n._)("label",{for:"username",class:"form-label"},"Username*",-1),Y={class:"mb-3"},B=(0,n._)("label",{for:"email",class:"form-label"},"Email*",-1),Z={class:"mb-3"},V=(0,n._)("label",{for:"fullName",class:"form-label"},"Name*",-1),F={class:"mb-3"},K=(0,n._)("label",{for:"password",class:"form-label"},"Password*",-1),G={class:"mb-3"},J=(0,n._)("label",{for:"confirmPassword",class:"form-label"},"Confirm Password*",-1),Q={key:0,class:"mb-3"},X=(0,n._)("label",{for:"countries",class:"form-label"},"Country*",-1),ee=["value"],te=(0,n._)("div",null," * Required Fields ",-1),se=(0,n._)("button",{type:"submit",class:"btn btn-primary mt-4"},"Sign Up",-1);function re(e,t,s,a,o,l){const u=(0,n.up)("metainfo");return(0,n.wg)(),(0,n.iD)(n.HY,null,[(0,n.Wm)(u,null,{title:(0,n.w5)((({content:e})=>[(0,n.Uk)((0,i.zw)(e),1)])),_:1}),(0,n._)("div",O,[o.message?((0,n.wg)(),(0,n.iD)("div",{key:0,class:(0,i.C_)({alert:!0,"alert-primary":l.isSuccess,"alert-danger":l.isError}),role:"alert"},(0,i.zw)(o.message),3)):(0,n.kq)("",!0),(0,n._)("form",{onSubmit:t[6]||(t[6]=(0,r.iM)(((...e)=>l.submitForm&&l.submitForm(...e)),["prevent"])),style:{width:"fit-content"}},[(0,n._)("div",M,[I,(0,n.wy)((0,n._)("input",{type:"text",class:"form-control",id:"username","onUpdate:modelValue":t[0]||(t[0]=e=>o.username=e),required:""},null,512),[[r.nr,o.username]])]),(0,n._)("div",Y,[B,(0,n.wy)((0,n._)("input",{type:"email",class:"form-control",id:"email","onUpdate:modelValue":t[1]||(t[1]=e=>o.email=e),required:""},null,512),[[r.nr,o.email]])]),(0,n._)("div",Z,[V,(0,n.wy)((0,n._)("input",{type:"text",class:"form-control",id:"fullName","onUpdate:modelValue":t[2]||(t[2]=e=>o.fullName=e),required:""},null,512),[[r.nr,o.fullName]])]),(0,n._)("div",F,[K,(0,n.wy)((0,n._)("input",{type:"password",class:"form-control",id:"password","onUpdate:modelValue":t[3]||(t[3]=e=>o.password=e),required:""},null,512),[[r.nr,o.password]])]),(0,n._)("div",G,[J,(0,n.wy)((0,n._)("input",{type:"password",class:"form-control",id:"confirmPassword","onUpdate:modelValue":t[4]||(t[4]=e=>o.confirmPassword=e),required:""},null,512),[[r.nr,o.confirmPassword]])]),o.countries?((0,n.wg)(),(0,n.iD)("div",Q,[X,(0,n.wy)((0,n._)("select",{id:"countries","onUpdate:modelValue":t[5]||(t[5]=e=>o.countryId=e),class:"form-select","aria-label":"Select Country",required:""},[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(o.countries,(e=>((0,n.wg)(),(0,n.iD)("option",{key:e.id,value:e.id},(0,i.zw)(e.name),9,ee)))),128))],512),[[r.bM,o.countryId]])])):(0,n.kq)("",!0),te,se],32)])],64)}var ne={name:"SignupPage",setup(){(0,T.jq)({title:"Healthy - Signup",htmlAttrs:{lang:"en"}})},data(){return{username:"",email:"",fullName:"",password:"",confirmPassword:"",countryId:null,countries:null,message:""}},async created(){this.$store.commit("setCurrentUrl","/signup");let e=await this.getCountries();this.countries=e.body},computed:{isSuccess(){return this.message.includes("success")},isError(){return this.message.includes("error")}},methods:{async submitForm(){const e={username:this.username,email:this.email,fullName:this.fullName,password:this.password,confirmPassword:this.confirmPassword,countryId:this.countryId};try{const t=await this.signupApi(e);201===t.status?this.message="User account has been created successfully! Now you can login to your account.":this.message=`An error occurred ${t.status}`}catch(t){this.message=`An error occurred ${t}`}this.username="",this.email="",this.fullName="",this.password="",this.confirmPassword="",this.countryId=null},async signupApi(e){const t=await fetch("/api/v1/users/auth/signup",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}),s=await t.json();return{status:t.status,body:s}},async getCountries(){let e="/api/v1/users/countries";const t=await fetch(e,{method:"GET",headers:{"Content-Type":"application/json"}}),s=await t.json();return{status:t.status,body:s}}}};const ae=(0,E.Z)(ne,[["render",re]]);var oe=ae;const ie={class:"d-flex justify-content-center"},le={class:"mb-3"},ue=(0,n._)("label",{for:"usernameOrEmail",class:"form-label"},"Username or email",-1),ce={class:"mb-3"},de=(0,n._)("label",{for:"password",class:"form-label"},"Password",-1),me={class:"mb-3"},pe=(0,n._)("label",{for:"confirmPassword",class:"form-label"},"Confirm password",-1),ge=(0,n._)("button",{type:"submit",class:"btn btn-primary mt-4"},"Login",-1);function he(e,t,s,a,o,l){const u=(0,n.up)("metainfo");return(0,n.wg)(),(0,n.iD)(n.HY,null,[(0,n.Wm)(u,null,{title:(0,n.w5)((({content:e})=>[(0,n.Uk)((0,i.zw)(e),1)])),_:1}),(0,n._)("div",ie,[(0,n._)("form",{onSubmit:t[3]||(t[3]=(0,r.iM)(((...e)=>l.submitForm&&l.submitForm(...e)),["prevent"])),style:{width:"fit-content"}},[(0,n._)("div",le,[ue,(0,n.wy)((0,n._)("input",{type:"text",class:"form-control",id:"usernameOrEmail","onUpdate:modelValue":t[0]||(t[0]=e=>o.usernameOrEmail=e),required:""},null,512),[[r.nr,o.usernameOrEmail]])]),(0,n._)("div",ce,[de,(0,n.wy)((0,n._)("input",{type:"password",class:"form-control",id:"password","onUpdate:modelValue":t[1]||(t[1]=e=>o.password=e),required:""},null,512),[[r.nr,o.password]])]),(0,n._)("div",me,[pe,(0,n.wy)((0,n._)("input",{type:"password",class:"form-control",id:"confirmPassword","onUpdate:modelValue":t[2]||(t[2]=e=>o.confirmPassword=e),required:""},null,512),[[r.nr,o.confirmPassword]])]),ge],32),o.message?((0,n.wg)(),(0,n.iD)("p",{key:0,class:(0,i.C_)({"success-message":l.isSuccess,"error-message":l.isError})},(0,i.zw)(o.message),3)):(0,n.kq)("",!0)])],64)}s(7658);var we={name:"LoginPage",setup(){(0,T.jq)({title:"Healthy - Login",htmlAttrs:{lang:"en"}})},data(){return{usernameOrEmail:"",password:"",confirmPassword:"",message:""}},async created(){this.$store.commit("setCurrentUrl","/login")},computed:{isSuccess(){return this.message.includes("success")},isError(){return this.message.includes("error")}},methods:{async submitForm(){const e={usernameOrEmail:this.usernameOrEmail,password:this.password,confirmPassword:this.confirmPassword};try{const t=await this.loginApi(e);200===t.status?(localStorage.setItem("token",JSON.stringify(t.body.token).slice(1,-1)),this.$store.commit("setLogged",!0),this.message="Login successful",this.$router.push(this.$store.state.previousUrl)):this.message="An error occurred while signing up. Try again"}catch(t){this.message="An error occurred while signing up. Try again"}},async loginApi(e){const t=await fetch("/api/v1/users/auth/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}),s=await t.json();return{status:t.status,body:s}}}};const fe=(0,E.Z)(we,[["render",he]]);var be=fe;function ye(e,t,s,r,a,o){return(0,n.wg)(),(0,n.iD)("div")}var ve={name:"LogoutPage",created(){this.$store.commit("setCurrentUrl","/login"),localStorage.removeItem("token"),this.$store.commit("setLogged",!1),this.$router.push("/login")}};const ke=(0,E.Z)(ve,[["render",ye]]);var _e=ke;const xe=(0,n._)("div",{class:"d-flex flex-column"},[(0,n._)("p",null,"Comming soon...")],-1);function Ue(e,t,s,r,a,o){const l=(0,n.up)("metainfo");return(0,n.wg)(),(0,n.iD)(n.HY,null,[(0,n.Wm)(l,null,{title:(0,n.w5)((({content:e})=>[(0,n.Uk)((0,i.zw)(e),1)])),_:1}),xe],64)}var Ce={name:"CalendarPage",setup(){(0,T.jq)({title:"Healthy - Calendar",htmlAttrs:{lang:"en"}})},async created(){this.$store.commit("setCurrentUrl","calendar")}};const Ee=(0,E.Z)(Ce,[["render",Ue]]);var Pe=Ee;const We={class:"d-flex flex-column align-items-start"},De=(0,n._)("br",null,null,-1),qe=(0,n._)("br",null,null,-1),$e=(0,n._)("br",null,null,-1),Se={key:0,class:"d-flex flex-wrap"};function He(e,t,s,r,a,o){const l=(0,n.up)("metainfo"),u=(0,n.up)("BreadcrumbWorkoutsComponent"),c=(0,n.up)("router-link"),d=(0,n.up)("WorkoutComponent");return(0,n.wg)(),(0,n.iD)(n.HY,null,[(0,n.Wm)(l,null,{title:(0,n.w5)((({content:e})=>[(0,n.Uk)((0,i.zw)(e),1)])),_:1}),(0,n._)("div",We,[(0,n._)("div",null,[(0,n.Wm)(u),De,(0,n.Wm)(c,{to:"",class:"btn btn-primary",role:"button"},{default:(0,n.w5)((()=>[(0,n.Uk)("New Workout")])),_:1}),qe,$e]),a.workouts?((0,n.wg)(),(0,n.iD)("div",Se,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(a.workouts,(e=>((0,n.wg)(),(0,n.iD)("div",{key:e.id},[(0,n.Wm)(d,{title:e.title,description:e.description,bodyParts:e.bodyParts,custom:e.custom,needsEquipment:e.needsEquipment,exercises:e.exercises},null,8,["title","description","bodyParts","custom","needsEquipment","exercises"])])))),128))])):(0,n.kq)("",!0)])],64)}const je={class:"card me-4 mb-4",style:{"min-width":"20rem","max-width":"20rem"}},ze={class:"card-body"},Ae={class:"card-title"},Te={class:"card-subtitle mb-2 text-body-secondary"},Re={class:"card-text"},Le={key:0,class:"card-text mb-2"},Ne={key:1,class:"card-text mb-2"},Oe={class:"d-flex justify-content-end"};function Me(e,t,s,r,a,o){const l=(0,n.up)("router-link");return(0,n.wg)(),(0,n.iD)("div",je,[(0,n._)("div",ze,[(0,n._)("h5",Ae,(0,i.zw)(s.title),1),(0,n._)("h6",Te,(0,i.zw)(s.custom?"Custom":"Default")+", "+(0,i.zw)(s.needsEquipment?"With Equipment":"Without Equipment"),1),(0,n._)("p",Re,(0,i.zw)(s.description),1),s.bodyParts?((0,n.wg)(),(0,n.iD)("div",Le,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(s.bodyParts,(e=>((0,n.wg)(),(0,n.iD)("span",{key:e.id},[(0,n._)("small",null,(0,i.zw)(e.name.toLowerCase()),1),(0,n.Uk)(" ")])))),128))])):(0,n.kq)("",!0),s.exercises?((0,n.wg)(),(0,n.iD)("div",Ne,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(s.exercises,(e=>((0,n.wg)(),(0,n.iD)("span",{key:e.id},[(0,n.Wm)(l,{to:"/workouts-exercises"},{default:(0,n.w5)((()=>[(0,n.Uk)((0,i.zw)(e.title),1)])),_:2},1024),(0,n.Uk)("  ")])))),128))])):(0,n.kq)("",!0),(0,n._)("div",Oe,[(0,n.Wm)(l,{to:"/workouts",class:"btn btn-primary"},{default:(0,n.w5)((()=>[(0,n.Uk)("Details")])),_:1})])])])}var Ie={name:"WorkoutComponent",props:{id:Number,title:String,description:String,custom:Boolean,needsEquipment:Boolean,bodyParts:Array,exercises:Array}};const Ye=(0,E.Z)(Ie,[["render",Me]]);var Be=Ye;const Ze={"aria-label":"breadcrumb"},Ve={class:"breadcrumb"},Fe={key:0,class:"breadcrumb-item active","aria-current":"page"},Ke={key:1,class:"breadcrumb-item","aria-current":"page"},Ge={key:2,class:"breadcrumb-item active","aria-current":"page"},Je={key:3,class:"breadcrumb-item","aria-current":"page"},Qe={key:4,class:"breadcrumb-item active","aria-current":"page"},Xe={key:5,class:"breadcrumb-item","aria-current":"page"},et={key:6,class:"breadcrumb-item active","aria-current":"page"},tt={key:7,class:"breadcrumb-item","aria-current":"page"};function st(e,t,s,r,a,o){const i=(0,n.up)("router-link");return(0,n.wg)(),(0,n.iD)("nav",Ze,[(0,n._)("ol",Ve,[o.isWorkouts?((0,n.wg)(),(0,n.iD)("li",Fe," Workouts ")):((0,n.wg)(),(0,n.iD)("li",Ke,[(0,n.Wm)(i,{to:"/workouts"},{default:(0,n.w5)((()=>[(0,n.Uk)("Workouts")])),_:1})])),o.isExercises?((0,n.wg)(),(0,n.iD)("li",Ge," Exercises ")):((0,n.wg)(),(0,n.iD)("li",Je,[(0,n.Wm)(i,{to:"/workouts-exercises"},{default:(0,n.w5)((()=>[(0,n.Uk)("Exercises")])),_:1})])),o.isReminders?((0,n.wg)(),(0,n.iD)("li",Qe," Reminders ")):((0,n.wg)(),(0,n.iD)("li",Xe,[(0,n.Wm)(i,{to:"/workouts-reminders"},{default:(0,n.w5)((()=>[(0,n.Uk)("Reminders")])),_:1})])),o.isMedia?((0,n.wg)(),(0,n.iD)("li",et," Media ")):((0,n.wg)(),(0,n.iD)("li",tt,[(0,n.Wm)(i,{to:"/workouts-media"},{default:(0,n.w5)((()=>[(0,n.Uk)("Media")])),_:1})]))])])}var rt={name:"BreadcrumbWorkoutsComponent",computed:{isWorkouts(){return this.$store.state.currentUrl.includes("workouts")&&!this.$store.state.currentUrl.includes("exercises")&&!this.$store.state.currentUrl.includes("reminders")&&!this.$store.state.currentUrl.includes("media")},isExercises(){return this.$store.state.currentUrl.includes("exercises")},isReminders(){return this.$store.state.currentUrl.includes("reminders")},isMedia(){return this.$store.state.currentUrl.includes("media")}}};const nt=(0,E.Z)(rt,[["render",st]]);var at=nt,ot={name:"WorkoutsPage",setup(){(0,T.jq)({title:"Healthy - Workouts",htmlAttrs:{lang:"en"}})},data(){return{workouts:null,message:""}},async created(){this.$store.commit("setCurrentUrl","/workouts");const e=await this.validateToken();if(e)this.$store.commit("setLogged",!0);else try{this.$store.commit("setLogged",!1);const e=await this.getDefaultWorkouts();200===e.status?this.workouts=e.body:401===e.status?this.$router.push("/login"):this.message=`Unexpected response status (${e.status})`}catch(t){this.message="An error occurred"}},components:{WorkoutComponent:Be,BreadcrumbWorkoutsComponent:at},methods:{async validateToken(){localStorage.getItem("token");return!1},async getDefaultWorkouts(){let e="/api/v1/workouts/default";const t=await fetch(e,{method:"GET",headers:{"Content-Type":"application/json"}}),s=await t.json();return{status:t.status,body:s}}}};const it=(0,E.Z)(ot,[["render",He]]);var lt=it;const ut={class:"d-flex flex-column align-items-start"},ct=(0,n._)("br",null,null,-1),dt=(0,n._)("br",null,null,-1),mt=(0,n._)("br",null,null,-1),pt={key:1,class:"d-flex flex-wrap"},gt={key:2,class:"d-flex flex-wrap"};function ht(e,t,s,r,a,o){const l=(0,n.up)("metainfo"),u=(0,n.up)("BreadcrumbWorkoutsComponent"),c=(0,n.up)("router-link"),d=(0,n.up)("ExerciseComponent");return(0,n.wg)(),(0,n.iD)(n.HY,null,[(0,n.Wm)(l,null,{title:(0,n.w5)((({content:e})=>[(0,n.Uk)((0,i.zw)(e),1)])),_:1}),(0,n._)("div",ut,[a.message?((0,n.wg)(),(0,n.iD)("div",{key:0,class:(0,i.C_)({alert:!0,"alert-primary":o.isUnlogged,"alert-danger":o.isError}),role:"alert"},(0,i.zw)(a.message),3)):(0,n.kq)("",!0),(0,n._)("div",null,[(0,n.Wm)(u),ct,(0,n.Wm)(c,{to:"/workouts-create-exercise",class:"btn btn-primary",role:"button"},{default:(0,n.w5)((()=>[(0,n.Uk)("Create Custom Exercise")])),_:1}),dt,mt]),a.customExercises?((0,n.wg)(),(0,n.iD)("div",pt,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(a.customExercises,(e=>((0,n.wg)(),(0,n.iD)("div",{key:e.id},[(0,n.Wm)(d,{title:e.title,description:e.description,bodyParts:e.bodyParts,isCustom:e.custom,needsEquipment:e.needsEquipment},null,8,["title","description","bodyParts","isCustom","needsEquipment"])])))),128))])):(0,n.kq)("",!0),a.defaultExercises?((0,n.wg)(),(0,n.iD)("div",gt,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(a.defaultExercises,(e=>((0,n.wg)(),(0,n.iD)("div",{key:e.id},[(0,n.Wm)(d,{title:e.title,description:e.description,bodyParts:e.bodyParts,isCustom:e.custom,needsEquipment:e.needsEquipment},null,8,["title","description","bodyParts","isCustom","needsEquipment"])])))),128))])):(0,n.kq)("",!0)])],64)}const wt={class:"card me-4 mb-4",style:{"min-width":"16rem","max-width":"16rem"}},ft={class:"card-body"},bt={class:"card-title"},yt={class:"card-subtitle mb-2 text-body-secondary"},vt={class:"card-text"},kt={key:0,class:"card-text mb-2"},_t={class:"d-flex justify-content-end"};function xt(e,t,s,r,a,o){const l=(0,n.up)("router-link");return(0,n.wg)(),(0,n.iD)("div",wt,[(0,n._)("div",ft,[(0,n._)("h5",bt,(0,i.zw)(s.title),1),(0,n._)("h6",yt,(0,i.zw)(s.isCustom?"Custom":"Default")+", "+(0,i.zw)(s.needsEquipment?"With Equipment":"Without Equipment"),1),(0,n._)("p",vt,(0,i.zw)(s.description),1),s.bodyParts?((0,n.wg)(),(0,n.iD)("div",kt,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(s.bodyParts,(e=>((0,n.wg)(),(0,n.iD)("span",{key:e.id},[(0,n._)("small",null,(0,i.zw)(e.name.toLowerCase()),1),(0,n.Uk)(" ")])))),128))])):(0,n.kq)("",!0),(0,n._)("div",_t,[(0,n.Wm)(l,{to:"/workouts-exercises",class:"btn btn-primary"},{default:(0,n.w5)((()=>[(0,n.Uk)("Details")])),_:1})])])])}var Ut={name:"ExerciseComponent",props:{id:Number,title:String,description:String,bodyParts:Array,isCustom:Boolean,needsEquipment:Boolean}};const Ct=(0,E.Z)(Ut,[["render",xt]]);var Et=Ct;function Pt(){const e=localStorage.getItem("token");return null===e||""===e?null:e}async function Wt(){const e=localStorage.getItem("token");if(null===e)return null;if(""===e)return localStorage.removeItem("token"),null;let t="/api/v1/users/auth/validate";const s=await fetch(t,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`}});return 200===s.status?e:(localStorage.removeItem("token"),null)}var Dt={name:"ExercisesPage",setup(){(0,T.jq)({title:"Healthy - Exercises",htmlAttrs:{lang:"en"}})},data(){return{defaultExercises:null,customExercises:null,message:""}},components:{ExerciseComponent:Et,BreadcrumbWorkoutsComponent:at},async created(){this.$store.commit("setCurrentUrl","/workouts-exercises");const e=await Wt();try{const e=await this.getDefaultExercises();200===e.status?this.defaultExercises=e.body:401===e.status?this.$router.push("/login"):this.message=`An error occured (${e.body.message} ${e.status})`}catch(t){this.message=`An error occurred (${t})`}if(e){this.$store.commit("setLogged",!0);try{const t=await this.getCustomExercises(e);200===t.status?this.customExercises=t.body:401===t.status?this.$router.push("/login"):this.message=`An error occured (${t.body.message} ${t.status})`}catch(t){this.message=`An error occurred (${t})`}}else this.$store.commit("setLogged",!1),this.message="You are unlogged"},computed:{isError(){return this.message.includes("error")},isUnlogged(){return this.message.includes("unlogged")}},methods:{async getDefaultExercises(){let e="/api/v1/workouts/exercises/default";const t=await fetch(e,{method:"GET",headers:{"Content-Type":"application/json"}}),s=await t.json();return{status:t.status,body:s}},async getCustomExercises(e){let t="/api/v1/workouts/exercises";const s=await fetch(t,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`}}),r=await s.json();return{status:s.status,body:r}}}};const qt=(0,E.Z)(Dt,[["render",ht]]);var $t=qt;const St={class:"d-flex flex-column align-items-start"},Ht=(0,n._)("br",null,null,-1),jt=(0,n._)("br",null,null,-1),zt=(0,n._)("br",null,null,-1),At={key:0,class:"d-flex flex-wrap"};function Tt(e,t,s,r,a,o){const l=(0,n.up)("metainfo"),u=(0,n.up)("BreadcrumbWorkoutsComponent"),c=(0,n.up)("router-link"),d=(0,n.up)("MediaComponent");return(0,n.wg)(),(0,n.iD)(n.HY,null,[(0,n.Wm)(l,null,{title:(0,n.w5)((({content:e})=>[(0,n.Uk)((0,i.zw)(e),1)])),_:1}),(0,n._)("div",St,[(0,n._)("div",null,[(0,n.Wm)(u),Ht,(0,n.Wm)(c,{to:"/workouts-media",class:"btn btn-primary me-4",role:"button"},{default:(0,n.w5)((()=>[(0,n.Uk)("New Media")])),_:1}),jt,zt]),a.elements?((0,n.wg)(),(0,n.iD)("div",At,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(a.elements,(e=>((0,n.wg)(),(0,n.iD)("div",{key:e.id},[(0,n.Wm)(d,{name:e.name,description:e.description,isCustom:e.custom,httpRef:e.ref},null,8,["name","description","isCustom","httpRef"])])))),128))])):(0,n.kq)("",!0)]),a.message?((0,n.wg)(),(0,n.iD)("p",{key:0,class:(0,i.C_)({"success-message":o.isSuccess,"error-message":o.isError})},(0,i.zw)(a.message),3)):(0,n.kq)("",!0)],64)}const Rt={class:"card me-4 mb-4",style:{"min-width":"16rem","max-width":"16rem"}},Lt={class:"card-body"},Nt={class:"card-title"},Ot={class:"card-subtitle mb-2 text-body-secondary"},Mt={class:"card-text"},It={class:"d-flex justify-content-end"},Yt=["href"];function Bt(e,t,s,r,a,o){return(0,n.wg)(),(0,n.iD)("div",Rt,[(0,n._)("div",Lt,[(0,n._)("h5",Nt,(0,i.zw)(s.name),1),(0,n._)("h6",Ot,(0,i.zw)(s.isCustom?"Custom":"Default"),1),(0,n._)("p",Mt,(0,i.zw)(s.description),1),(0,n._)("div",It,[(0,n._)("a",{href:s.httpRef,class:"btn btn-primary",target:"_blank"},"Visit Media",8,Yt)])])])}var Zt={name:"ExerciseComponent",props:{id:Number,name:String,httpRef:String,description:String,isCustom:Boolean}};const Vt=(0,E.Z)(Zt,[["render",Bt]]);var Ft=Vt,Kt={name:"MediaPage",setup(){(0,T.jq)({title:"Healthy - Media",htmlAttrs:{lang:"en"}})},data(){return{elements:null,message:""}},components:{MediaComponent:Ft,BreadcrumbWorkoutsComponent:at},async created(){this.$store.commit("setCurrentUrl","/workouts-media");const e=await this.validateToken();if(e)this.$store.commit("setLogged",!0);else try{this.$store.commit("setLogged",!1);const e=await this.getDefaultHttpRefs();200===e.status?this.elements=e.body:401===e.status?this.$router.push("/login"):this.message=`Unexpected response status (${e.status})`}catch(t){this.message="An error occurred while signing up. Try again"}},computed:{isSuccess(){return this.message.includes("success")},isError(){return this.message.includes("error")}},methods:{async validateToken(){localStorage.getItem("token");return!1},async getDefaultHttpRefs(){let e="/api/v1/workouts/httpRefs/default";const t=await fetch(e,{method:"GET",headers:{"Content-Type":"application/json"}}),s=await t.json();return{status:t.status,body:s}}}};const Gt=(0,E.Z)(Kt,[["render",Tt]]);var Jt=Gt;const Qt={class:"d-flex flex-column align-items-center"},Xt={class:"mb-3"},es=(0,n._)("label",{for:"title",class:"form-label"},"Title (Required)",-1),ts={class:"mb-3"},ss=(0,n._)("label",{for:"description",class:"form-label"},"Description (Optional)",-1),rs={class:"form-check mb-3"},ns=(0,n._)("label",{for:"needsEquipment",class:"form-check-label"},"Needs Equipment",-1),as={key:0,class:"mb-3"},os=(0,n._)("option",{disabled:""},"Body Parts (Required)",-1),is=["value"],ls={key:1,class:"mb-3"},us=(0,n._)("option",{disabled:""},"Media References (Optional)",-1),cs=["value"],ds=(0,n._)("button",{type:"submit",class:"btn btn-primary mt-4"},"Create",-1);function ms(e,t,s,a,o,l){const u=(0,n.up)("metainfo");return(0,n.wg)(),(0,n.iD)(n.HY,null,[(0,n.Wm)(u,null,{title:(0,n.w5)((({content:e})=>[(0,n.Uk)((0,i.zw)(e),1)])),_:1}),(0,n._)("div",Qt,[o.message?((0,n.wg)(),(0,n.iD)("div",{key:0,class:(0,i.C_)({alert:!0,"alert-primary":l.isSuccess,"alert-danger":l.isError}),role:"alert"},(0,i.zw)(o.message),3)):(0,n.kq)("",!0),(0,n._)("form",{onSubmit:t[5]||(t[5]=(0,r.iM)(((...e)=>l.submitForm&&l.submitForm(...e)),["prevent"])),style:{width:"fit-content"}},[(0,n._)("div",Xt,[es,(0,n.wy)((0,n._)("input",{type:"text",class:"form-control",id:"title","onUpdate:modelValue":t[0]||(t[0]=e=>o.title=e),required:""},null,512),[[r.nr,o.title]])]),(0,n._)("div",ts,[ss,(0,n.wy)((0,n._)("input",{type:"text",class:"form-control",id:"description","onUpdate:modelValue":t[1]||(t[1]=e=>o.description=e)},null,512),[[r.nr,o.description]])]),(0,n._)("div",rs,[(0,n.wy)((0,n._)("input",{type:"checkbox",value:"",class:"form-check-input",id:"needsEquipment","onUpdate:modelValue":t[2]||(t[2]=e=>o.needsEquipment=e)},null,512),[[r.e8,o.needsEquipment]]),ns]),o.bodyParts?((0,n.wg)(),(0,n.iD)("div",as,[(0,n.wy)((0,n._)("select",{id:"bodyParts","onUpdate:modelValue":t[3]||(t[3]=e=>o.bodyPartIds=e),class:"form-select",multiple:"","aria-label":"Select body parts",required:""},[os,((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(o.bodyParts,(e=>((0,n.wg)(),(0,n.iD)("option",{key:e.id,value:e.id},(0,i.zw)(e.name),9,is)))),128))],512),[[r.bM,o.bodyPartIds]])])):(0,n.kq)("",!0),o.httpRefs?((0,n.wg)(),(0,n.iD)("div",ls,[(0,n.wy)((0,n._)("select",{id:"httpRefs","onUpdate:modelValue":t[4]||(t[4]=e=>o.httpRefIds=e),class:"form-select",multiple:"","aria-label":"Select media references"},[us,((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(o.httpRefs,(e=>((0,n.wg)(),(0,n.iD)("option",{key:e.id,value:e.id},(0,i.zw)(e.name),9,cs)))),128))],512),[[r.bM,o.httpRefIds]])])):(0,n.kq)("",!0),ds],32)])],64)}var ps={name:"CreateExercisePage",setup(){(0,T.jq)({title:"Healthy - Create Exercise",htmlAttrs:{lang:"en"}})},data(){return{title:"",description:"",bodyPartIds:[],httpRefIds:[],needsEquipment:!1,message:"",bodyParts:[],httpRefs:[]}},async created(){this.$store.commit("setCurrentUrl","/workouts-create-exercise");const e=await Wt();if(e){this.$store.commit("setLogged",!0);let e=await this.getBodyParts();this.bodyParts=e.body;let t=await this.getHttpRefs();this.httpRefs=t.body}else this.$store.commit("setLogged",!1),this.$router.push("/login")},computed:{isSuccess(){return this.message.includes("success")},isError(){return this.message.includes("error")}},methods:{async submitForm(){const e={title:this.title,description:this.description,needsEquipment:this.needsEquipment,bodyParts:this.bodyPartIds,httpRefs:this.httpRefIds};try{const t=await this.createExercise(e);201===t.status?this.message="Exercise has been created successfully":this.message=`An error occured (${t.body.message} ${t.status})`}catch(t){this.message=`An error occurred (${t})`}this.title="",this.description="",this.bodyPartIds=[],this.httpRefIds=[],this.needsEquipment=!1},async createExercise(e){let t="/api/v1/workouts/exercises",s=Pt();const r=await fetch(t,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${s}`},body:JSON.stringify(e)}),n=await r.json();return{status:r.status,body:n}},async getBodyParts(){let e="/api/v1/workouts/bodyParts";const t=await fetch(e,{method:"GET",headers:{"Content-Type":"application/json"}}),s=await t.json();return{status:t.status,body:s}},async getHttpRefs(){let e="/api/v1/workouts/httpRefs/default";const t=await fetch(e,{method:"GET",headers:{"Content-Type":"application/json"}}),s=await t.json();return{status:t.status,body:s}}}};const gs=(0,E.Z)(ps,[["render",ms]]);var hs=gs;const ws={class:"d-flex flex-column align-items-start"},fs=(0,n._)("br",null,null,-1),bs=(0,n._)("p",null,"In progress",-1);function ys(e,t,s,r,a,o){const l=(0,n.up)("metainfo"),u=(0,n.up)("BreadcrumbWorkoutsComponent");return(0,n.wg)(),(0,n.iD)(n.HY,null,[(0,n.Wm)(l,null,{title:(0,n.w5)((({content:e})=>[(0,n.Uk)((0,i.zw)(e),1)])),_:1}),(0,n._)("div",ws,[(0,n.Wm)(u),fs,bs])],64)}var vs={name:"RemindersWorkoutsPage",setup(){(0,T.jq)({title:"Healthy - Reminders",htmlAttrs:{lang:"en"}})},data(){return{message:""}},components:{BreadcrumbWorkoutsComponent:at},computed:{isError(){return this.message.includes("error")},isUnlogged(){return this.message.includes("unlogged")}},async created(){this.$store.commit("setCurrentUrl","/workouts-reminders")}};const ks=(0,E.Z)(vs,[["render",ys]]);var _s=ks;const xs=(0,n._)("div",{class:"d-flex"},[(0,n._)("p",null,"Comming soon...")],-1);function Us(e,t,s,r,a,o){const l=(0,n.up)("metainfo");return(0,n.wg)(),(0,n.iD)(n.HY,null,[(0,n.Wm)(l,null,{title:(0,n.w5)((({content:e})=>[(0,n.Uk)((0,i.zw)(e),1)])),_:1}),xs],64)}var Cs={name:"NutritionPage",setup(){(0,T.jq)({title:"Healthy - Nutrition",htmlAttrs:{lang:"en"}})},async created(){this.$store.commit("setCurrentUrl","nutrition")}};const Es=(0,E.Z)(Cs,[["render",Us]]);var Ps=Es;const Ws=(0,n._)("div",{class:"d-flex"},[(0,n._)("p",null,"Comming soon...")],-1);function Ds(e,t,s,r,a,o){const l=(0,n.up)("metainfo");return(0,n.wg)(),(0,n.iD)(n.HY,null,[(0,n.Wm)(l,null,{title:(0,n.w5)((({content:e})=>[(0,n.Uk)((0,i.zw)(e),1)])),_:1}),Ws],64)}var qs={name:"MeditationsPage",setup(){(0,T.jq)({title:"Healthy - Meditations",htmlAttrs:{lang:"en"}})},async created(){this.$store.commit("setCurrentUrl","meditations")}};const $s=(0,E.Z)(qs,[["render",Ds]]);var Ss=$s;const Hs=(0,n._)("div",{class:"d-flex flex-column"},[(0,n._)("p",null,"Commin soon...")],-1);function js(e,t,s,r,a,o){const l=(0,n.up)("metainfo");return(0,n.wg)(),(0,n.iD)(n.HY,null,[(0,n.Wm)(l,null,{title:(0,n.w5)((({content:e})=>[(0,n.Uk)((0,i.zw)(e),1)])),_:1}),Hs],64)}var zs={name:"SettingsPage",setup(){(0,T.jq)({title:"Settings",htmlAttrs:{lang:"en"}})},async created(){this.$store.commit("setCurrentUrl","settings")}};const As=(0,E.Z)(zs,[["render",js]]);var Ts=As;const Rs=[{path:"/",name:"HomePage",component:N},{path:"/signup",name:"SignupPage",component:oe},{path:"/login",name:"LoginPage",component:be},{path:"/logout",name:"LogoutPage",component:_e},{path:"/calendar",name:"CalendarPage",component:Pe},{path:"/workouts",name:"WorkoutsPage",component:lt},{path:"/workouts-exercises",name:"ExercisesPage",component:$t},{path:"/workouts-media",name:"MediaPage",component:Jt},{path:"/workouts-create-exercise",name:"CreateExercisePage",component:hs},{path:"/workouts-reminders",name:"RemindersWorkoutsPage",component:_s},{path:"/nutrition",name:"NutritionPage",component:Ps},{path:"/meditations",name:"MeditationsPage",component:Ss},{path:"/settings",name:"SettingsPage",component:Ts}],Ls=(0,S.p7)({history:(0,S.PO)("/"),routes:Rs});var Ns=Ls,Os=s(65);const Ms=(0,Os.MT)({state(){return{isLogged:!1,currentUrl:"",previousUrl:""}},mutations:{setLogged(e,t){e.isLogged=t},setCurrentUrl(e,t){e.previousUrl=e.currentUrl,e.currentUrl=t}}});var Is=Ms;const Ys=(0,r.ri)($);Ys.use(Is).use(Ns).use((0,T.Bg)()).mount("#app")}},t={};function s(r){var n=t[r];if(void 0!==n)return n.exports;var a=t[r]={exports:{}};return e[r].call(a.exports,a,a.exports,s),a.exports}s.m=e,function(){var e=[];s.O=function(t,r,n,a){if(!r){var o=1/0;for(c=0;c<e.length;c++){r=e[c][0],n=e[c][1],a=e[c][2];for(var i=!0,l=0;l<r.length;l++)(!1&a||o>=a)&&Object.keys(s.O).every((function(e){return s.O[e](r[l])}))?r.splice(l--,1):(i=!1,a<o&&(o=a));if(i){e.splice(c--,1);var u=n();void 0!==u&&(t=u)}}return t}a=a||0;for(var c=e.length;c>0&&e[c-1][2]>a;c--)e[c]=e[c-1];e[c]=[r,n,a]}}(),function(){s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,{a:t}),t}}(),function(){s.d=function(e,t){for(var r in t)s.o(t,r)&&!s.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}}(),function(){s.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={143:0};s.O.j=function(t){return 0===e[t]};var t=function(t,r){var n,a,o=r[0],i=r[1],l=r[2],u=0;if(o.some((function(t){return 0!==e[t]}))){for(n in i)s.o(i,n)&&(s.m[n]=i[n]);if(l)var c=l(s)}for(t&&t(r);u<o.length;u++)a=o[u],s.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return s.O(c)},r=self["webpackChunkfrontend"]=self["webpackChunkfrontend"]||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))}();var r=s.O(void 0,[998],(function(){return s(3345)}));r=s.O(r)})();
//# sourceMappingURL=app.70bd662c.js.map