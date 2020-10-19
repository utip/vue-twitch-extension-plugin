import Twitch from "./TwitchHelper";

export default {
    install: function (Vue) {
        Vue.prototype.$twitch = Vue.observable(new Twitch(Vue));
    }
}


