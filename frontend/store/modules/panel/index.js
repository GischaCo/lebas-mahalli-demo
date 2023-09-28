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
        // update user authorization status in state
        commit("authenticated", true);

        // store token in localStorage
        const TOKEN = res.data.token;
        localStorage.setItem("userAuthTOKEN", TOKEN);

        // get user profile details using token
        dispatch("userProfile", TOKEN);

        // move to landing page
        this.$router.push("/");

        // show snackbar
        dispatch("app/showSnackbar", res, { root: true });
      })
      .catch((err) => {
        console.log(err.response?.data.message || err.message);

        // update state
        commit("authenticated", false);

        // show snackbar
        dispatch("app/showSnackbar", err.response.data, { root: true });
      });
  },
  userLogin({ commit, dispatch }, payload) {
    const body = payload;

    this.$axios
      .$post("/auth/login", body)
      .then((res) => {
        // update user authorization status in state
        commit("authenticated", true);

        // store token in localStorage
        const TOKEN = res.data.token;
        localStorage.setItem("userAuthTOKEN", TOKEN);

        // get user profile details using token
        dispatch("userProfile", TOKEN);

        // move to landing page
        this.$router.push("/");

        // show snackbar
        dispatch("app/showSnackbar", res, { root: true });
      })
      .catch((err) => {
        console.log(err.response?.data.message || err.message);

        // update state
        commit("authenticated", false);

        // show snackbar
        dispatch("app/showSnackbar", err.response.data, { root: true });
      });
  },
  userProfile({ commit, dispatch }, token) {
    const reqConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    this.$axios
      .$get("/auth/profile", reqConfig)
      .then((res) => {
        // update state
        commit("authorized", true);
        commit("updateUser", res.data);
      })
      .catch((err) => {
        console.log(err.response?.data.message || err.message);

        // update state
        commit("authenticated", false);

        // show snackbar
        dispatch("app/showSnackbar", err.response.data, { root: true });
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
