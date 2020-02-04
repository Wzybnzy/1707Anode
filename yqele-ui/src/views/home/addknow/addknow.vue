<template>
  <div class="addknow">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="简介">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
       <el-form-item label="是否可见">
        <el-select v-model="form.region" placeholder="互联网是否可见">
          <el-option label="是" value="1"></el-option>
          <el-option label="否" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">添加知识库</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {addknow} from '@/api/api.js'
export default {
  data() {
    return {
      form: {
        name: "",
        region: "",
        desc: ""
      }
    };
  },
  methods: {
   async onSubmit() {
       let {name,region,desc} = this.form;
       let res = await  addknow({
           know_name:name,
           know_info:desc,
           isshow:region,
           uid:JSON.parse(window.localStorage.user).uid
       });
       if(res.data.code == 1){ //跳转到列表页
           this.$router.push({name:'know'});
       }
       console.log(res);
    }
  }
};
</script>
<style scoped>
.addknow{
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>