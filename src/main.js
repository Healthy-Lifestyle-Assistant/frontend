import "./style/style.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createMetaManager } from "vue-meta";
import store from "./store/store";

const app = createApp(App);

app
	.use(store)
	.use(router)
	.use(createMetaManager())
	.mount('#app');
