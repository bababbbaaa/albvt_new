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
        <div class="flex flex-col gap-[8px] " v-if="analizy">
          <h1 class="font-medium pb-[8px] text-sm  block overflow-hidden">
            {{ analizy.attributes.sub_cat.data.attributes.Name }}:
          </h1>
          <h3 class="font-medium pb-4 text-2xl  ">
            {{ analizy.attributes.Name }}
          </h3>
        </div>
      </div>

      <div class=" flex flex-col gap-[20px] ">
        <div class="flex flex-col gap-[20px]">
          <div class="w-full ">
            <tabs-analiz class="w-full " v-if="analizy">
              <tab-analiz
                title="Описание"
                class="cursor-pointer"
                :key="'opisanie'"
                :data="analizy.attributes.Desc"
                v-if="analizy.attributes.Desc.length"
              >
              </tab-analiz>
              <tab-analiz
                :key="'pogrotovka'"
                title="Подготовка"
                :data="analizy.attributes.SubDesc"
                class="text-[14px] pt-4 cursor-pointer"
                v-if="analizy.attributes.SubDesc.length"
              >
                <p
                  v-html="analizy.attributes.SubDesc"
                  class="text-[14px] pt-4"
                ></p>
              </tab-analiz>
            </tabs-analiz>
          </div>
          <div></div>
        </div>
      </div>
    </div>

    <div class="w-full sm:w-1/3 order-1 sm:order-2" id="scroll-toComplex">
      <cart-item-analiz
        v-if="analizy"
        :data="analizy"
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
import ANALIZ_ID from '~/graphql/analiz/ANALIZ_ID.gql'

import { mapActions, mapGetters } from 'vuex'
export default {
  components: { CartItemAnaliz, TabAnaliz, TabsAnaliz },
  layout: 'AnalizWrapper',
  head () {
    return {
      // title: this.analizy.data.attributes.Name,
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
      setTimeout(() => {
        let scrollDiv =
          document.getElementById('scroll-toComplex').offsetTop - 90
        window.scrollTo({ top: scrollDiv, behavior: 'smooth' })
        console.log('scrollToAnaliz +')
      }, 500)
    },
    ...mapActions(['ADD_TO_CART', 'GET_BIOMATERIALS_FROM_API']),
    addToCart (data) {
      console.log(data)
      this.ADD_TO_CART(data)
    }
  },
  mounted () {
    this.GET_BIOMATERIALS_FROM_API()
    if (window.screen.width <= 600) {
      this.scrollToAnaliz()
      console.log('mobile eto sht1')
    } else {
      console.log('ne mobile')
    }
    this.$router.replace({ query: null })
  },
  updated () {
    if (window.screen.width <= 600) {
      this.scrollToAnaliz()
      console.log('ne mobile eto sht2')
    } else {
      console.log('ne mobile')
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
  async asyncData ({ app, params }) {
    const client = app.apolloProvider.defaultClient
    const id = params.id

    const res = await client.query({
      query: ANALIZ_ID,
      variables: {
        ID: id
      }
    })

    const analizy = res.data.analizy.data

    return {
      analizy
    }
  }
}
</script>

<style></style>
