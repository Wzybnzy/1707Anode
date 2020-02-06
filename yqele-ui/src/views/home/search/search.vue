<template>
  <div>
      <ul>
        <li v-for="(item,index) in list" :key="index" @click="goToDeatil(item.uid,item.know_id)">
           <h3>{{item.file_name}}</h3>
           <p>{{item.file_info}}</p>
        </li>
      </ul>
  </div>
</template>

<script>
import {filesearch} from '@/api/api'
export default {
  data(){
    return {
      list:[]
    }
  },
  async created() {
    let {search} = this.$route.params;
    console.log(search,'create^^^^^^^^^^^^^^^^')
    let res = await filesearch({search});
    console.log(res);
    if(res.data.code == 1){
      this.list = res.data.data;
    }
  },
  methods:{
    goToDeatil(uid,kid){
      //去详情
      this.$router.push({name:'detail',params:{uid,kid}})
    }
  }
}
</script>

<style scoped>
li{
  border-bottom: 1px solid #ccc;
}
</style>