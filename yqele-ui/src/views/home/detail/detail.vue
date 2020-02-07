<template>
  <div class="detail">
    <div class="left">
      <ul>
        <li v-for="(item,index) in list" :key="index" @click="changeTab(index)">
          {{item.file_name}}
        </li>
      </ul>
    </div>
    <div class="right">
      <button v-if="uid !== followid" @click="goToFollow">{{flag ? '已关注' :'关注作者'}}</button>
      <button @click="goToColl">收藏文档</button>
      <div>
        <h3>{{list[ind] && list[ind].file_name}}</h3>
        <p>{{list[ind] && list[ind].file_info}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { filedetail,followadd,colladd } from "@/api/api.js";
export default {
  data() {
    return {
      list: [],
      ind:0,
      followid:null,
      flag:false,
      fileid:null,
      uid:JSON.parse(window.localStorage.user).uid
    };
  },
  async created() {
    let { uid, kid,id } = this.$route.params; //点击的那一条上边的用户uid和kid
    this.followid = uid;  //文档作者的id
    this.fileid = id; //文章id
    let res = await filedetail({
      uid,
      know_id: kid
    });
    console.log(res);
    if (res.data.code == 1) {
      this.list = res.data.data;
      this.ind = this.list.findIndex(item => item.id == id)
    }
  },
  methods:{
    changeTab(ind){
      this.ind = ind;
    },
   async goToFollow(){
      //点击关注
      let res = await followadd({
        user_id: this.uid,
        follow_id: this.followid
      });
      console.log(res);
      if(res.data.code == 1){
        this.flag = true;
      }
    },
    async goToColl(){
      //点击收藏
      let res = await colladd({
        uid:this.uid,
        file_id:this.fileid
      });
      console.log(res);
    }
  }
};
</script>

<style scoped>
.detail {
  display: flex;
  height: 100%;
}
.left {
  border-right: 1px solid #ccc;
  height: 100%;
  width: 200px;
}
.right {
  height: 100%;
  flex: 1;
}
</style>