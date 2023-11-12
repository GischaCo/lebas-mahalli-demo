const state = {
  user: null,
};

const mutations = {
  setUser(state, value) {
    state.user = value;
  },
  resetUser(state) {
    state.user = null;
  },
};

const actions = {
  updateUser({ commit, dispatch }, data) {
    // send data to database
    let TOKEN = null;
    if (process.client) {
      TOKEN = localStorage.getItem("userAuthTOKEN");
    }

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

        // set loading
        dispatch("app/setLoading", false, { root: true });

        // show snackbar
        dispatch("app/showSnackbar", res, { root: true });
      })
      .catch((err) => {
        console.log(err.response?.data.message || err.message);

        // set loading
        dispatch("app/setLoading", false, { root: true });

        // show snackbar
        dispatch("app/showSnackbar", err.response.data, { root: true });
      });
  },
  resetUser({ commit }) {
    commit("resetUser");
  },
  addToCart({ dispatch }, data) {
    // send data to database
    let TOKEN = null;
    if (process.client) {
      TOKEN = localStorage.getItem("userAuthTOKEN");
    }

    if (TOKEN === null) {
      return "";
    }

    const reqConfig = {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    };

    // destructured data
    const { qty, product } = data;
    let totalPrice = 0;
    for (let i = 0; i < qty; i++) {
      if (product.salePrice === 0) {
        totalPrice += product.price;
      } else {
        totalPrice += product.salePrice;
      }
    }
    const cartItem = { product, qty, totalPrice };

    this.$axios
      .$post("/panel/add-to-cart", cartItem, reqConfig)
      .then((res) => {
        // set loading
        dispatch("app/setLoading", false, { root: true });

        // show snackbar
        dispatch("app/showSnackbar", res, { root: true });
      })
      .catch((err) => {
        console.log(err.response?.data.message || err.message);

        // set loading
        dispatch("app/setLoading", false, { root: true });

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
