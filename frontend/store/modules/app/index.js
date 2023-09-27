const state = {
  snackbar: null,
};

const mutations = {
  setSnackbar(state, data) {
    state.snackbar = {
      status: data.status,
      text: data.message,
    };
  },
  hideSnackbar(state) {
    state.snackbar = null;
  },
};

const actions = {
  showSnackbar({ commit }, data) {
    // show snackbar
    commit("setSnackbar", data);
  },
  hideSnackbar({ commit }) {
    commit("hideSnackbar");
  },
};

const getters = {};

const app = {
  namespaced: true,
  state: () => state,
  mutations,
  actions,
  getters,
};

export default app;
