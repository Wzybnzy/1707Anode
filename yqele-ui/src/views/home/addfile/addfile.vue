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
        <el-button type="primary" @click="addfile">{{flag ? '新建文档' :'编辑文档'}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { fileadd, fileupdate } from "@/api/api";
export default {
  data() {
    return {
      form: {
        title: "",
        desc: ""
      },
      flag:true
    };
  },
  created() {
    console.log(this.$route);
    let { file_name, file_info,flag } = this.$route.params;
    this.form = {
      title: file_name,
      desc: file_info
    };
    this.flag = flag;
  },
  methods: {
    async addfile() {
      console.log(this.$route);
      //判断点击的是新增还是编辑？

      let { kid, uid, isshow, flag,id } = this.$route.params;
      if (flag) {
        //访问新建接口
        let res = await fileadd({
          file_name: this.form.title, //文档名称
          file_info: this.form.desc, //文档内容
          know_id: kid, //知识库id
          isshow: isshow + "", //文档是否可见
          uid: uid //用户Id
        });
        if (res.data.code == 1) {
          //添加成功
          this.$router.push({ name: "file" });
        }
        console.log(res);
      } else {
        //编辑
        let res = await fileupdate({
          file_name:this.form.title,
          file_info:this.form.desc,
          id, //文档id
          uid
        });
        if(res.data.code == 1){ 
          //编辑成功
          this.$router.push({name:'file'})
        }
      }
    }
  }
};
</script>

<style scoped>
.addfile {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>