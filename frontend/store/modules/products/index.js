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
  getAllProducts({ commit, dispatch }) {
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
  getProduct({ commit, dispatch }, id) {
    this.$axios
      .get(`/single-product/${id}`)
      .then((res) => {
        commit("setProduct", res.data.data);
      })
      .catch((err) => {
        console.log(err);

        // move to products page
        this.$router.push("/products/all");

        // show snackbar
        dispatch("app/showSnackbar", err.response.data, { root: true });
      });
  },
  addComment({ dispatch }, payload) {
    const { id, data } = payload;

    // send data to server
    const TOKEN = localStorage.getItem("userAuthTOKEN");

    if (TOKEN === null) {
      dispatch(
        "app/showSnackbar",
        {
          status: 400,
          message: "برای ثبت دیدگاه ابتدا باید وارد حساب کاربری خود شوید",
        },
        { root: true }
      );
      return "";
    }

    // set header
    const reqConfig = {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    };

    // set body
    const reqBody = { data: { ...data, date: new Date() } };

    // sending request
    this.$axios
      .$post(`/add-comment/${id}`, reqBody, reqConfig)
      .then((res) => {
        // refresh product data
        dispatch("getProduct", id);

        // show snackbar
        dispatch("app/showSnackbar", res, { root: true });
      })
      .catch((err) => {
        console.log("error: ", err.response?.data.message || err.message);

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
