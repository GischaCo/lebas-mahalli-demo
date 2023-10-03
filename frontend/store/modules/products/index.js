const state = {
  products: [],
};

const mutations = {
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
};

const getters = {
  allProducts(state) {
    return state.products;
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
