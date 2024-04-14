<template>
  <router-view >
    
  </router-view>
</template>

<script>
import { loginStore } from "../piniaStore";


export default {
  name: 'App',
  data()
  {
    return{
      store_login_data: loginStore(),

      is_login:false,
    }
  },
  components() {
  },
  mounted() {
    this.is_login = this.store_login_data.token ? true:false
    if(this.is_login)
    {
      this.$router.push('/dashboard');
      
    }
    else{
      this.$router.push('/login');
    }
    
  },
}
</script>

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
