import Vue from "vue";

const state = {
  categories: [],
};

const mutations = {
  setCategories(state, data) {
    // state.categories = data;
    Vue.set(state, "categories", data);
  },
};

const actions = {
  getCategories({ commit }) {
    this.$axios.$get("/api/categories").then((res) => {
      if (res.success) {
        commit("setCategories", res.data);
      }
    });
  },
};

const getters = {
  allCategories(state) {
    return state.categories;
  },
};

const category = {
  namespaced: true,
  state: () => state,
  mutations,
  actions,
  getters,
};

export default category;
