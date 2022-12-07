<template>
  <div>
    <div class="container w-full flex flex-col gap-10 py-[47px]">
      <div class="flex flex-col gap-4 w-full justify-center items-center">
        <heading-h-3>Поиск по анализам</heading-h-3>
        <label class="relative block w-full">
          <span class="sr-only">Search</span>
          <span
            class="absolute inset-y-0 right-0 flex items-center pr-[16px] z-[99]"
          >
            <img
              src="/img/icons/search.svg"
              alt=""
              class="block w-full h-auto hover:scale-110 anime"
            />
          </span>
          <input
            @input="search($event.target.value)"
            :value="searchInputRes"
            type="text"
            id="default-search2"
            class="block  w-full pr-20 rounded-[5px] text-center  bg-white pl-4 border-[2px] border-[#343434]/20   h-[60px] focus:outline-none text-[#979797]"
            placeholder="Поиск анализов"
            autocomplete="off"
          />
        </label>
      </div>

      <ul class=" flex flex-col bg-white  pt-4 shadow-md rounded-[5px] w-full ">
        <li
          v-for="(item, i) in sortedArray"
          :key="i"
          class="border-b-[0.5px] border-b-[#D9D9D9]/50 px-4 py-3  grid grid-cols-[9fr,4fr] sm:grid-cols-[10fr,3fr] gap-2 items-center hover:bg-[#F5F5F5] anime"
        >
          <div class="flex flex-col">
            <nuxt-link
              :to="
                '/all-analyzes' +
                  '/' +
                  item.node.productCategories.edges[0].node.slug +
                  '/' +
                  item.node.productCategories.edges[0].node.databaseId +
                  '/' +
                  item.node.databaseId
              "
              class="test-text text-[#777777] hover:text-[#343434] anime text-[12px] sm:text-[16px]"
              :title="item.node.name"
              >{{ item.node.name }}</nuxt-link
            >
            <div class="flex gap-3">
              <span class="text-[14px] text-[#9A9A9A] pt-1"
                >код: {{ item.node.allPaSku.nodes[0].name }}</span
              >
              <span
                v-if="
                  parseInt(item.node.attributes.edges[0].node.options[0]) == 1
                "
                class="text-[14px] text-[#9A9A9A] pt-1"
                >{{ item.node.attributes.edges[0].node.options[0] }} день</span
              >
              <span
                v-else-if="
                  parseInt(item.node.attributes.edges[0].node.options[0]) < 5 ||
                    parseInt(item.node.attributes.edges[0].node.options[0]) >=
                      22
                "
                class="text-[14px] text-[#9A9A9A] pt-1"
                >{{ item.node.attributes.edges[0].node.options[0] }} дня</span
              >
              <span v-else class="text-[14px] text-[#9A9A9A] pt-1"
                >{{ item.node.attributes.edges[0].node.options[0] }} дней</span
              >
            </div>
          </div>
           <div
            v-if="
              inCart.includes(item.node.name) ||
                CART_IDS.includes(item.node.databaseId)
            "
            class="flex justify-center items-center   rounded-[5px] py-2 text-main gap-1   h-[40px] px-[8px] text-[14px]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 hidden sm:block"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span class="text-[12px]">В корзине</span>
          </div>
          <div
            v-else-if="item.node.stockStatus !== 'IN_STOCK'"
            class="w-full flex justify-center items-center"
          >
            <span class="text-[12px] text-danger">Временно недоступен</span>
          </div>
          <button
            v-else
            @click="productInCart(item.node.databaseId)"
            class="bg-main/20   text-[#343434] rounded-[5px] flex justify-center items-center gap-2 p-2"
          >
            <img src="/img/icons/add-to-cart.svg" alt="" />
            <span class="text-[12px] sm:text-[16px]"
              >{{ parseInt(item.node.price).toLocaleString('ru-RU') }} ₽</span
            >
          </button>
        </li>
        <span
          v-if="sortedArray.length == 0"
          class=" w-full flex justify-center items-center py-4 text-[#343434] hover:bg-[#CBCBCB] anime bg-[#E2E2E2]"
          >Идет поиск</span
        >
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import gql from 'graphql-tag'
import HeadingH3 from '~/components/HeadingH3.vue'

const ALL_CHARACTERS_QUERY = gql`
  query ALL_CHARACTERS_QUERY($search: String) {
    products(first: 100, where: { search: $search }) {
      edges {
        node {
          name
          sku
          attributes {
            edges {
              node {
                name
                options
              }
            }
          }
          allPaSku {
            nodes {
              name
            }
          }
          databaseId
          ... on SimpleProduct {
            price(format: RAW)
            stockStatus
          }
          productCategories {
            edges {
              node {
                databaseId
                slug
              }
            }
          }
        }
      }
    }
  }
`

