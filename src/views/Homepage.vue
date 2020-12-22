<template>
  <a-page-header
    style="border: 1px solid rgb(235, 237, 240)"
    title="Title"
    sub-title="This is a subtitle"
    @back="toHome"
  />
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
          <span class="nav-text">购物车</span>
        </a-menu-item>
        <a-menu-item key="3" @click="selectedItem=3">
          <user-outlined/>
          <span class="nav-text">个人中心</span>
        </a-menu-item>
      </a-menu>
      <div>
        <a-switch :default-checked="false" @change="changeTheme"/>
        Change Theme
      </div>
    </a-layout-sider>

    <a-layout>
      <div v-if="selectedItem===1">
        <a-layout-header :style="{ background: '#fff', padding: 0 }">
          <a-row :gutter="[16,16]">
            <a-col :span="4"/>
            <a-col :span="16">
              <div id="search">
                <a-input-search prefix="搜索" @click="searchCommodity" v-model="searchString">搜索</a-input-search>
              </div>
            </a-col>
            <a-col :span="4"/>
          </a-row>
        </a-layout-header>
        <a-layout-content>
          <div>
            content
          </div>
        </a-layout-content>
      </div>

      <div v-if="selectedItem===2">
        <a-layout-content>
          <div>
            购物车
          </div>
        </a-layout-content>
      </div>

      <div v-if="selectedItem===3">
        <a-layout-content>
          <div>
            个人主页
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
  name: 'Homepage',
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
    axios.get('/api/customer?username=' + this.customer.username).then(response => {
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
    searchCommodity: function () {

    }
  }
}
</script>

<style scoped>
#responsive-layout #logo {
  height: 64px;
  /*background: rgba(0, 0, 0, 0);*/
  margin: 32px;
}

#responsive-layout #search {

}
</style>
