<template>
  <div class="container">
    <section class="content"></section>
    <div class="form">
      <h1><i class="calendar plus outline icon"></i>新增活動</h1>
      <h4>半伴個新活動吧</h4>
      <input placeholder="活動名稱" v-model="eventName" />
      <br />
      <input
        onfocus="(this.type='date')"
        placeholder="活動日期"
        v-model="eventDate"
      />
      <br />
      <input placeholder="活動地址" v-model="eventAddress" />
      <br />
      <textarea placeholder="其他備註" v-model="eventDescription" />
      <input
        type="file"
        placeholder="活動圖片"
        class="custom-file-input"
        accept="image/*"
        @change="uploadImage"
      />
      <img :src="preview" />
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
      eventName: "",
      // email:"staff@gmail.com",
      eventDate: "",
      eventAddress: "",
      eventDescription: "",
      eventImage: "https://truth.bahamut.com.tw/s01/201708/d681acd50b03a07815103f41543abba8.JPG",
      eventPhone:"0966606799",
      preview: null
    };
  },
  created() {
    //put code here
  },
  methods: {
    send: function() {
      /*
      let body = {
        eventName: this.eventName,
        email: this.email,
        eventDate: this.eventDate,
        eventAddress: this.eventAddress,
        eventDescription:this.eventDescription,
        eventImage:this.eventImage,
        eventPhone:this.eventPhone
      }
      PostService.addEvent(body);
      alert("成功送出表單");
      // this.$router.push("/emptyhouse");

      this.$router.push("/notification");
      this.$router.go("/notification");
      */
      const body = {
        houseToShow: ['半伴西門','半伴敦南','半伴北車'],
        title: this.eventName,
        date: this.eventDate,
        place: this.eventAddress,
        description:this.eventDescription,
        photo:this.eventImage,
        phoneNumber:this.eventPhone,
      }
      this.$http.postFile('data/events', body, 'photo').subscribe(() => {
        alert("新增成功")
        this.$router.push("/notification");
      }, () => {
        alert("新增失敗")
      })
    },
    cancel: function() {
      this.$router.push("/notification");
    },
    uploadImage(e) {
      const image = e.target.files[0];
      this.eventImage = image
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = e => {
        this.eventImage = e.target.result;
        this.preview = e.target.result;
      };
    }
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
input {
  border: 1px solid #797d7f;
  opacity: 0.6;
  background: transparent;
  border-radius: 2px;
  font-size: 14px;
  height: 35px;
  max-width: 100%;
  width: 85%;
  padding: 15px 15px;
  margin: 10px;
}
/* input:focus {
    color: #fff;
  } */
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
}
.custom-file-input::before {
  content: "上傳活動圖片";
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