export default {
  components: { HeadingH3 },
  data () {
    return {
      searchInputRes: '',
      searchProducts: [],
      searchResults: [],
      inCart: [],
      test: ''
    }
  },
  layout: 'MainLayout',
  computed: {
    ...mapGetters(['CART', 'CART_IDS']),
    sortedArray: function () {
      const inputSearhValue = this.searchInputRes.toLowerCase()
      const inputSearhValueEn = this.test.toLowerCase()

      // длинна строки
      function compareTwo (a, b) {
        var nameA = a.node.name.toLowerCase()
        var nameB = b.node.name.toLowerCase()

        if (nameA.length < nameB.length) return -1
        if (nameA.length > nameB.length) return 1
        return 0
      }
      // точно соответствующий
      function compareTree (a, b) {
        var nameA = a.node.name.toLowerCase()
        var nameB = b.node.name.toLowerCase()

        if (
          nameA.split(' ').includes(inputSearhValue) ||
          nameA.split(' ').includes(inputSearhValueEn) <
            nameB.split(' ').includes(inputSearhValue) ||
          nameB.split(' ').includes(inputSearhValueEn)
        ) {
          return 1
        }
        if (
          nameA.split(' ').includes(inputSearhValue) ||
          nameA.split(' ').includes(inputSearhValueEn) >
            nameB.split(' ').includes(inputSearhValue) ||
          nameB.split(' ').includes(inputSearhValueEn)
        ) {
          return -1
        }

        return 0
      }

      return this.searchResults
        .sort(compareTree)
        .sort(compareTwo)
        .sort(compareTree)
        .filter(
          item =>
            item.node.name
              .toLowerCase()
              .includes(this.searchInputRes.toLowerCase()) ||
            item.node.name.toLowerCase().includes(this.test.toLowerCase())
        )
        .splice(0, 100)
    }
  },
  methods: {
    ...mapActions(['ADD_TO_CART']),
    CurentInsearchInputRes () {
      if (this.$route.query.search) {
        this.searchInputRes = this.$route.query.search
        this.search(this.searchInputRes)
      }
    },
    async search (value) {
      this.searchInputRes = value
      const lowerCase = value.toLowerCase()
      this.autoKeyboardLang(lowerCase)

      try {
        const res = await this.$apollo.query({
          query: ALL_CHARACTERS_QUERY,
          variables: {
            search: lowerCase
          }
        })
        if (res) {
          this.loading = false
          const { results } = res.data.products.edges
          return (
            { results },
            (this.searchResults = res.data.products.edges),
            this.searchToEn()
          )
        }
      } catch (err) {
        this.loading = false
        this.searchToEn()
        this.searchResults = []
      }
    },
    async searchToEn () {
      const EnToRu = this.test
      try {
        const res = await this.$apollo.query({
          query: ALL_CHARACTERS_QUERY,
          variables: {
            search: EnToRu
          }
        })
        if (res) {
          this.loading = false
          const { results } = res.data.products.edges
          if (res.data.products.edges.length != 0) {
            this.searchResults = res.data.products.edges
          }

          return { results }
        }
      } catch (err) {
        this.loading = false
        this.searchResults = []
      }
    },
    autoKeyboardLang (str) {
      var s = [
        'й',
        'ц',
        'у',
        'к',
        'е',
        'н',
        'г',
        'ш',
        'щ',
        'з',
        'х',
        'ъ',
        'ф',
        'ы',
        'в',
        'а',
        'п',
        'р',
        'о',
        'л',
        'д',
        'ж',
        'э',
        'я',
        'ч',
        'с',
        'м',
        'и',
        'т',
        'ь',
        'б',
        'ю'
      ]
      var r = [
        'q',
        'w',
        'e',
        'r',
        't',
        'y',
        'u',
        'i',
        'o',
        'p',
        '\\[',
        '\\]',
        'a',
        's',
        'd',
        'f',
        'g',
        'h',
        'j',
        'k',
        'l',
        ';',
        "'",
        'z',
        'x',
        'c',
        'v',
        'b',
        'n',
        'm',
        ',',
        '\\.'
      ]
      for (var i = 0; i < r.length; i++) {
        var reg = new RegExp(r[i], 'mig')
        str = str.replace(reg, function (a) {
          return a == a.toLowerCase() ? s[i] : s[i].toUpperCase()
        })
      }

      return str, (this.test = str)
    },
    async productInCart (id) {
      const searchProductsApi = await this.$axios.$get(
        'https://foxsis.ru/alvd/wp-json/wc/v3/products/' + id,
        {
          auth: {
            username: 'ck_85e44e8735261d45a19d8f7aaf012f8d640c2dac',
            password: 'cs_4261bb639f4e9a18c146851361d6317804a816fc'
          }
        }
      )
      return (
        { searchProductsApi },
        this.inCart.push(searchProductsApi),
        this.ADD_TO_CART(searchProductsApi)
      )
    }
  },
  created () {
    this.CurentInsearchInputRes()
  },
  watch: {
    $route () {
      location.reload()
    }
  }
}
</script>

<style></style>
