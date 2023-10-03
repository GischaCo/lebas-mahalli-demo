import Vuex from "vuex";

// modules
import appModule from "./modules/app";
import categoriesModule from "./modules/categories";
import authModule from "./modules/auth";
import panelModule from "./modules/panel";
import adminModule from "./modules/admin";
import productsModule from "./modules/products";

const modules = {
  app: appModule,
  categories: categoriesModule,
  auth: authModule,
  panel: panelModule,
  admin: adminModule,
  products: productsModule,
};

export default () =>
  new Vuex.Store({
    state: () => ({}),
    modules,
  });
