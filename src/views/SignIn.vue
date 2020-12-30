<template>
  <h1>桃饱网 <span>登录</span> </h1>
  <div id="signIn">
    <div id="login">
<!--    <a-row :gutter="[8,16]">-->
<!--      <a-col :span="8"/>-->
<!--      <a-col :span="8">-->
        <a-radio-group id="button" v-model:value="role" button-style="solid">
          <a-space size="small">
          <a-radio-button value="business" id="button1">
            商户登录
          </a-radio-button>
          <a-radio-button value="customer" id="button2">
            顾客登录
          </a-radio-button></a-space>
        </a-radio-group>
<!--      </a-col>-->
<!--      <a-col :span="8"/>-->
<!--    </a-row>-->
      <input type="text" class="input1"  placeholder="会员名" v-model="user.username">
      <input type="password" class="input1" placeholder="请输入登录密码" v-model="user.password">
      <input type="text" class="input2" placeholder="验证码" v-model="user.code">
      <img class="verify" @click.prevent="refresh" ref="codeImg" alt="验证码" src=""/>
      <input type="button" value="登录" id="sign" @click="signIn"  size="large">
      <input type="button" value="注册" id="regist" @click="jumpRegistration" size="large">
      <input type="button" value="HELLO" id="hello" @click="hello" size="large">

  </div>
  </div>
  <footer>
    <a href="">关于桃饱</a>
    <a href="">合作伙伴</a>
    <a href="">营销中心</a>
    <a href="">廉政举报</a>
    <a href="">联系客服</a>
    <a href="">开放平台</a>
    <a href="">联系我们</a>
    <a href="">网站地图</a>
    <a href="">隐私权政策</a>
    <a href="">法律声明</a>
    <a href="">知识产权</a>
  </footer>
</template>

<script>
import { message } from 'ant-design-vue'
import router from '@/router'
import store from '@/store'

export default {
  name: 'SignIn',
  data () {
    return {
      role: 'customer',
      user: {
        username: '',
        password: '',
        code: ''
      },
      token: ''
    }
  },
  created () {
    this.axios.get('/api/getVerificationCode/' + Math.floor(Math.random() * 11).toString(), { responseType: 'blob' }).then(
      res => {
        const img = this.$refs.codeImg
        img.src = window.URL.createObjectURL(res.data)
        console.log(res.headers)
        // 取得后台通过响应头返回的sessionId的值
        this.token = res.headers.token
        console.log('token=' + this.token)
      }
    ).catch(
      error => {
        console.log(error)
      }
    )
  },
  methods: {
    signIn: function () {
      if (this.user.code == null || this.user.code === '' || typeof this.user.code === 'undefined') {
        console.log('验证码为' + this.user.code)
        message.info('验证码不能为空')
        return
      }
      this.axios({
        method: 'post',
        url: 'api/signIn',
        data: {
          username: this.user.username,
          password: this.user.password,
          verificationCode: this.user.code
        },
        headers: {
          token: this.token // 将token放在请求头带到后端
        }
      }).then(res => {
        if (res.data === '登录成功') {
          alert('登录成功')

          store.commit('setUsername', this.user.username)

          if (this.role === 'customer') {
            this.$router.push('/Homepage')
          } else if (this.role === 'business') {
            this.$router.push('/merchantHomepage')
          }
        } else if (res.data === '验证码错误') {
          message.info('验证码错误')
        } else {
          alert(res.data.msg)
          this.user.code = ''
        }
      })
    },
    refresh: function () {
      this.axios.get('/api/getVerificationCode/' + Math.floor(Math.random() * 11).toString(), { responseType: 'blob' }).then(
        res => {
          const img = this.$refs.codeImg
          img.src = window.URL.createObjectURL(res.data)
          console.log(res.headers)
          // 取得后台通过响应头返回的token的值
          this.token = res.headers.token
          console.log(this.token)
        })
    },
    hello: function () {
      this.axios({
        url: 'api/hello',
        method: 'get',
        headers: {
          token: this.token
        }
      }
      ).then(
        res => {
          console.log(res.data)
        })
    },
    jumpRegistration: function () {
      router.push('/userSignUp')
    }
  }
}
</script>

<style scoped>
  *{
    margin: 0px;
  }
  h1{
    position: absolute;
    top:50px;
    left:200px;
    font-family: 幼圆;
    font-size: 40px;
    color: lightcoral;
  }
  h1 span{
    font-size: 30px;
    color:#41464b;
  }
#signIn {
  width: 100%;
  height:600px ;
  margin-top: 150px;
  margin-bottom: 100px;
  background-image: url("../assets/loginback.jpg");
  background-size:130% 100%;
  background-position:-200px 0px;
  }
#login{
  padding: 0px 0px;
  width: 400px;
  height: 350px;
  background-color:white;
  opacity: 0.8;
  position: absolute;
  right: 300px;
  top: 320px;
}
#button{
  font-size: 20px;
  margin-top: 20px;
  margin-left: -150px;
}
  .input1{
    display: block;
    margin-left: 50px;
    margin-top: 20px;
    border: solid 1px rosybrown;
    height: 40px;
    width: 300px;
  }
  .input2{
    margin-left: -50px;
    margin-top: 20px;
    margin-right: 30px;
    border: solid 1px rosybrown;
    height: 40px;
    width: 150px;
  }
  #sign{
    color:white;
    width: 300px;
    height: 45px;
    display: block;
    margin-top: 20px;
    margin-left: 50px;
    background-color: orangered;
    border: none;
    box-shadow: #1a1e21;
    border-radius: 10px;
  }
  #regist{
    margin-left: 180px;
  }
  #regist,#hello{
    text-decoration: none;
    border: none;
    color: #4f5050;
    margin-top: 20px;
    margin-right: 10px;
    background-color: white;
  }
  footer a{
    text-decoration: none;
    color: #4f5050;
    margin-right: 20px;
    margin-top: 100px;
  }
</style>
