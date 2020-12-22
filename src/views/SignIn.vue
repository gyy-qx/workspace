<template>
  <div id="signIn">
    <div id="nav">
      <h1>登录</h1>
    </div>
    <a-row :gutter="[8,16]">
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
    <a-row :gutter="[8,16]">
      <a-col :span="8"/>
      <a-col :span="8">
        <label>
          <a-input prefix="用户名" v-model:value="user.username"></a-input>
        </label>
      </a-col>
      <a-col :span="8"/>
    </a-row>
    <a-row :gutter="[8,16]">
      <a-col :span="8"/>
      <a-col :span="8">
        <label>
          <a-input-password prefix="密码" v-model:value="user.password"></a-input-password>
        </label>
      </a-col>
      <a-col :span="8"/>
    </a-row>
    <a-row :gutter="[8,16]">
      <a-col :span="8"/>
      <a-col :span="8">
        <label>
          <a-input prefix="验证码" v-model:value="user.code"></a-input>
        </label>
      </a-col>
      <a-col :span="8">
        <img class="verify" @click.prevent="refresh" ref="codeImg" alt="验证码" src=""/>
      </a-col>
    </a-row>
    <a-row :gutter="[8,16]">
      <a-col :span="8"/>
      <a-col :span="8">
        <a-space size="middle">
          <label>
            <a-button @click="jumpRegistration" type="link" size="large">注册</a-button>
          </label>
          <label>
            <a-button @click="signIn" type="primary" size="large">登录</a-button>
          </label>
        </a-space>
      </a-col>
      <a-col :span="8"/>
    </a-row>
    <a-row :gutter="[8,16]">
      <a-col :span="8"/>
      <a-col :span="8">
        <label>
          <a-button @click="hello" size="large">HELLO</a-button>
        </label>
      </a-col>
      <a-col :span="8"/>
    </a-row>
  </div>
</template>

<script>
import { message } from 'ant-design-vue'
import router from '@/router'
import store from '@/store'

export default {
  name: 'SignIn',
  data () {
    return {
      role: 'customer',
      user: {
        username: '',
        password: '',
        code: ''
      },
      token: ''
    }
  },
  created () {
    this.axios.get('/api/getVerificationCode/' + Math.floor(Math.random() * 11).toString(), { responseType: 'blob' }).then(
      res => {
        const img = this.$refs.codeImg
        img.src = window.URL.createObjectURL(res.data)
        console.log(res.headers)
        // 取得后台通过响应头返回的sessionId的值
        this.token = res.headers.token
        console.log('token=' + this.token)
      }
    ).catch(
      error => {
        console.log(error)
      }
    )
  },
  methods: {
    signIn: function () {
      if (this.user.code == null || this.user.code === '' || typeof this.user.code === 'undefined') {
        console.log('验证码为' + this.user.code)
        message.info('验证码不能为空')
        return
      }
      this.axios({
        method: 'post',
        url: 'api/signIn',
        data: {
          username: this.user.username,
          password: this.user.password,
          verificationCode: this.user.code
        },
        headers: {
          token: this.token // 将token放在请求头带到后端
        }
      }).then(res => {
        if (res.data === '登录成功') {
          alert('登录成功')
          store.commit('setUsername', this.user.username)
          if (this.role === 'customer') {
            this.$router.push('/homepage')
          } else if (this.role === 'business') {
            this.$router.push('/merchantHomepage')
          }
        } else if (res.data === '验证码错误') {
          message.info('验证码错误')
        } else {
          alert(res.data.msg)
          this.user.code = ''
        }
      })
    },
    refresh: function () {
      this.axios.get('/api/getVerificationCode/' + Math.floor(Math.random() * 11).toString(), { responseType: 'blob' }).then(
        res => {
          const img = this.$refs.codeImg
          img.src = window.URL.createObjectURL(res.data)
          console.log(res.headers)
          // 取得后台通过响应头返回的token的值
          this.token = res.headers.token
          console.log(this.token)
        })
    },
    hello: function () {
      this.axios({
        url: 'api/hello',
        method: 'get',
        headers: {
          token: this.token
        }
      }
      ).then(
        res => {
          console.log(res.data)
        })
    },
    jumpRegistration: function () {
      router.push('/signUp')
    }
  }
}
</script>

<style scoped>
#signIn {
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
