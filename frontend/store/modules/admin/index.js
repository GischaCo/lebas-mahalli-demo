const state = {};

const mutations = {};

const actions = {
  addProduct(_, data) {
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
        console.log("response: ", res);
      })
      .catch((err) => {
        console.log("error: ", err.response?.data.message || err.message);
      });
  },
};

const getters = {};

const admin = {
  namespaced: true,
  state: () => state,
  mutations,
  actions,
  getters,
};

export default admin;
