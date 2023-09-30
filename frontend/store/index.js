import Vuex from "vuex";

// modules
import categoriesModule from "./modules/categories";
import authModule from "./modules/auth";
import appModule from "./modules/app";

const modules = {
  categories: categoriesModule,
  auth: authModule,
  app: appModule,
};

export default () =>
  new Vuex.Store({
    state: () => ({}),
    modules,
  });
