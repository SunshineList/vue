<template>
  <!--  <div class="outer_label">-->
  <!--    <img class="inner_label login_logo" src="../assets/logo.png">-->
  <!--  </div>-->
  <div class="login_form">
    <el-row style="font-size: 30px;font-weight: bolder;padding-top: 10%;color: #abcdef">注册
    </el-row>
    <span style="color: #abcdef">用户名：</span><input type="text" class="qxs-ic_user qxs-icon" placeholder="用户名"
                                                   v-model="username"
                                                   style="margin-top: 10px;margin-left: 15px"><br>
    <span style="color: #abcdef">密 &nbsp;&nbsp; 码：</span><input type="password" class="qxs-ic_password qxs-icon"
                                                                style="margin-left: 15px"
                                                                placeholder="密码" v-model="password"><br>
    <span style="color: #abcdef">确认密码</span><input type="password" class="qxs-ic_password qxs-icon"
                                                   style="margin-left: 20px"
                                                   placeholder="确认密码" v-model="password2"><br>
    <span style="color: #abcdef;">电子邮箱</span><input type="text" class="qxs-ic_user qxs-icon"
                                                    placeholder="电子邮箱"
                                                    style="margin-left: 20px"
                                                    v-model="email"></input><br>
    <span style="color: #abcdef;">邮箱验证码</span><input type="text" class="qxs-ic_user qxs-icon"
                                                     style="margin-left: 5px"
                                                     placeholder="验证码"
                                                     v-model="email_key"></input>
    <br>
    <div style="padding-top: 10px">
      <el-button style="border-radius:10px" class="login_btn" @click.native="register" round
                 :loading="isBtnLoading"><span
        style="color: #fff">注册</span>
      </el-button>
      <el-button style="border-radius:10px" class="login_btn" @click.native="cancle"><span
        style="color: #fff">重置</span>
      </el-button>
      <el-button style="border-radius:10px" class="login_btn" @click.native="send_yzm"><span
        style="color: #fff">发送验证码</span>
      </el-button>
    </div>
  </div>
</template>


<script>
    export default {
        name: "register",
        data() {
            return {
                bodyBgImage: 'url(' + require('../assets/bg.jpeg') + ')',
                username: '',
                password: '',
                password2: '',
                email: '',
                email_key: '',
                hashkey: '',
                ymz: '',
                isBtnLoading: false,
            }
        },
        computed: {
            btnText() {
                if (this.isBtnLoading) this.$message.success('注册中');
                return '注册';
            }
        },
        methods: {
            register() {
                if (!this.username) {
                    this.$message.error('请输入用户名');
                } else if (!this.password) {
                    this.$message.error('请输入密码');
                } else if (this.password2 !== this.password) {
                    this.$message.error('两次密码输入不一致')
                } else if (!this.email) {
                    this.$message.error('请输入邮箱')
                } else if (!this.email_key) {
                    this.$message.error('请输入邮箱验证码')
                } else {
                    this.$axios({
                        method: "POST",
                        url: 'api/register/',
                        data: {
                            username: this.username,
                            password: this.password,
                            password2: this.password2,
                            email: this.email,
                            email_key: this.email_key
                        }
                    }).then((res) => {
                        if (!res.data.error_code) {
                            this.$message.success(res.data.msg);
                            this.$router.push('/')
                        } else {
                            this.$message.error(res.data.error)
                        }
                    }).catch((e) => {
                        console.log(e)
                    })
                }

            },
            cancle() {
                this.username = '';
                this.password = '';
                this.password2 = '';
                this.email = '';
                this.email_key = '';
            },
            send_yzm() {
                if (!this.username) {
                    this.$message.error("请输入用户名")
                } else if (!this.email) {
                    this.$message.error('请输入需要发送的邮箱')
                } else {
                    this.$axios({
                        method: "POST",
                        url: 'api/email_yzm',
                        data: {
                            username: this.username,
                            email: this.email,
                            send_type: 'register',
                        }
                    }).then((res) => {
                        if (!res.data.error_code) {
                            this.$message.success(res.data.msg);
                        } else {
                            this.$message.error(res.data.error)
                        }
                    }).catch((e) => {
                        console.log(e)
                    })
                }
            }
        },
        mounted() {
            document.body.style.backgroundImage = this.bodyBgImage
        },

    }
</script>
<style>
  .login_form {
    padding-top: 5%;
    padding-left: 10%;
    padding-right: 10%;
  }

  .login_logo {
    height: 100%;
  }

  .login_btn {
    /*width: 10%;*/
    font-size: 16px;
    /*background: -webkit-linear-gradient(left, #07c160, #07c160); !* Safari 5.1 - 6.0 *!*/
    /*background: -o-linear-gradient(right, #07c160, #07c160); !* Opera 11.1 - 12.0 *!*/
    /*background: -moz-linear-gradient(right, #07c160, #07c160); !* Firefox 3.6 - 15 *!*/
    /*background: linear-gradient(to right, #07c160, #07c160); !* 标准的语法 *!*/
    background: #abcdef;
    filter: brightness(1.1);
  }

  .divIdentifyingCode {
    /*position: absolute;*/
    float: right;
    top: 0;
    right: 0;
    z-index: 5;
    width: 102px; /*设置图片显示的宽*/
    height: 40px; /*图片显示的高*/
    background: #e2e2e2;
    margin-right: 0;
  }
</style>
