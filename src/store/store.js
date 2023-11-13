import { createStore } from "vuex";

const store = createStore({
	state() {
		return {
			isLogged: false,
			currentUrl: "",
			previousUrl: ""
		}
	},

	mutations: {
		setLogged(state, value) {
			state.isLogged = value;
		},
		setCurrentUrl(state, value) {
			state.previousUrl = state.currentUrl;
			state.currentUrl = value;
		}
	}
});

export default store;
