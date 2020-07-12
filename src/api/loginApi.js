import axios from 'axios';
import {BASE_URL} from '../config';

export default class LoginApi {

  constructor() {
    this.instance = axios.create({
      baseURL: BASE_URL
    });
  }

  signin = (obj) => {
    const url = '/signin'
    return this.instance.post(url, obj);
  }
}