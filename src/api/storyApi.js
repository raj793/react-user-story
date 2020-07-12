import axios from 'axios';
import {BASE_URL} from '../config';

export default class StoryApi {

  constructor(token) {
    this.instance = axios.create({
      baseURL: BASE_URL
    });
    this.instance.defaults.headers.common['Authorization'] = token;
  }

  getStories = () => {
    const url = '/stories';
    return this.instance.get(url);
  }

  createStory = (obj) => {
    const url = '/stories';
    return this.instance.post(url, obj);
  }

  getStoryById = (id) => {
    const url = `/stories/${id}`;
    return this.instance.get(url);
  }
}