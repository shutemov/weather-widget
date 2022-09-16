import { createRouter, createWebHashHistory } from "vue-router";
import TSettings from "@/components/TSettings.ce.vue";
import TWeatherInfo from "@/components/TWeatherInfo.ce.vue";
import TEmptyState from "@/components/TEmptyState.ce.vue";

export enum Route {
  Settings = "settings",
  Home = "home",
  HomeEmpty = "homeEmpty",
}

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/settings",
      component: TSettings,
      name: Route.Settings,
    },
    {
      path: "/",
      component: TWeatherInfo,
      name: Route.Home,
    },
    {
      path: "/empty",
      component: TEmptyState,
      name: Route.HomeEmpty,
    },
  ],
});
