<template>
  <div id="nav">
    <a @click="order">我的订单</a>
    <a @click="purchase">购物车</a>
    <a @click="bussiness">免费开店</a>
    <a @click="myaccount" style="margin-right: 100px">个人中心</a>
  </div>
  <div id="navlight"></div>
  <h1>桃饱网 <span>首页</span></h1>

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
    <tr v-for="(commodity,index) in list" :key="index" class="tr2">
      <td class="exceptcheck"><input type="text" class="commodity" v-model="commodity.id" readonly="true"></td>
      <td class="exceptcheck"><input type="textarea" id="commodityname" v-model="commodity.name" readonly="true"></td>
      <td class="exceptcheck"><input type="text" class="commodity" v-model="commodity.classification" readonly="true">
      </td>
      <td class="exceptcheck"><input type="text" class="commodity" v-model="commodity.specifications" readonly="true">
      </td>
      <td class="exceptcheck">
        <input type="text" class="commodity" v-model="commodity.price" readonly="true">
      </td>
      <td class="exceptcheck">
        <button v-on:click="sub(index)">-</button>
        <input type="text" class="commodity" v-model="commodity.number">
        <button v-on:click="add(index)">+</button>
      </td>
      <td class="exceptcheck">
        <input type="text" class="commodity" v-model="commodity.moneyall" readonly="true">
      </td>
      <td class="exceptcheck">
        <button id="buyitem" @click="buyitem(index)">购买</button>
      </td>
    </tr>
    </tbody>
  </table>
  <div>
    <label>
      <input type="button" @click="refresh" value="刷新"/>
    </label>
  </div>
</template>

<script>
import router from '@/router'
import axios from 'axios'
import { message } from 'ant-design-vue'
import store from '@/store'

export default {
  name: 'Homepage',
  data: function () {
    return {
      userId: '',
      commodityall: 0,
      list: null
    }
  },
  created () {
    axios.get('/api/selectAllCommodity').then(response => {
      const result = response.data
      for (let i = 0; i < result.length; i++) {
        result[i].number = 0
        result[i].moneyall = 0.0
      }
      console.log('商品数据为')
      console.log(result)
      this.list = result
    }).catch(error => {
      console.log(error)
    })
    axios.get('/api/customer/username/' + store.state.username).then(
      response => {
        this.userId = response.data.id
      }
    ).catch(error => {
      console.log(error)
    }
    )
  },
  methods: {
    refresh: function () {
      axios.get('/api/selectAllCommodity').then(response => {
        const result = response.data
        for (let i = 0; i < result.length; i++) {
          result[i].number = 0
          result[i].moneyall = 0.0
        }
        console.log('商品数据为')
        console.log(result)
        this.list = result
      }).catch(error => {
        console.log(error)
      })
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
    myaccount: function () {
      router.push('/myaccount')
    },
    add: function (index) {
      this.list[index].number++
      this.list[index].moneyall = this.list[index].price * this.list[index].number
    },
    sub: function (index) {
      if (this.list[index].number <= 1) {
        message.info('受不了啦，宝贝不能再减少啦')
      } else {
        this.list[index].number--
        this.list[index].moneyall = this.list[index].price * this.list[index].number
      }
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
          amount: this.list[index].moneyall,
          commodities: [
            {
              shopName: '',
              commodityDtoList: [
                {
                  id: this.list[index].id,
                  name: this.list[index].name,
                  classification: this.list[index].classification,
                  placeOfOrigin: this.list[index].details,
                  specifications: this.list[index].moneyall,
                  details: this.list[index].details,
                  price: this.list[index].price,
                  launchTime: this.list[index].launchTime,
                  quantity: this.list[index].number
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
          // window.location.reload()
        } else {
          message.info('购买失败，请重新尝试')
        }
      })
    },
    dateFormat: function (time) {
      const date = new Date(time)
      const year = date.getFullYear()
      /* 在日期格式中，月份是从0开始的，因此要加0
       * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
       * */
      const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
      const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
      const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
      const seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
      // 拼接
      return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
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

.checkitem {
  width: 2%;
  /*border: solid red 1px;*/
}

table {
  margin-top: 150px;
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

#buyitem {
  background-color: orangered;
  border: #b3a3b9;
}
</style>
