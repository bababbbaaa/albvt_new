export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'server',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'АЛЬБА ВИТА',
    htmlAttrs: {
      lang: 'ru'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
      {
        hid: 'description',
        name: 'description',
        content: 'Доступные анализы в Ростове-на-Дону'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  static: {
    prefix: false
  },
  buildDir: 'nuxt-dist',
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/css/main.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/persistedState.client.js',
    '@plugins/v-mask.js',
    '@plugins/v-tooltip.js',
    '@plugins/vue-input-facade.js',
    { src: '~/plugins/vue-datepicker', ssr: false },
    { src: '~/plugins/vue-agile.js', ssr: false }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ['@nuxt/postcss8', '@nuxtjs/google-fonts'],
  auth: {
    strategies: {
      graphql: {
        scheme: '@shemes/graphqlScheme.js'
      }
    },
    redirect: {
      login: '/login',
      logout: '/login',
      callback: false,
      home: '/'
    }
  },
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: 'http://api.albvt.ru:1337/graphql'
      }
    },
    defaultOptions: {
      $query: {
        fetchPolicy: 'cache-and-network'
      }
    }
  },
  axios: {},
  googleFonts: {
    display: 'swap',
    preconnect: true,
    families: {
      Inter: {
        wght: [300, 600, 400, 500, 700]
      }
    }
  },
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // [
    //   '@nuxtjs/yandex-metrika',
    //   {
    //     id: '89944791',
    //     webvisor: true,
    //     clickmap: true,
    //     // useCDN: false,
    //     trackLinks: true
    //     // accurateTrackBounce: true,
    //   }
    // ],
    '@nuxtjs/axios',
    '@nuxtjs/apollo',
    '@nuxtjs/auth-next',
    ['nuxt-validate', {
      lang: 'ru'
    }]
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {}
      }
    },
    transpile: ['vue-agile']
  }
}
