(function(){"use strict";var e={1560:function(e,t,s){var n=s(9242),r=s(3396),a=s(7139);const o={class:"navbar navbar-expand-lg bg-primary mb-5","data-bs-theme":"dark"},i={class:"container-fluid"},l=(0,r._)("button",{class:"navbar-toggler",type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbarSupportedContent","aria-controls":"navbarSupportedContent","aria-expanded":"false","aria-label":"Toggle navigation"},[(0,r._)("span",{class:"navbar-toggler-icon"})],-1),u={class:"collapse navbar-collapse",id:"navbarSupportedContent"},c={class:"navbar-nav me-auto mb-2 mb-lg-0"},m={class:"nav-item"},d={class:"nav-item"},p={class:"nav-item"},g={class:"nav-item"},f={key:0,class:"d-flex align-items-center"},h={key:1,class:"d-flex align-items-center"},w={class:"container"};function b(e,t,s,n,b,y){const v=(0,r.up)("router-link"),k=(0,r.up)("router-view");return(0,r.wg)(),(0,r.iD)(r.HY,null,[(0,r._)("nav",o,[(0,r._)("div",i,[(0,r.Wm)(v,{to:"/",class:"navbar-brand me-4"},{default:(0,r.w5)((()=>[(0,r.Uk)("Healthy Lifestyle")])),_:1}),l,(0,r._)("div",u,[(0,r._)("ul",c,[(0,r._)("li",m,[(0,r.Wm)(v,{to:"/calendar",class:(0,a.C_)({"nav-link":!0,active:y.isCalendar})},{default:(0,r.w5)((()=>[(0,r.Uk)("Calendar")])),_:1},8,["class"])]),(0,r._)("li",d,[(0,r.Wm)(v,{to:"/workouts",class:(0,a.C_)({"nav-link":!0,active:y.isWorkouts})},{default:(0,r.w5)((()=>[(0,r.Uk)("Workouts")])),_:1},8,["class"])]),(0,r._)("li",p,[(0,r.Wm)(v,{to:"/nutrition",class:(0,a.C_)({"nav-link":!0,active:y.isNutrition})},{default:(0,r.w5)((()=>[(0,r.Uk)("Nutrition")])),_:1},8,["class"])]),(0,r._)("li",g,[(0,r.Wm)(v,{to:"/meditations",class:(0,a.C_)({"nav-link":!0,active:y.isMeditations})},{default:(0,r.w5)((()=>[(0,r.Uk)("Meditations")])),_:1},8,["class"])])]),y.isLogged?((0,r.wg)(),(0,r.iD)("div",f,[(0,r.Wm)(v,{to:"/settings-menu",class:"btn btn-light me-2",role:"button"},{default:(0,r.w5)((()=>[(0,r.Uk)("Settings")])),_:1}),(0,r.Wm)(v,{to:"/logout",class:"btn btn-light me-2",role:"button"},{default:(0,r.w5)((()=>[(0,r.Uk)("Logout")])),_:1})])):((0,r.wg)(),(0,r.iD)("div",h,[(0,r.Wm)(v,{to:"/login",class:"btn btn-light me-2",role:"button"},{default:(0,r.w5)((()=>[(0,r.Uk)("Login")])),_:1}),(0,r.Wm)(v,{to:"/signup",class:"btn btn-light me-2",role:"button"},{default:(0,r.w5)((()=>[(0,r.Uk)("Sign-Up")])),_:1})]))])])]),(0,r._)("div",w,[(0,r.Wm)(k)])],64)}var y={name:"App",computed:{isLogged(){return this.$store.state.isLogged},getCurrentUrl(){return this.$store.state.currentUrl},getPreviousUrl(){return this.$store.state.previousUrl},isCalendar(){return this.$store.state.currentUrl.includes("calendar")},isWorkouts(){return this.$store.state.currentUrl.includes("workouts")},isNutrition(){return this.$store.state.currentUrl.includes("nutrition")},isMeditations(){return this.$store.state.currentUrl.includes("meditations")}}},v=s(89);const k=(0,v.Z)(y,[["render",b]]);var _=k,x=s(678);const U={class:"d-flex flex-column mb-5",style:{width:"90%"}},C=(0,r._)("h3",{class:"mb-4"},"Maintain Habits For Your Health",-1),P=(0,r._)("p",{class:"lead mb-5"},[(0,r.Uk)(" Healthy Lifestyle Assistant is a Ukrainian non-profit startup promoting a healthy lifestyle using digital technologies. Our web application helps people maintain good habits like workouts, nutrition, and mental health activities. "),(0,r._)("br"),(0,r._)("br"),(0,r.Uk)(" A healthy lifestyle is a way of living that lowers the risk of being seriously ill or dying early. Not all diseases are preventable, but a large portion of deaths, particularly those from coronary heart disease and lung cancer, can be avoided. Scientific studies have identified certain types of behavior that contribute to the development of noncommunicable diseases and early death. Health is not just about avoiding disease. It’s also about physical, mental and social wellbeing. When a healthy lifestyle is adopted, a more positive model is provided for other people in the family, particularly children. "),(0,r._)("br"),(0,r._)("br"),(0,r.Uk)(" Web application aims to support people to change their behavior and improve their health in order to live healthier, longer lives. ")],-1);function W(e,t,s,n,o,i){const l=(0,r.up)("metainfo"),u=(0,r.up)("router-link");return(0,r.wg)(),(0,r.iD)(r.HY,null,[(0,r.Wm)(l,null,{title:(0,r.w5)((({content:e})=>[(0,r.Uk)((0,a.zw)(e),1)])),_:1}),(0,r._)("div",U,[C,P,(0,r._)("div",null,[(0,r.Wm)(u,{to:"/signup",class:"btn btn-primary",role:"button"},{default:(0,r.w5)((()=>[(0,r.Uk)("Try Development Version")])),_:1})])])],64)}var D=s(9590),S={name:"HomePage",setup(){(0,D.jq)({title:"Healthy - Home",htmlAttrs:{lang:"en"}})},async created(){this.$store.commit("setCurrentUrl","/")},computed:{isLogged(){return this.$store.state.isLogged}}};const E=(0,v.Z)(S,[["render",W]]);var q=E;const H={class:"d-flex justify-content-center"},$={class:"mb-3"},j=(0,r._)("label",{for:"username",class:"form-label"},"Username",-1),A={class:"mb-3"},L=(0,r._)("label",{for:"email",class:"form-label"},"Email",-1),z={class:"mb-3"},T=(0,r._)("label",{for:"fullName",class:"form-label"},"Full name",-1),O={class:"mb-3"},M=(0,r._)("label",{for:"password",class:"form-label"},"Password",-1),N={class:"mb-3"},Y=(0,r._)("label",{for:"confirmPassword",class:"form-label"},"Confirm password",-1),Z=(0,r._)("button",{type:"submit",class:"btn btn-primary mt-4"},"Sign Up",-1);function V(e,t,s,o,i,l){const u=(0,r.up)("metainfo");return(0,r.wg)(),(0,r.iD)(r.HY,null,[(0,r.Wm)(u,null,{title:(0,r.w5)((({content:e})=>[(0,r.Uk)((0,a.zw)(e),1)])),_:1}),(0,r._)("div",H,[(0,r._)("form",{onSubmit:t[5]||(t[5]=(0,n.iM)(((...e)=>l.submitForm&&l.submitForm(...e)),["prevent"])),style:{width:"fit-content"}},[(0,r._)("div",$,[j,(0,r.wy)((0,r._)("input",{type:"text",class:"form-control",id:"username","onUpdate:modelValue":t[0]||(t[0]=e=>i.username=e),required:""},null,512),[[n.nr,i.username]])]),(0,r._)("div",A,[L,(0,r.wy)((0,r._)("input",{type:"email",class:"form-control",id:"email","onUpdate:modelValue":t[1]||(t[1]=e=>i.email=e),required:""},null,512),[[n.nr,i.email]])]),(0,r._)("div",z,[T,(0,r.wy)((0,r._)("input",{type:"text",class:"form-control",id:"fullName","onUpdate:modelValue":t[2]||(t[2]=e=>i.fullName=e),required:""},null,512),[[n.nr,i.fullName]])]),(0,r._)("div",O,[M,(0,r.wy)((0,r._)("input",{type:"password",class:"form-control",id:"password","onUpdate:modelValue":t[3]||(t[3]=e=>i.password=e),required:""},null,512),[[n.nr,i.password]])]),(0,r._)("div",N,[Y,(0,r.wy)((0,r._)("input",{type:"password",class:"form-control",id:"confirmPassword","onUpdate:modelValue":t[4]||(t[4]=e=>i.confirmPassword=e),required:""},null,512),[[n.nr,i.confirmPassword]])]),Z],32),i.message?((0,r.wg)(),(0,r.iD)("p",{key:0,class:(0,a.C_)({"success-message":l.isSuccess,"error-message":l.isError})},(0,a.zw)(i.message),3)):(0,r.kq)("",!0)])],64)}var F={name:"SignupPage",setup(){(0,D.jq)({title:"Healthy - Signup",htmlAttrs:{lang:"en"}})},data(){return{username:"",email:"",fullName:"",password:"",confirmPassword:"",message:""}},async created(){this.$store.commit("setCurrentUrl","/signup")},computed:{isSuccess(){return this.message.includes("success")},isError(){return this.message.includes("error")}},methods:{async submitForm(){const e={username:this.username,email:this.email,fullName:this.fullName,password:this.password,confirmPassword:this.confirmPassword};try{const t=await this.signupApi(e);201===t.status?this.message="Signup successful! Now you can login to your account":this.message="An error occurred while signing up. Try again"}catch(t){this.message="An error occurred while signing up. Try again"}},async signupApi(e){const t=await fetch("/api/v1/users/auth/signup",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}),s=await t.json();return{status:t.status,body:s}}}};const R=(0,v.Z)(F,[["render",V]]);var B=R;const I={class:"d-flex justify-content-center"},K={class:"mb-3"},G=(0,r._)("label",{for:"usernameOrEmail",class:"form-label"},"Username or email",-1),J={class:"mb-3"},Q=(0,r._)("label",{for:"password",class:"form-label"},"Password",-1),X={class:"mb-3"},ee=(0,r._)("label",{for:"confirmPassword",class:"form-label"},"Confirm password",-1),te=(0,r._)("button",{type:"submit",class:"btn btn-primary mt-4"},"Login",-1);function se(e,t,s,o,i,l){const u=(0,r.up)("metainfo");return(0,r.wg)(),(0,r.iD)(r.HY,null,[(0,r.Wm)(u,null,{title:(0,r.w5)((({content:e})=>[(0,r.Uk)((0,a.zw)(e),1)])),_:1}),(0,r._)("div",I,[(0,r._)("form",{onSubmit:t[3]||(t[3]=(0,n.iM)(((...e)=>l.submitForm&&l.submitForm(...e)),["prevent"])),style:{width:"fit-content"}},[(0,r._)("div",K,[G,(0,r.wy)((0,r._)("input",{type:"text",class:"form-control",id:"usernameOrEmail","onUpdate:modelValue":t[0]||(t[0]=e=>i.usernameOrEmail=e),required:""},null,512),[[n.nr,i.usernameOrEmail]])]),(0,r._)("div",J,[Q,(0,r.wy)((0,r._)("input",{type:"password",class:"form-control",id:"password","onUpdate:modelValue":t[1]||(t[1]=e=>i.password=e),required:""},null,512),[[n.nr,i.password]])]),(0,r._)("div",X,[ee,(0,r.wy)((0,r._)("input",{type:"password",class:"form-control",id:"confirmPassword","onUpdate:modelValue":t[2]||(t[2]=e=>i.confirmPassword=e),required:""},null,512),[[n.nr,i.confirmPassword]])]),te],32),i.message?((0,r.wg)(),(0,r.iD)("p",{key:0,class:(0,a.C_)({"success-message":l.isSuccess,"error-message":l.isError})},(0,a.zw)(i.message),3)):(0,r.kq)("",!0)])],64)}s(7658);var ne={name:"LoginPage",setup(){(0,D.jq)({title:"Healthy - Login",htmlAttrs:{lang:"en"}})},data(){return{usernameOrEmail:"",password:"",confirmPassword:"",message:""}},async created(){this.$store.commit("setCurrentUrl","/login")},computed:{isSuccess(){return this.message.includes("success")},isError(){return this.message.includes("error")}},methods:{async submitForm(){const e={usernameOrEmail:this.usernameOrEmail,password:this.password,confirmPassword:this.confirmPassword};try{const t=await this.loginApi(e);200===t.status?(localStorage.setItem("token",JSON.stringify(t.body.token).slice(1,-1)),this.$store.commit("setLogged",!0),this.message="Login successful",this.$router.push(this.$store.state.previousUrl)):this.message="An error occurred while signing up. Try again"}catch(t){this.message="An error occurred while signing up. Try again"}},async loginApi(e){const t=await fetch("/api/v1/users/auth/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}),s=await t.json();return{status:t.status,body:s}}}};const re=(0,v.Z)(ne,[["render",se]]);var ae=re;function oe(e,t,s,n,a,o){return(0,r.wg)(),(0,r.iD)("div")}var ie={name:"LogoutPage",created(){this.$store.commit("setCurrentUrl","/login"),localStorage.removeItem("token"),this.$store.commit("setLogged",!1),this.$router.push("/login")}};const le=(0,v.Z)(ie,[["render",oe]]);var ue=le;const ce=(0,r._)("div",{class:"d-flex flex-column"},[(0,r._)("p",null,"Comming soon...")],-1);function me(e,t,s,n,o,i){const l=(0,r.up)("metainfo");return(0,r.wg)(),(0,r.iD)(r.HY,null,[(0,r.Wm)(l,null,{title:(0,r.w5)((({content:e})=>[(0,r.Uk)((0,a.zw)(e),1)])),_:1}),ce],64)}var de={name:"CalendarPage",setup(){(0,D.jq)({title:"Healthy - Calendar",htmlAttrs:{lang:"en"}})},async created(){this.$store.commit("setCurrentUrl","calendar")}};const pe=(0,v.Z)(de,[["render",me]]);var ge=pe;const fe={class:"d-flex flex-column align-items-start"},he={class:"d-flex"},we=(0,r._)("br",null,null,-1),be=(0,r._)("br",null,null,-1),ye={key:0,class:"d-flex flex-wrap"};function ve(e,t,s,n,o,i){const l=(0,r.up)("metainfo"),u=(0,r.up)("router-link"),c=(0,r.up)("WorkoutComponent");return(0,r.wg)(),(0,r.iD)(r.HY,null,[(0,r.Wm)(l,null,{title:(0,r.w5)((({content:e})=>[(0,r.Uk)((0,a.zw)(e),1)])),_:1}),(0,r._)("div",fe,[(0,r._)("div",he,[(0,r.Wm)(u,{to:"",class:"btn btn-primary me-4",role:"button"},{default:(0,r.w5)((()=>[(0,r.Uk)("Create Custom Workout")])),_:1}),(0,r.Wm)(u,{to:"/workouts-exercises",class:"btn btn-primary me-4",role:"button"},{default:(0,r.w5)((()=>[(0,r.Uk)("Exercises")])),_:1}),(0,r.Wm)(u,{to:"",class:"btn btn-primary me-4",role:"button"},{default:(0,r.w5)((()=>[(0,r.Uk)("Reminders")])),_:1}),(0,r.Wm)(u,{to:"/workouts-media",class:"btn btn-primary me-4",role:"button"},{default:(0,r.w5)((()=>[(0,r.Uk)("Media")])),_:1})]),we,be,o.workouts?((0,r.wg)(),(0,r.iD)("div",ye,[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(o.workouts,(e=>((0,r.wg)(),(0,r.iD)("div",{key:e.id},[(0,r.Wm)(c,{title:e.title,description:e.description,bodyParts:e.bodyParts,custom:e.custom,needsEquipment:e.needsEquipment,exercises:e.exercises},null,8,["title","description","bodyParts","custom","needsEquipment","exercises"])])))),128))])):(0,r.kq)("",!0)])],64)}const ke={class:"card me-4 mb-4",style:{width:"26rem"}},_e={class:"card-body"},xe={class:"card-title"},Ue={class:"card-subtitle mb-2 text-body-secondary"},Ce={class:"card-text"},Pe={key:0,class:"card-text mb-2"},We={key:1,class:"card-text mb-2"},De={class:"d-flex justify-content-end"};function Se(e,t,s,n,o,i){const l=(0,r.up)("router-link");return(0,r.wg)(),(0,r.iD)("div",ke,[(0,r._)("div",_e,[(0,r._)("h5",xe,(0,a.zw)(s.title),1),(0,r._)("h6",Ue,(0,a.zw)(s.custom?"Custom":"Default")+", "+(0,a.zw)(s.needsEquipment?"With Equipment":"Without Equipment"),1),(0,r._)("p",Ce,(0,a.zw)(s.description),1),s.bodyParts?((0,r.wg)(),(0,r.iD)("div",Pe,[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(s.bodyParts,(e=>((0,r.wg)(),(0,r.iD)("span",{key:e.id},[(0,r._)("small",null,(0,a.zw)(e.name.toLowerCase()),1),(0,r.Uk)(" ")])))),128))])):(0,r.kq)("",!0),s.exercises?((0,r.wg)(),(0,r.iD)("div",We,[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(s.exercises,(e=>((0,r.wg)(),(0,r.iD)("span",{key:e.id},[(0,r.Wm)(l,{to:"/workouts-exercises"},{default:(0,r.w5)((()=>[(0,r.Uk)((0,a.zw)(e.title),1)])),_:2},1024),(0,r.Uk)("  ")])))),128))])):(0,r.kq)("",!0),(0,r._)("div",De,[(0,r.Wm)(l,{to:"/workouts",class:"btn btn-primary"},{default:(0,r.w5)((()=>[(0,r.Uk)("Details")])),_:1})])])])}var Ee={name:"WorkoutComponent",props:{id:Number,title:String,description:String,custom:Boolean,needsEquipment:Boolean,bodyParts:Array,exercises:Array}};const qe=(0,v.Z)(Ee,[["render",Se]]);var He=qe,$e={name:"WorkoutsPage",setup(){(0,D.jq)({title:"Healthy - Workouts",htmlAttrs:{lang:"en"}})},data(){return{workouts:null,message:""}},async created(){this.$store.commit("setCurrentUrl","/workouts");const e=await this.validateToken();if(e)this.$store.commit("setLogged",!0);else try{this.$store.commit("setLogged",!1);const e=await this.getDefaultWorkouts();200===e.status?this.workouts=e.body:401===e.status?this.$router.push("/login"):this.message=`Unexpected response status (${e.status})`}catch(t){this.message="An error occurred"}},components:{WorkoutComponent:He},methods:{async validateToken(){localStorage.getItem("token");return!1},async getDefaultWorkouts(){let e="/api/v1/workouts/default";const t=await fetch(e,{method:"GET",headers:{"Content-Type":"application/json"}}),s=await t.json();return{status:t.status,body:s}}}};const je=(0,v.Z)($e,[["render",ve]]);var Ae=je;const Le={class:"d-flex flex-column align-items-start"},ze={class:"d-flex"},Te=(0,r._)("br",null,null,-1),Oe=(0,r._)("br",null,null,-1),Me={key:0,class:"d-flex flex-wrap"};function Ne(e,t,s,n,o,i){const l=(0,r.up)("metainfo"),u=(0,r.up)("router-link"),c=(0,r.up)("ExerciseComponent");return(0,r.wg)(),(0,r.iD)(r.HY,null,[(0,r.Wm)(l,null,{title:(0,r.w5)((({content:e})=>[(0,r.Uk)((0,a.zw)(e),1)])),_:1}),(0,r._)("div",Le,[(0,r._)("div",ze,[(0,r.Wm)(u,{to:"/workouts",class:"btn btn-primary me-4",role:"button"},{default:(0,r.w5)((()=>[(0,r.Uk)("Add Custom Exercise")])),_:1}),(0,r.Wm)(u,{to:"/workouts-media",class:"btn btn-primary me-4",role:"button"},{default:(0,r.w5)((()=>[(0,r.Uk)("Media")])),_:1})]),Te,Oe,o.exercises?((0,r.wg)(),(0,r.iD)("div",Me,[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(o.exercises,(e=>((0,r.wg)(),(0,r.iD)("div",{key:e.id},[(0,r.Wm)(c,{title:e.title,description:e.description,bodyParts:e.bodyParts,isCustom:e.custom,needsEquipment:e.needsEquipment},null,8,["title","description","bodyParts","isCustom","needsEquipment"])])))),128))])):(0,r.kq)("",!0)]),o.message?((0,r.wg)(),(0,r.iD)("p",{key:0,class:(0,a.C_)({"success-message":i.isSuccess,"error-message":i.isError})},(0,a.zw)(o.message),3)):(0,r.kq)("",!0)],64)}const Ye={class:"card me-4 mb-4",style:{"min-width":"26rem"}},Ze={class:"card-body"},Ve={class:"card-title"},Fe={class:"card-subtitle mb-2 text-body-secondary"},Re={class:"card-text"},Be={key:0,class:"card-text mb-2"},Ie={class:"d-flex justify-content-end"};function Ke(e,t,s,n,o,i){const l=(0,r.up)("router-link");return(0,r.wg)(),(0,r.iD)("div",Ye,[(0,r._)("div",Ze,[(0,r._)("h5",Ve,(0,a.zw)(s.title),1),(0,r._)("h6",Fe,(0,a.zw)(s.isCustom?"Custom":"Default")+", "+(0,a.zw)(s.needsEquipment?"With Equipment":"Without Equipment"),1),(0,r._)("p",Re,(0,a.zw)(s.description),1),s.bodyParts?((0,r.wg)(),(0,r.iD)("div",Be,[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(s.bodyParts,(e=>((0,r.wg)(),(0,r.iD)("span",{key:e.id},[(0,r._)("small",null,(0,a.zw)(e.name.toLowerCase()),1),(0,r.Uk)(" ")])))),128))])):(0,r.kq)("",!0),(0,r._)("div",Ie,[(0,r.Wm)(l,{to:"/workouts-exercises",class:"btn btn-primary"},{default:(0,r.w5)((()=>[(0,r.Uk)("Details")])),_:1})])])])}var Ge={name:"ExerciseComponent",props:{id:Number,title:String,description:String,bodyParts:Array,isCustom:Boolean,needsEquipment:Boolean}};const Je=(0,v.Z)(Ge,[["render",Ke]]);var Qe=Je,Xe={name:"ExercisesPage",setup(){(0,D.jq)({title:"Healthy - Exercises",htmlAttrs:{lang:"en"}})},data(){return{exercises:null,message:""}},components:{ExerciseComponent:Qe},async created(){this.$store.commit("setCurrentUrl","/workouts-exercises");const e=await this.validateToken();if(e)this.$store.commit("setLogged",!0);else try{this.$store.commit("setLogged",!1);const e=await this.getDefaultExercises();200===e.status?this.exercises=e.body:401===e.status?this.$router.push("/login"):this.message=`Unexpected response status (${e.status})`}catch(t){this.message="An error occurred"}},computed:{isSuccess(){return this.message.includes("success")},isError(){return this.message.includes("error")}},methods:{async validateToken(){localStorage.getItem("token");return!1},async getDefaultExercises(){let e="/api/v1/workouts/exercises/default";const t=await fetch(e,{method:"GET",headers:{"Content-Type":"application/json"}}),s=await t.json();return{status:t.status,body:s}}}};const et=(0,v.Z)(Xe,[["render",Ne]]);var tt=et;const st={class:"d-flex flex-column align-items-start"},nt={class:"d-flex"},rt=(0,r._)("br",null,null,-1),at=(0,r._)("br",null,null,-1),ot={key:0,class:"d-flex flex-wrap"};function it(e,t,s,n,o,i){const l=(0,r.up)("metainfo"),u=(0,r.up)("router-link"),c=(0,r.up)("MediaComponent");return(0,r.wg)(),(0,r.iD)(r.HY,null,[(0,r.Wm)(l,null,{title:(0,r.w5)((({content:e})=>[(0,r.Uk)((0,a.zw)(e),1)])),_:1}),(0,r._)("div",st,[(0,r._)("div",nt,[(0,r.Wm)(u,{to:"/workouts-media",class:"btn btn-primary me-4",role:"button"},{default:(0,r.w5)((()=>[(0,r.Uk)("Add Custom Media")])),_:1})]),rt,at,o.elements?((0,r.wg)(),(0,r.iD)("div",ot,[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(o.elements,(e=>((0,r.wg)(),(0,r.iD)("div",{key:e.id},[(0,r.Wm)(c,{name:e.name,description:e.description,isCustom:e.custom,httpRef:e.ref},null,8,["name","description","isCustom","httpRef"])])))),128))])):(0,r.kq)("",!0)]),o.message?((0,r.wg)(),(0,r.iD)("p",{key:0,class:(0,a.C_)({"success-message":i.isSuccess,"error-message":i.isError})},(0,a.zw)(o.message),3)):(0,r.kq)("",!0)],64)}const lt={class:"card me-4 mb-4",style:{"min-width":"26rem"}},ut={class:"card-body"},ct={class:"card-title"},mt={class:"card-subtitle mb-2 text-body-secondary"},dt={class:"card-text"},pt={class:"d-flex justify-content-end"},gt=["href"];function ft(e,t,s,n,o,i){return(0,r.wg)(),(0,r.iD)("div",lt,[(0,r._)("div",ut,[(0,r._)("h5",ct,(0,a.zw)(s.name),1),(0,r._)("h6",mt,(0,a.zw)(s.isCustom?"Custom":"Default"),1),(0,r._)("p",dt,(0,a.zw)(s.description),1),(0,r._)("div",pt,[(0,r._)("a",{href:s.httpRef,class:"btn btn-primary",target:"_blank"},"Visit Media",8,gt)])])])}var ht={name:"ExerciseComponent",props:{id:Number,name:String,httpRef:String,description:String,isCustom:Boolean}};const wt=(0,v.Z)(ht,[["render",ft]]);var bt=wt,yt={name:"MediaPage",setup(){(0,D.jq)({title:"Healthy - Media",htmlAttrs:{lang:"en"}})},data(){return{elements:null,message:""}},components:{MediaComponent:bt},async created(){this.$store.commit("setCurrentUrl","/workouts-media");const e=await this.validateToken();if(e)this.$store.commit("setLogged",!0);else try{this.$store.commit("setLogged",!1);const e=await this.getDefaultHttpRefs();200===e.status?this.elements=e.body:401===e.status?this.$router.push("/login"):this.message=`Unexpected response status (${e.status})`}catch(t){this.message="An error occurred while signing up. Try again"}},computed:{isSuccess(){return this.message.includes("success")},isError(){return this.message.includes("error")}},methods:{async validateToken(){localStorage.getItem("token");return!1},async getDefaultHttpRefs(){let e="/api/v1/workouts/httpRefs/default";const t=await fetch(e,{method:"GET",headers:{"Content-Type":"application/json"}}),s=await t.json();return{status:t.status,body:s}}}};const vt=(0,v.Z)(yt,[["render",it]]);var kt=vt;const _t=(0,r._)("div",{class:"d-flex"},[(0,r._)("p",null,"Comming soon...")],-1);function xt(e,t,s,n,o,i){const l=(0,r.up)("metainfo");return(0,r.wg)(),(0,r.iD)(r.HY,null,[(0,r.Wm)(l,null,{title:(0,r.w5)((({content:e})=>[(0,r.Uk)((0,a.zw)(e),1)])),_:1}),_t],64)}var Ut={name:"NutritionPage",setup(){(0,D.jq)({title:"Healthy - Nutrition",htmlAttrs:{lang:"en"}})},async created(){this.$store.commit("setCurrentUrl","nutrition")}};const Ct=(0,v.Z)(Ut,[["render",xt]]);var Pt=Ct;const Wt=(0,r._)("div",{class:"d-flex"},[(0,r._)("p",null,"Comming soon...")],-1);function Dt(e,t,s,n,o,i){const l=(0,r.up)("metainfo");return(0,r.wg)(),(0,r.iD)(r.HY,null,[(0,r.Wm)(l,null,{title:(0,r.w5)((({content:e})=>[(0,r.Uk)((0,a.zw)(e),1)])),_:1}),Wt],64)}var St={name:"MeditationsPage",setup(){(0,D.jq)({title:"Healthy - Meditations",htmlAttrs:{lang:"en"}})},async created(){this.$store.commit("setCurrentUrl","meditations")}};const Et=(0,v.Z)(St,[["render",Dt]]);var qt=Et;const Ht=(0,r._)("div",{class:"d-flex flex-column"},[(0,r._)("p",null,"Commin soon...")],-1);function $t(e,t,s,n,o,i){const l=(0,r.up)("metainfo");return(0,r.wg)(),(0,r.iD)(r.HY,null,[(0,r.Wm)(l,null,{title:(0,r.w5)((({content:e})=>[(0,r.Uk)((0,a.zw)(e),1)])),_:1}),Ht],64)}var jt={name:"SettingsPage",setup(){(0,D.jq)({title:"Settings",htmlAttrs:{lang:"en"}})},async created(){this.$store.commit("setCurrentUrl","settings")}};const At=(0,v.Z)(jt,[["render",$t]]);var Lt=At;const zt=[{path:"/",name:"HomePage",component:q},{path:"/signup",name:"SignupPage",component:B},{path:"/login",name:"LoginPage",component:ae},{path:"/logout",name:"LogoutPage",component:ue},{path:"/calendar",name:"CalendarPage",component:ge},{path:"/workouts",name:"WorkoutsPage",component:Ae},{path:"/workouts-exercises",name:"ExercisesPage",component:tt},{path:"/workouts-media",name:"MediaPage",component:kt},{path:"/nutrition",name:"NutritionPage",component:Pt},{path:"/meditations",name:"MeditationsPage",component:qt},{path:"/settings",name:"SettingsPage",component:Lt}],Tt=(0,x.p7)({history:(0,x.PO)("/"),routes:zt});var Ot=Tt,Mt=s(65);const Nt=(0,Mt.MT)({state(){return{isLogged:!1,currentUrl:"",previousUrl:""}},mutations:{setLogged(e,t){e.isLogged=t},setCurrentUrl(e,t){e.previousUrl=e.currentUrl,e.currentUrl=t}}});var Yt=Nt;s(5654);const Zt=(0,n.ri)(_);Zt.use(Yt).use(Ot).use((0,D.Bg)()).mount("#app")}},t={};function s(n){var r=t[n];if(void 0!==r)return r.exports;var a=t[n]={exports:{}};return e[n].call(a.exports,a,a.exports,s),a.exports}s.m=e,function(){var e=[];s.O=function(t,n,r,a){if(!n){var o=1/0;for(c=0;c<e.length;c++){n=e[c][0],r=e[c][1],a=e[c][2];for(var i=!0,l=0;l<n.length;l++)(!1&a||o>=a)&&Object.keys(s.O).every((function(e){return s.O[e](n[l])}))?n.splice(l--,1):(i=!1,a<o&&(o=a));if(i){e.splice(c--,1);var u=r();void 0!==u&&(t=u)}}return t}a=a||0;for(var c=e.length;c>0&&e[c-1][2]>a;c--)e[c]=e[c-1];e[c]=[n,r,a]}}(),function(){s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,{a:t}),t}}(),function(){s.d=function(e,t){for(var n in t)s.o(t,n)&&!s.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}}(),function(){s.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){var e={143:0};s.O.j=function(t){return 0===e[t]};var t=function(t,n){var r,a,o=n[0],i=n[1],l=n[2],u=0;if(o.some((function(t){return 0!==e[t]}))){for(r in i)s.o(i,r)&&(s.m[r]=i[r]);if(l)var c=l(s)}for(t&&t(n);u<o.length;u++)a=o[u],s.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return s.O(c)},n=self["webpackChunkfrontend"]=self["webpackChunkfrontend"]||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}();var n=s.O(void 0,[998],(function(){return s(1560)}));n=s.O(n)})();
//# sourceMappingURL=app.54f2f6bf.js.map