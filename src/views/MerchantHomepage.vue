<template>
  <div>
    <h1>桃饱网 <span>我的店铺</span></h1>
    <input id="shopname" @click="change" v-model="business.shopName" readonly="true">
    <div>
      <p id="all"><strong>我的宝贝</strong></p>
      <!--    <p id="count"> <button @click="">上新</button></p>-->
    </div>
    <hr>
    <div id="content">
      <table>
        <thead>
        <tr>
          <th colspan="4">商品信息</th>
          <th>单价</th>
          <th>库存</th>
          <th>发货地</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(commodity,index) in commodities" :key="index" class="tr2">
          <td><input type="text" class="commodity" v-model="commodity.id" readonly="true"></td>
          <td><input type="textarea" class="commodityname" v-model="commodity.name" readonly="true"></td>
          <td><input type="text" class="commodity" v-model="commodity.classification" readonly="true"></td>
          <td><input type="text" class="commodity" v-model="commodity.specifications" readonly="true"></td>
          <td>
            <button v-on:click="submoney(index)">-</button>
            <input type="text" class="commodity" v-model="commodity.price" readonly="true">
            <button v-on:click="addmoney(index)">+</button>
          </td>
          <td>
            <button v-on:click="subnum(index)">-</button>
            <input type="text" class="commodity" v-model="commodity.quantity">
            <button v-on:click="addnum(index)">+</button>
          </td>
          <td>
            <input type="text" class="commodity" v-model="commodity.placeOfOrigin" readonly="true">
          </td>
          <td>
            <button id="sure" @click="sure(index)">确定</button>
            <button id="deleteitem" @click="deleteitem(index)">下架</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div id="twobox">
      <table>
        <thead>
        <tr>
          <th>商品编号</th>
          <th>商品名称</th>
          <th>分类</th>
          <th>规格</th>
          <th>单价</th>
          <th>库存</th>
          <th>发货地</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td class="exceptcheck"><input type="text" v-model="newCommodity.id"></td>
          <td class="exceptcheck"><input type="textarea" v-model="newCommodity.name"></td>
          <td class="exceptcheck"><input type="text" v-model="newCommodity.classification"></td>
          <td class="exceptcheck"><input type="text" v-model="newCommodity.specifications"></td>
          <td class="exceptcheck">
            <input type="text" v-model="newCommodity.price">
          </td>
          <td class="exceptcheck">
            <input type="text" v-model="newCommodity.quantity">
          </td>
          <td class="exceptcheck">
            <input type="text" v-model="newCommodity.placeOfOrigin">
          </td>
          <td class="exceptcheck">
            <button id="inadd" @click="inadd">上架</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import router from '@/router'
import store from '@/store'
import { message } from 'ant-design-vue'

