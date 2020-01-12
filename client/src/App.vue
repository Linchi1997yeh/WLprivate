<template>
  <div v-if="isLoggedIn$">
    <Header />
    <router-view />
    <ToolBar />
  </div>
  <div class="login" v-else>
    <Login />
  </div>
</template>

<script>
import Header from "./components/layout/Header"
import ToolBar from "./components/layout/ToolBar"
import Login from "./views/Login"
// import Register from "./views/Register"
// import globalService from './global.js';

export default {
  name: "app",
  components: {
    Header,
    ToolBar,
    Login,
    // Register
  },
  /*
  data() {
    return {
      // show: false,
      // to: "/notification",
      // from: "/"
    };
  },
  */
  subscriptions() {
    return {
      isLoggedIn$: this.$user.isLoggedIn$,
    }
  },
  watch: {
    /*
    $route() {
      if (globalService.getEmail() == "") {
        this.show = false;
      } else {
        this.show = true;
      }
    }
    */
  }

};
</script>

<style>
* {
  font-family: Microsoft JhengHei, Helvetica, sans-serif;
  color: #494848;
  box-sizing: border-box;
  margin: 0;
  padding: 0;

  /* overflow: hidden; */
}

body {
  background: #f4f4f4;
  line-height: 1.4;
  height: 100%;
}

.container {
  margin: auto;
  overflow: hidden;
  position: relative;
  width: 98%;
}

.login {
  height: 100%;
}

.floatingBtn {
  margin-bottom: 40px;
}
</style>
