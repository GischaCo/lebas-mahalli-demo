const state = {
  user: null,
};

const mutations = {
  setUser(state, value) {
    state.user = value;
  },
};

const actions = {
  updateUser({ commit }, data) {
    commit("setUser", data);
  },
};

const getters = {
  userInfo(state) {
    return state.user;
  },
};

const panel = {
  namespaced: true,
  state: () => state,
  mutations,
  actions,
  getters,
};

export default panel;
