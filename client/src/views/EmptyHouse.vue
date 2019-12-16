<template>
  <div>
    <section class="content"></section>
    <fab class="floatingBtn" @click.native="fabActions" ></fab>
    <div class="container">
      <input type="text" v-model="keyword" placeholder="Look for a room..."/>
      <div v-for="emptyRoom in filteredRooms" class="inline" :key="emptyRoom.id">
        <EmptyHouseContainer v-bind:emptyRoom="emptyRoom" />
      </div>
      <div class="hr-sect">End of Available Rooms</div>
    </div>
    
  </div>
</template>

<script>
import EmptyHouseContainer from "../components/layout/EmptyHouseContainer";
import PostService from '../PostService';
import fab from "vue-fab";

export default {
  name: "emptyHouse",
  components: {
    EmptyHouseContainer,
    fab
  },
  data() {
    return {
      emptyHouses: [],
      emptyRooms:[],
      error:'',
      keyword:"",
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
  computed:{
    filteredRooms:function(){
      return this.emptyRooms.filter((emptyRoom) => {
        if (emptyRoom.houseName.match(this.keyword)){
          return emptyRoom.houseName.match(this.keyword);
        }else if(emptyRoom.roomName.match(this.keyword)){
          return emptyRoom.roomName.match(this.keyword);
        }else{
          return emptyRoom.roomName.match(this.keyword);
        }
        
      });
    }
  },
  methods:{
    fabActions() {
      this.$router.push('/addRoom');
    },
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
</style>