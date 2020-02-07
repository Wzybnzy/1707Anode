<template>
  <div>
    <el-table :data="list" style="width: 100%">
      <el-table-column label="名字" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.file_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="归属" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.name }}/{{scope.row.kname}}</span>
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
import { colllist } from "@/api/api";
export default {
  data() {
    return {
      list: []
    };
  },
  async created() {
    let res = await colllist({
      uid: JSON.parse(window.localStorage.user).uid
    });
    if (res.data.code == 1) {
      this.list = res.data.data;
    }
    console.log(res);
  },
  methods:{
      handleDelete(ind,row){

      }
  }
};
</script>

<style>
</style>