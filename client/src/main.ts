import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import AppIcon from "./components/UI/AppIcon.vue";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import "./assets/main.css";

const app = createApp(App);
const pinia = createPinia();

app.component("font-awesome-icon", FontAwesomeIcon);
app.component("AppIcon", AppIcon);
app.use(pinia);

app.use(router);
app.mount("#app");
