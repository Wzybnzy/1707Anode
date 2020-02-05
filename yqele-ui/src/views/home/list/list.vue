<template>
  <el-container>
    <el-aside width="200px">
      <el-row class="tac">
        <el-col :span="12">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
          >
            <el-menu-item 
            :index="index+''" 
            v-for="(item,index) in menuArr" 
            @click="changeTab(item.url)"
            :key="index">
              <i :class="item.icon"></i>
              <span slot="title">{{item.txt}}</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </el-aside>
    <el-main>
        <router-view/>

    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
        menuArr:[
            {
                txt:'文档',
                icon:'el-icon-menu',
                url:'file'
            },
            {
                txt:'知识库',
                icon:'el-icon-document',
                url:'know'
            }
        ]
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    changeTab(url){
        console.log(url,'&&&&&&&&&');
        this.$router.push({name:url})
    }
  }
};
</script>

<style scoped>
.el-row{
  height: 100%;
}
.el-col-12{
  width: 100%;
  height: 100%;;
}
.el-col-12>ul{
  height: 100%;
}
</style>