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
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ["@nuxtjs/svg", "@nuxtjs/composition-api/module"],
  /*
   ** Nuxt.js modules
   */
  modules: ["@nuxtjs/axios"],
  /*
   ** Axios configuration
   */
  axios: {
    baseURL: "https://lebas-mahalli.iran.liara.run/",
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
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },
};
