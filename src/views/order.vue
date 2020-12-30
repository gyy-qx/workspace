<template>
  <div id="order">
    <div id="nav">
      <a @click="Homepage">桃饱首页</a>
      <a @click="purchase">购物车</a>
      <a @click="bussiness">免费开店</a>
      <a @click="myaccount" style="margin-right: 100px">个人中心</a>
    </div>
    <div id="navlight"></div>
    <h1>桃饱网 <span>我的订单</span>  </h1>
    <div>
      <p id="all"> <strong>全部订单</strong></p>
    </div>
    <hr>
    <table>
      <thead>
      <tr>
        <th colspan="4">商品信息</th>
        <th>数量</th>
        <th>金额</th>
        <th>发货地</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody v-for=" (company,index) in companyList" :key="index">
      <tr class="tr1">
        <td colspan="8">店铺：{{company.name}}</td>
      </tr>
      <tr v-for=" (user,cindex) in company.list" :key="cindex" class="tr2">
        <td><input type="text" class="commodity" v-model="user.id" readonly="true"></td>
        <td><input type="textarea" id="commodityname" v-model="user.name" readonly="true"></td>
        <td><input type="text" class="commodity" v-model="user.classifition" readonly="true"></td>
        <td><input type="text" class="commodity" v-model="user.specification" readonly="true"></td>
        <td>
          <input type="text" class="commodity" v-model="user.number" readonly="true">
<!--          <input type="text" value="count" v-model="user.number">-->
        </td>
        <td><input type="text" class="commodity" v-model="user.money" readonly="true"></td>
        <td><input type="text" class="commodity" v-model="user.place" readonly="true"></td>
        <td>
          <button id="deleteitem" @click="deleteitem(index,cindex)">删除</button>
          <button id="buyitem" @click="buyitem(index,cindex)">再来一单</button>
        </td>
      </tr>
    </tbody>
    </table>
  </div>
</template>

<script>
import router from '@/router'
export default {
  name: 'order',
  data: function () {
    return {
      suncount: 0,
      companyList: [
        {
          name: '时尚男装',
          list: [
            {
              id: 1001,
              name: '男装外套套头百搭秋冬潮男ins风',
              classifition: '衣服',
              specification: 'XXL',
              money: '100',
              number: '1',
              place: '上海'
            },
            {
              id: 1002,
              name: '女装外套',
              classifition: '衣服',
              specification: 'L',
              money: '200',
              number: '1',
              place: '郑州'
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
              place: '上海'
            },
            {
              id: 1002,
              name: '女装外套',
              classifition: '衣服',
              specification: 'L',
              money: '200',
              number: '1',
              place: '郑州'
            }
          ]
        }
      ]
    }
  },
  methods: {
    purchase: function () {
      router.push('/purchase')
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
    deleteitem: function (index, cindex) {
      this.axios({
        method: 'post',
        url: 'api/',
        data: {
          // id后续传值图片
          id: this.companyList[index].list[cindex].id,
          name: this.companyList[index].list[cindex].name,
          classifition: this.companyList[index].list[cindex].classifition,
          specification: this.companyList[index].list[cindex].moneyall,
          money: this.companyList[index].list[cindex].money,
          number: this.companyList[index].list[cindex].number,
          place: this.companyList[index].list[cindex].place
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
          place: this.companyList[index].list[cindex].place
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
    width:60%;
    height: 30px;
    text-align: center;
    outline: none;
  }
  #commodityname{
    border: none;
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
