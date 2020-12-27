<template>
  <div id="nav">
    <a @click="order">我的订单</a>
    <a @click="purchase">购物车</a>
    <a @click="bussiness">免费开店</a>
    <a @click="myaccount" style="margin-right: 100px">个人中心</a>
  </div>
  <div id="navlight"></div>
  <h1>桃饱网 <span>首页</span>  </h1>
</template>

<script>
import router from '@/router'
export default {
  name: 'Homepage',
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
    myaccount: function () {
      router.push('/myaccount')
    }
  }
}
</script>

<style scoped>
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
</style>
