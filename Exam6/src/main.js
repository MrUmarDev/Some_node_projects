import { createApp } from "vue";
import App from "./App.vue";
import store from "./start";
import router from "./routers";
import "./assets/css/style.css";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const app = createApp(App);

app.use(store).use(router).use(Toast).mount("#app");
