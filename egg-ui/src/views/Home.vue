<template>
  <div>
    <input placeholder="请输入用户名" v-model="name" />
    <input placeholder="请输入密码" v-model="pwd" />
    <button @click="login">登录</button>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      name: "",
      pwd: ""
    };
  },
  async created() {
   
  },
  methods: {
    async login() {
      let { name, pwd } = this;
      console.log(name, pwd);
       let res = await axios.post("/api/login",{name,pwd,'_csrf':document.cookie.split('=')[1]});
      //  let res = await axios.get("/api/list");
      console.log(res);
    }
  }
};
</script>
<style lang="">
</style>