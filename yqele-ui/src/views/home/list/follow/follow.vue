<template>
  <div>
    <el-table :data="list" style="width: 100%">
      <el-table-column label="名字" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >取消关注</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { followlist ,followdel} from "@/api/api";
export default {
  data() {
    return {
      list: []
    };
  },
  async created() {
    let res = await followlist({
      uid: JSON.parse(window.localStorage.user).uid
    });
    if(res.data.code == 1){
        this.list = res.data.data;
    }
    console.log(res);
  },
  methods:{
      async handleDelete(ind,row){
          console.log(row,ind);
          let res =await followdel({
              user_id:JSON.parse(window.localStorage.user).uid,
              follow_id:row.id
          });
          if(res.data.code == 1){
              this.list.splice(ind,1);
              this.$message('取消关注成功');
          }
          console.log(res)
      }
  }
};
</script>

<style>
</style>