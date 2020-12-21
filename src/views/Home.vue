<template>
  <div class="home">
    <div id="nav">
      <!--    <router-link to="/">Home</router-link> |-->
      <!--    <router-link to="/about">About</router-link>-->
    </div>
    <img alt="Vue logo" src="../assets/peach.png">
    <h1>{{ msg }}</h1>
    <a-space size="middle">
      <router-link to="/signUp">
        <a-button type="link">去注册</a-button>
      </router-link>
      <router-link to="/signIn">
        <a-button type="link">去登录</a-button>
      </router-link>
    </a-space>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  data () {
    return {
      msg: 'Welcome to 桃饱 App'
    }
  }
}
</script>
<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.home {
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

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
