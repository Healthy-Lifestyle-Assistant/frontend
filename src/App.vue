<template>
  <h2>Healthy Lifestyle App</h2>
  <p>Your assistant to track workouts and nutrition</p>
  
  <router-link to="/about">About</router-link> | 
  <router-link to="/hello">Hello</router-link> |
  <router-link to="/signup">Signup</router-link>
  <router-view></router-view>

  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <!-- <Hello message="Hello Endpoint"/> -->
</template>

 <!-- ============================================ -->
<script>
// import HelloWorld from './components/HelloWorld.vue';
// import Hello from './views/Hello.vue';
// import About from "./views/About.vue";

export default {
  name: 'App',
  // components: {
  //   HelloWorld,
  //   Hello,
  //   About
  // }
}
</script>

 <!-- ============================================ -->
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
