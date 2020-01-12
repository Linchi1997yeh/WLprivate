<template>
  <div class = "container">
  <h1>Latest Post</h1>
  <!-- Create Post here -->
  <div class="create-post">
    <label for="create-post">say something...</label>
    <input type="text" name=""  v-model = "text" placeholder="Create a post">
    <input type="text" name=""  v-model = "username" placeholder="Username">
    <input type="text" name=""  v-model = "email" placeholder="E-mail">
    <input type="text" name=""  v-model = "password" placeholder="Password">
    <button v-on:click ="clickRegister" >Post!</button>
    <button v-on:click ="clickLogin" >Log-in!</button>
    <button v-on:click ="check" >check!</button>
  </div>
  <hr>
  <p class="error" v-if="error">{{ error }}</p>
  <div class="posts-container">
    <div class="post" 
      v-for="(post, index) in posts"
      v-bind:item = "post"
      v-bind:index = "index"
      v-bind:key = "post.id"
      v-on:dblclick="deletePost(post._id)"
      >
        {{ `${post.date.getDate()}/${post.date.getMonth()}/
        ${post.date.getFullYear()}` }}
        <p class="text">{{ post.email }}</p>
        <p class="text">{{ post.username }}</p>
        <p class="text">{{ post.password }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import PostService from '../services/PostService';

export default {
  name: 'PostComponent',
  data(){
    return{
      posts: [],
      error:'',
      text:'',
      username:'',
      email:'',
      password:'',
    }
  },
  async created() {
    try{
      this.posts = await PostService.getPosts();
    } catch(err){
      this.error = err.message;
    }
  },
  methods: {
    async createPost(){
      await PostService.insertPost(this.text);
      this.posts = await PostService.getPosts();
    },
    async deletePost(id) {
      await PostService.deletePost(id);
      this.posts = await PostService.getPosts();
    },
    async clickRegister(){
      await PostService.memberRegister(this.username,this.email,this.password);
      this.posts = await PostService.getPosts();
    },
    async clickLogin(){
      await PostService.memberLogin(this.email,this.password);
    },
    async check(){
      await PostService.check();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div.container {
  max-width: 800px;
  margin: 0 auto;
}

p.error {
  border: 1px solid #ff5b5f;
  background-color: #ffc5c1;
  padding: 10px;
  margin-bottom: 15px;
}

div.post {
  position: relative;
  border: 1px solid #5bd658;
  background-color: #bcffb8;
  padding: 10px 10px 30px 10px;
  margin-bottom: 15px;
}

div.created-at{
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px 15 px 5px 15px;
  background-color: darkgreen;
  color: white;
  font-size: 13px;
}

p.text {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0;
}
</style>
