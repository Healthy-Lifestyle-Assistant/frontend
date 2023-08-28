import "bootstrap/dist/css/bootstrap.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createMetaManager } from "vue-meta";
import store from "./store";

// createApp(App)
//     .use(router)
//     .use(createMetaManager())
//     .mount('#app');

const app = createApp(App);

app
    .use(store)
    .use(router)
    .use(createMetaManager())
    .mount('#app');

import "bootstrap/dist/js/bootstrap.js";
