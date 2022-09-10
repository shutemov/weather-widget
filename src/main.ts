import { defineCustomElement } from "@/defineCustomElement";

import App from "@/App.ce.vue";
import router from "@/router";

const webComponentName = "weather-widget";

customElements.define(
  webComponentName,
  defineCustomElement(App, {
    plugins: [router],
  })
);
