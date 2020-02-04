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
        <el-button type="primary" @click="onSubmit">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { registry } from "@/api/api.js";
export default {
  data() {
    return {
      form: {
        name: "",
        pwd: ""
      },
      show: false
    };
  },
  methods: {
    async onSubmit() {
      let { name, pwd } = this.form;
      let res = await registry({
        name,
        pwd
      });
      if (res.data.code == 1) {
        this.$router.go(-1);
      } else {
        this.$message(res.data.mes);
      }
    }
  }
};
</script>

<style scoped>
.login {
  display: flex;
  align-items: center;
  justify-content: center;
}
.active {
  color: red;
}
</style>