import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue'
import Notification from '../views/Notification.vue'
import EmptyHouse from '../views/EmptyHouse.vue'
import QueryContract from '../views/QueryContract.vue'
import ReportProblem from '../views/ReportProblem.vue'
import PersonalProfile from '../views/PersonalProfile.vue'
import AddEvent from '../views/AddEvent.vue'
import AddRoom from '../views/AddRoom.vue'
import EditProfile from '../views/EditProfile.vue'

Vue.use(VueRouter);


export default new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes : [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/notification',
      name: 'notification',
      component: Notification
    },
    {
      path: '/emptyhouse',
      name: 'emptyhouse',
      component: EmptyHouse
    },
    {
      path: '/querycontract',
      name: 'querycontract',
      component: QueryContract
    },
    {
      path: '/reportproblem',
      name: 'reportproblem',
      component: ReportProblem
    },
    {
      path: '/personalprofile',
      name: 'personalprofile',
      component: PersonalProfile
    },
    {
      path:'/addEvent',
      name:'addEvent',
      component:AddEvent
    },
    {
      path:'/addRoom',
      name:'addRoom',
      component:AddRoom
    },
    {
      path:'/editProfile',
      name:'editProfile',
      component:EditProfile
    }
  ]
});
