<template>
  <h1>桃饱网 <span>企业</span>  </h1>
  <div id="navlight"></div>
  <p id="all"> <strong>修改企业信息</strong></p>
  <hr>
  <div id="comSignUp">
    <p class="first" style="margin-top: 120px"><span>*</span>基本信息</p>
    <p class="sec">
      <span>用户名</span><input type="text" placeholder="会员名" v-model="businessRegisterVo.username" size="default">
    </p>
    <p class="sec">
      <span>姓</span><input type="text" v-model="businessRegisterVo.lastname">
    </p>
    <p class="sec">
      <span>名</span><input type="text" v-model="businessRegisterVo.firstname">
    </p>
    <p class="sec">
      <span>身份证号码</span><input type="text" placeholder="请输入身份证号码" v-model="businessRegisterVo.idCard">
    </p>
    <p class="sec">
      <span>联系方式</span><input type="text" placeholder="请输入电话" v-model="businessRegisterVo.phone">
    </p>
    <p class="first"><span>*</span>企业信息</p>
    <p class="sec">
      <span>分类</span><input type="phone" placeholder="请输入企业类别" v-model="businessRegisterVo.classification">
    </p>
    <p class="sec">
      <span>企业名</span><input type="text" placeholder="请输入营业执照上的公司名称" v-model="businessRegisterVo.shopName">
    </p>
    <p class="first"> <span>*</span> 银行卡信息</p>
    <p class="sec">
      <span>工商信息</span><input type="text" placeholder="请填写社会统一信用编码" v-model="businessRegisterVo.businessInformation">
    </p>
    <p class="sec">
      <span>银行卡号</span><input type="text" placeholder="请输入银行卡号" v-model="businessRegisterVo.bankCardNumber">
    </p>
    <p class="sec">
      <span>余额</span><input type="text" placeholder="请输入你的银行卡余额" v-model="businessRegisterVo.balance">
    </p>
    <p class="first"><span>*</span>请设置登录密码</p>
    <p class="sec">
      <span>密码</span><input type="text" placeholder="设置你的登录密码" v-model="businessRegisterVo.password">
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
      business: {
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
    this.business.username = store.state.username
    console.log(store.state.username)
    axios.get('/api/business/username/' + this.business.username).then(response => {
      const result = response.data
      console.log('返回值为')
      console.log(result)
      this.business.id = result.id
      this.business.shopName = result.shopName
      this.business.businessInformation = result.businessInformation
      this.business.phone = result.phone
      this.business.classification = result.classification
    }).catch(error => {
      console.log(error)
    })
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
