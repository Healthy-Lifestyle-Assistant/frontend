import "bootstrap/dist/css/bootstrap.css";
import "./style/global.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createMetaManager } from "vue-meta";
import store from "./store";

const app = createApp(App);

app
	.use(store)
	.use(router)
	.use(createMetaManager())
	.mount('#app');

import "bootstrap/dist/js/bootstrap.js";
