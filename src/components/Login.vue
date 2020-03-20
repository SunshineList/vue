<template>
  <div>
    <!--    <div class="outer_label">-->
    <!--      <img class="inner_label login_logo" src="../assets/logo.png">-->
    <!--    </div>-->
    <div class="login_form">
      <input type="text" class="qxs-ic_user qxs-icon" placeholder="用户名" v-model="username">
      <input type="text" class="qxs-ic_password qxs-icon" placeholder="密码" v-model="password">
      <el-button class="login_btn" @click.native="login" type="primary" round :loading="isBtnLoading">登录</el-button>
      <div style="margin-top: 10px">
        <span style="color: #A9A9AB">忘记密码？</span>
      </div>
    </div>
  </div>
</template>


<script>
    export default {
        name: "login",
        data() {
            return {
                username: '',
                password: '',
                isBtnLoading: false
            }
        },
        created() {
            if (JSON.parse(localStorage.getItem('user')) && JSON.parse(localStorage.getItem('user')).userName) {
                this.userName = JSON.parse(localStorage.getItem('user')).username;
                this.password = JSON.parse(localStorage.getItem('user')).password;
            }
        },
        computed: {
            btnText() {
                if (this.isBtnLoading) return '登录中...';
                return '登录';
            }
        },
        methods: {
            login() {
                if (!this.username) {
                    this.$message.error('请输入用户名');
                } else if (!this.password) {
                    this.$message.error('请输入密码');
                } else {
                    this.$axios({
                        method: "POST",
                        url: 'http://127.0.0.1:8000/api/account/login/',
                        data: {
                            username: this.username,
                            password: this.password
                        }
                    }).then((res) => {
                        console.log(res.data)
                    }).catch((e) => {
                        console.log(e)
                    })
                }
            }
        }
    }
</script>
<style>
  .login_form {
    padding-top: 10%;
    padding-left: 10%;
    padding-right: 10%;
  }

  .login_logo {
    height: 100%;
  }

  .login_btn {
    width: 10%;
    font-size: 16px;
    background: -webkit-linear-gradient(left, #000099, #2154FA); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, #000099, #2154FA); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, #000099, #2154FA); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #000099, #2154FA); /* 标准的语法 */
    filter: brightness(1.4);
  }
</style>
