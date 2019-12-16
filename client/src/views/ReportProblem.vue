<template>
    <div class="container">
        <section class="content"></section>
        <div class="form">
            <h1>問題回報</h1>
            <h4>有任何設備問題或是人際問題都可以透過這裡送出</h4>
            <input placeholder="Your Name"/><br>
            <input placeholder="Your Room Number"/><br>
            <textarea placeholder="Your Problem"/>
        </div>
        <button v-on:click.prevent="call">
            打給半伴
        </button>
        <button class="leftBorder" v-on:click.prevent="send">
            送出表單
        </button>
    </div>
</template>

<script>
export default {
    data(){
        return{
            myContract:"",
            formatedStartDate:"",
            formatedEndDate:""
        }
    },
    created(){
        //put code here
    },
    methods:{
        send:function(){
            //insert code here (send the form to backend)
            alert("成功送出表單");
        },
        call:function(){
            alert("Call Emma at 0953452134");
        }
    }
}
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
    height:auto;
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
    margin-bottom:50px;
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
    max-width:100%;
    width:85%;
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
    max-width:100%;
    width:85%;
    padding: 15px 15px;
    margin: 10px;
    color:#fff;
  }
</style>