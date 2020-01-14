<template>
  <div class="card">
    <div class="imageContainer">
      <button class="threeDotMenu" v-if="hasAuth"><i class="ellipsis vertical icon white" ></i></button>
      <select v-if="hasAuth" v-model="choice" class="threeDotMenu" v-on:change="deleteItem">
        <option>Delete</option>
      </select>
      <img class="event_pic" alt="Event Picture" v-bind:src="notification.photo" />
    </div>

    <div class="container">
      <table class="parent" style="height:60px;">
        <tr>
          <td class="child" width="20%">
            <img
              src="../../assets/Examples/example_avatar.png"
              alt="Host Avatar"
              class="image-cropper"
            />
          </td>
          <td class="child" width="50%">
            <h2 class="event_title">{{notification.title}}</h2>
            <h4>
              {{notification.date | dateformat }}
              <br />
              {{notification.place}}
            </h4>
            <h5>{{notification.description}}</h5>
          </td>
        </tr>
      </table>
    </div>
    <button v-on:click.prevent="btn1">
      <h3 v-if="notification.type == 'event' ">Join</h3>
      <h3 v-if="notification.type == 'notification' ">Contact Host</h3>
    </button>
    <button class="leftBorder" v-on:click.prevent="btn2">
      <h3 v-if="notification.type == 'event' ">View</h3>
      <h3 v-if="notification.type == 'notification' ">View</h3>
    </button>
  </div>
</template>
<script>
import PostService from '../../services/PostService';
export default {
  data() {
    return {
      // formatedDate: "",
      choice:null,
      // role:""
    };
  },
  /*
  subscriptions() {
    return {
      userData$: this.$user.profile$
    }
  },
  */
  props: ["notification", "hasAuth"],
  /*
  created() {
    this.formatedDate = `${this.$props.notification.date.getDate()}/${this.$props.notification.date.getMonth() +
      1}/${this.$props.notification.date.getFullYear()}`;
  },
  */
  methods: {
    deleteItem: function(){
        //call delete api
        let data = {
         title:this.$props.notification.title
        }
        // console.log(data);
        PostService.deleteEvent(data);
        alert(this.$props.notification.title+" deleted");
        this.$router.push("/notification");
        this.$router.go('/notification');
        
    },
    btn1: function() {
      if (this.$props.notification.type == "event") {
        alert(
          "Sorry this function is under maintenance, please call " +
            this.$props.notification.phoneNumber
        );
      } else if (this.$props.notification.type == "notification") {
        alert(
          "Sorry this function is under maintenance, please call " +
            this.$props.notification.phoneNumber
        );
      }
    },
    btn2: function() {
      const noti = this.$prop.notification
      if (noti.type == "event") {
        alert(`Sorry this function is under maintenance, please call ${noti.phoneNumber}`)
      } else if (noti.type == "notification") {
        alert(`Phone: ${noti.phoneNumber}\nEmail: ${noti.host}`)
      }
    }
  }
};
</script>

<style scoped>
* {
  background: #fff;
}
.container {
  margin: auto;
  margin-top: 3%;
  margin-bottom: 3%;
  overflow: hidden;
  /* position: relative; */
  width: 90%;
}
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  width: 100%;
  text-align: left;
  font-family: arial;
  display: inline-block;
  margin: 0 0 20px 0;
}
h3,
h2 {
  display: inline-block;
}
.event_title {
  display: inline-block;
  margin-top: 5px;
}
h5,
p {
  color: #797d7f;
  display: inline-block;
  margin-top: 10px;
}
h3 {
  color: #797d7f;
}
.date_display {
  padding-top: 8px;
  float: right;
}

.right {
  margin: 0px;
  float: right;
}

.image-cropper {
  width: 60px;
  height: 60px;
  overflow: hidden;
  border-radius: 50%;
}

button {
  width: 50%;
  border: 0px;
  height: 50px;
  background-color: #fff;
  color: #797d7f;
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
.event_pic {
  width: 100%;
  max-height: 150px;
  overflow: hidden;
  object-fit: cover;
}
.threeDotMenu {
  border: none;
  color: transparent;
  font-size:20px;
  background-color: transparent;
  height: 30px;
  position: absolute;
  top: 0%;
  right: 0%;
  padding:0;
  max-width: 30px;
}
select{
  -webkit-appearance: none;
    appearance: none;
}
.threeDotMenu::before {
  display: none;
}
.imageContainer {
  position: relative;
}
.white{
    color:#fff;
    background: transparent;
}
</style>
