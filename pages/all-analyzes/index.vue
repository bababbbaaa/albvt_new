<template>
  <div class="">
    <div class="flex flex-col gap-[20px] ">
      <div
        id="scroll-to"
        class="flex flex-col sm:flex-row gap-2 sm:justify-between"
      >
        <h1
          v-if="analizies"
          class="text-xl sm:text-2xl font-medium flex gap-2 items-center scroll-to"
        >
          <span class="leading-7">
            Популярные анализы
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
          <div
            class="flex flex-col w-full  xl:mt-[12px]"
            v-if="analizies"
          >
            <med-product
              v-for="item in analizies.data"
              :key="item.id"
              :item="item"
              @addToCart="addToCart(item)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import PopAddToCart from '~/components/elements/PopAddToCart.vue'
import MedProduct from '~/components/med-product.vue'
import SidebarAnaliz from '~/components/Sidebars/SidebarAnaliz.vue'
import POPULATE_ANALIZ from '~/graphql/POPULATE_ANALIZ.gql'

export default {
  components: { PopAddToCart, SidebarAnaliz, MedProduct },
  layout: 'AnalizWrapper',
  apollo: {
    analizies: {
      query: POPULATE_ANALIZ
    }
  },

  methods: {
    ...mapActions(['ADD_TO_CART']),
    addToCart (item) {
      this.ADD_TO_CART(item)
    }
  },
  computed: {
    ...mapGetters(['CART', 'CART_IDS', 'GET_ALL_BIOMATERIALS']),
  }
}
</script>

<style></style>
