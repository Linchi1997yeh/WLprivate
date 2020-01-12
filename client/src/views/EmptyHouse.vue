<template>
  <div>
    <section class="content"></section>
    <fab class="floatingBtn" @click.native="fabActions" v-if="role=='staff'"></fab>

    <div class="container">
      <input type="text" v-model="keyword" placeholder="Look for a room..." />
      <div class="filterTags" >
        <button v-on:click="addTag('男')">男</button>
        <button v-on:click="addTag('女')">女</button>
        <button v-on:click="addTag('西門')">西門</button>
        <button v-on:click="addTag('敦南')">敦南</button>
        <button v-on:click="addTag('四人')">四人</button>
        <button v-on:click="addTag('雙人')">雙人</button>
        <button v-on:click="addTag('<=10000')">10000以下</button>
        <button v-on:click="addTag('>10000')">10000以上</button>
      </div>

      <div v-for="emptyRoom of filteredRooms" class="inline" :key="emptyRoom._id">
        <EmptyHouseContainer v-bind:emptyRoom="emptyRoom" />
      </div>
      <div class="hr-sect">End of Available Rooms</div>
    </div>
  </div>
</template>

<script>
import EmptyHouseContainer from "../components/layout/EmptyHouseContainer";
import PostService from '../services/PostService';
import fab from "vue-fab";
// import { map, share } from "rxjs/operators";

export default {
  name: "emptyHouse",
  components: {
    EmptyHouseContainer,
    fab
  },
  data() {
    return {
      // emptyRooms$: this.$http.get("data/rooms").pipe(
      //   map(datas => datas.slice(0, 6)),
      //   share()
      // ),
      emptyHouses: [],
      emptyRooms: [],
      error: "",
      keyword: "",
      role: ""
    };
  },
  props: ["email", "password"],
  
  async created() {
    //get request for all Rooms
    try {
      this.emptyRooms = await PostService.getRooms();
      this.emptyRooms=this.emptyRooms.slice(0,6);
    } catch (err) {
      this.error = err.message;
    }
    
  },
  
  // subscriptions() {
  //   return {
  //     filteredRooms$: this.emptyRooms$.pipe(
  //       map(emptyRooms => {
  //         if (this.keyword != "")
  //           return emptyRooms.filter(
  //             room =>
  //               room.houseName.match(this.keyword) ||
  //               room.roomName.match(this.keyword)
  //           );
  //         else return emptyRooms;
  //       })
  //     )
  //   };
  // },
  computed:{
    filteredRooms:function(){
      return this.emptyRooms.filter((room) => {
        if(room.houseName.match(this.keyword)){
          return room.houseName.match(this.keyword);
        }else if(room.roomName.match(this.keyword)){
          return room.roomName.match(this.keyword);
        }else if(this.keyword==">10000"){
          if(room.price>10000){
            return true;
          }
        }else if(this.keyword=="<=10000"){
          if(room.price<=10000){
            return true;
          }
        }
      });
    }
  },
  methods: {
    fabActions() {
      this.$router.push("/addRoom");
    },
    addTag:function(tagName){
      this.keyword=(tagName);
    }
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
  margin: 10px 0px 80px 0px;
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
  border-radius: 2px;
  font-size: 14px;
  height: 35px;
  max-width: 100%;
  width: 100%;
  padding: 15px 15px;
  margin: 10px 10px 10px 0px;
}
.filterTags{
  margin-bottom:5px;
}
.filterTags button{
  border-radius: 3px;
  border:1px solid #797d7f;
  font-size: 15px;
  background: #f4f4f4;
  margin-left:5px;
  padding:3px;
}
</style>
