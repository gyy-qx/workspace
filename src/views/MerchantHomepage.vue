<template>
  <div>
  <h1>桃饱网 <span>我的店铺</span>  </h1>
  <input id="shopname" @click="change" v-model="shopname" readonly="true">
  <div>
    <p id="all"> <strong>我的宝贝</strong></p>
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
      <tr v-for=" (goods,index) in shopname" :key="index" class="tr2">
        <td><input type="text" class="commodity" v-model="goods.id" readonly="true"></td>
        <td><input type="textarea" class="commodityname" v-model="goods.name" readonly="true"></td>
        <td><input type="text" class="commodity" v-model="goods.classifition" readonly="true"></td>
        <td><input type="text" class="commodity" v-model="goods.specification" readonly="true"></td>
        <td>
          <button v-on:click="submoney(index)">-</button>
          <input type="text" class="commodity" v-model="goods.money" readonly="true">
          <button v-on:click="addmoney(index)">+</button>
        </td>
        <td>
          <button v-on:click="subnum(index)">-</button>
          <input type="text" class="commodity" v-model="goods.number">
          <button v-on:click="addnum(index)">+</button>
        </td>
        <td>
          <input type="text" class="commodity" v-model="goods.place" readonly="true">
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
          <td class="exceptcheck"><input type="text" v-model="id"></td>
          <td class="exceptcheck"><input type="textarea" v-model="name"></td>
          <td class="exceptcheck"><input type="text" v-model="classifition"></td>
          <td class="exceptcheck"><input type="text" v-model="specification"></td>
          <td class="exceptcheck">
            <input type="text" v-model="money">
          </td>
          <td class="exceptcheck">
            <input type="text" v-model="number">
          </td>
          <td class="exceptcheck">
            <input type="text" v-model="place">
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

export default {
  name: 'MerchantHomepage',
  data () {
    return {
      id: 1001,
      name: '',
      classifition: '',
      specification: '',
      money: '',
      number: '',
      place: '',
      shopname: [
        {
          id: 1001,
          name: '男装外套套头百搭秋冬潮男ins风',
          classifition: '衣服',
          specification: 'XXL',
          money: '100',
          number: '1',
          place: '上海'
        }
      ]
    }
  },
  created () {
    axios.get('/api/').then(response => {
      const result = response.data
      console.log('返回值为')
      console.log(result)
      this.shopname = response.data
      this.shopname.id = result.id
      this.shopname.businessInformation = result.businessInformation
      this.shopname.phone = result.phone
      this.shopname.classification = result.classification
      this.shopname.money = result.money
      this.shopname.number = result.number
      this.shopname.place = result.place
    }).catch(error => {
      console.log(error)
    })
  },
  methods: {
    change: function () {
      router.push('/changecom')
    },
    inadd: function (index) {
      this.axios({
        method: 'post',
        url: 'api/',
        data: {
          id: this.id,
          name: this.name,
          classifition: this.classifition,
          specification: this.specification,
          money: this.money,
          number: this.number,
          place: this.place
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
    addnum: function (index) {
      this.shopname[index].number++
    },
    subnum: function (index) {
      if (this.shopname[index].number <= 1) {
        alert('受不了啦，宝贝不能再减少啦')
      } else {
        this.shopname[index].number--
      }
    },
    addmoney: function (index) {
      this.shopname[index].money++
    },
    submoney: function (index) {
      if (this.shopname[index].money <= 1) {
        alert('受不了啦，宝贝不能再减少啦')
      } else {
        this.shopname[index].money--
      }
    },
    deleteitem: function (index) {
      this.axios({
        method: 'post',
        url: 'api/',
        data: {
          id: this.shopname[index].id,
          name: this.shopname[index].name,
          classifition: this.shopname[index].classifition,
          specification: this.shopname[index].specification,
          money: this.shopname[index].money,
          number: this.shopname[index].number,
          place: this.shopname[index].place
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
    sure: function (index) {
      this.axios({
        method: 'post',
        url: 'api/',
        data: {
          id: this.shopname[index].id,
          name: this.shopname[index].name,
          classifition: this.shopname[index].classifition,
          specification: this.shopname[index].specification,
          money: this.shopname[index].money,
          number: this.shopname[index].number,
          place: this.shopname[index].place
        },
        headers: {
          token: this.token // 将token放在请求头带到后端
        }
      }).then(res => {
        if (res.data === '修改成功') {
          alert('修改成功')
          window.location.reload()
        } else {
          alert('修改失败，请重新尝试')
        }
      })
    }
  }
}
</script>

<style scoped>
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
  #shopname{
    position: absolute;
    top:100px;
    right:200px;
    font-family: 幼圆;
    font-size: 20px;
    border: none;
    outline: none;
  }
  #all{
    margin-top: 50px;
    font-size:20px;
    color: darkorange;
    float:left;
    margin-left: 250px;
    display: inline-block;
  }
  #count{
    display: inline-block;
    margin-top: 50px;
    font-size: 10px;
    float: right;
    margin-right: 200px;
  }
  hr{
    margin-left: 10%;
    width:80%;
    color:#987cb9;
    SIZE:5px;
    margin-top: 200px;
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
  .tr2 td{
    width: 10%;
    /*border: solid 1px #b3a3b9;*/
    line-height: 120px;
  }
  td button{
    line-height: 20px;
  }
  .exceptcheck input{
    width: 90%;
    height: 50px;
  }
  .commodity{
    border:none;
    width:60%;
    height: 30px;
    text-align: center;
    outline: none;
  }
  .commodityname{
    border: none;
    outline: none;
  }
  #deleteitem{
    border: #7f807d;
  }
  #sure {
    background-color: orangered;
    border:#b3a3b9;
  }
  #inadd{
    background-color: orangered;
    border:#b3a3b9;
    width: 80px;
    height: 50px;
  }
</style>
