<template>
  <div class="loginBackground">
    <div class="content" v-if="showRegister==false">
      <div class="logo">
        <img src="../assets/icons/apartner_logo1_white.png" />
        <br />
        <img src="../assets/icons/apartner_logo2_white.png" />
      </div>

      <input placeholder="Email" type="text" v-model="email" />
      <br />
      <input placeholder="Password" type="password" v-model="password" />
      <br />
      <button v-on:click="Login">Login</button>
      <p class="signup">
        <a class="loginlink" v-on:click.prevent="forgotPass">Forgot password?</a>|
        <a v-on:click.prevent="goToRegister" class="loginlink">Create Account</a>
      </p>
    </div>

    <div class="content register" v-if="showRegister==true">
      <div class="logoRegister">
        <img class="regImg" src="../assets/icons/apartner_logo1_white.png" />
      </div>
      <h1>Create Account</h1>
      <input placeholder="Username" type="text" v-model="reg_username" />
      <br />
      <input placeholder="Email" type="text" v-model="reg_email" />
      <br />
      <input placeholder="Password" type="password" v-model="reg_password" />
      <br />
      <input placeholder="Confirm Password" type="password" v-model="reg_conf_password" />
      <br />
      <button v-on:click="Register">Signup</button>
      <p class="signup">
        <a >Already have account?</a>
        <a v-on:click.prevent="goToLogin" class="loginlink">Login</a>
      </p>
    </div>
  </div>
</template>

<script>
// import PostService from '../services/PostService';
// import manageGlobal from "../global";
import {
  take
} from 'rxjs/operators'

export default {
  data() {
    return {
      isLoggedIn$: this.$user.isLoggedIn$,
      loginResponse: null,
      email: "",
      password: "",
      error: "",
      showRegister: false,
      reg_username: "",
      reg_email: "",
      reg_password: "",
      reg_conf_password: ""
    };
  },

  created() {
    this.isLoggedIn$.pipe(take(1)).subscribe(isLoggedIn => {
      /* eslint-disable no-console */
      if (isLoggedIn && this.$route.name == "") this.$router.push("/notification");
    })
  },

  methods: {
    async Login() {
      this.$user.login$(this.email, this.password)
        .subscribe(
          response => {
            this.loginResponse = response.data;
            alert("登入成功")
            // manageGlobal.changeEmail(this.email);
            // manageGlobal.changePassword(this.password);
            this.$router.push("/notification");
          },
          err => {
            this.error = err;
            alert("登入失敗")
          });
    },
    Register: function() {
      //insert register code
      //send reg_username, reg_email,reg_password,reg_conf_password to api
      this.showRegister = false;
    },
    goToRegister: function() {
      this.showRegister = true;
    },
    goToLogin: function() {
      this.showRegister = false;
    },
    forgotPass: function() {
      alert("You fool, try harder");
    }
  }
};
</script>

<style scoped>
* {
  overflow: hidden;
  max-height: 100%;
  margin: 0;
  padding: 0;
  width:100%;
  color:#fff;
}
.content {
  margin: auto;
  margin-top: 27%;
  margin-bottom: 39%;
  overflow: hidden;
  text-align: center;
  display: inline-block;
}
.register {
  margin: auto;
  margin-top: 15%;
  margin-bottom: 39%;
  overflow: hidden;
  text-align: center;
  display: inline-block;

}
.loginBackground {
  background: url("../assets/backgrounds/login.jpg") center/cover;
  overflow: hidden;
  text-align: center;
}
input,
select {
  border: 1px solid #fff;
  background: transparent;
  border-radius: 20px;
  font-size: 12px;
  height: 35px;
  padding: 6px 15px;
  margin: 10px;
  color: #fff;
  max-width: 100%;
  width: 55%;
  margin-left: 0;
  margin-right: 0;
}
input:focus {
  color: #fff;
}
::placeholder {
  color: #ffffff;
  opacity: 1;
}

button {
  border: 0px;
  background: rgb(41, 171, 97);
  border-radius: 20px;
  font-size: 12px;
  height: 35px;
  padding: 6px 15px;
  margin: 10px;
  color: #fff;
  max-width: 100%;
  width: 55%;
}
.logo {
  max-width: 40%;
  height: auto;
  margin: 10%;
  text-align: center;
  display: inline-block;
}
.logo img {
  max-width: 100%;
  height: auto;
}

.logoRegister {
  max-width: 40%;
  height: auto;
  margin-top: 10%;
  text-align: center;
  display: inline-block;
}
.logoRegister img {
  max-width: 100%;
  height: auto;
}
.signup {
  color: #fff;
  text-decoration: none;
  font-size: 11px;
}
.loginlink {
  color: #fff;
  text-decoration: none;
  font-size: 11px;
  margin: 10px;
}
h1 {
  color: #fff;
  margin-bottom:30px;
  font-size: 25px;
}
</style>
