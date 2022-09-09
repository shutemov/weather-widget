/**
 * https://stackoverflow.com/questions/69808113/how-to-use-vue-router-and-vuex-inside-custom-element-from-root
 */

import {
  defineCustomElement as VueDefineCustomElement,
  h,
  createApp,
  getCurrentInstance,
} from "vue";

const getNearestElementParent = (el: any) => {
  while (el?.nodeType !== 1 /* ELEMENT */) {
    el = el.parentElement;
  }
  return el;
};

export const defineCustomElement = (component: any, { plugins = [] }) =>
  VueDefineCustomElement({
    render: () => h(component),
    setup() {
      const app = createApp(component);

      // install plugins
      plugins.forEach(app.use);

      app.mixin({
        mounted() {
          const insertStyles = (styles: any) => {
            if (styles?.length) {
              this.__style = document.createElement("style");
              this.__style.innerText = styles.join().replace(/\n/g, "");
              getNearestElementParent(this.$el).prepend(this.__style);
            }
          };

          // load own styles
          insertStyles(this.$?.type.styles);

          // load styles of child components
          if (this.$options.components) {
            for (const comp of Object.values(this.$options.components)) {
              insertStyles((comp as any).styles);
            }
          }
        },
        unmounted() {
          this.__style?.remove();
        },
      });

      const inst: any = getCurrentInstance();
      Object.assign(inst.appContext, app._context);
      Object.assign(inst.provides, app._context.provides);
    },
  });
