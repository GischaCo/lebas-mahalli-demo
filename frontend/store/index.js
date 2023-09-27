import Vuex from "vuex";

// modules
import categoriesModule from "./modules/categories";
import panelModule from "./modules/panel";
import appModule from "./modules/app";

const modules = {
  categories: categoriesModule,
  panel: panelModule,
  app: appModule,
};

export default () =>
  new Vuex.Store({
    state: () => ({}),
    modules,
  });