export default {
  name: 'MerchantHomepage',
  data () {
    return {
      business: {
        id: '',
        roleName: '',
        username: '',
        bankCardNumber: '',
        shopName: '',
        businessInformation: '',
        classification: ''
      },
      commodities: null,
      newCommodity: {
        id: '',
        name: '',
        classification: '',
        placeOfOrigin: '',
        specifications: '',
        details: '',
        price: null,
        launchTime: '',
        quantity: null
      }
    }
  },
  created () {
    axios.get('api/business/username/' + store.state.username).then(
      response => {
        const businessInfo = response.data
        this.business.id = businessInfo.id
        this.business.username = businessInfo.username
        this.business.shopName = businessInfo.shopName
        console.log('id:' + this.business.id)
      }
    ).catch(error => {
      console.log(error)
    })
    const url = 'api/commodity/businessUsername/' + store.state.username
    console.log('username:' + this.business.username)
    console.log('URL:' + url)
    axios.get(url).then(response => {
      const result = response.data
      console.log('返回值为')
      console.log(result)
      this.commodities = result
    }).catch(error => {
      console.log(error)
    })
  },
  methods: {
    change: function () {
      router.push('/changecom')
    },
    inadd: function () {
      this.axios({
        method: 'post',
        url: 'api/commodity',
        data: {
          id: this.newCommodity.id,
          name: this.newCommodity.name,
          classification: this.newCommodity.classification,
          specifications: this.newCommodity.specifications,
          price: this.newCommodity.price,
          quantity: this.newCommodity.quantity,
          placeOfOrigin: this.newCommodity.placeOfOrigin,
          details: '',
          launchTime: this.dateFormat(new Date()),
          businessId: this.business.id
        },
        headers: {
          token: this.token // 将token放在请求头带到后端
        }
      }).then(res => {
        if (res.data === '上架成功') {
          message.info('上架成功')
          // alert('删除成功')
          // window.location.reload()
        } else {
          message.info('上架失败，请重新尝试')
          // alert('删除失败，请重新尝试')
        }
      })
    },
    addnum: function (index) {
      this.commodities[index].quantity++
    },
    subnum: function (index) {
      if (this.commodities[index].quantity <= 1) {
        message.info('受不了啦，宝贝不能再减少啦')
        // alert('受不了啦，宝贝不能再减少啦')
      } else {
        this.commodities[index].quantity--
      }
    },
    addmoney: function (index) {
      this.commodities[index].price++
    },
    submoney: function (index) {
      if (this.commodities[index].price <= 1) {
        message.info('受不了啦，宝贝不能再减少啦')
        // alert()
      } else {
        this.commodities[index].price--
      }
    },
    deleteitem: function (index) {
      this.axios({
        method: 'delete',
        url: 'api/commodity/' + this.commodities[index].id,
        headers: {
          token: this.token // 将token放在请求头带到后端
        }
      }).then(res => {
        if (res.data === '删除成功') {
          message.info('删除成功')
          this.commodities.splice(index, 1)
        } else {
          message.info('删除失败，请重新尝试')
        }
      })
    },
    sure: function (index) {
      this.axios({
        method: 'patch',
        url: 'api/commodity',
        data: {
          id: this.commodities[index].id,
          businessId: this.commodities[index].businessId,
          name: this.commodities[index].name,
          classification: this.commodities[index].classification,
          specifications: this.commodities[index].specifications,
          price: this.commodities[index].price,
          quantity: this.commodities[index].quantity,
          placeOfOrigin: this.commodities[index].place,
          launchTime: this.commodities[index].launchTime,
          details: this.commodities[index].details
        },
        headers: {
          token: this.token // 将token放在请求头带到后端
        }
      }).then(res => {
        if (res.data === '修改成功') {
          message.info('修改成功')
          // alert('修改成功')
          // window.location.reload()
        } else {
          message.info('修改失败，请重新尝试')
          // alert('修改失败，请重新尝试')
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

#shopname {
  position: absolute;
  top: 100px;
  right: 200px;
  font-family: 幼圆;
  font-size: 20px;
  border: none;
  outline: none;
}

#all {
  margin-top: 50px;
  font-size: 20px;
  color: darkorange;
  float: left;
  margin-left: 250px;
  display: inline-block;
}

hr {
  margin-left: 10%;
  width: 80%;
  color: #987cb9;
  SIZE: 5px;
  margin-top: 200px;
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

.tr2 td {
  width: 10%;
  /*border: solid 1px #b3a3b9;*/
  line-height: 120px;
}

td button {
  line-height: 20px;
}

.exceptcheck input {
  width: 90%;
  height: 50px;
}

.commodity {
  border: none;
  width: 60%;
  height: 30px;
  text-align: center;
  outline: none;
}

.commodityname {
  border: none;
  outline: none;
}

#deleteitem {
  border: #7f807d;
}

#sure {
  background-color: orangered;
  border: #b3a3b9;
}

#inadd {
  background-color: orangered;
  border: #b3a3b9;
  width: 80px;
  height: 50px;
}
</style>
