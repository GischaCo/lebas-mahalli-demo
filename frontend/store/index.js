import Vuex from "vuex";

// modules
import categoriesModule from "./modules/categories";

const modules = {
  categories: categoriesModule,
};

export default () =>
  new Vuex.Store({
    state: () => ({}),
    modules,
  });
