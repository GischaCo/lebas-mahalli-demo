const state = {
  product: null,
  products: [],
};

const mutations = {
  setProduct(state, data) {
    state.product = data;
  },
  resetProduct(state) {
    state.product = null;
  },
  setProducts(state, data) {
    state.products = data;
  },
};

const actions = {
  getAllProducts({ commit }) {
    this.$axios
      .get("/all-products")
      .then((res) => {
        commit("setProducts", res.data.data);
      })
      .catch((err) => {
        console.log(err);

        // show snackbar
        dispatch("app/showSnackbar", err.response.data, { root: true });
      });
  },
  getProduct({ commit }, id) {
    this.$axios
      .get(`/single-product/${id}`)
      .then((res) => {
        commit("setProduct", res.data.data);
      })
      .catch((err) => {
        console.log(err);

        // show snackbar
        dispatch("app/showSnackbar", err.response.data, { root: true });
      });
  },
};

const getters = {
  allProducts(state) {
    return state.products;
  },
  product(state) {
    return state.product;
  },
};

const products = {
  namespaced: true,
  state: () => state,
  mutations,
  actions,
  getters,
};

export default products;
