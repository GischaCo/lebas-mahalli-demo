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
  resetAuth(state) {
    state.authenticated = false;
    state.authorized = false;
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

        // set loading
        dispatch("app/setLoading", false, { root: true });

        // move to landing page
        this.$router.push("/");

        // show snackbar
        dispatch("app/showSnackbar", res, { root: true });
      })
      .catch((err) => {
        console.log(err.response?.data.message || err.message);

        // update state
        commit("authenticated", false);

        // set loading
        dispatch("app/setLoading", false, { root: true });

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

        // set loading
        dispatch("app/setLoading", false, { root: true });

        // move to landing page
        this.$router.push("/");

        // show snackbar
        dispatch("app/showSnackbar", res, { root: true });
      })
      .catch((err) => {
        console.log(err.response?.data.message || err.message);

        // update state
        commit("authenticated", false);

        // set loading
        dispatch("app/setLoading", false, { root: true });

        // show snackbar
        dispatch("app/showSnackbar", err.response.data, { root: true });
      });
  },
  userProfile({ dispatch, commit }) {
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
        commit("panel/setUser", res.data, { root: true });

        // if user is in admin panel, move to landing page
        if (
          this.$router.history.current.name.startsWith("admin") &&
          res.data.role !== "admin"
        ) {
          this.$router.push("/");
        }

        // set loading
        dispatch("app/setLoading", false, { root: true });
      })
      .catch((err) => {
        console.log(err.response?.data.message || err.message);

        // update state
        commit("authenticated", false);

        // if user is in panel but the token is expired, move to login page
        if (this.$router.history.current.name.startsWith("panel"))
          this.$router.push("/auth/login");

        // if user is in admin panel, move to landing page
        if (this.$router.history.current.name.startsWith("admin")) {
          this.$router.push("/");
        }

        // set loading
        dispatch("app/setLoading", false, { root: true });
      });
  },
  userLogout({ commit, dispatch }) {
    // remove token from localStorage
    localStorage.removeItem("userAuthTOKEN");

    // reset state
    commit("resetAuth");

    // reset user profile data
    dispatch("panel/resetUser", null, { root: true });

    // show snackbar
    dispatch(
      "app/showSnackbar",
      { status: 200, message: "خروج از حساب با موفقیت انجام شد" },
      { root: true }
    );

    // move to landing page
    this.$router.push("/");
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
