import { defineCustomElement } from "./defineCustomElement";

import App from "./VueApp.ce.vue";

const webComponentName = "weather-widget";

customElements.define(
  webComponentName,
  defineCustomElement(App, {
    plugins: [],
  })
);
