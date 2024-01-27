import { createStore } from "vuex";

const store = createStore({
	state() {
		return {
			isLogged: false,
			currentUrl: "",
			previousUrl: "",
			sharedMessage: "",
			sharedMessageType: ""
		}
	},

	mutations: {
		setLogged(state, value) {
			state.isLogged = value;
		},

		setCurrentUrl(state, value) {
			state.previousUrl = state.currentUrl;
			state.currentUrl = value;
		},

		setSharedMessage(state, value) {
			state.sharedMessage = value;
		},

		setSharedMessageType(state, value) {
			state.sharedMessageType = value;
		}
	}
});

export default store;
