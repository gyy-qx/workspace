<template>
  <h1>桃饱网 <span>个人中心</span>  </h1>
  <div id="nav">
    <a @click="Homepage">桃饱首页</a>
    <a @click="order">我的订单</a>
    <a @click="bussiness">免费开店</a>
    <a @click="purchase" style="margin-right: 100px">购物车</a>
  </div>
  <div id="navlight"></div>
  <p id="all"> <strong>修改客户信息</strong></p>
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
      <span>余额</span><input type="text" v-model="customerRegisterVo.balance">
    </p>
    <p class="first"><span>*</span>请设置登录密码</p>
    <p class="sec">
      <span>密码</span><input type="text" v-model="customerRegisterVo.password">
    </p>
  </div>
  <input type="button" @click="register" id="login" value="注  册">
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
        id: '',
        roleName: 'customer',
        username: '',

        lastname: '',
        firstname: '',
        idCard: '',
        phone: '',
        email: '',
        nickname: '',
        bankCardNumber: '',
        password: ''
      }
    }
  },
  created () {
    this.customerRegisterVo.username = store.state.username
    axios.get('/api/').then(
      response => {
        this.customerRegisterVo.username = response.data.username,
        this.customerRegisterVo.nickname = response.data.nickname,
        this.customerRegisterVo.lastname = response.data.lastname
        // firstname: this.customerRegisterVo.firstname,
        // idCard: this.customerRegisterVo.idCard,
        // phone: this.customerRegisterVo.phone,
        // email: this.customerRegisterVo.email,
        // bankCardNumber: this.customerRegisterVo.bankCardNumber,
        // balance: this.customerRegisterVo.balance,
        // password: this.customerRegisterVo.password
      })
  },
  methods: {
    changeTheme (checked) {
      this.theme = checked ? 'dark' : 'light'
    },
    onCollapse (collapsed, type) {
      console.log(collapsed, type)
    },
    onBreakpoint (broken) {
      console.log(broken)
    },
    toHome: function () {
      router.push('/signIn')
    },
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
    },
    PersonSetting: function () {
      this.selectedItem = 3
      this.axios.get('/api/').then(
        response => {
          this.count = response.data.quantity
          this.commodityname = response.data.name
        })
    },
    searchCommodity: function () {
    }
  }
}
</script>

<style scoped>
  #logo {
  height: 64px;
  /*background-color: white;*/
  margin: 32px;
}
h1{
  position: absolute;
  top:100px;
  left:200px;
  font-family: 幼圆;
  font-size: 40px;
  color: lightcoral;
}
h1 span{
  font-size: 30px;
  color:#41464b;
}
  #nav{
    float:right;
    margin-top: 20px;
  }
  #nav a{
    text-decoration: none;
    font-size: 15px;
    color: #41464b;
    margin-right: 20px;
  }
  #navlight{
    width: 100%;
    height: 50px;
    background-color: orangered;
  }
#responsive-layout{
  width: 80%;
  margin-top: 150px;
  margin-left: 200px;
}
  hr{
    margin-left: 10%;
    width:80%;
    color:#987cb9;
    SIZE:5px;
    margin-top: 165px;
  }
  #all{
    margin-top: 130px;
    font-size:20px;
    color: darkorange;
    float:left;
    margin-left: 250px;
    display: inline-block;
  }
#responsive-layout #search {

}
</style>
