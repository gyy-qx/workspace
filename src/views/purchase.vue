<template>
  <h1>桃饱网 <span>购物车</span></h1>
  <div id="nav">
    <a @click="Homepage">桃饱首页</a>
    <a @click="order">我的订单</a>
    <a @click="bussiness">免费开店</a>
    <a @click="myaccount" style="margin-right: 100px">个人中心</a>
  </div>
  <div id="navlight"></div>
  <div>
    <p id="all"><strong>全部商品</strong></p>
    <p id="count">
      <button id="save" @click="save">保存</button>
      <button @click="countall">全选商品</button>
      <span>￥</span> <span>{{ totalPrice }}</span></p>
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
    <tbody>
    <tr v-for="(commodity,index) in commodities" :key="index" class="tr2">
      <td class="exceptcheck"><input type="text" class="commodity" v-model="commodity.id" readonly="true"></td>
      <td class="exceptcheck"><input type="text" id="commodityname" v-model="commodity.name" readonly="true"></td>
      <td class="exceptcheck"><input type="text" class="commodity" v-model="commodity.classifition" readonly="true">
      </td>
      <td class="exceptcheck"><input type="text" class="commodity" v-model="commodity.specification" readonly="true">
      </td>
      <td class="exceptcheck">
        <input type="text" class="commodity" v-model="commodity.price" readonly="true">
      </td>
      <td class="exceptcheck">
        <button v-on:click="sub(index,index)">-</button>
        <input type="text" class="commodity" v-model="commodity.quantity">
        <button v-on:click="add(index,index)">+</button>
      </td>
      <td class="exceptcheck">
        <input type="text" class="commodity" v-model="commodity.moneyall" readonly="true">
      </td>
      <td class="exceptcheck">
        <button id="deleteitem" @click="deleteitem(index)">删除</button>
        <button id="buyitem" @click="buyitem(index)">购买</button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
import router from '@/router'
import axios from 'axios'
import store from '@/store'
import { message } from 'ant-design-vue'

export default {
  name: 'purchase',
  data: function () {
    return {
      totalPrice: 0,
      commodities: null
    }
  },
  created () {
    axios.get('/api/shoppingCart/' + store.state.username).then(response => {
      this.commodities = response.data
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
      for (let i = 0; i < this.commodities.length; i++) {
        this.totalPrice += this.commodities[i].moneyall
      }
    },
    add: function (index) {
      this.commodities[index].number++
      this.commodities[index].moneyall = this.commodities[index].money * this.commodities[index].quantity
    },
    sub: function (index) {
      if (this.commodities[index].quantity <= 1) {
        message.info('受不了啦，宝贝不能再减少啦')
        // alert()
      } else {
        this.commodities[index].quantity--
        this.commodities[index].moneyall = this.commodities[index].price * this.commodities[index].quantity
      }
    },
    deleteitem: function (index) {
      this.commodities.slice(index, 1)
    },
    buyitem: function (index) {
      console.log(this.dateFormat(new Date()))
      this.axios({
        method: 'post',
        url: 'api/orderForm',
        data: {
          userId: this.userId,
          submissionTime: this.dateFormat(new Date()),
          shippingAddress: '',
          state: '进行中',
          amount: this.commodities[index].moneyall,
          commodities: [
            {
              shopName: '',
              commodityDtoList: [
                {
                  id: this.commodities[index].id,
                  name: this.commodities[index].name,
                  classification: this.commodities[index].classification,
                  placeOfOrigin: this.commodities[index].details,
                  specifications: this.commodities[index].moneyall,
                  details: this.commodities[index].details,
                  price: this.commodities[index].price,
                  launchTime: this.commodities[index].launchTime,
                  quantity: this.commodities[index].number
                }
              ]
            }
          ]
        },
        headers: {
          token: this.token // 将token放在请求头带到后端
        }
      }).then(res => {
        if (res.data === '购买成功') {
          message.info('购买成功')
        } else {
          message.info('购买失败，请重新尝试')
        }
      })
    },
    save: function () {
      this.axios({
        method: 'post',
        url: 'api/shoppingCart/' + store.state.username,
        data: this.commodities
      }).then(res => {
        if (res.data === '保存成功') {
          message.info('保存成功')
        } else {
          message.info('保存失败，请重新尝试')
        }
      })
    }
  }
}
</script>

<style scoped>
* {
  margin: 0px;
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

h1 {
  position: absolute;
  top: 100px;
  left: 200px;
  font-family: 幼圆;
  font-size: 40px;
  color: lightcoral;
}

h1 span {
  width: 10px;
  font-size: 30px;
  color: #41464b;
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

#count {
  display: inline-block;
  margin-top: 130px;
  font-size: 10px;
  float: right;
  margin-right: 200px;
}

#count button {
  text-decoration: none;
}

.checkitem {
  width: 2%;
  /*border: solid red 1px;*/
}

table {
  margin-top: 30px;
  margin-left: 10%;
  width: 82%;
  text-align: center;
}

th {
  width: 10%;
  margin-bottom: 20px;
  line-height: 50px;
}

tbody .tr2 {
  border: solid 1px #b3a3b9;
  margin-top: 20px;
}

tbody .tr1 {
  line-height: 50px;
  text-align: left;
  font-size: 10px;
}

.exceptcheck {
  width: 10%;
  /*border: solid 1px #b3a3b9;*/
  line-height: 120px;
}

td button {
  line-height: 20px;
}

.commodity {
  border: none;
  width: 60%;
  height: 30px;
  text-align: center;
  outline: none;
}

#commodityname {
  border: none;
  outline: none;
}

#deleteitem {
  border: #7f807d;
}

#buyitem {
  background-color: orangered;
  border: #b3a3b9;
}
</style>
