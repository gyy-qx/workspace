<template>
  <h1>桃饱网 <span>个人中心</span>  </h1>
  <div id="nav">
    <a @click="Homepage">桃饱首页</a>
    <a @click="order">我的订单</a>
    <a @click="bussiness">免费开店</a>
    <a @click="purchase" style="margin-right: 100px">购物车</a>
  </div>
  <div id="navlight"></div>
  <a-layout id="responsive-layout">

    <a-layout-sider breakpoint="lg" collapsed-width="0" @collapse="onCollapse" @breakpoint="onBreakpoint">
      <div>
        <img id="logo" src="../assets/peach.png" alt="logo">
      </div>
      <a-menu :theme="theme" mode="inline" v-model:selectedKeys="selectedKeys">
        <a-menu-item key="1" @click="selectedItem=1">
          <HomeOutlined/>
          <span class="nav-text">主页</span>
        </a-menu-item>
        <a-menu-item key="2" @click="selectedItem=2">
          <ShoppingCartOutlined/>
          <span class="nav-text">已经买到的宝贝</span>
        </a-menu-item>
        <a-menu-item key="3" @click="selectedItem=3">
          <user-outlined/>
          <span class="nav-text">账户设置</span>
        </a-menu-item>
      </a-menu>
      <div>
        <a-switch :default-checked="false" @change="changeTheme"/>
        Change Theme
      </div>
    </a-layout-sider>

    <a-layout>
      <div v-if="selectedItem===1">
        <a-layout-content>
          <div>
            在此输出客户信息
          </div>
        </a-layout-content>
      </div>

      <div v-if="selectedItem===2">
        <a-layout-content>
          <div>
            已经买到的宝贝，显示订单
          </div>
        </a-layout-content>
      </div>

      <div v-if="selectedItem===3">
        <a-layout-content>
          <div>
            修改客户信息
          </div>
        </a-layout-content>
      </div>

    </a-layout>
  </a-layout>
</template>

<script>
import { HomeOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons-vue'
import router from '@/router'
import store from '@/store'
import axios from 'axios'

export default {
  name: 'Myaccount',
  data () {
    return {
      theme: 'light',
      selectedKeys: ['3'],
      selectedItem: Number,
      searchString: '',

      customer: {
        id: '',
        roleName: 'customer',
        username: '',

        lastname: '',
        firstname: '',
        idCard: '',
        phone: '',
        email: '',
        nickname: '',
        bankCardNumber: '',
        password: ''
      }
    }
  },
  components: {
    HomeOutlined,
    ShoppingCartOutlined,
    UserOutlined
  },
  created () {
    this.customer.username = store.state.username
    console.log(store.state.username)
    axios.get('/api/customer/username/' + this.customer.username).then(response => {
      const result = response.data
      console.log('返回值为')
      console.log(result)
      this.customer.id = result.id
      this.customer.phone = result.phone
    }).catch(error => {
      console.log(error)
    })
  },
  methods: {
    changeTheme (checked) {
      this.theme = checked ? 'dark' : 'light'
    },
    onCollapse (collapsed, type) {
      console.log(collapsed, type)
    },
    onBreakpoint (broken) {
      console.log(broken)
    },
    toHome: function () {
      router.push('/signIn')
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
    Homepage: function () {
      router.push('/Homepage')
    },
    searchCommodity: function () {

    }
  }
}
</script>

<style scoped>
  #logo {
  height: 64px;
  /*background-color: white;*/
  margin: 32px;
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
  font-size: 30px;
  color:#41464b;
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
#responsive-layout{
  width: 80%;
  margin-top: 150px;
  margin-left: 200px;
}
#responsive-layout #search {

}
</style>
