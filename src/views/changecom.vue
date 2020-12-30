<template>
  <h1>桃饱网 <span>企业</span>  </h1>
  <p id="all"> <strong>修改企业信息</strong></p>
  <hr>
  <div id="comSignUp">
    <p class="first" style="margin-top: 120px"><span>*</span>基本信息</p>
    <p class="sec">
      <span>用户名</span><input type="text" v-model="businessRegisterVo.username">
    </p>
    <p class="sec">
      <span>姓</span><input type="text" v-model="businessRegisterVo.lastname">
    </p>
    <p class="sec">
      <span>名</span><input type="text" v-model="businessRegisterVo.firstname">
    </p>
    <p class="sec">
      <span>身份证号码</span><input type="text" v-model="businessRegisterVo.idCard">
    </p>
    <p class="sec">
      <span>联系方式</span><input type="text" v-model="businessRegisterVo.phone">
    </p>
    <p class="first"><span>*</span>企业信息</p>
    <p class="sec">
      <span>分类</span><input type="phone" v-model="businessRegisterVo.classification">
    </p>
    <p class="sec">
      <span>企业名</span><input type="text" v-model="businessRegisterVo.shopName">
    </p>
    <p class="first"> <span>*</span> 银行卡信息</p>
    <p class="sec">
      <span>工商信息</span><input type="text" v-model="businessRegisterVo.businessInformation">
    </p>
    <p class="sec">
      <span>银行卡号</span><input type="text" v-model="businessRegisterVo.bankCardNumber">
    </p>
    <p class="sec">
      <span>余额</span><input type="text" v-model="businessRegisterVo.balance">
    </p>
    <p class="first"><span>*</span>重新设置登录密码</p>
    <p class="sec">
      <span>密码</span><input type="text" v-model="businessRegisterVo.password">
    </p>
  </div>
  <input type="button" @click="register" id="login" value="提  交">
</template>

<script>
import axios from 'axios'
import store from '@/store/index'

export default {
  name: 'changecom',
  data () {
    return {
      businessRegisterVo: {
        id: '',
        roleName: 'business',
        username: '',
        lastname: '',
        firstname: '',
        idCard: '',
        phone: '',
        bankCardNumber: '',
        password: '',
        shopName: '猪猪女孩',
        businessInformation: '',
        classification: ''
      }
    }
  },
  created () {
    this.businessRegisterVo.username = store.state.username
    console.log(store.state.username)
    axios.get('/api/business/username/' + this.businessRegisterVo.username).then(response => {
      const result = response.data
      console.log('返回值为')
      console.log(result)
      this.businessRegisterVo.id = result.id
      this.businessRegisterVo.shopName = result.shopName
      this.businessRegisterVo.businessInformation = result.businessInformation
      this.businessRegisterVo.phone = result.phone
      this.businessRegisterVo.classification = result.classification
      this.businessRegisterVo.idCard = result.idCard
      this.businessRegisterVo.bankCardNumber = result.bankCardNumber
      this.businessRegisterVo.password = result.password
    }).catch(error => {
      console.log(error)
    })
  },
  methods: {
    register: function () {
      this.axios({
        method: 'post',
        url: 'api/',
        data: {
          id: this.businessRegisterVo.id,
          username: this.businessRegisterVo.username,
          lastname: this.businessRegisterVo.lastname,
          firstname: this.businessRegisterVo.firstname,
          shopName: this.businessRegisterVo.shopName,
          businessInformation: this.businessRegisterVo.businessInformation,
          phone: this.businessRegisterVo.phone,
          classification: this.businessRegisterVo.classification,
          idCard: this.businessRegisterVo.idCard,
          bankCardNumber: this.businessRegisterVo.bankCardNumber,
          password: this.businessRegisterVo.password
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
    font-size: 30px;
    color:#41464b;
  }
  #nav a{
    text-decoration: none;
    font-size: 15px;
    color: #41464b;
    margin-right: 20px;
  }
  hr{
    margin-left: 10%;
    width:80%;
    color:#987cb9;
    SIZE:5px;
    margin-top: 200px;
  }
  #all{
    margin-top: 0px;
    font-size:20px;
    color: darkorange;
    float:left;
    margin-left: 250px;
    display: inline-block;
  }
  .first{
    font-size: 20px;
    margin-right: 40%;
  }
  .first span{
    color: lightcoral;
  }
  .sec{
    color: #4f5050;
  }
  .sec input{
    border:solid 1px #c4d0ff;
    position: absolute;
    left: 60%;
  }
  .sec span{
  }
  #login{
    color:white;
    width: 20%;
    height: 10%;
    display: block;
    margin-top: 50px;
    margin-left: 40%;
    background-color: orangered;
    border: none;
    box-shadow: #1a1e21;
    border-radius: 10px;
  }
</style>
