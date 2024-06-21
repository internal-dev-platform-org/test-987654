import axios from 'axios';

export const getPosts = () => axios.get('/api/v1/someapi/posts/1').then(res => res.data);
