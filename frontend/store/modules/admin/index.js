const state = {
  products: [],
};

const mutations = {
  setProducts(state, data) {
    state.products = data;
  },
};

const actions = {
  addProduct({ dispatch }, data) {
    // send data to server
    const TOKEN = localStorage.getItem("userAuthTOKEN");

    if (TOKEN === null) {
      return "";
    }

    // set header
    const reqConfig = {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    };

    // set body
    const reqBody = data;

    // sending request
    this.$axios
      .$post("/admin/add-product", reqBody, reqConfig)
      .then((res) => {
        // move to landing page
        this.$router.push("/");

        // show snackbar
        dispatch("app/showSnackbar", res, { root: true });
      })
      .catch((err) => {
        console.log("error: ", err.response?.data.message || err.message);

        // show snackbar
        dispatch("app/showSnackbar", err.response.data, { root: true });
      });
  },
  getProducts({ commit, dispatch }) {
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
      .$get("/admin/all-products", reqConfig)
      .then((res) => {
        // update state
        commit("setProducts", res.data);

        // show snackbar
        dispatch("app/showSnackbar", res, { root: true });
      })
      .catch((err) => {
        console.log(err.response?.data.message || err.message);

        // show snackbar
        dispatch("app/showSnackbar", err.response.data, { root: true });
      });
  },
  deleteProduct({ dispatch }, id) {
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
      .$delete(`/admin/delete-product/${id}`, reqConfig)
      .then((res) => {
        // reset products list
        dispatch("getProducts");
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
  allProducts(state) {
    return state.products;
  },
};

const admin = {
  namespaced: true,
  state: () => state,
  mutations,
  actions,
  getters,
};

export default admin;
