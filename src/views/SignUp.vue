<template>
  <div id="signUp">
    <div id="nav">
      <h1>注册</h1>
    </div>
    <div>
      <a-row :gutter="[8,24]" type="flex" justify="space-around">
        <a-col :span="8"/>
        <a-col :span="8">
          <a-radio-group v-model:value="role" button-style="solid">
            <a-radio-button value="business">
              我是商户
            </a-radio-button>
            <a-radio-button value="customer">
              我是顾客
            </a-radio-button>
          </a-radio-group>
        </a-col>
        <a-col :span="8"/>
      </a-row>
    </div>
    <div v-if="role==='business'">
      <a-row :gutter="[8,24]">
        <a-col :span="8"/>
        <label>
          <a-input prefix="用户名" v-model:value="businessRegisterVo.username" size="default"></a-input>
        </label>
        <a-col :span="8"/>
      </a-row>
      <a-row :gutter="[8,24]">
        <a-col :span="8"/>
        <label>
          <a-input prefix="姓" v-model:value="businessRegisterVo.lastname" size="default"></a-input>
        </label>
        <a-col :span="8"/>
      </a-row>
      <a-row :gutter="[8,24]">
        <a-col :span="8"/>
        <label>
          <a-input prefix="名" v-model:value="businessRegisterVo.firstname" size="default"></a-input>
        </label>
        <a-col :span="8"/>
      </a-row>
      <a-row :gutter="[8,24]">
        <a-col :span="8"/>
        <label>
          <a-input prefix="身份证号码" v-model:value="businessRegisterVo.idCard" size="default"></a-input>
        </label>
        <a-col :span="8"/>
      </a-row>
      <a-row :gutter="[8,24]">
        <a-col :span="8"/>
        <label>
          <a-input prefix="联系方式" v-model:value="businessRegisterVo.phone" size="default" type="phone"></a-input>
        </label>
        <a-col :span="8"/>
      </a-row>
      <a-row :gutter="[8,24]">
        <a-col :span="8"/>
        <label>
          <a-input prefix="分类" v-model:value="businessRegisterVo.classification" size="default"></a-input>
        </label>
        <a-col :span="8"/>
      </a-row>
      <a-row :gutter="[8,24]">
        <a-col :span="8"/>
        <label>
          <a-input prefix="商铺名" v-model:value="businessRegisterVo.shopName" size="default"></a-input>
        </label>
        <a-col :span="8"/>
      </a-row>
      <a-row :gutter="[8,24]">
        <a-col :span="8"/>
        <label>
          <a-input prefix="工商信息" v-model:value="businessRegisterVo.businessInformation" size="default"></a-input>
        </label>
        <a-col :span="8"/>
      </a-row>
      <a-row :gutter="[8,24]">
        <a-col :span="8"/>
        <label>
          <a-input prefix="银行卡号" v-model:value="businessRegisterVo.bankCardNumber" size="default"></a-input>
        </label>
        <a-col :span="8"/>
      </a-row>
      <a-row :gutter="[8,24]">
        <a-col :span="8"/>
        <label>
          <a-input prefix="余额" v-model:value="businessRegisterVo.balance" size="default"></a-input>
        </label>
        <a-col :span="8"/>
      </a-row>
      <a-row :gutter="[8,24]">
        <a-col :span="8"/>
        <label>
          <a-input-password prefix="密码" v-model:value="businessRegisterVo.password" size="default"></a-input-password>
        </label>
        <a-col :span="8"/>
      </a-row>
    </div>

    <div v-if="role==='customer'">
      <a-row :gutter="[8,24]">
        <a-col :span="8"/>
        <label>
          <a-input prefix="用户名" v-model:value="customerRegisterVo.username" size="default"></a-input>
        </label>
        <a-col :span="8"/>
      </a-row>
      <a-row :gutter="[8,24]">
        <a-col :span="8"/>
        <label>
          <a-input prefix="昵称" v-model:value="customerRegisterVo.nickname" size="default"></a-input>
        </label>
        <a-col :span="8"/>
      </a-row>
      <a-row :gutter="[8,24]">
        <a-col :span="8"/>
        <label>
          <a-input prefix="姓" v-model:value="customerRegisterVo.lastname" size="default"></a-input>
        </label>
        <a-col :span="8"/>
      </a-row>
      <a-row :gutter="[8,24]">
        <a-col :span="8"/>
        <label>
          <a-input prefix="名" v-model:value="customerRegisterVo.firstname" size="default"></a-input>
        </label>
        <a-col :span="8"/>
      </a-row>
      <a-row :gutter="[8,24]">
        <a-col :span="8"/>
        <label>
          <a-input prefix="身份证号码" v-model:value="customerRegisterVo.idCard" size="default"></a-input>
        </label>
        <a-col :span="8"/>
      </a-row>
      <a-row :gutter="[8,24]">
        <a-col :span="8"/>
        <label>
          <a-input prefix="联系方式" v-model:value="customerRegisterVo.phone" size="default"></a-input>
        </label>
        <a-col :span="8"/>
      </a-row>
      <a-row :gutter="[8,24]">
        <a-col :span="8"/>
        <label>
          <a-input prefix="邮箱" v-model:value="customerRegisterVo.email" size="default"></a-input>
        </label>
        <a-col :span="8"/>
      </a-row>
      <a-row :gutter="[8,24]">
        <a-col :span="8"/>
        <label>
          <a-input prefix="银行卡号" v-model:value="customerRegisterVo.bankCardNumber" size="default"></a-input>
        </label>
        <a-col :span="8"/>
      </a-row>
      <a-row :gutter="[8,24]">
        <a-col :span="8"/>
        <label>
          <a-input prefix="余额" v-model:value="customerRegisterVo.balance" size="default"></a-input>
        </label>
        <a-col :span="8"/>
      </a-row>
      <a-row :gutter="[8,24]">
        <a-col :span="8"/>
        <label>
          <a-input-password prefix="密码" v-model:value="customerRegisterVo.password" size="default"></a-input-password>
        </label>
        <a-col :span="8"/>
      </a-row>
    </div>
    <a-row :gutter="[8,24]">
      <a-col :span="8"/>
      <label>
        <a-button @click="register" type="primary" size="large">注册</a-button>
      </label>
      <a-col :span="8"/>
    </a-row>
  </div>
</template>

<script>

export default {

  name: 'SignUp',
  data () {
    return {
      role: 'customer',
      businessRegisterVo: {
        roleName: this.role,
        username: null,
        lastname: null,
        firstname: null,
        idCard: null,
        phone: null,
        bankCardNumber: null,
        balance: null,
        password: null,
        shopName: null,
        businessInformation: null,
        classification: null
      },
      customerRegisterVo: {
        roleName: this.role,
        username: null,
        lastname: null,
        firstname: null,
        idCard: null,
        phone: null,
        email: null,
        nickname: null,
        bankCardNumber: null,
        balance: null,
        password: null
      }

    }
  },
  methods: {
    businessRegister: function () {

    },
    customerRegister: function () {

    },
    register: function () {
      if (this.role === 'business') {
        this.businessRegister()
      } else if (this.role === 'customer') {
        this.customerRegister()
      }
    }
  }
}
</script>

<style scoped>
#signUp {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

</style>
