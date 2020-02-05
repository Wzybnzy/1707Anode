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
        <el-button type="primary" @click="onSubmit">{{!id?'添加知识库':'编辑知识库'}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addknow, knowupdate } from "@/api/api.js";
export default {
  data() {
    return {
      form: {
        name: "",
        region: "1",
        desc: ""
      },
      id: null,
      uid: null
    };
  },
  created() {
    let { id, uid, isshow, know_name, know_info } = this.$route.params;
    //回显
    this.form = {
      name: know_name,
      region: isshow ? isshow + "" : '1',
      desc: know_info
    };
    this.id = id ? id : null;
    this.uid = uid ? uid : null;
  },
  methods: {
    async onSubmit() {
      //既有添加的又有编辑的，怎么判断是添加还是编辑？编辑需要什么字段？
      let { name, region, desc } = this.form;

      //编辑还需要一个uid,id
      let {id} = this;
      if (!id) {
        //添加
        let res = await addknow({
          know_name: name,
          know_info: desc,
          isshow: region,
          uid: JSON.parse(window.localStorage.user).uid
        });
        if (res.data.code == 1) {
          //跳转到列表页
          this.$router.push({ name: "know" });
        }
        console.log(res);
      } else {
        //编辑
        let res = await knowupdate({
          know_name: name,
          know_info: desc,
          isshow: region,
          uid: this.uid,
          id: this.id
        });
        if (res.data.code == 1) {
          this.$message("编辑成功");
          this.$router.push({name:'know'})
        }
      }
    }
  }
};
</script>
<style scoped>
.addknow {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>