<template>
  <div class="home">
     <div>
       <!-- <input type="text" placeholder="请输入姓名" v-model="name"> -->
       <input type="text" placeholder="请输入姓名" :value="name" @input="name = $event.target.value">
     </div>
      <Input v-model="phone" placeh="请输入电话"/>
      <Input v-model="city" placeh="请输入城市"/>
      <!-- <Input placeh="请输入电话1" :value="phone" @input="phone = $event"/>     -->
      <!-- <Input placeh="请输入电话1" :value="phone" @input="changeInputPhone"/>     -->
     <button @click="add">添加</button>
  </div>
</template>

<script>
// @ is an alias to /src
import Input from '@/components/Input.vue'
import axios from 'axios'
export default {
  name: 'home',
  data(){
    return {
      name:'',
      phone:'',
      city:'',
      address:''
    }
  },
  components: {
    Input
  },
 async created(){
   let res = await axios.get('/api/address/list');
   console.log(res);
  },
  methods:{
    add(){
      let {name,phone,city,address} = this;
      console.log(name,phone,city,address);
    },
    changeInput(e){
      console.log(e.target.value);
      this.name = e.target.value;
    },
    changeInputPhone(valeu){
      this.phone = valeu
    }
  }
}
</script>
