import {createStore} from "vuex";

const store = createStore({
    state() {
        return {
            isLogged: false,
            currentUrl: "",
            previousUrl: "",
            sharedMessage: null,
            sharedMessageType: null,
            userFullName: null,
            pushNotification: null,
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
        },

        setUserFullName(state, value) {
            state.userFullName = value;
        },

        setPushNotification(state, value) {
            state.pushNotification = value;
        }
    }
});

export default store;
