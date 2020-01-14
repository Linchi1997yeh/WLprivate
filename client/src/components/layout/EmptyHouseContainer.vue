<template>
  <div class="profileCard">
    <div class="imageContainer">
      <button class="threeDotMenu" v-if="hasAuth"><i class="ellipsis vertical icon white" ></i></button>
      <select v-model="choice" v-if="hasAuth" class="threeDotMenu" v-on:change="deleteItem()">
        <option>Delete</option>
      </select>
      <img v-bind:src="emptyRoom.photo[0]" alt="House Picture" class="cropProfilePic" />
    </div>
    
    <div class="cardContainer">
      <table class="parent" style="height:60px;">
        <tr>
          <td class="child" width="25%">
            <img
              src="../../assets/Examples/example_avatar.png"
              alt="Host Avatar"
              class="image-cropper"
            />
          </td>
          <td class="child" width="80%">
            <h2>{{emptyRoom.houseName}} Room {{emptyRoom.roomName}}</h2>
            <h4>NT${{emptyRoom.price}}/月</h4>
          </td>
        </tr>
      </table>
    </div>
    <button v-on:click.prevent="callBtn">Call</button>
    <button class="leftBorder" v-on:click.prevent="emailBtn">Email</button>
  </div>
  <!-- <div class="profileCard">
      
    <img src="../../assets/Examples/example_room.jpg" alt="House Picture" class="cropProfilePic" />
    <div class="cardContainer">
      <table class="parent" style="height:60px;">
        <tr>
          <td class="child" width="20%">
            <img src="../../assets/Examples/example_avatar.png" alt="Host Avatar" class="image-cropper" />
          </td>
          <td class="child" width="50%">
            <h2>半伴 成大 Room 5A</h2>
            <h4>NT$5000/月</h4>
          </td>
        </tr>
      </table>

    </div>
    <button v-on:click.prevent="callBtn">Call</button><button class="leftBorder" v-on:click.prevent="emailBtn">Email</button>
  </div>-->
</template>


<script>
import PostService from '../../services/PostService';
export default {
  data() {
    return {
      // role:""
      choice: '',
    };
  },
  /*
  subscriptions() {
    return {
      userData$: this.$user.profile$
    }
  },
  */
  props: ["emptyRoom", "hasAuth"],
  methods: {
    callBtn: function() {
      alert("Please call Emma at 0973412388");
    },
    emailBtn: function() {
      alert("Please email Emma at apartner_emma@gmail.com");
    },
    deleteItem: function() {
      //call delete api
      let data = {
         houseName:this.$props.emptyRoom.houseName,
         roomName:this.$props.emptyRoom.roomName
        }
      PostService.deleteRoom(data);
      alert(this.$props.emptyRoom.houseName+this.$props.emptyRoom.roomName+" deleted");
      
    }
  }
};
</script>

<style scoped>
.cardContainer {
  margin: auto;
  margin-top: 3%;
  margin-bottom: 3%;
  overflow: hidden;
  width: 90%;
}
.profileCard {
  background: #fff;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  /* max-width: 300px; */
  width: 100%;
  margin: auto;
  text-align: left;
  font-family: arial;
  display: inline-block;
  height: auto;
  margin: 0 0 20px 0;
}
h4,
p {
  color: #797d7f;
  display: inline-block;
  /* margin-top: 8px; */
  margin-bottom: 8px;
}

.right {
  float: right;
}

h2 {
  font-size: 20px;
}

.image-cropper {
  width: 60px;
  height: 60px;
  overflow: hidden;
  border-radius: 50%;
  object-fit: cover;
}
.cropProfilePic {
  width: 100%;
  height: 200px;
  overflow: hidden;
  object-fit: cover;
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

.imageContainer select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
}

.imageContainer select::-ms-expand {
  display: none;
}

.leftBorder {
  border-left: 1px solid #eaeaea;
}
.threeDotMenu {
  border: none;
  color: transparent;
  font-size: 20px;
  background-color: transparent;
  height: 30px;
  position: absolute;
  top: 0%;
  right: 0%;
  padding: 0;
  max-width: 30px;
}
.threeDotMenu::before {
  display: none;
}
select{
  -webkit-appearance: none;
    appearance: none;
}
.imageContainer {
  position: relative;
}
.white {
  color: #fff;
  background: transparent;
}
</style>
