const state = {
  loading: false,
  snackbar: null,
};

const mutations = {
  // loading
  setLoading(state, value) {
    state.loading = value;
  },
  // snackbar
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
  setLoading({ commit }, value) {
    // value is equal to "true" or "false"
    commit("setLoading", value);
  },
  showSnackbar({ commit }, data) {
    commit("setSnackbar", data);

    setTimeout(() => {
      commit("hideSnackbar");
    }, 3000);
  },
};

const getters = {
  // loading
  loading(state) {
    return state.loading;
  },
};

const app = {
  namespaced: true,
  state: () => state,
  mutations,
  actions,
  getters,
};

export default app;
