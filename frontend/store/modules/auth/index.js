const state = {
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
        dispatch("userProfile");

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
        dispatch("userProfile");

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
  userProfile({ commit, dispatch }) {
    const TOKEN = localStorage.getItem("userAuthTOKEN");

    if (TOKEN === null) {
      return "";
    }

    const reqConfig = {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    };

    this.$axios
      .$get("/auth/profile", reqConfig)
      .then((res) => {
        // update state
        commit("authorized", true);
        dispatch("panel/updateUser", res.data, { root: true });
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

const auth = {
  namespaced: true,
  state: () => state,
  mutations,
  actions,
  getters,
};

export default auth;
