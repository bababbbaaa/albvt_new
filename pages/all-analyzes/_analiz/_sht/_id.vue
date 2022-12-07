<template>
  <div class="flex w-full flex-col sm:flex-row   gap-[20px]">
    <button
      @click="$router.back()"
      class=" flex sm:hidden justify-start items-center"
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
    <div class="w-full sm:w-2/3  order-2 sm:order-1 gap-[20px]">
      <div class="flex flex-row items-start gap-[8px] ">
        <button
          @click="$router.back()"
          class=" hidden sm:flex justify-center items-center"
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
        <div class="flex flex-col gap-[8px] ">
          <h1 class="font-medium pb-[8px] text-[24px]   block overflow-hidden">
            {{ subcategory.name.replace(/[0-9]/g, '').replace(/\./g, '') }}:
          </h1>
          <h3 class="font-medium pb-4  text-[13px]">{{ products.name }}</h3>
        </div>
      </div>

      <div class=" flex flex-col gap-[20px] ">
        <div class="flex flex-col gap-[20px]">
          <div class="w-full ">
            <tabs-analiz class="w-full ">
             

              <tab-analiz
                title="Описание"
                class="cursor-pointer"
                :key="'opisanie'"
                :data="products.description"
                v-if="products.description.length"
              >
                <!-- <p v-html="products.description" class="text-[14px] pt-4"></p> -->
              </tab-analiz>
               <tab-analiz
                :key="'pogrotovka'"
                title="Подготовка"
                :data="products.short_description"
                class="text-[14px] pt-4 cursor-pointer"
                v-if="products.short_description.length"
              >
                <p
                  v-html="products.short_description"
                  class="text-[14px] pt-4"
                ></p>
              </tab-analiz>
            </tabs-analiz>
          </div>
          <div></div>
        </div>
      </div>
    </div>

    <div class="w-full sm:w-1/3 order-1 sm:order-2" id="scroll-toAnaliz">
      <cart-item-analiz
        :data="products"
        :bio="GET_ALL_BIOMATERIALS"
        @addToCart="addToCart"
      />
    </div>
  </div>
</template>

<script>
import CartItemAnaliz from '~/components/cart/CartItemAnaliz.vue'
import TabAnaliz from '~/components/tabs/tab-analiz.vue'
import TabsAnaliz from '~/components/tabs/tabs-analiz.vue'

import { mapActions, mapGetters } from 'vuex'
export default {
  components: { CartItemAnaliz, TabAnaliz, TabsAnaliz },
  layout: 'AnalizWrapper',
  head () {
    return {
      title: this.products.name,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description',
          name: 'description',
          content: 'My custom description'
        }
      ]
    }
  },
  data () {
    return {
      title: '',
      addCartItem: ''
    }
  },
  methods: {
    scrollToAnaliz () {
      var scrollDiv = document.getElementById('scroll-toAnaliz').offsetTop - 90
      window.scrollTo({ top: scrollDiv, behavior: 'smooth' })
    },
    ...mapActions(['ADD_TO_CART', 'GET_BIOMATERIALS_FROM_API']),
    addToCart (data) {
      this.ADD_TO_CART(data), (this.addCartItem = data.name)
    }
  },
  mounted () {
    this.GET_BIOMATERIALS_FROM_API()
    if (window.screen.width <= 600) {
      this.scrollToAnaliz()
    }
    this.$router.replace({'query': null});
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
  },
  computed: {
    ...mapGetters(['GET_ALL_BIOMATERIALS', 'CART_IDS'])
  },
  async asyncData ({ $axios, params }) {
    const title = params.id
    let products = await $axios.$get(
      `https://foxsis.ru/alvd/wp-json/wc/v3/products/` + params.id,
      {
        auth: {
          username: 'ck_85e44e8735261d45a19d8f7aaf012f8d640c2dac',
          password: 'cs_4261bb639f4e9a18c146851361d6317804a816fc'
        }
      }
    )
    let subcategory = await $axios.$get(
      `https://foxsis.ru/alvd/wp-json/wc/v3/products/categories/` + params.sht,
      {
        auth: {
          username: 'ck_85e44e8735261d45a19d8f7aaf012f8d640c2dac',
          password: 'cs_4261bb639f4e9a18c146851361d6317804a816fc'
        },
        _fields: 'id,name'
      }
    )

    return { products, title, subcategory }
  }
}
</script>

<style></style>
