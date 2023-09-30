const state = {
  user: null,
};

const mutations = {
  setUser(state, value) {
    state.user = value;
  },
};

const actions = {
  updateUser({ commit, dispatch }, data) {
    // send data to database
    const TOKEN = localStorage.getItem("userAuthTOKEN");

    if (TOKEN === null) {
      return "";
    }

    const reqConfig = {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    };

    const reqBody = data;

    this.$axios
      .$post("/panel/update-profile", reqBody, reqConfig)
      .then((res) => {
        // update state
        commit("setUser", data);

        // show snackbar
        dispatch("app/showSnackbar", res, { root: true });
      })
      .catch((err) => {
        console.log(err.response?.data.message || err.message);

        // show snackbar
        dispatch("app/showSnackbar", err.response.data, { root: true });
      });
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
