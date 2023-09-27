const state = {
  user: null,
  authenticated: false,
  authorized: false,
};

const mutations = {
  authenticated(state, value) {
    state.authenticated = value;
  },
  authorized(state, value) {
    state.authorized = value;
  },
  updateUser(state, value) {
    state.user = value;
  },
};

const actions = {
  userSignUp({ commit, dispatch }, payload) {
    const body = payload;

    this.$axios
      .$post("/auth/register", body)
      .then((res) => {
        commit("authenticated", true);

        const TOKEN = res.data.token;
        localStorage.setItem("userAuthTOKEN", TOKEN);
        dispatch("userProfile", TOKEN);
      })
      .catch((err) => {
        console.log(err.response?.data.message || err.message);
        commit("authenticated", false);
      });
  },
  userLogin({ commit, dispatch }, payload) {
    const body = payload;
    this.$axios
      .$post("/auth/login", body)
      .then((res) => {
        commit("authenticated", true);

        const TOKEN = res.data.token;
        localStorage.setItem("userAuthTOKEN", TOKEN);
        dispatch("userProfile", TOKEN);
      })
      .catch((err) => {
        console.log(err.response?.data.message || err.message);
        commit("authenticated", false);
      });
  },
  userProfile({ commit }, token) {
    const reqConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    this.$axios
      .$get("/auth/profile", reqConfig)
      .then((res) => {
        commit("authorized", true);
        commit("updateUser", res.data);
      })
      .catch((err) => {
        console.log(err.response?.data.message || err.message);
        commit("authenticated", false);
      });
  },
};

const getters = {};

const panel = {
  namespaced: true,
  state: () => state,
  mutations,
  actions,
  getters,
};

export default panel;
