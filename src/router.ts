import { createRouter, createWebHashHistory } from "vue-router";
import Settings from "@/components/OSettings.ce.vue";
import TWeatherInfo from "@/components/TWeatherInfo.ce.vue";

export enum Route {
  Settings = "settings",
  Home = "home",
}

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/settings",
      component: Settings,
      name: Route.Settings,
    },
    {
      path: "/",
      component: TWeatherInfo,
      name: Route.Home,
    },
  ],
});
