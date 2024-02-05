import { createApp } from "vue";
import "./style.css";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

//Vuetify///////////////////////////////////////////////////
import "vuetify/styles";
import { createVuetify } from "vuetify";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const pinia = createPinia();
const app = createApp(App);

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
  defaults: {
    VAppBar: {

    }
  }
});
//////////////////////////////////////////////////////////////

app.use(vuetify);
app.use(pinia);
app.use(router);

app.mount("#app");
