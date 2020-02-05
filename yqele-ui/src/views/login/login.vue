<template>
  <div class="login">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
       <el-form-item label="密码">
        <el-input v-model="form.pwd"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">登录</el-button>
        <p :class="{'active':show}" @click="goToRegistry">注册</p>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {login} from '@/api/api.js'
export default {
  data(){
    return {
      form:{
        name:'',
        pwd:''
      },
      show:false
    }
  },
  methods:{
   async onSubmit(){
      let {name,pwd} = this.form;
      // let res = await axios.post('/api/login',{
      //   name,
      //   pwd
      // });
      let res = await login({name,pwd})
      if(res.data.code == 1){
        //登录成功
        this.$router.push({name:'file'});
        //存用户信息 res.data.data={uid:'',token:'',name:''}
        window.localStorage.user=JSON.stringify({...res.data.data,name});
      } else {
         this.show = true;
         this.$message(res.data.mes);
      }
      console.log(res)
    },
    goToRegistry(){
      this.$router.push({
        path:'/registry'
      });
    }
  }
};
</script>

<style scoped>
.login{
  display: flex;
  align-items: center;
  justify-content: center;
}
.active{
  color: red;
}
</style>