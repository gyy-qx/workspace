<template>
  <h1>桃饱网 <span>企业注册</span>  </h1>
  <div id="comSignUp">
      <p class="first" style="margin-top: 120px"><span>*</span>基本信息</p>
      <p class="sec">
      <span>用户名</span><input type="text" placeholder="会员名" v-model="businessRegisterVo.username" size="default">
      </p>
      <p class="sec">
        <span>姓</span><input type="text" v-model="businessRegisterVo.lastname">
      </p>
      <p class="sec">
        <span>名</span><input type="text" v-model="businessRegisterVo.firstname">
      </p>
      <p class="sec">
        <span>身份证号码</span><input type="text" placeholder="请输入身份证号码" v-model="businessRegisterVo.idCard">
      </p>
      <p class="sec">
        <span>联系方式</span><input type="text" placeholder="请输入电话" v-model="businessRegisterVo.phone">
      </p>
      <p class="first"><span>*</span>企业信息</p>
      <p class="sec">
        <span>分类</span><input type="phone" placeholder="请输入企业类别" v-model="businessRegisterVo.classification">
      </p>
      <p class="sec">
        <span>企业名</span><input type="text" placeholder="请输入营业执照上的公司名称" v-model="businessRegisterVo.shopName">
      </p>
      <p class="first"> <span>*</span> 银行卡信息</p>
      <p class="sec">
        <span>工商信息</span><input type="text" placeholder="请填写社会统一信用编码" v-model="businessRegisterVo.businessInformation">
      </p>
      <p class="sec">
        <span>银行卡号</span><input type="text" placeholder="请输入银行卡号" v-model="businessRegisterVo.bankCardNumber">
      </p>
      <p class="sec">
        <span>余额</span><input type="text" placeholder="请输入你的银行卡余额" v-model="businessRegisterVo.balance">
      </p>
      <p class="first"><span>*</span>请设置登录密码</p>
      <p class="sec">
        <span>密码</span><input type="text" placeholder="设置你的登录密码" v-model="businessRegisterVo.password">
      </p>
    <input type="button" @click="register" id="login" value="注  册">
    <input type="button" value="切换用户账户注册" id="resve" @click="jumpRegistration" size="large">
  </div>
</template>

<script>

import router from '@/router'

export default {
  name: 'comSignUp',
  data () {
    return {
      role: 'business',
      businessRegisterVo: {
        roleName: this.role,
        username: null,
        lastname: null,
        firstname: null,
        idCard: null,
        phone: null,
        bankCardNumber: null,
        balance: null,
        password: null,
        shopName: null,
        businessInformation: null,
        classification: null
      }
    }
  },
  methods: {
    businessRegister: function () {
      this.axios({
        method: 'post',
        url: 'api/businessRegister',
        data: {
          roleName: 'business',
          username: this.businessRegisterVo.username,
          lastname: this.businessRegisterVo.lastname,
          firstname: this.businessRegisterVo.firstname,
          idCard: this.businessRegisterVo.idCard,
          phone: this.businessRegisterVo.phone,
          bankCardNumber: this.businessRegisterVo.bankCardNumber,
          balance: this.businessRegisterVo.balance,
          password: this.businessRegisterVo.password,
          shopName: this.businessRegisterVo.shopName,
          businessInformation: this.businessRegisterVo.businessInformation,
          classification: this.businessRegisterVo.classification
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
      this.businessRegister()
    },
    jumpRegistration: function () {
      router.push('/userSignUp')
    }
  }
}
</script>

<style scoped>
  h1{
    position: absolute;
    top:50px;
    left:200px;
    font-family: 幼圆;
    font-size: 40px;
    color: lightcoral;
    margin-bottom: 200px;
  }
  h1 span{
    font-size: 30px;
    color:#41464b;
  }
#signUp {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.first{
  font-size: 20px;
  margin-right: 300px;
}
  .first span{
    color: lightcoral;
  }
  .sec{
    color: #4f5050;
  }
  .sec input{
    border:solid 1px #c4d0ff;
    position: absolute;
    left: 700px;
    margin-left: 300px;
  }
  .sec span{

  }
  #login{
    color:white;
    width: 450px;
    height: 45px;
    display: block;
    margin-top: 50px;
    margin-left: 725px;
    background-color: orangered;
    border: none;
    box-shadow: #1a1e21;
    border-radius: 10px;
  }
  #resve{
    text-decoration: none;
    border: none;
    color: #ff8135;
    margin-top: 20px;
    margin-right: -70px;
    background-color: white;
  }
  input::-webkit-input-placeholder{
    font-size: 8px;
  }
</style>
