<template>
  <!--  <div class="outer_label">-->
  <!--    <img class="inner_label login_logo" src="../assets/logo.png">-->
  <!--  </div>-->
  <div class="login_form">
    <el-row style="font-size: 30px;font-weight: bolder;padding-top: 10%;color: #abcdef">登录
    </el-row>
    <span style="color: #abcdef">用户名：</span>
    <input type="text" class="qxs-ic_user qxs-icon" placeholder="用户名" v-model="username" style="margin-top: 10px"><br>
    <span style="color: #abcdef">密 &nbsp;&nbsp; 码：</span><input type="password" class="qxs-ic_password qxs-icon"
                                                                placeholder="密码" v-model="password"><br>
    <span style="color: #abcdef">验证码：</span>
    <input type="text" class="qxs-ic_user qxs-icon" placeholder="验证码" v-model="yzm"></input>
    <input type="hidden" v-model="hashkey"></input>
    <br>
    <el-button type="success" style="border-radius:10px" class="login_btn" @click.native="login" round
               :loading="isBtnLoading"><span
      style="color: #fff">登录</span>
    </el-button>
    <div class="divIdentifyingCode" @click="getIdentifyingCode">
      <img id="imgIdentifyingCode" style="height:40px; width: 100px; cursor: pointer;" alt="点击更换"
           title="点击更换"/>
    </div>
    <div style="margin-top: 10px">
      <span><a @click="forget" style=""><u>还没有账号？立即注册</u></a></span>
    </div>
  </div>
</template>


<script>
    export default {
        name: "login",
        data() {
            return {
                bodyBgImage: 'url(' + require('../assets/bg.jpeg') + ')',
                username: '',
                password: '',
                hashkey: '',
                identifyCodeSrc: '',
                yzm: '',
                isBtnLoading: false,
            }
        },
        created() {
            // if (JSON.parse(localStorage.getItem('user')) && JSON.parse(localStorage.getItem('user')).userName) {
            //     this.userName = JSON.parse(localStorage.getItem('user')).username;
            //     this.password = JSON.parse(localStorage.getItem('pwd')).password;
            // }
        },
        computed: {
            btnText() {
                if (this.isBtnLoading) this.$message.success('登录中');
                return '登录';
            }
        },
        methods: {
            login() {
                if (!this.username) {
                    this.$message.error('请输入用户名');
                } else if (!this.password) {
                    this.$message.error('请输入密码');
                } else if (!this.yzm) {
                    this.$message.error('请输入验证码')
                } else {
                    this.$axios({
                        method: "POST",
                        url: 'api/login/',
                        data: {
                            username: this.username,
                            password: this.password,
                            yzm: this.yzm,
                            hashkey: this.hashkey
                        }
                    }).then((res) => {
                        if (!res.data.error_code) {
                            this.$store.dispatch("userLogin", true);
                            localStorage.setItem("Flag", "isLogin");
                            this.$message.success('登录成功');
                            this.$router.push('/home')
                        } else {
                            this.$message.error(res.data.error)
                        }
                    }).catch((e) => {
                        console.log(e)
                    })
                }
            },
            forget() {
                this.$router.push('/register')
            },
            getIdentifyingCode: function () {
                this.$axios.get('api/yzm').then((res) => {
                    if (res.error) {
                        this.$message.error('验证码获取错误')
                    }
                    this.identifyCodeSrc = res.data.image_url;
                    this.hashkey = res.data.hashkey;
                    let objs = document.getElementById("imgIdentifyingCode");
                    objs.src = 'http://www.outputbug.com:8000' + this.identifyCodeSrc;
                })
            }
        },
        mounted() {
            this.getIdentifyingCode();
            document.body.style.backgroundImage = this.bodyBgImage
        },
        beforeDestroy() {
            document.querySelector('body').setAttribute('style', 'background:#fff')
        }
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
    /*background: #abcdef;*/
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
