<template>
  <div class="home">
    <el-row style="font-size: 30px;font-weight: bolder;color: #abcdef">账号信息</el-row>
    <el-row style="margin-top: 10px">
      <!--      <el-table :data="infolist" style="border: 2px solid greenyellow">-->
      <el-table :data="infolist" border>
        <el-table-column prop="id" label="编号">
          <template></template>
        </el-table-column>
        <el-table-column prop="username" label="用户名">
          <template></template>
        </el-table-column>
        <el-table-column prop="email" label="邮箱">
          <template></template>
        </el-table-column>
        <el-table-column prop="is_staff" label="是否能登录后台" :formatter="is_login">
          <template></template>
        </el-table-column>
        <el-table-column prop="type" label="类型" :formatter="Usertype">
          <template></template>
        </el-table-column>
        <el-table-column prop="date_joined" label="注册时间" :formatter="dateFormat">
          <template></template>
        </el-table-column>
        <el-table-column prop="is_active" label="状态" :formatter="formatterColumn">
          <template></template>
        </el-table-column>
        <el-table-column prop="handle" label="操作">
          <template>
            <el-button type="primary" @click="del">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button type="primary" @click="out()" style="margin-top: 20px">退出登录</el-button>
    </el-row>
    <router-view/>
  </div>
</template>

<script>
    import store from "../store";
    import moment from 'moment'

    export default {
        name: "Home",
        data() {
            return {
                // infolist: [{
                //     id: '',
                //     last_login: '',
                //     username: '',
                //     first_name: '',
                //     email: '',
                //     is_staff: '',
                //     is_active: '',
                //     date_joined: '',
                //     type: '',
                //     mobile: '',
                //     birthday: '',
                //     note: '',
                // }]
                infolist: []
            }
        },
        created() {
            //如果是登录状态才会请求
            this.$axios({
                method: "GET",
                url: 'api/user_info',
            }).then((res) => {
                if (res.data.error) {
                    this.$message.error('账号异常');
                }
                let common_table_info = [];
                common_table_info.push(res.data);
                this.infolist = common_table_info
                // this.infolist[0].id = res.data.id;
                // this.infolist[0].username = res.data.username;
                // this.infolist[0].email = res.data.email;
                // this.infolist[0].is_staff = res.data.is_staff;
                // this.infolist[0].type = res.data.type;
                // this.infolist[0].date_joined = res.data.date_joined;
            }).catch((e) => {
                console.log(e)
            })

        },

        methods: {
            // formatSex: function (row, column, cellValue, index) {
            //     return row.sex === '1' ? '男' : row.sex === '0' ? '女' : '未知';
            // },
            //状态改成汉字
            formatterColumn(row, column) {
                if (row.is_active === true) {
                    return '正常使用'
                } else {
                    return '账号冻结'
                }
            },
            is_login: function (row) {
                if (row.is_staff === true) {
                    return '可以登录'
                } else {
                    return '不可登录'
                }
            },
            dateFormat: function (row, column) {
                let date = row[column.property];
                if (date === undefined) {
                    return ''
                }
                return moment(date).format("YYYY-MM-DD HH:mm:ss")
            },
            Usertype: function (row) {
                if (row.type === '0') {
                    return '管理员'
                } else {
                    return '普通用户'
                }
            },
            out() {
                this.$store.dispatch("userLogin", false);
                this.$message.success('退出登录');
                this.$router.push("/")
            },
            del() {
                this.$message.success('开发中，别着急.........')
            },
        },
    }
</script>

<style scoped>
</style>
