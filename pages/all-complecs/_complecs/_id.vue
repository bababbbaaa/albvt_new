<template>
  <div class="" >
    <div class="flex flex-col gap-[20px] ">
      <div
        class="flex flex-col sm:flex-row gap-2 sm:justify-between "
        ref="elScroll2"
      >
        <h1
          v-if="analizies && subCats"
          class="text-xl sm:text-2xl font-medium flex gap-2 items-center scroll-to"
        >
          {{ subCats.data[0].attributes.Name }}
        </h1>
      </div>
      <div class="bg-white shadow-md rounded-[5px] ">
        <div >
          <div
            class="hidden xl:grid lg:grid-cols-[3fr,3fr,2fr,1fr]   xl:grid-cols-[2fr,13fr,2fr,3fr] w-full border-b border-b-[#C3C3C3] gap-[20px] py-[12px] p-[10px]"
          >
            <span class="">Код</span>
            <span class="">Наименование исследования</span>
            <span class="">Цена</span>
          </div>
          <div class="flex flex-col w-full  xl:mt-[12px]" v-if="analizies" >
            <med-product
              v-for="item in analizies.data"
              :key="item.id"
              :item="item"
              @addToCart="addToCart(item)"
              
            />
          </div>
        </div>
      </div>
      <div class="w-full flex justify-center"></div>
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
  layout: 'ComplecsWrapper',
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
          ID: this.$route.params.id
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
    }
  },
  computed: {
    ...mapGetters(['CART', 'CART_IDS', 'GET_ALL_BIOMATERIALS'])
  },
 
}
</script>

<style></style>
