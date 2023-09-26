import Vuex from "vuex";

// modules
import categoriesModule from "./modules/categories";
import panelModule from "./modules/panel";

const modules = {
  categories: categoriesModule,
  panel: panelModule,
};

export default () =>
  new Vuex.Store({
    state: () => ({}),
    modules,
  });
