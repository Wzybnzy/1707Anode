<template>
  <div class="addfile">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="名称">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addfile">新建文档</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {fileadd} from '@/api/api'
export default {
  data(){
    return {
      form:{
        title:'',
        desc:''
      }
    }
  },
  methods:{
   async addfile(){
     console.log(this.$route);
     let {kid,uid,isshow} = this.$route.params;
      //访问新建接口
      let res = await fileadd({
        file_name:this.form.title,  //文档名称
        file_info:this.form.desc,  //文档内容
        know_id:kid, //知识库id
        isshow:isshow+'', //文档是否可见
        uid:uid //用户Id
      });
      if(res.data.code ==1 ){
        //添加成功
        this.$router.push({name:'file'})
      }
      console.log(res);
    }
  }
};
</script>

<style scoped>
.addfile{
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>