<template>
  <div class="flex w-full flex-col sm:flex-row   gap-[20px]">
    <div class="w-full sm:w-2/3  order-2 sm:order-1 gap-[20px]">
      <div class="flex flex-row items-start gap-[8px] ">
        <div class="flex flex-col gap-[8px] " v-if="analizy">
          <h1
            class="font-medium pb-[8px] text-sm  overflow-hidden flex items-center gap-2"
          >
            <button
              @click="$router.back()"
              class=" sm:flex justify-center items-center hidden "
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
            {{ analizy.attributes.sub_cat.data.attributes.Name }}:
          </h1>
          <h3 class="font-medium pb-4 text-2xl  ">
            {{ analizy.attributes.Name }}
          </h3>
        </div>
      </div>

      <div class=" flex flex-col gap-[20px] ">
        <div class="flex flex-col gap-[20px]">
          <div class="w-full " v-if="analizy">
            <tabs-analiz class="w-full ">
              <tab-analiz
                title="Описание"
                class="cursor-pointer"
                :key="'opisanie'"
                :data="analizy.attributes.Desc"
                v-if="analizy.attributes.Desc.length"
              />
              <tab-analiz
                :key="'pogrotovka'"
                title="Подготовка"
                :data="analizy.attributes.SubDesc"
                class="text-sm pt-4 cursor-pointer"
                v-if="analizy.attributes.SubDesc.length"
              />
            </tabs-analiz>
          </div>
          <div v-if="analizy.attributes.complecsAnaliz.data">
            <div class="my-4">
              <span class="text-center w-full font-medium text-[16px]"
                >Состав комплекса:</span
              >
              <div class="flex flex-col gap-4 mt-4">
                <div
                  v-for="(item, i) in analizy.attributes.complecsAnaliz.data"
                  :key="i"
                  class="bg-white p-4 rounded-[5px] shadow-md  h-full grid grid-cols-5 items-center gap-4"
                >
                  <div
                    class="h-full flex flex-col gap-2 col-span-5 sm:col-span-4"
                  >
                    <a
                      :href="`/all-analyzes/in-complecs/id/` + item.id"
                      target="_blank"
                      class="text-sm font-medium text-[#343434]]/70 hover:text-main anime"
                      >{{ item.attributes.Name }}</a
                    >
                    <span class="text-xs text-[#343434]/70">
                      Код: {{ item.attributes.Art }}
                    </span>
                  </div>
                  <div
                    class="font-medium text-sm h-full col-span-5 sm:col-span-1 flex justify-end"
                  >
                    {{ item.attributes.Price }} ₽
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>

    <div class="w-full sm:w-1/3 order-1 sm:order-2" id="scroll-toAnaliz">
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
  layout: 'ComplecsWrapper',
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
          document.getElementById('scroll-toAnaliz').offsetTop - 90
        window.scrollTo({ top: scrollDiv, behavior: 'smooth' })
        console.log('scrollToAnaliz +')
      }, 500)
    },
    ...mapActions(['ADD_TO_CART', 'GET_BIOMATERIALS_FROM_API']),
    addToCart (data) {
      this.ADD_TO_CART(data)
    }
  },
  mounted () {
    this.GET_BIOMATERIALS_FROM_API()
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
