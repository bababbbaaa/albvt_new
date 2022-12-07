<template>
  <div class="">
    <div class="flex flex-col gap-[20px] ">
      <div class="flex flex-col sm:flex-row gap-2 sm:justify-between">
        
        <h1 class="text-[24px] font-medium flex gap-2 items-center" id="scroll-to">
           <button
            @click="$router.back()"
            class=" flex justify-center items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8 text-main"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          {{ pageName }}
        </h1>
      </div>

      <div class="bg-white shadow-md rounded-[5px] ">
        <div>
          <div
            class="hidden xl:grid lg:grid-cols-[3fr,3fr,2fr,1fr]   xl:grid-cols-[2fr,13fr,2fr,3fr] w-full border-b border-b-[#C3C3C3] gap-[20px] py-[12px] p-[10px]"
          >
            <span class="">Код</span>
            <span class="">Наименование исследования</span>
            <span class="">Цена</span>
          </div>
          <div class="flex flex-col w-full  xl:mt-[12px]">
            <med-product
              v-for="item in itemsSlice"
              :key="item.id"
              :item="item"
              @addToCart="addToCart(item)"
            />
          </div>
        </div>
      </div>
      <div class="w-full flex justify-center">
        <button
          @click="getProductToParams()"
          v-if="limit !== null && products.length > 7"
        >
          Показать еще
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import MedProduct from '~/components/med-product.vue'

export default {
  components: { MedProduct },
  layout: 'ComplecsWrapper',
  data () {
    return {
      title: '',
      limit: 7,
      addCartItem: '',
      test: [],
      products: [],
      posts: [],
      pageName: '',
      dalee: false
    }
  },
  methods: {
    ...mapActions(['ADD_TO_CART']),
     scrollToAnaliz () {
      var scrollDiv = document.getElementById('scroll-to').offsetTop - 90
      window.scrollTo({ top: scrollDiv, behavior: 'smooth' })
    },
    addToCart (item) {
      this.ADD_TO_CART(item), (this.addCartItem = item.name)
    },
    preFetchData (id) {
      console.log('tut  --  ' + id)
    },
    async getProductToParams () {
      this.limit = null
      this.dalee = true
      const params2 = this.$route.params
      const all_products = await this.$axios.$get(
        'https://foxsis.ru/alvd/wp-json/wc/v3/products',
        {
          auth: {
            username: 'ck_85e44e8735261d45a19d8f7aaf012f8d640c2dac',
            password: 'cs_4261bb639f4e9a18c146851361d6317804a816fc'
          },
          params: {
            category: params2.id,
            per_page: 100, 
            order: 'asc',
            orderby: 'title'
          }
        }
      )

      return { all_products }, (this.products = all_products)
    }
  },
  computed: {
    ...mapGetters(['CART', 'CATEGORY', 'CART_IDS']),

    itemsSlice () {
      return this.limit ? this.products.slice(0, this.limit) : this.products
    }
  },
  async fetch () {
    const category = 'category='
    const PerPage = 'per_page='
    const order = 'orderby=title'
    this.products = await fetch(
      'https://foxsis.ru/alvd/wp-json/wc/v3/products?' +
        category +
        this.$route.params.id +
        '&' +
        PerPage +
        8 + '&' + 'order=asc&orderby=title'
    ).then(res => res.json())
    this.pageName = this.products[0].categories[0].name
  },
  mounted () {
     if (window.screen.width <= 600) {
      this.scrollToAnaliz()
    }
    this.$router.replace({'query': null});
  },
  updated () {
    if (window.screen.width <= 600 && this.dalee == false) {
      this.scrollToAnaliz()
    }
  },
  watch: {
    $route () {
      if (window.screen.width <= 600) {
      this.scrollToAnaliz()
    }
    }
  }
}
</script>

<style>
/* .test-text {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -moz-box;
  -moz-box-orient: vertical;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  line-clamp: 1;
  box-orient: vertical;
} */
</style>
