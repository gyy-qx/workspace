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
    <p id="count"> <button @click="countall">全选商品</button>  <span>￥</span>  <span>{{moneyall}}</span> </p>
  </div>
  <hr>
    <table>
      <thead>
      <tr>
        <th class="checkitem"></th>
        <th colspan="4">商品信息</th>
        <th>单价</th>
        <th>数量</th>
        <th>金额</th>
        <th>操作</th>
      </tr>
      </thead>
<!--      <tbody>-->
<!--      <tr class="tr1">-->
<!--        <td colspan="8">店铺：<input type="text" class="commodity"> 店铺名称</td>-->
<!--      </tr>-->
<!--      <tr class="tr2">-->
<!--        <td><input type="text" class="commodity" v-model="details">放商品图片</td>-->
<!--        <td><input type="text" class="commodity" v-model="commodityname">商品名称</td>-->
<!--        <td><input type="text" class="commodity" v-model="classification">商品分类</td>-->
<!--        <td><input type="text" class="commodity" v-model="specifications">商品规格</td>-->
<!--        <td><span>2</span></td>-->
<!--        <td>-->
<!--          <button v-on:click="sub(count)">-</button>-->
<!--          <span>{{count}}</span>-->
<!--&lt;!&ndash;          <input type="text" value="count" v-model="count">&ndash;&gt;-->
<!--          <button v-on:click="add(count)">+</button>-->
<!--        </td>-->
<!--        <td><span class="money">0</span></td>-->
<!--        <td><button onclick="num++">删除</button></td>-->
<!--      </tr>-->
      <tbody v-for=" (company,index) in companyList" :key="index">
      <tr class="tr1">
        <td colspan="8">店铺：{{company.name}}</td>
      </tr>
      <tr v-for=" (user,cindex) in company.list" :key="cindex" class="tr2">
        <td class="checkitem">
          <input type="checkbox" :value="user.id" v-model="checkItem" @change="selectOne" />
        </td>
        <td class="exceptcheck"><input type="text" class="commodity" v-model="user.id" readonly="true"></td>
        <td class="exceptcheck"><input type="text" class="commodity" v-model="user.name" readonly="true"></td>
        <td class="exceptcheck"><input type="text" class="commodity" v-model="user.classifition" readonly="true"></td>
        <td class="exceptcheck"><input type="text" class="commodity" v-model="user.specification" readonly="true"></td>
        <td class="exceptcheck">
<!--          <span>{{user.money}}</span>-->
          <input type="text" class="commodity" v-model="user.money" readonly="true">
        </td>
        <td class="exceptcheck">
          <button v-on:click="sub(index,cindex)">-</button>
          <input type="text" class="commodity" v-model="user.number">
          <button v-on:click="add(index,cindex)">+</button>
        </td>
        <td class="exceptcheck">
          <input type="text" class="commodity" v-model="user.moneyall" readonly="true">
        </td>
        <td class="exceptcheck">
          <button id="deleteitem" @click="deleteitem(index,cindex)">删除</button>
          <button id="buyitem" @click="buyitem(index,cindex)">购买</button>
        </td>
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
      moneyall: 0,
      companyList: [
        {
          name: '时尚男装',
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
        },
        {
          name: '时尚女皇',
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
    countall: function () {
      this.moneyall = 0
      // this.list[index].all = number
      for (let j = 0; j < this.companyList.length; j++) {
        for (let i = 0; i < this.companyList[j].list.length; i++) {
          this.moneyall += Number(this.companyList[j].list[i].money)
        }
      }
      return this.moneyall
    },
    selectOne: function () {

    },
    add: function (index, cindex) {
      this.companyList[index].list[cindex].number++
      this.companyList[index].list[cindex].moneyall = this.companyList[index].list[cindex].money * this.companyList[index].list[cindex].number
    },
    sub: function (index, cindex) {
      if (this.companyList[index].list[cindex].number <= 1) {
        alert('受不了啦，宝贝不能再减少啦')
      } else {
        this.companyList[index].list[cindex].number--
        this.companyList[index].list[cindex].moneyall = this.companyList[index].list[cindex].money * this.companyList[index].list[cindex].number
      }
    },
    deleteitem: function (index, cindex) {
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
        if (res.data === '删除成功') {
          alert('删除成功')
          window.location.reload()
        } else {
          alert('删除失败，请重新尝试')
        }
      })
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
  .checkitem{
    width: 2%;
    /*border: solid red 1px;*/
  }
  table{
    margin-top: 30px;
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
  #deleteitem{
    border: #7f807d;
  }
  #buyitem{
    background-color: orangered;
    border:#b3a3b9;
  }
</style>
