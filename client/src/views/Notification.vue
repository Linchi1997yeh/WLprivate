<template>
  <div>
    <section class="content"></section>
    <div class="container">
      <fab
        class="floatingBtn"
        position="bottom-right"
        :actions="fabActions"
        @addEvent="addEvent"
        @addAlert="addAlert"
        v-if="hasAuth(userData$)"
      ></fab>

      <input type="text" v-model="keyword" placeholder="Look for an event..." />
      <div class="filterTags">
        <button v-for="tag of tags" :key="tag" v-on:click="addTag(tag)">
          {{ tag }}
        </button>
        <!--
        <button v-on:click="addTag('Christmas')">Christmas</button>
        <button v-on:click="addTag('Cooking')">Cooking</button>
        <button v-on:click="addTag('敦')">敦南</button>
        <button v-on:click="addTag('民生')">民生</button>
        <button v-on:click="addTag('大同')">大同</button>
        <button v-on:click="addTag('租金')">租金</button>
        <button v-on:click="addTag('家事')">家事</button>
        <button v-on:click="addTag('吃')">吃</button>
        -->
      </div>

      <div
        v-for="notification of filterByKeyword(notifications$)"
        class="inline"
        :key="notification._id"
      >
        <NotificationContainer
          v-bind:notification="notification"
          v-bind:hasAuth="hasAuth(userData$)"
        />
      </div>

      <div class="hr-sect">End of Notifications</div>
    </div>
  </div>
</template>

<script>
import NotificationContainer from "../components/layout/NotificationContainer";
// import PostService from "../services/PostService";
import fab from "vue-fab";
import { map } from "rxjs/operators";

export default {
  name: "notifications",
  components: {
    NotificationContainer,
    fab
  },
  data() {
    return {
      tags: [
        "Festivals",
        "Climate",
        "敦南",
        "民生",
        "大同",
        "租金",
        "家事",
        "吃"
      ],
      // notifications: [],
      // error: "",
      keyword: "",
      // role:"",
      fabActions: [
        {
          name: "addEvent",
          icon: "date_range"
        },
        {
          name: "addAlert",
          icon: "add_alert"
        }
      ]
    };
  },
  subscriptions() {
    return {
      userData$: this.$user.profile$,
      notifications$: this.$http
        .get("/data/events")
        .pipe(
          map(ns =>
            ns.sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0))
          )
        )
    };
  },
  // props: ["email", "password"],
  /*
  async created() {
    //get request for all notifications
    try {
      this.notifications = await PostService.getEvents();
    } catch (err) {
      this.error = err.message;
    }
  },
  */
  computed: {
    /*
    filteredNotifications:function(){
      return this.notifications.filter((notification) => {
        if(notification.title.match(this.keyword)){
          return notification.title.match(this.keyword);
        }else if(notification.place.match(this.keyword)){
          return notification.place.match(this.keyword);
        }else if(this.keyword=="吃"){
          if(notification.title.match("Cooking")||notification.title.match("湯圓")||notification.title.match("飯")){
            return true;
          }
        }else if(this.keyword=="家事"){
          if(notification.title.match("廁所")||notification.title.match("掃")){
            return true;
          }
        }
      });
    }
    */
  },
  methods: {
    hasAuth(user) {
      if (!user) return false;
      return user.position == "manager" || user.position == "staff";
    },
    filterByKeyword(notifications) {
      const keyword = this.keyword;
      if (keyword == "") return notifications;

      return notifications.filter(n => this.isMatchKeyword(n, keyword));
    },
    /*
    async getNotification() {
      this.notifications = await PostService.getEvents();
    },
    */
    addEvent() {
      this.$router.push("/addEvent");
    },
    addAlert() {
      alert("Clicked on alert icon");
    },
    addTag: function(tagName) {
      this.keyword = tagName;
    },
    isMatchKeyword: function(notification, keyword) {
      if (keyword == "") return true;

      const title = notification.title;
      const place = notification.place;
      if (title.match(keyword)) {
        return true; // title.match(keyword);
      } else if (place.match(keyword)) {
        return true; // place.match(keyword);
      } else if (keyword == "吃") {
        const eatTitles = ["Cooking", "湯圓", "飯"];
        return eatTitles.some(eatT => title.match(eatT));
      } else if (keyword == "家事") {
        const houseWorkTitles = ["掃", "廁所"];
        return houseWorkTitles.some(houseWorkT => title.match(houseWorkT));
      } else if (keyword == "敦南") {
        const dungnanTitles = ["敦化", "敦南"];
        return dungnanTitles.some(dungnanWorkT => place.match(dungnanWorkT));
      } else if (keyword == "Climate") {
        const climateTitles = ["Future", "地球"];
        return climateTitles.some(climateWorkT => title.match(climateWorkT));
      } else if (keyword == "Festivals") {
        const festivalTitles = [
          "年",
          "冬至",
          "New Year",
          "Christmas",
          "Thanks Giving"
        ];
        return festivalTitles.some(festivalWorkT => title.match(festivalWorkT));
      }
    }
    /*
    sortbyDate: function(filteredNotifications) {
      if (!filteredNotifications) return filteredNotifications;
      return filteredNotifications.sort((a, b) => new Date(b.date) - new Date(a.date))
    }
    */
  }
};
</script>

<style scoped>
.content {
  background: #f4f4f4;
  background-position: right center;
  height: 60px;
  text-align: center;
}
.hr-sect {
  display: flex;
  flex-basis: 100%;
  align-items: center;
  color: #c7c6c5;
  margin: 20px 0px 80px 0px;
}
.hr-sect::before,
.hr-sect::after {
  content: "";
  flex-grow: 1;
  background: #c7c6c5;
  height: 1px;
  font-size: 0px;
  line-height: 0px;
  margin: 0px 8px;
}
.hr-sect::before {
  margin-left: 15%;
}
.hr-sect::after {
  margin-right: 15%;
}
input {
  border: 1px solid #797d7f;
  opacity: 0.6;
  background: #fff;
  border-radius: 20px;
  font-size: 14px;
  height: 35px;
  max-width: 100%;
  width: 100%;
  padding: 15px 15px;
  margin: 10px 10px 10px 0px;
}
.filterTags {
  margin-bottom: 5px;
}
.filterTags button {
  border-radius: 3px;
  border: 1px solid #797d7f;
  font-size: 15px;
  background: #f4f4f4;
  margin-left: 5px;
  padding: 3px;
}
</style>
