const state = {
  // products
  product: null,
  products: [],
  // users
  users: [],
  // comments
  comments: [],
};

const mutations = {
  // products
  setProduct(state, data) {
    state.product = data;
  },
  setProducts(state, data) {
    state.products = data;
  },
  resetProduct(state) {
    state.product = null;
  },
  // users
  setUsers(state, data) {
    state.users = data;
  },
  // comments
  setComments(state, data) {
    state.comments = data;
  },
};

const actions = {
  // products
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
        // move to products page
        this.$router.push("/admin/products/all");

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
  getProduct({ commit, dispatch }, id) {
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
      .$get(`/admin/single-product/${id}`, reqConfig)
      .then((res) => {
        // update state
        commit("setProduct", res.data);

        // show snackbar
        dispatch("app/showSnackbar", res, { root: true });
      })
      .catch((err) => {
        console.log(err.response?.data.message || err.message);

        // show snackbar
        dispatch("app/showSnackbar", err.response.data, { root: true });
      });
  },
  updateProduct({ commit, dispatch }, { id, data }) {
    // send data to server
    const TOKEN = localStorage.getItem("userAuthTOKEN");

    if (TOKEN === null) {
      return "";
    }

    // set header
    const reqConfig = {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        id,
      },
    };

    // set body
    const reqBody = { data };

    // sending request
    this.$axios
      .$post("/admin/update-product", reqBody, reqConfig)
      .then((res) => {
        // reset product's data in state
        commit("resetProduct");

        // move to products page
        this.$router.push("/admin/products/all");

        // refresh product's list
        dispatch("getProducts");

        // show snackbar
        dispatch("app/showSnackbar", res, { root: true });
      })
      .catch((err) => {
        console.log("error: ", err.response?.data.message || err.message);

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
  // users
  getUsers({ commit, dispatch }) {
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
      .$get("/admin/all-users", reqConfig)
      .then((res) => {
        // update state
        commit("setUsers", res.data);

        // show snackbar
        dispatch("app/showSnackbar", res, { root: true });
      })
      .catch((err) => {
        console.log(err.response?.data.message || err.message);

        // show snackbar
        dispatch("app/showSnackbar", err.response.data, { root: true });
      });
  },
  deleteUser({ dispatch }, id) {
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
      .$delete(`/admin/delete-user/${id}`, reqConfig)
      .then((res) => {
        // reset products list
        dispatch("getUsers");

        // show snackbar
        dispatch("app/showSnackbar", res, { root: true });
      })
      .catch((err) => {
        console.log(err.response?.data.message || err.message);

        // show snackbar
        dispatch("app/showSnackbar", err.response.data, { root: true });
      });
  },
  // comments
  getComments({ commit, dispatch }) {
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
      .$get("/admin/all-comments", reqConfig)
      .then((res) => {
        // update state
        commit("setComments", res.data);

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
  // products
  allProducts(state) {
    return state.products;
  },
  singleProduct(state) {
    return state.product;
  },
  // users
  allUsers(state) {
    return state.users;
  },
  // comments
  allComments(state) {
    return state.comments;
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
