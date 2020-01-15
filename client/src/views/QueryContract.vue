<template>
  <div class="container">
    <section class="content"></section>
    <div v-if="viewPersonal">
      <div class="form" v-if="contractData$">
        <h1>我的租約</h1>
        <h4>Email: {{ contractData$.email }}</h4>
        <h4>房型: {{ contractData$.roomName }}</h4>
        <h4>簽約日期: {{ contractData$.startDate | dateformat }}</h4>
        <h4>到期日期: {{ contractData$.endDate | dateformat }}</h4>
        <h4>共 {{ contractData$.duration }} 月</h4>
      </div>
      <button v-on:click.prevent="continueContract">
        一鍵續約
      </button>
      <button class="leftBorder" v-on:click.prevent="contact">
        聯絡半伴
      </button>
    </div>
    <div v-else>
      <div v-for="contract of contractData$" class="form" :key="contract._id">
        <h1>{{contract.user.username}}的租約</h1>
        <h4>Email: {{ contract.email }}</h4>
        <h4>房型: {{ contract.roomName }}</h4>
        <h4>簽約日期: {{ contract.startDate | dateformat }}</h4>
        <h4>到期日期: {{ contract.endDate | dateformat }}</h4>
        <h4>共 {{ contract.duration }} 月</h4>
      </div>
    </div>
    <section class="content"></section>
  </div>
</template>

<script>
// import manageGlobal from '../global';
import { switchMap, share, catchError } from "rxjs/operators";

export default {
  data() {
    return {
      // myContract: [],
      // formatedStartDate: "",
      // formatedEndDate: "",
      viewPersonal: true
      // error: '',
      // role: "",
      // allContracts: []
    };
  },
  subscriptions() {
    const userData$ = this.$user.profile$;
    const contractData$ = userData$.pipe(
      switchMap(user => {
        this.viewPersonal = user.position !== "staff";

        if (user.position == "staff") {
          return this.$http.get("data/contracts", {
            params: { relations: ["email"] }
          });
        } else {
          return this.$http.post("data/queryContract", { email: user.email });
        }
      }),
      catchError(error => console.log(error)),
      share()
    );
    return {
      // userData$,
      contractData$
    };
  },
  methods: {
    continueContract: function() {
      alert(
        "Sorry this function is still under construction, please call Emma at 0953452134"
      );
    },
    contact: function() {
      alert("Call Emma at 0953452134");
    }
    /*
    formatDate(contract) {
        const sDate = new Date(contract.startDate);
        const eDate = new Date(contract.endDate);
      console.log(contract.startDate)
      console.log(contract.endDate)
        contract.formatedStartDate = `${sDate.getDate()}/${sDate.getMonth()}/${sDate.getFullYear()}`;
        contract.formatedEndDate = `${eDate.getDate()}/${eDate.getMonth()}/${eDate.getFullYear()}`;
      return contract
    },
    */
    /*
    async queryContract(){
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
    */
  }
  /*
  created(){
    //put code here
    this.queryContract();
  }
  */
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
h1 {
  /* text-align: center; */
  margin-bottom: 15px;
}
h4 {
  font-size: 18px;
  line-height: 2em;
}
</style>
