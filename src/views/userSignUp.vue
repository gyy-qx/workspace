<template>
  <h1>桃饱网 <span>用户注册</span></h1>
  <div id="usersignUp">
    <p class="first" style="margin-top: 120px"><span>*</span>基本信息</p>
    <p class="sec">
      <span>用户名</span><input type="text" placeholder="会员名，5-16位字母或数字" v-model="customerRegisterVo.username"
                             v-on:blur="usernameBlur">
    </p>
    <p class="sec">
      <span>昵称</span><input type="text" placeholder="设置你的昵称" v-model="customerRegisterVo.nickname">
    </p>
    <p class="sec">
      <span>姓</span><input type="text" placeholder="" v-model="customerRegisterVo.lastname">
    </p>
    <p class="sec">
      <span>名</span><input type="text" v-model="customerRegisterVo.firstname">
    </p>
    <p class="sec">
      <span>身份证号码</span><input type="text" placeholder="请输入身份证号码" v-model="customerRegisterVo.idCard">
    </p>
    <p class="sec">
      <span>联系方式</span><input type="text" placeholder="请输入电话号码" v-model="customerRegisterVo.phone">
    </p>
    <p class="sec">
      <span>邮箱</span><input type="text" placeholder="请输入邮箱" v-model="customerRegisterVo.email"
                            v-on:blur="emailBlur">
    </p>
    <p class="first"><span>*</span>银行卡信息</p>
    <p class="sec">
      <span>银行卡号</span><input type="text" placeholder="请输入银行卡号" v-model="customerRegisterVo.bankCardNumber">
    </p>
    <p class="sec">
      <span>余额</span><input type="text" placeholder="请输入银行余额" v-model="customerRegisterVo.balance">
    </p>
    <p class="first"><span>*</span>请设置登录密码</p>
    <p class="sec">
      <span>密码</span><input type="text" placeholder="设置你的密码" v-model="customerRegisterVo.password">
    </p>
  </div>
  <input type="button" @click="register" id="login" value="注  册">
  <input type="button" value="切换为企业注册" id="resve" @click="jumpRegistration">
</template>

<script>
import router from '@/router'
import { message } from 'ant-design-vue'

export default {
  name: 'userSignUp',
  data () {
    return {
      role: 'customer',
      customerRegisterVo: {
        roleName: this.role,
        username: null,
        nickname: null,
        lastname: null,
        firstname: null,
        idCard: null,
        phone: null,
        email: null,
        bankCardNumber: null,
        balance: null,
        password: null
      }
    }
  },
  methods: {
    customerRegister: function () {
      this.axios({
        method: 'post',
        url: 'api/customerRegister',
        data: {
          roleName: 'customer',
          username: this.customerRegisterVo.username,
          nickname: this.customerRegisterVo.nickname,
          lastname: this.customerRegisterVo.lastname,
          firstname: this.customerRegisterVo.firstname,
          idCard: this.customerRegisterVo.idCard,
          phone: this.customerRegisterVo.phone,
          email: this.customerRegisterVo.email,
          bankCardNumber: this.customerRegisterVo.bankCardNumber,
          balance: this.customerRegisterVo.balance,
          password: this.customerRegisterVo.password
        },
        headers: {
          token: this.token // 将token放在请求头带到后端
        }
      }).then(res => {
        if (res.data === '注册成功') {
          this.$router.push('/signIn')
        }
      })
    },
    register: function () {
      this.customerRegister()
    },
    jumpRegistration: function () {
      router.push('/comSignUp')
    },
    usernameBlur: function () {
      const pattern = /^[A-Z|a-z|0-9]{5,16}$/
      let msg = ''
      if (!pattern.test(this.customerRegisterVo.username)) {
        msg = '请输入合法的用户名'
      }
      message.info(msg)
    },
    emailBlur: function () {
      const pattern = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
      let msg = ''
      if (!pattern.test(this.customerRegisterVo.email)) {
        msg = '请输入合法的邮箱'
      }
      message.info(msg)
    }

  }
}
</script>

<style scoped>
h1 {
  position: absolute;
  top: 50px;
  left: 200px;
  font-family: 幼圆;
  font-size: 40px;
  color: lightcoral;
}

h1 span {
  font-size: 30px;
  color: #41464b;
}

#signUp {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.first {
  font-size: 20px;
  margin-right: 40%;
}

.first span {
  color: lightcoral;
}

.sec {
  color: #4f5050;
}

.sec input {
  border: solid 1px #c4d0ff;
  position: absolute;
  left: 60%;
}

.sec span {
}

#login {
  color: white;
  width: 20%;
  height: 10%;
  display: block;
  margin-top: 50px;
  margin-left: 40%;
  background-color: orangered;
  border: none;
  box-shadow: #1a1e21;
  border-radius: 10px;
}

#resve {
  text-decoration: none;
  border: none;
  color: #ff8135;
  margin-top: 20px;
  margin-right: -70px;
  background-color: white;
}

input::-webkit-input-placeholder {
  font-size: 8px;
}
</style>
