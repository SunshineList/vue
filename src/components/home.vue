<template>
  <div class="home">
    <el-row display="margin-top:10px">
      <el-table :data="infolist" style="border: 2px solid greenyellow">
        <el-table-column prop="id" label="编号">
          <template></template>
        </el-table-column>
        <el-table-column prop="name" label="用户名">
          <template></template>
        </el-table-column>
        <el-table-column prop="sex" label="性别" :formatter="formatSex">
          <template></template>
        </el-table-column>
        <el-table-column prop="date" label="上传时间">
          <template></template>
        </el-table-column>
        <el-table-column prop="address" label="地址">
          <template></template>
        </el-table-column>
        <el-table-column prop="IsAudit" label="状态" :formatter="formatterColumn">
          <template></template>
        </el-table-column>
        <el-table-column prop="handle" label="操作">
          <template>
            <el-button type="primary" @click="">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button type="primary" @click="out()">退出登录</el-button>
    </el-row>
    <router-view/>
  </div>
</template>

<script>
    export default {
        name: "Home",
        data() {
            return {
                infolist: [{
                    id: '1',
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄',
                    IsAudit: 0,
                    sex: '1'
                }, {
                    id: '2',
                    date: '2016-05-02',
                    name: '王小六',
                    address: '上海市普陀区金沙江路 1518 弄',
                    IsAudit: 1,
                    sex: '0'
                }, {
                    id: '3',
                    date: '2016-05-02',
                    name: '王小七',
                    address: '上海市普陀区金沙江路 1518 弄',
                    IsAudit: 10,
                    sex: '-1'
                }],
                username: '',
                password: '',
                email: '',
                is_staff: '',
                is_active: '',
                created_time: '',
            }
        },
        created() {

        },
        methods: {
            formatSex: function (row, column, cellValue, index) {
                return row.sex === '1' ? '男' : row.sex === '0' ? '女' : '未知';
            },
            //状态改成汉字
            formatterColumn(row, column) {
                switch (row.IsAudit) {
                    case 0:
                        return '未通过';
                        break;
                    case 1:
                        return '审核通过';
                        break;
                    case 10:
                        return '待审核';
                        break;
                    case 9:
                        return '草稿';
                        break;
                    default:
                        return '未知';
                }
            },
            out() {
                this.$router.push("/")
            }
            ,
        },
    }
</script>

<style scoped>
</style>
