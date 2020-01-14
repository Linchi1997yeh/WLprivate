<template>
  <div class="container">
    <section class="content"></section>
    <div class="form">
      <img
        :src="preview"
        alt="Host Avatar"
        class="image-cropper"
      /><br />
      <input
        type="file"
        class="custom-file-input"
        accept="image/*"
        @change="uploadImage"
      />
      <input class="edit" placeholder="這個要bind username" v-model="username" />
      <input class="edit" placeholder="這個要bind email" v-model="email" />

      <!--密碼先不要改好了 感覺很麻煩 -->
      <!-- <input placeholder="這個要bind password" v-model="password">
            <input placeholder="這個要bind confirm password" v-model="confirmPassword"> -->
    </div>
    <button v-on:click.prevent="cancel">
      Cancel
    </button>
    <button class="leftBorder" v-on:click.prevent="save">
      Save
    </button>
  </div>
</template>

<script>
import {tap} from 'rxjs/operators'

export default {
  name: "editprofile",
  data() {
    return {
      username: '',
      email: '',
      photo: null,
      preview: null,
    }
  },
  subscriptions() {
    const profile = this.$user.profile$.pipe(tap(user => {
      this.username = user.username
      this.email = user.email
      this.photo = this.$http.getFullPath(user.photo)
      this.preview = this.photo || require('../assets/Examples/example_avatar.png')
    }))
    return {
      userData$: profile,
    };
  },
  methods: {
    cancel() {
      this.$router.push('/personalprofile')
    },
    save() {
      const body = {
        username: this.username,
        email: this.email,
        photo: this.photo,
      }
      this.$user.updateProfile$(body).subscribe(
        () => {
          alert('更新成功')
          this.$router.push('/personalprofile')
        },
        () => {
          alert('更新失敗')
        }
      )
    },
    uploadImage(e) {
      const image = e.target.files[0];
      this.photo = image;

      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = e => {
        this.preview = e.target.result;
      };
    },
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
  padding: 5%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  text-align: center;
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
  text-align: center;
}
h1 {
  text-align: center;
}
.edit {
  border: 1px solid #797d7f;
  opacity: 0.6;
  background: transparent;
  border-radius: 2px;
  font-size: 14px;
  height: 35px;
  width: 100%;
  padding: 15px 15px;
  margin: 10px;
  /*color: #fff;*/
}
.edit:focus {
  /*color: #fff;*/
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
  height: 180px;
  width: 100%;
  padding: 15px 15px;
  margin: 10px;
  color: #fff;
}
.image-cropper {
  width: 120px;
  height: 120px;
  overflow: hidden;
  border-radius: 50%;
}

.custom-file-input::-webkit-file-upload-button {
  visibility: hidden;
  height:30px;
}
.custom-file-input::before {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  content: "更新個人圖片";
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
</style>
