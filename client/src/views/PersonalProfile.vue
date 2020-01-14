<template>
    <div class="container">
        <section class="content"></section>
        <div v-if="userData$" class="form">
            <img :src="userData$.photo | image-src" alt="Host Avatar" class="image-cropper" />
            <h1>{{userData$.username}}</h1>
            <h4>{{userData$.houseName}} 的 {{positionName(userData$.position)}} </h4>
            <!--
            &nbsp;<h4 v-if="userData$.position==''"> 住客</h4><h4 v-if="userData$.position!=''"> {{userData$.position}}</h4><br>
            -->
            <!-- <h4>{{this.userData.email}}</h4> -->
            
        </div>
        <button v-on:click.prevent="editprofile">
            Edit Profile
        </button>
        <button class="leftBorder" v-on:click.prevent="logout">
            Log Out
        </button>
    </div>
</template>

<script>
// import manageGlobal from '../global';
// import app from '../App.vue'

export default {
  data() {
    return {
      // preview: null,
      // userData:[],
      // email: this.$user.profile.email,
      // password:manageGlobal.getPassword,
      // error: ''
    }
  },
  subscriptions() {
    return {
      userData$: this.$user.profile$
    }
  },
  methods: {
    positionName(position) {
      if(position == '') return '住客'
      else if(position == 'manager') return '小管家'
      else return '員工'
    },
    editprofile: function() {
      //insert code here (send the form to backend)
      this.$router.push("/editprofile");
      // alert("不准改");
    },
    logout: function() {
      this.$user.logout$()
      this.$router.push("/");
    },
    /*
      async getUserData(){
          const url = manageGlobal.getUserUrl()+'profile';
          let currObj =this;
          await this.axios.post(url,{
              email: this.email
          })
          .then(response=>{
              currObj.userData = response.data;
          })
          .catch(err=>{
              currObj.error = err
          })
      }
      */
  },
  /*
    async created(){
        //put code here
        await this.getUserData();
        
    }
    */
}
</script>

<style scoped>
.content {
  background: #f4f4f4;
  background-position: right center;
  height: 80px;
  text-align: center;
}

.form {
  background: #fff;
  padding: 5%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  text-align: center;
}

button {
  width: 50%;
  border: 0px;
  height: 50px;
  background-color: #fff;
  color: #797D7F;
  font-size: 14px;
  font-weight: bold;
  border-top: 1px solid #f4f4f4;
}

button:hover {
  background-color: #f4f4f4;
  color: #000;
}

.leftBorder {
  border-left: 1px solid #eaeaea;
}

h4 {
  color: #797D7F;
  display: inline-block;
  margin-top: 10px;
  text-align: center;
}

h1 {
  text-align: center;
}

input {
  border: 1px solid #797D7F;
  opacity: 0.6;
  background: transparent;
  border-radius: 2px;
  font-size: 14px;
  height: 35px;
  width: 100%;
  padding: 15px 15px;
  margin: 10px;
  color: #fff;
}

input:focus {
  color: #fff;
}

::placeholder {
  color: #797D7F;
  opacity: 0.7;
}

textarea {
  border: 1px solid #797D7F;
  opacity: 0.6;
  background: transparent;
  border-radius: 2px;
  font-size: 14px;
  height: 180px;
  width: 100%;
  padding: 15px 15px;
  margin: 10px;
  color: #fff;
}
  
.image-cropper {
  max-width: 100%;
  border-radius: 50%;
}

</style>
