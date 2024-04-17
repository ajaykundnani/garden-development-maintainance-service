import { createApp } from 'vue'
import App from './App.vue'
import router from "../router";
import { createPinia } from "pinia";
import axios from 'axios'
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const api_url='http://127.0.0.1:8000/api/'
// const api_url='https://dummy.restapiexample.com/api/v1/'

const pinia = createPinia()

const app = createApp(App);
app.config.globalProperties.$http = axios.create({
    baseURL: api_url,
});

app.use(router);
app.use(ToastPlugin);

app.use(pinia)
app.mount("#app");




