<template>
  <h1>桃饱网 <span>用户注册</span>  </h1>
  <div id="usersignUp">
      <a-row :gutter="[8,24]">
        <a-col :span="8"/>
        <label>
          <a-input prefix="用户名" v-model:value="customerRegisterVo.username" size="default"></a-input>
        </label>
        <a-col :span="8"/>
      </a-row>
      <a-row :gutter="[8,24]">
        <a-col :span="8"/>
        <label>
          <a-input prefix="昵称" v-model:value="customerRegisterVo.nickname" size="default"></a-input>
        </label>
        <a-col :span="8"/>
      </a-row>
      <a-row :gutter="[8,24]">
        <a-col :span="8"/>
        <label>
          <a-input prefix="姓" v-model:value="customerRegisterVo.lastname" size="default"></a-input>
        </label>
        <a-col :span="8"/>
      </a-row>
      <a-row :gutter="[8,24]">
        <a-col :span="8"/>
        <label>
          <a-input prefix="名" v-model:value="customerRegisterVo.firstname" size="default"></a-input>
        </label>
        <a-col :span="8"/>
      </a-row>
      <a-row :gutter="[8,24]">
        <a-col :span="8"/>
        <label>
          <a-input prefix="身份证号码" v-model:value="customerRegisterVo.idCard" size="default"></a-input>
        </label>
        <a-col :span="8"/>
      </a-row>
      <a-row :gutter="[8,24]">
        <a-col :span="8"/>
        <label>
          <a-input prefix="联系方式" v-model:value="customerRegisterVo.phone" size="default"></a-input>
        </label>
        <a-col :span="8"/>
      </a-row>
      <a-row :gutter="[8,24]">
        <a-col :span="8"/>
        <label>
          <a-input prefix="邮箱" v-model:value="customerRegisterVo.email" size="default"></a-input>
        </label>
        <a-col :span="8"/>
      </a-row>
      <a-row :gutter="[8,24]">
        <a-col :span="8"/>
        <label>
          <a-input prefix="银行卡号" v-model:value="customerRegisterVo.bankCardNumber" size="default"></a-input>
        </label>
        <a-col :span="8"/>
      </a-row>
      <a-row :gutter="[8,24]">
        <a-col :span="8"/>
        <label>
          <a-input prefix="余额" v-model:value="customerRegisterVo.balance" size="default"></a-input>
        </label>
        <a-col :span="8"/>
      </a-row>
      <a-row :gutter="[8,24]">
        <a-col :span="8"/>
        <label>
          <a-input-password prefix="密码" v-model:value="customerRegisterVo.password" size="default"></a-input-password>
        </label>
        <a-col :span="8"/>
      </a-row>
    </div>
    <input type="button" @click="register" id="login" value="注  册">
    <input type="button" value="切换为企业注册" id="regist" @click="jumpRegistration" size="large">
  </div>
</template>

<script>
import router from '@/router'
export default {
  name: 'userSignUp',
  data () {
    return {
      role: 'customer',
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
    customerRegister: function () {

    },
    register: function () {
      this.customerRegister()
    },
    jumpRegistration: function () {
      router.push('/comSignUp')
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
