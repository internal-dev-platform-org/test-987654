import axios from "axios";

export const getPosts = () => axios.get('https://jsonplaceholder.typicode.com/posts/1').then((res) => res.data);