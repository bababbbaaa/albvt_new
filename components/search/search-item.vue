<template>
  <li
    class="border-b-[0.5px] border-b-[#D9D9D9]/50 px-4 py-3  grid grid-cols-[8fr,4fr] lg:grid-cols-[8fr,3fr] sm:grid-cols-[10fr,4fr] gap-2 items-center hover:bg-[#F5F5F5] anime"
  >
    <div @click="closeSearch()" class="flex flex-col gap-1">
      <nuxt-link
        v-if="item.attributes.Complecs == true"
        :to="'/all-complecs/category/id/' + item.id"
        class=" text-[#777777] hover:text-[#343434] anime font-semibold text-[12px] sm:text-sm"
        :title="item.attributes.Name"
        >{{ item.attributes.Name }}</nuxt-link
      >
      <nuxt-link
        v-else
        :to="'/all-analyzes/category/id/' + item.id"
        class="text-[#777777] hover:text-[#343434] font-semibold anime text-[12px] sm:text-sm"
        :title="item.attributes.Name"
        >{{ item.attributes.Name }}</nuxt-link
      >

      <div class="flex gap-5 items-center flex-wrap sm:flex-nowrap">
        <span class="text-sm text-[#9A9A9A] "
          >код: {{ item.attributes.Art }}</span
        >
        <span
          v-if="parseInt(item.attributes.TimeDone) == 1"
          class="text-sm text-[#9A9A9A] "
          >{{ item.attributes.TimeDone }} день</span
        >
        <span
          v-else-if="parseInt(item.attributes.TimeDone) < 5"
          class="text-sm text-[#9A9A9A] "
          >{{ item.attributes.TimeDone }} дня</span
        >
        <span v-else class="text-sm text-[#9A9A9A] "
          >{{ item.attributes.TimeDone }} дней</span
        >
        <span
          v-if="item.attributes.Complecs == true"
          class="text-[12px] text-[#757575]  bg-main/20 px-2 py-1 rounded-[5px]"
          >Комплекс</span
        >
      </div>
    </div>
    <div
      v-if="CART_IDS.includes(item.id)"
      class="flex justify-center items-center   rounded-[5px] py-2 text-main gap-1   h-[40px] px-[8px] text-sm"
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
      v-else-if="item.attributes.Active !== true || getConplectsActive == 1"
      class="w-full flex justify-center items-center"
    >
      <span class="text-[12px] text-danger text-center"
        >Временно недоступен</span
      >
    </div>
    <button
      v-else
      @click="productInCart(item)"
      class="bg-main/20 sm:max-w-[160px]   text-[#343434] rounded-[5px] flex justify-center items-center gap-2 p-2"
    >
      <img src="/img/icons/add-to-cart.svg" alt="" />
      <span class="text-[12px] sm:text-sm"
        >{{ parseInt(item.attributes.Price).toLocaleString('ru-RU') }} ₽</span
      >
    </button>
  </li>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  props: {
    item: Object
  },
  methods: {
    productInCart (item) {
      this.$emit('productInCart', item)
      setTimeout(() => {
        this.closeSearch()
      }, 1000)
    },
    closeSearch () {
      this.$emit('closeSearch')
    }
  },
  computed: {
    ...mapGetters(['CART', 'CART_IDS']),

    getConplectsActive () {
      if (this.item.attributes.Complecs == true) {
        const data = this.item.attributes.complecsAnaliz.data.map(
          x => x.attributes.Active
        )
        if (data.includes(false)) {
          return 1
        } else {
          return 2
        }
      }
    }
  }
}
</script>

<style></style>
