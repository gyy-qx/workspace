<template>
  <h1>桃饱网 <span>购物车</span>  </h1>
  <div id="nav">
    <a @click="Homepage">桃饱首页</a>
    <a @click="order">我的订单</a>
    <a @click="bussiness">免费开店</a>
    <a @click="myaccount" style="margin-right: 100px">个人中心</a>
  </div>
  <div id="navlight"></div>
  <div>
    <p id="all"> <strong>全部商品</strong></p>
    <p id="count">已选商品 <span></span>  <button>结算</button> </p>
  </div>
  <hr>
    <table>
      <thead>
      <tr>
        <th colspan="4">商品信息</th>
        <th>单价</th>
        <th>数量</th>
        <th>金额</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr class="tr1">
        <td colspan="8">店铺：<input type="text" class="commodity"> 店铺名称</td>
      </tr>
      <tr class="tr2">
        <td><input type="text" class="commodity" v-model="details">放商品图片</td>
        <td><input type="text" class="commodity" v-model="commodityname">商品名称</td>
        <td><input type="text" class="commodity" v-model="classification">商品分类</td>
        <td><input type="text" class="commodity" v-model="specifications">商品规格</td>
        <td><span>2</span></td>
        <td>
          <button v-on:click="sub(count)">-</button>
          <span>{{count}}</span>
<!--          <input type="text" value="count" v-model="count">-->
          <button v-on:click="add(count)">+</button>
        </td>
        <td><span class="money">0</span></td>
        <td><button onclick="num++">删除</button></td>
      </tr>
      </tbody>
    </table>
</template>

<script>
import router from '@/router'
import axios from 'axios'
export default {
  name: 'purchase',
  data: function () {
    return {
      userId: String,
      commodities: [
        {
          commodityId: String,
          addTime: Date,
          addPrice: Number,
          quantity: Number,

          name: String,
          classification: String,
          placeOfOrigin: String,
          specifications: String,
          details: String
        }
      ]
    }
  },
  created () {
    axios.get('/api/orderForm').then(response => {
      this.count = response.data.quantity
      this.commodityname = response.data.name
      this.details = response.data.details
      this.classification = response.data.classification
      this.specifications = response.data.specifications
    }).catch(error => {
      console.log(error)
    })
  },
  methods: {
    order: function () {
      router.push('/order')
    },
    Homepage: function () {
      router.push('/Homepage')
    },
    bussiness: function () {
      router.push('/comSignUp')
    },
    myaccount: function () {
      router.push('/Myaccount')
    },
    add: function (count) {
      // 如果数量大于商品库存
      // if (this.count >= this.stock) {
      //   Toast('该宝贝不能购买更多了~')
      // }else{}
      this.count++
    },
    sub: function (count) {
      if (this.count <= 0) {
        alert('受不了啦，宝贝不能再减少啦')
        this.count = 0
      } else {
        this.count -= 1
      }
    }
  }
}
</script>

<style scoped>
  *{
    margin: 0px;
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
  h1{
    position: absolute;
    top:100px;
    left:200px;
    font-family: 幼圆;
    font-size: 40px;
    color: lightcoral;
  }
  h1 span{
    width: 10px;
    font-size: 30px;
    color:#41464b;
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
  #count{
    display: inline-block;
    margin-top: 130px;
    font-size: 10px;
    float: right;
    margin-right: 200px;
  }
  #count button{
    text-decoration: none;
  }
  table{
    margin-top: 30px;
    margin-left: 10%;
    width: 80%;
    text-align: center;
  }
  th{
    width: 10%;
    margin-bottom: 20px;
    line-height: 50px;
  }
  tbody .tr2{
    border: solid 1px #b3a3b9;
    margin-top: 20px;
  }
  tbody .tr1{
    line-height: 50px;
    text-align: left;
    font-size: 10px;
  }
  .tr2 td{
    width: 10%;
    /*border: solid 1px #b3a3b9;*/
    line-height: 120px;
  }
  td button{
    line-height: 20px;
  }
.commodity{
  border:none;
}
</style>
