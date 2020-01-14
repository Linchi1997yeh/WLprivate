<template>
  <div class="container">
    <section class="content"></section>
    <div class="form">
      <h1>
        <i class="plus square outline icon"></i>新增空房
      </h1>
      <h4>通知夥伴們看半伴新房吧</h4>
      <select v-model="houseName" >
        <option value="">選擇房屋</option>
        <option value="半伴西門">半伴西門</option>
        <option value="半伴北車">半伴北車</option>
        <option value="半伴敦南">半伴敦南</option>
        <option value="半伴民生">半伴民生</option>
      </select>
      
      <input placeholder="房間名稱" v-model="roomName" />
      <br />
      <input placeholder="月租" v-model="price" />
      <br />
      <textarea placeholder="其他備註" v-model="detail" />
      <input
        type="file"
        class="custom-file-input"
        accept="image/*"
        @change="uploadImage"
      />
      <img :src="preview"/>
    </div>
    <button v-on:click.prevent="cancel">取消</button>
    <button class="leftBorder" v-on:click.prevent="send">新增</button>
  </div>
</template>

<script>
// import PostService from '../services/PostService';
export default {
  data() {
    return {
      houseName:"",
      roomName: "",
      price: "",
      // photo:["https://injapan.gaijinpot.com/app/uploads/2012/09/sakurahouse3.jpg"],
      photo: [],
      currentLiving:1,
      capacity:2,
      description: "",
      preview: null,
      detail:""
    };
  },
  /*
  created() {
    //put code here
  },
  */
  methods: {
    send: function() {
      //insert code here (send the form to backend)
      const body = {
        houseName: this.houseName,
        roomName: this.roomName,
        photo: this.photo,
        price:this.price,
        currentLiving: this.currentLiving,
        capacity: this.capacity,
      }
      // PostService.addRoom(body);
      // alert("新增成功");
      this.$http.postFile('/data/rooms', body, 'photo').subscribe(() => {
        alert("新增成功");
        this.$router.push("/emptyhouse");
        this.$router.go("/emptyhouse");
      })
    },
    cancel: function() {
      this.$router.push("/emptyhouse");
    },
    uploadImage(e) {
      const image = e.target.files[0];
      this.photo = [image];

      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = e => {
        this.preview = e.target.result;
      };
    },
    // onChange:function(event){
    //    alert(this.house);
    // }
  }
};
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
  height: auto;
  padding: 5%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  text-align: center;
  color: #797d7f;
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
h4 {
  color: #797d7f;
  display: inline-block;
  margin-top: 10px;
  margin-bottom: 50px;
  text-align: center;
}
h1 {
  text-align: center;
}
input,select {
  border: 1px solid #797d7f;
  opacity: 0.6;
  background: transparent;
  border-radius: 2px;
  font-size: 14px;
  height: 35px;
  max-width: 100%;
  margin: 10px;
  width: 85%;
  padding: 0px 15px;
  color: #797d7f;
}
input:focus {
    color: #000;
  }
::placeholder {
  color: #797d7f;
  opacity: 0.7; 
}  
textarea {
  border: 1px solid #797d7f;
  opacity: 0.6;
  background: transparent;
  border-radius: 2px;
  font-size: 14px;
  height: 130px;
  max-width: 100%;
  width: 85%;
  padding: 15px 15px;
  margin: 10px;
}
.custom-file-input {
  color: transparent;
  border: transparent;
  padding: 0;
  
}
.custom-file-input::-webkit-file-upload-button {
  visibility: hidden;
  height:30px;
}
.custom-file-input::before {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  content: "上傳房間圖片";
  color: black;
  display: inline-block;
  background: #f4f4f4;
  border: 1px solid #797d7f;
  border-radius: 2px;
  padding: 5px 8px;
  outline: none;
  white-space: nowrap;
  -webkit-user-select: none;
  cursor: pointer;
  text-shadow: 1px 1px #fff;
  font-weight: 700;
  font-size: 10pt;
}
.custom-file-input:hover::before {
  border-color: black;
}
.custom-file-input:active {
  outline: 0;
}

img {
  max-width: 100%;
  padding: 0px 28px;
}
</style>
