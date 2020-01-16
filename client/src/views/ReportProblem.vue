<template>
  <div>
    <section class="content"></section>
    <div class="container guest" v-if="isGuest(userData$)">
      <div class="form guest">
        <h1 style="text-align:center">問題回報</h1>
        <h4>有任何問題都可以透過這裡送出</h4>

        <div id="checkboxes">
          <input type="radio" value="facility" v-model="categories" />
          <label>報修設備</label>
          <input type="radio" value="roommate" v-model="categories" />
          <label>報修室友</label>
          <br />

          <div v-if="this.categories=='facility'">
            <input type="checkbox" value="light" v-model="details" />
            <label>燈泡</label>
            <input type="checkbox" value="ac" v-model="details" />
            <label>冷氣</label>
            <input type="checkbox" value="window" v-model="details" />
            <label>窗戶</label>
            <input type="checkbox" value="closet" v-model="details" />
            <label>衣櫃</label>
            <input type="checkbox" value="table" v-model="details" />
            <label>桌子</label>
            <input type="checkbox" value="chair" v-model="details" />
            <label>椅子</label>
          </div>
          <div v-if="this.categories=='roommate'">
            <input type="checkbox" value="bully" v-model="details" />
            <label>霸凌</label>
            <input type="checkbox" value="noisy" v-model="details" />
            <label>太吵</label>
            <input type="checkbox" value="smoke" v-model="details" />
            <label>抽菸</label>
            <input type="checkbox" value="alchoholic" v-model="details" />
            <label>喝酒</label>
            <input type="checkbox" value="dirty" v-model="details" />
            <label>太髒</label>
            <input type="checkbox" value="smelly" v-model="details" />
            <label>太臭</label>
          </div>
        </div>
        <input placeholder="Room Number" />
        <br />
        <textarea placeholder="其他備註" v-model="details" />
      </div>
      <button v-on:click.prevent="call">打給半伴</button>
      <button class="leftBorder" v-on:click.prevent="send">送出表單</button>
    </div>

    <div v-else>
      <div v-for="problem in problems$" class="form" :key="problem.id">
        <ProblemContainer v-bind:problem="problem" v-bind:hasAuth="hasAuth(userData$)"></ProblemContainer>
      </div>

      <!-- <div class="form manyForm">
        
        <h1>鈺臻的問題</h1>
        <h4>我要報修: 設備</h4>
        <br />
        <h4>Room: 3C</h4>
        <br />
        <h4>內容: 窗戶掉下樓了</h4>
        <br />
        <h4>送出日期: 01/09/2020 12:14</h4>
      </div>
      <div class="form manyForm">
        <h1>裕勝的問題</h1>
        <h4>我要報修: 室友</h4>
        <br />
        <h4>Room: 6A</h4>
        <br />
        <h4>內容: 室友是 Iron Korea Powder</h4>
        <br />
        <h4>送出日期: 01/10/2020 16:20</h4>
      </div>
      <div class="form manyForm">
        <h1>嘉勇的問題</h1>
        <h4>我要報修: 室友</h4>
        <br />
        <h4>Room: 6A</h4>
        <br />
        <h4>內容: 室友排擠僑生</h4>
        <br />
        <h4>送出日期: 01/10/2020 18:57</h4>
      </div> -->
    </div>
    <section class="content"></section>
  </div>
</template>

<script>
import ProblemContainer from "../components/layout/ProblemContainer";
export default {
  components: {
    ProblemContainer
  },
  data() {
    return {
      categories: "",
      details: [],
    };
  },
  subscriptions() {
    return {
      userData$: this.$user.profile$,
      problems$: this.$http
        .get("/data/problems", { params: { relations: ["host"] } })
        // .pipe(
        //   map(ns =>
        //     ns.sort((a, b) => (a.date > b.date ? -1 : a.date < b.date ? 1 : 0))
        //   )
        // )
    };
  },
  created() {
  },
  methods: {
    isGuest(user) {
      if (!user) return true;
      else return user.position === "";
    },
    send: function() {
      //insert code here (send the form to backend)
      alert("成功送出表單");
    },
    call: function() {
      alert("Call Emma at 0953452134");
    },
    // sortBySolved(problems) {
      
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
}
.manyForm {
  margin-bottom: 10px;
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
.guest h4 {
  color: #797d7f;
  display: inline-block;
  margin-top: 10px;
  margin-bottom: 30px;
  text-align: center;
}
.guest h1 {
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
  color: #797d7f;
}
input:focus {
  color: #797d7f;
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
  max-width: 100%;
  width: 85%;
  padding: 15px 15px;
  margin: 10px;
  color: #797d7f;
}
#checkboxes {
  display: inline-block;
  width: 100%;
  padding: 15px 40px 15px 0px;
  margin: 0px;
}
#checkboxes input {
  display: inline-block;
  margin: 0px;
  margin-right: 0px;
  margin-left: 25px;
  margin-bottom: 15px;
  height: 15px;
  max-width: 100%;
  width: 15%;
  padding: 0px 0px;
}
#checkboxes label {
  display: inline-block;
  margin: 0px;
  padding: 0;
}
#checkboxes radio {
  display: inline-block;
  margin: 0px;
  padding: 0;
  width: 5px;
}
.form h1 {
  text-align: left;
  margin-bottom: 15px;
}
.form h4 {
  text-align: left;
  font-size: 18px;
  line-height: 0.5em;
  margin-top: 0px;
  margin-bottom: 0px;
}
</style>
