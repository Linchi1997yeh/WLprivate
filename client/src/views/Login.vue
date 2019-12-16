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
        <router-link to="/signup" class="loginlink">Forgot password?</router-link>|
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
// import PostService from '../PostService';
import manageGlobal from "../global";
export default {
  data() {
    return {
      loginResponse: [],
      email: "",
      password: "",
      error: "",
      showRegister: false,
      reg_username:"",
      reg_email:"",
      reg_password:"",
      reg_conf_password:""
    };
  },
  methods: {
    async Login() {
      let currObj = this;
      const newurl = "http://localhost:3000/member/login";
      await this.axios
        .post(newurl, {
          email: this.email,
          password: this.password
        })
        .then(response => {
          currObj.loginResponse = response.data;
        })
        .catch(err => {
          currObj.error = err;
        });
      if (this.loginResponse.valid) {
        manageGlobal.changeEmail(this.email);
        manageGlobal.changePassword(this.password);
        this.$router.push("/notification");
      }
    },
    Register:function(){
      //insert register code
      //send reg_username, reg_email,reg_password,reg_conf_password to api
      this.showRegister = false;
    },
    goToRegister: function() {
      this.showRegister = true;
    },
    goToLogin: function() {
      this.showRegister = false;
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