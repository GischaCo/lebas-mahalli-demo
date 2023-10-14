export default {
  ssr: false,
  /*
   ** Headers of the page
   */
  head: {
    title: "فروشگاه لباس محلی دنیا",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "فروش پوشاک محلی اقوام و عروسک‌های سنتی و صنایع دستی",
      },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/logo.png" }],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** auto import & register components
   */
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
  /*
   ** Global CSS
   */
  css: ["~/assets/css/main.css"],
  /*
   ** nuxt/svg configuration
   */
  svg: {
    vueSvgLoader: {
      // vue-svg-loader options
    },
    svgSpriteLoader: {
      // svg-sprite-loader options
    },
    fileLoader: {
      // file-loader options
    },
  },
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ["~/plugins/vee-validate.js"],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    "@nuxtjs/svg",
    "@nuxtjs/composition-api/module",
    "nuxt-moment-jalaali",
  ],
  /*
   ** Nuxt.js modules
   */
  modules: ["@nuxtjs/axios", "@nuxtjs/dotenv"],
  /*
   ** Axios configuration
   */
  axios: {
    baseURL: process.env.API_URL,
    common: {
      "Content-Type": "application/json",
    },
  },
  /*
   ** Jalali moment configuration
   */
  moment: {
    locales: ["fa"],
  },
  /* Environment configuration
   **
   */
  publicRuntimeConfig: {
    imagePrefix: process.env.IMAGE_URL,
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
    /*
     ** postcss configuration
     */
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
  },
};
