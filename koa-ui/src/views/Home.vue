<template>
  <div>
    <div>
      <input placeholder="请输入用户名" v-model="name" />
    </div>
    <div>
      <input placeholder="请输入年龄" v-model="age" />
    </div>
    <button @click="add">添加</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      age: "",
      id: null
    };
  },
  created() {
    console.log(this.$route);
    let { name, age, id } = this.$route.query;
    this.name = name;
    this.age = age;
    this.id = id;
  },
  methods: {
    async add() {
      let { name, age, id } = this;
      if (!id) {
        let res = await this.$http.post("/api/add", { name, age });
        console.log(res);
        if (res.data.code == 1) {
          //添加成功
          this.$router.push("/about");
        }
      } else {
        let res = await this.$http.post('/api/update',{name,age,id});
        console.log(res);
        this.$router.push('/about');
      }
    }
  }
};
</script>

<style>
</style>