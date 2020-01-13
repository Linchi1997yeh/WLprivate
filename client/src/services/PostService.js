import axios from 'axios'

export const BASE_URL = 'http://localhost:3000'
// const url = 'http://localhost:5000/member/login/';
const newurl = `${BASE_URL}/member/`
const dataurl = `${BASE_URL}/data/`


class PostService{
    // Get all events
    static getEvents(){
        return new Promise(async(resolve, reject)=>{
            try {
                const res = await axios.get(dataurl+'events');
                const data = res.data;
                resolve(
                    data.map(event=>({
                        type:event.type,
                        place:event.place,
                        date:new Date(event.date),
                        photo:event.photo,
                        houseToShow:event.houseToShow,
                        title:event.title,
                        description:event.description,
                        phoneNumber:event.phoneNumber,
                        host:event.host
                    }))
                );
            } catch(err){
                reject(err);
            }
        })
    }
    // get all Rooms
    static getRooms(){
        return new Promise(async(resolve, reject)=>{
            try {
                const res = await axios.get(dataurl+'rooms');
                const datas = res.data;
                resolve(
                    datas.map(data=>({
                        houseName:data.houseName,
                        roomName:data.roomName,
                        price:data.price,
                        photo:data.photo,
                        currentLiving:data.currentLiving,
                        capacity:data.capacity,
                    }))
                );
            } catch(err){
                reject(err);
            }
        })
    }
    static memberLogin(email,password){
        return new Promise(async(resolve, reject)=>{
            try {
                const res = await axios.post(newurl+'login',{
                    email,
                    password
                });
                const data = res.data
                resolve(data.map(res=>({
                    valid:res.valid,
                    email:res.email,
                    password: res.password
                })));
            } catch (err) {
                reject(err);
            }
        })
    }
    //Get Posts
    static getPosts(){
        return new Promise(async(resolve, reject)=>{
            try {
                const res = await axios.get(newurl+'all');
                const data = res.data;
                resolve(
                    data.map(post =>({
                        ...post,
                        date: new Date(post.date)
                    }))
                );
            } catch (err) {
                reject(err);
            }
        })
    }
    static check(){
        const res = axios.get(newurl+'check');//{withCredentials: true}
        const data = res.data;
        alert(data);
    }
    //Create Post
    static insertPost(text) {
        return axios.post(newurl, {
            text
        });
    }
    static memberRegister(username,email,password){
        return axios.post(newurl+'register',{
            username,
            email,
            password
        })
    }
    //Delete Post
    static deletePost(id) {
        return axios.delete(`${newurl}${id}`);
    }
    //Add Event
    static addEvent(data) {
        return axios.post(BASE_URL+'/event/add',data);
    }
    static deleteEvent(data){
        return axios.delete(BASE_URL+'/event/delete',data)
    }
}

export default PostService
