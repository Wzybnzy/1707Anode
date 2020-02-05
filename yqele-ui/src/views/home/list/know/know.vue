<template>
  <div>
    <template>
      <el-table :data="list" style="width: 100%">
        <el-table-column label="名称" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.know_name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="简介" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.know_info }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
import { knowlist, knowdel } from "@/api/api";
export default {
  data() {
    return {
      list: []
    };
  },
  async created() {
    let res = await knowlist({ uid: JSON.parse(window.localStorage.user).uid });
    console.log(res, "list");
    if (res.data.code == 1) {
      this.list = res.data.data;
    }
  },
  methods: {
    handleEdit(index, row) {
      //点击编辑的时候触发
      console.log(index, row);

      this.$router.push({name:'addknow',params:{...row}});
    },
    handleDelete(index, row) {
      //点击删除的时候触发的
      console.log(index, row);
      this.$confirm("是否要删除?", "删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let { id, uid } = row;
          let res = await knowdel({
            id,
            uid
          });
          if (res.data.code == 1) {
            this.list.splice(index, 1);
            this.$message({
            type: "success",
            message: "删除成功!"
          });
          }
          
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

<style>
</style>