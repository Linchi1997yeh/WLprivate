<template>
    <div class="container">
        <div v-if="role==''">
            <section class="content"></section>
            <div class="form">
                <h1>我的租約</h1>
                <h4>Email: {{myContract.email}}</h4>
                <h4>房型: {{myContract.roomName}}</h4>
                <h4>簽約日期: {{this.formatedStartDate}}</h4>
                <h4>到期日期: {{this.formatedEndDate}}</h4>
                <h4>共 {{myContract.duration}} 月</h4>
            </div>
            <button v-on:click.prevent="continueContract">
                一鍵續約
            </button>
            <button class="leftBorder" v-on:click.prevent="contact">
                聯絡半伴
            </button>
        </div>
        <div v-if="role=='manager'">
            <div v-for="allContract in allContracts" class="form" :key="allContract.id">
                <h1>{{allContract.name}}的租約</h1>
                <h4>Email: {{allContract.email}}</h4>
                <h4>房型: {{allContract.roomName}}</h4>
                <h4>簽約日期: {{this.formatedStartDate}}</h4>
                <h4>到期日期: {{this.formatedEndDate}}</h4>
                <h4>共 {{allContract.duration}} 月</h4>
            </div>
        </div>
    </div>
</template>

<script>
import manageGlobal from '../global';
export default {
    data(){
        return{
            myContract:[],
            formatedStartDate:"",
            formatedEndDate:"",
            error:'',
            email: manageGlobal.getEmail(),
            role:"",
            allContracts:[]
        }
    },
    methods:{
        continueContract:function(){
            alert("Sorry this function is still under construction, please call Emma at 0953452134");
        },
        contact:function(){
            alert("Call Emma at 0953452134");
        },
        async queryContract(){
            const url = manageGlobal.getDataUrl() +'queryContract'
            let currObj = this;
            await this.axios.post(url,{
                email: this.email
            })
            .then((response)=>{
                currObj.myContract = response.data;
            })
            .catch(err=>{
                currObj.error = err;
            })
            let sDate = new Date(this.myContract.startDate);
            let eDate = new Date(this.myContract.endDate);
            this.formatedStartDate = `${sDate.getDate()}/${sDate.getMonth()}/${sDate.getFullYear()}`;
            this.formatedEndDate = `${eDate.getDate()}/${eDate.getMonth()}/${eDate.getFullYear()}`;
        }
    },
    created(){
        //put code here
        this.queryContract();
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
h1{
    /* text-align: center; */
    margin-bottom:15px;
}
h4{
    font-size: 18px;
    line-height: 2em;
}
</style>