<template>
  <h1>桃饱网 <span>个人中心</span></h1>
  <div id="nav">
    <a @click="Homepage">桃饱首页</a>
    <a @click="order">我的订单</a>
    <a @click="bussiness">免费开店</a>
    <a @click="purchase" style="margin-right: 100px">购物车</a>
  </div>
  <div id="navlight"></div>
  <p id="all"><strong>修改客户信息</strong></p>
  <hr>
  <div id="usersignUp">
    <p class="first" style="margin-top: 120px"><span>*</span>基本信息</p>
    <p class="sec">
      <span>用户名</span><input type="text" v-model="customerRegisterVo.username">
    </p>
    <p class="sec">
      <span>昵称</span><input type="text" v-model="customerRegisterVo.nickname">
    </p>
    <p class="sec">
      <span>姓</span><input type="text" v-model="customerRegisterVo.lastname">
    </p>
    <p class="sec">
      <span>名</span><input type="text" v-model="customerRegisterVo.firstname">
    </p>
    <p class="sec">
      <span>身份证号码</span><input type="text" v-model="customerRegisterVo.idCard">
    </p>
    <p class="sec">
      <span>联系方式</span><input type="text" v-model="customerRegisterVo.phone">
    </p>
    <p class="sec">
      <span>邮箱</span><input type="text" v-model="customerRegisterVo.email">
    </p>
    <p class="first"><span>*</span>银行卡信息</p>
    <p class="sec">
      <span>银行卡号</span><input type="text" v-model="customerRegisterVo.bankCardNumber">
    </p>
    <p class="sec">
      <span>余额</span><input type="text" v-model="customerRegisterVo.balance" readonly="true">
    </p>
    <p class="first"><span>*</span>请设置登录密码</p>
    <p class="sec">
      <span>密码</span><input type="text" v-model="customerRegisterVo.password">
    </p>
  </div>
  <input type="button" @click="register" id="login" value="提  交">
</template>

<script>
import router from '@/router'
import store from '@/store'
import axios from 'axios'

export default {
  name: 'Myaccount',
  data () {
    return {
      theme: 'light',
      selectedKeys: ['3'],
      selectedItem: Number,
      searchString: '',

      customerRegisterVo: {
        roleName: 'customer',
        username: '',
        nickname: '',
        lastname: '',
        firstname: '',
        idCard: '',
        phone: '',
        email: '',
        bankCardNumber: '',
        balance: '',
        password: ''
      }
    }
  },
  created () {
    this.customerRegisterVo.username = store.state.username
    axios.get('/api/customer/username/' + store.state.username).then(
      response => {
        const result = response.data
        this.customerRegisterVo.username = result.username
        this.customerRegisterVo.nickname = result.nickname
        this.customerRegisterVo.lastname = result.lastname
        this.customerRegisterVo.firstname = result.firstname
        this.customerRegisterVo.idCard = result.idCard
        this.customerRegisterVo.phone = result.phone
        this.customerRegisterVo.email = result.email
        this.customerRegisterVo.bankCardNumber = result.bankCardNumber
        this.customerRegisterVo.balance = result.balance
        this.customerRegisterVo.password = result.password
      })
  },
  methods: {
    order: function () {
      router.push('/order')
    },
    purchase: function () {
      router.push('/purchase')
    },
    bussiness: function () {
      router.push('/comSignUp')
    },
    Homepage: function () {
      router.push('/Homepage')
    }
  }
}
</script>

<style scoped>
h1 {
  position: absolute;
  top: 100px;
  left: 200px;
  font-family: 幼圆;
  font-size: 40px;
  color: lightcoral;
}

h1 span {
  font-size: 30px;
  color: #41464b;
}

#nav {
  float: right;
  margin-top: 20px;
}

#nav a {
  text-decoration: none;
  font-size: 15px;
  color: #41464b;
  margin-right: 20px;
}

#navlight {
  width: 100%;
  height: 50px;
  background-color: orangered;
}

hr {
  margin-left: 10%;
  width: 80%;
  color: #987cb9;
  SIZE: 5px;
  margin-top: 165px;
}

#all {
  margin-top: 130px;
  font-size: 20px;
  color: darkorange;
  float: left;
  margin-left: 250px;
  display: inline-block;
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
</style>
