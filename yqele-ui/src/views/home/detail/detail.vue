<template>
  <div>
      详情页
  </div>
</template>

<script>
import {filedetail} from '@/api/api.js'
export default {
  data(){
    return {
      list:[]
    }
  },
  async created() {
    let {uid,kid} = this.$route.params;
    let res = await filedetail({
      uid,
      know_id:kid
    });
    console.log(res);
  },
}
</script>

<style>

</style>