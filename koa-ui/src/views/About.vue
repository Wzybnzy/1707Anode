<template>
  <div>
    <ul>
      <li v-for="(item,index) in list" :key="index">
        <span>姓名：{{item.name}}</span>
        <span>年龄：{{item.age}}</span>
        <button @click="edit(item)">编辑</button>
        <button @click="del(item.id)">删除</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: []
    };
  },
  async created() {
    let res = await this.$http.get("/api/list");
    console.log(res.data);
    if (res.data.code == 1) {
      this.list = res.data.data;
    }
  },
  methods:{
    async del(id){
      let res = await this.$http.get('/api/delete?id='+id);
      console.log(res);
      let ind = this.list.findIndex(item => item.id == id);
      if(res.data.code == 1){
          console.log('删除成功')
          this.list.splice(ind,1);
      }
    },
    edit(item){
      this.$router.push({
        path:'/',
        query:{...item}
      });
    }
  }
};
</script>

<style>
</style>