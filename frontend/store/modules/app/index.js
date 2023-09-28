const state = {
  snackbar: null,
};

const mutations = {
  setSnackbar(state, data) {
    state.snackbar = {
      status: data.status,
      message: data.message,
    };
  },
  hideSnackbar(state) {
    state.snackbar = null;
  },
};

const actions = {
  showSnackbar({ commit }, data) {
    commit("setSnackbar", data);

    setTimeout(() => {
      commit("hideSnackbar");
    }, 3000);
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
