<template>
  <div>
    <el-table :data="list" style="width: 100%">
      <el-table-column label="名称" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.file_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="归属" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.username}} / {{ scope.row.kname }}</span>
         
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
  </div>
</template>

<script>
import {filelist} from '@/api/api'
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      list:[]
    };
  },
  async created() {
    let res = await filelist({
      uid:JSON.parse(window.localStorage.user).uid
    });
    if(res.data.code == 1){
      this.list = res.data.data;
    }
    console.log(res)
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  }
};
</script>

<style>
</style>