<template>
    <div class="container">
        <section class="content"></section>
        <div class="form">
            <img src="../assets/Examples/example_avatar.png" alt="Host Avatar" class="image-cropper" /><br>
            <button>Change Profile Picture</button>
            <input placeholder="這個要bind username" v-model="username">
            <input placeholder="這個要bind email" v-model="email">
            
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

</script>

<style scoped>
.content {
  background: #f4f4f4;
  background-position: right center;
  height: 80px;
  text-align: center;
}
.form{
    background:#fff;
    padding:5%;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
     text-align: center;
}
button{
    width:50%;
    border:0px;
    height:50px;
    background-color: #fff;
    color:#797D7F;
    font-size: 14px;
    font-weight: bold;
    border-top:1px solid #f4f4f4;
}
button:hover{
    background-color: #f4f4f4;
    color:#000;
}
.leftBorder{
    border-left:1px solid #eaeaea;
}
h4{
    color:#797D7F;
    display: inline-block;
    margin-top:10px;
    text-align: center;
}
h1{
    text-align: center;
}
input{
    border: 1px solid #797D7F;
    opacity: 0.6;
    background: transparent;
    border-radius: 2px;
    font-size: 14px;
    height: 35px;
    width:100%;
    padding: 15px 15px;
    margin: 10px;
    color:#fff;
  }
  input:focus {
    color: #fff;
  }
  ::placeholder { 
  color: #797D7F;
  opacity: 0.7;
  }
  textarea{
      border: 1px solid #797D7F;
    opacity: 0.6;
    background: transparent;
    border-radius: 2px;
    font-size: 14px;
    height: 180px;
    width:100%;
    padding: 15px 15px;
    margin: 10px;
    color:#fff;
  }
  .image-cropper {
  width: 120px;
  height: 120px;
  overflow: hidden;
  border-radius: 50%;
}
</style>
