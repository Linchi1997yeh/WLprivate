<template>
  <div class="card">
    <div class="container">
      <table class="parent" style="height:60px;">
        <tr>
          <td class="child" width="20%">
            <img
              :src="problem.user.photo | image-src"
              alt="User Avatar"
              class="image-cropper"
            />
          </td>
          <td class="child" width="50%">
            <h2 class="event_title">{{ problem.user.username }}的問題</h2>
            <h4>我要報修：{{problem.cathegory}}</h4>
            <h4>House: {{problem.user.houseName}}</h4>
            <h4>內容：{{problem.detail}}</h4>
            <h4>送出日期：{{ problem.date | dateformat }}</h4>
          </td>
        </tr>
      </table>
    </div>
    <button v-if="this.problem.solved==false" v-on:click.prevent="btn1">
      <h3>Solved</h3>
    </button>
    <button v-if="this.problem.solved==true" v-on:click.prevent="btn1" disabled>
      <h3>Solved</h3>
    </button>
    <button class="leftBorder" v-on:click.prevent="btn2">
      <h3>Contact User</h3>
    </button>
  </div>
</template>
<script>

export default {
  data() {
    return {
    };
  },
 
  props: ["problem"],

  methods: {
    btn1: function() {
      //solved=true;
    },
    btn2: function() {
      alert(
          "Sorry this function is under maintenance, please call 0966606799"
        );
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
  width: 75px;
  height: 75px;
  overflow: hidden;
  border-radius: 50%;
  object-fit:cover;
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
  font-size: 20px;
  background-color: transparent;
  height: 30px;
  position: absolute;
  top: 0%;
  right: 0%;
  padding: 0;
  max-width: 30px;
}
select {
  -webkit-appearance: none;
  appearance: none;
}
.threeDotMenu::before {
  display: none;
}
.imageContainer {
  position: relative;
}
.white {
  color: #fff;
  background: transparent;
}
</style>
