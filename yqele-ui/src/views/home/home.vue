<template>
  <div class="home">
    <el-container>
      <el-header>
        <div class="headerleft">
          <h3>语雀</h3>
          <div v-if="$route.meta.show">
            <el-input v-model="input" placeholder="请输入搜索内容"></el-input>
            <el-button type="primary" @click="goToSearch">搜索</el-button>
          </div>
        </div>
        <div class="headerright">
          <div @click="showmenu">+</div>
          <div>欢迎您：{{ name }}!</div>
          <span>退出</span>
        </div>
        <ul :class="['headermenu', !flag ? 'none' : '']">
          <li @click="showfile">新建文档</li>
          <li @click="goToknow">新建知识库</li>
        </ul>
        <el-dialog
          title="知识库列表"
          :visible.sync="dialogVisible"
          width="30%"
          :before-close="handleClose"
        >
          <div 
          v-for="(item,index) in list"
          @click="goToFile(item.id,item.isshow,item.uid)"
          :key="index">{{item.know_name}}</div>
        </el-dialog>
      </el-header>
      <router-view />
    </el-container>
  </div>
</template>

<script>
import {knowlist} from '@/api/api'
export default {
  data() {
    return {
      name: JSON.parse(window.localStorage.user).name,
      input: "",
      flag: false,
      dialogVisible: false,
      list:[]
    };
  },
  methods: {
    showmenu() {
      //点击头部的加号
      this.flag = !this.flag;
    },
    goToknow() {
      //点击新增知识库
      this.flag = false;
      this.$router.push({ name: "addknow" });
    },
   async showfile() {
     //新建文档
      this.dialogVisible= true;
      let res = await knowlist({uid:JSON.parse(window.localStorage.user).uid});
      console.log(res);
      if(res.data.code == 1){
        this.list = res.data.data;
      }
    },
    goToFile(kid,isshow,uid){
      //去新建文档
      this.flag = false;  // 隐藏新建
      this.dialogVisible= false; //隐藏弹框
      this.$router.push({name:'addfile',params:{kid,isshow,uid,flag:true}})
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    goToSearch(){
      //去搜索
      this.$router.push({name:'search',params:{search:this.input}})
    }
  }
};
</script>

<style>
.headermenu {
  position: absolute;
  right: 100px;
  top: 60px;
  background: #ccc;
  z-index: 999;
}
.none {
  display: none;
}
.headermenu > li {
  line-height: 36px;
}
.home,
section {
  height: 100%;
  width: 100%;
}
.el-header {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #409eff;
  color: #fff;
}
.headerleft,
.headerleft > div {
  display: flex;
}
h2 {
  margin: 0 10px;
}
.headerright {
  display: flex;
}
.headerright > div:nth-child(1) {
  height: 30px;
  width: 30px;
  line-height: 30px;
  border: 1px solid #ccc;
  text-align: center;
  border-radius: 100%;
}
</style>