import Vuex from "vuex";

// modules
import appModule from "./modules/app";
import categoriesModule from "./modules/categories";
import authModule from "./modules/auth";
import panelModule from "./modules/panel";

const modules = {
  app: appModule,
  categories: categoriesModule,
  auth: authModule,
  panel: panelModule,
};

export default () =>
  new Vuex.Store({
    state: () => ({}),
    modules,
  });
