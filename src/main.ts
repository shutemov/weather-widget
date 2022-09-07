import { defineCustomElement } from "vue";

import App from "./VueApp.ce.vue";

const cElement = defineCustomElement(App);

const webComponentName = "weather-widget";

customElements.define(webComponentName, cElement);
