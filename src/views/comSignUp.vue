<template>
  <h1>桃饱网 <span>企业注册</span>  </h1>
  <div id="comsignUp">
      <p class="first"><span>*</span>基本信息</p>
      <p class="sec">
      <span>用户名</span><input type="text" v-model="businessRegisterVo.username" size="default">
      </p>
      <p class="sec">
        <span>姓</span><input type="text" v-model="businessRegisterVo.lastname">
      </p>
      <p class="sec">
        <span>名</span><input type="text" v-model="businessRegisterVo.firstname">
      </p>
      <p class="sec">
        <span>身份证号码</span><input type="text" v-model="businessRegisterVo.idCard">
      </p>
      <p class="sec">
        <span>联系方式</span><input type="text" v-model="businessRegisterVo.phone">
      </p>
      <p class="first"><span>*</span>企业信息</p>
      <p class="sec">
        <span>分类</span><input type="phone" v-model="businessRegisterVo.classification">
      </p>
      <p class="sec">
        <span>商铺名</span><input type="text" v-model="businessRegisterVo.shopName">
      </p>
      <p class="first"> <span>*</span> 银行卡信息</p>
      <p class="sec">
        <span>工商信息</span><input type="text" v-model="businessRegisterVo.businessInformation">
      </p>
      <p class="sec">
        <span>银行卡号</span><input type="text" v-model="businessRegisterVo.bankCardNumber">
      </p>
      <p class="sec">
        <span>余额</span><input type="text" v-model="customerRegisterVo.balance">
      </p>
      <p class="first"><span>*</span>请设置登录密码</p>
      <p class="sec">
        <span>密码</span><input type="text" v-model="customerRegisterVo.password">
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
      role: 'customer',
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
      },
      customerRegisterVo: {
        roleName: this.role,
        username: null,
        lastname: null,
        firstname: null,
        idCard: null,
        phone: null,
        email: null,
        nickname: null,
        bankCardNumber: null,
        balance: null,
        password: null
      }

    }
  },
  methods: {
    businessRegister: function () {
    },
    customerRegister: function () {

    },
    register: function () {
      if (this.role === 'business') {
        this.businessRegister()
      } else if (this.role === 'customer') {
        this.customerRegister()
      }
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
</style>
