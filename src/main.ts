import { defineCustomElement } from "./defineCustomElement";

import App from "./VueApp.ce.vue";
import router from "./router";

const webComponentName = "weather-widget";

customElements.define(
  webComponentName,
  defineCustomElement(App, {
    plugins: [router],
  })
);
