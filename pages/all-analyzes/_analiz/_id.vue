<template>
  <div class="">
    <div class="flex flex-col gap-[20px] ">
      <div
        id="scroll-to"
        class="flex flex-col sm:flex-row gap-2 sm:justify-between"
      >
        <h1
          v-if="analizies"
          class="text-[24px] font-medium flex gap-2 items-center scroll-to"
        >
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
          <span class="leading-7">
            {{ analizies.data[0].attributes.sub_cat.data.attributes.Name }}
          </span>
          
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
          <div class="flex flex-col w-full  xl:mt-[12px]" v-if="analizies">
            <med-product
              v-for="item in analizies.data"
              :key="item.id"
              :item="item"
              @addToCart="addToCart(item)"
            />
          </div>
        </div>
      </div>
      <div class="w-full flex justify-center">
        <!-- <button
          @click="getProductToParams()"
          v-if="limit !== null && products.length > 7"
        >
          Показать еще
        </button> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import PopAddToCart from '~/components/elements/PopAddToCart.vue'
import MedProduct from '~/components/med-product.vue'
import SidebarAnaliz from '~/components/Sidebars/SidebarAnaliz.vue'
import GET_CAT_NAME from '~/graphql/get-cat-name.gql'
import GET_ANALIZES_CAT from '~/graphql/analiz-cat-id.gql'

export default {
  components: { PopAddToCart, SidebarAnaliz, MedProduct },
  layout: 'AnalizWrapper',
  data () {
    return {
      title: '',
      // limit: 7,
      limit: null,
      products: [],
      posts: [],
      pageName: ''
    }
  },
  apollo: {
    subCats: {
      query: GET_CAT_NAME,
      variables () {
        return {
          ID: this.$route.params.analiz
        }
      }
    },
    analizies: {
      query: GET_ANALIZES_CAT,
      variables () {
        return {
          ID_CAT: this.$route.params.id
        }
      }
    }
  },

  methods: {
    ...mapActions(['ADD_TO_CART']),
    addToCart (item) {
      this.ADD_TO_CART(item)
    },
    scrollToAnaliz () {
      var scrollDiv = document.getElementById('scroll-to').offsetTop - 90
      window.scrollTo({ top: scrollDiv, behavior: 'smooth' })
    }
  },
  computed: {
    ...mapGetters(['CART', 'CART_IDS', 'GET_ALL_BIOMATERIALS'])
  },
  mounted () {
    if (window.screen.width <= 600) {
      this.scrollToAnaliz()
    }
    this.$router.replace({ query: null })
  },
  updated () {
    if (window.screen.width <= 600) {
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

<style></style>
