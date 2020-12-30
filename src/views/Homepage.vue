<template>
  <div id="nav">
    <a @click="order">我的订单</a>
    <a @click="purchase">购物车</a>
    <a @click="bussiness">免费开店</a>
    <a @click="myaccount" style="margin-right: 100px">个人中心</a>
  </div>
  <div id="navlight"></div>
  <h1>桃饱网 <span>首页</span>  </h1>

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
    <tr v-for=" (user,index) in list" :key="index" class="tr2">
      <td class="exceptcheck"><input type="text" class="commodity" v-model="user.id" readonly="true"></td>
      <td class="exceptcheck"><input type="textarea" id="commodityname" v-model="user.name" readonly="true"></td>
      <td class="exceptcheck"><input type="text" class="commodity" v-model="user.classifition" readonly="true"></td>
      <td class="exceptcheck"><input type="text" class="commodity" v-model="user.specification" readonly="true"></td>
      <td class="exceptcheck">
        <!--          <span>{{user.money}}</span>-->
        <input type="text" class="commodity" v-model="user.money" readonly="true">
      </td>
      <td class="exceptcheck">
        <button v-on:click="sub(index)">-</button>
        <input type="text" class="commodity" v-model="user.number">
        <button v-on:click="add(index)">+</button>
      </td>
      <td class="exceptcheck">
        <input type="text" class="commodity" v-model="user.moneyall" readonly="true">
      </td>
      <td class="exceptcheck">
        <button id="buyitem" @click="buyitem(index,cindex)">购买</button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
import router from '@/router'
export default {
  name: 'Homepage',
  data: function () {
    return {
      commodityall: 0,
      list: [
        {
          id: 1001,
          name: '男装外套',
          classifition: '衣服',
          specification: 'XXL',
          money: '100',
          number: '1',
          moneyall: '100'
        },
        {
          id: 1002,
          name: '女装外套',
          classifition: '衣服',
          specification: 'L',
          money: '200',
          number: '1',
          moneyall: '200'
        }
      ]
    }
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
    myaccount: function () {
      router.push('/myaccount')
    },
    add: function (index) {
      this.list[index].number++
      this.list[index].moneyall = this.list[index].money * this.list[index].number
    },
    sub: function (index) {
      if (this.list[index].number <= 1) {
        alert('受不了啦，宝贝不能再减少啦')
      } else {
        this.list[index].number--
        this.list[index].moneyall = this.list[index].money * this.list[index].number
      }
    },
    buyitem: function (index, cindex) {
      this.axios({
        method: 'post',
        url: 'api/',
        data: {
          id: this.companyList[index].list[cindex].id,
          name: this.companyList[index].list[cindex].name,
          classifition: this.companyList[index].list[cindex].classifition,
          specification: this.companyList[index].list[cindex].moneyall,
          money: this.companyList[index].list[cindex].money,
          number: this.companyList[index].list[cindex].number,
          moneyall: this.companyList[index].list[cindex].moneyall
        },
        headers: {
          token: this.token // 将token放在请求头带到后端
        }
      }).then(res => {
        if (res.data === '购买成功') {
          alert('购买成功')
          window.location.reload()
        } else {
          alert('购买失败，请重新尝试')
        }
      })
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
  .checkitem{
    width: 2%;
    /*border: solid red 1px;*/
  }
  table{
    margin-top: 150px;
    margin-left: 10%;
    width: 82%;
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
  .exceptcheck{
    width: 10%;
    /*border: solid 1px #b3a3b9;*/
    line-height: 120px;
  }
  td button{
    line-height: 20px;
  }
  .commodity{
    border:none;
    width:60%;
    height: 30px;
    text-align: center;
    outline: none;
  }
  #commodityname{
    border: none;
    outline: none;
  }
  #buyitem{
    background-color: orangered;
    border:#b3a3b9;
  }
</style>
