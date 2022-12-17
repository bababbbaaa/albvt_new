<template>
  <div
    class="bg-white shadow-md w-full rounded-[5px] p-[20px] flex flex-col gap-[20px]"
  >
    <div
      class="flex flex-col gap-[4px] border-b-[0.5px] pb-[16px] border-b-main/50"
    >
      <span class="text-[16px] font-semibold">{{ data.attributes.Name }}</span>
      <span class="text-[12px] text-[#838383]"
        >Артикул (код) - {{ data.attributes.Art }}
      </span>
    </div>
    <div class="flex flex-col gap-[4px]">
      <div class="flex justify-between items-center">
        <span class="text-[16px]">Цена:</span>
        <span class="text-[#838383] text-[16px]"
          >{{ parseInt(data.attributes.Price).toLocaleString('ru-RU') }} ₽</span
        >
      </div>
      <div v-if="data.attributes.biomaterialies.data.length">
        <div
          v-for="item in data.attributes.biomaterialies.data"
          :key="item.id"
          class="grid grid-cols-[2fr,1fr] gap-2 pt-2"
        >
          <span class="text-[12px] text-[#838383] font-thin">
            {{ item.attributes.Name }}
          </span>
          <span class="text-[#838383] text-[16px] text-right"
            >+{{ item.attributes.Price }} ₽</span
          >
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-[4px]">
      <span class="text-[20px] text-main">
        {{ getTotalPrice.toLocaleString('ru-RU') }} ₽</span
      >
     

      <span
        class="text-[#838383] text-[12px]"
        v-if="parseInt(data.attributes.TimeDone) == 1"
        >{{ data.attributes.TimeDone }} день</span
      >
      <span
        class="text-[#838383] text-[12px]"
        v-else-if="parseInt(data.attributes.TimeDone) < 5"
        >{{ data.attributes.TimeDone }} дня</span
      >
      <span class="text-[#838383] text-[12px]" v-else
        >{{ data.attributes.TimeDone }} дней</span
      >
    </div>

    <div
      v-if="CART.includes(data) || CART_IDS.includes(data.id)"
      :id="data.id"
      class="flex justify-center items-center   rounded-[5px] py-2 text-main  gap-1  h-[40px] px-[8px] text-[14px]"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M5 13l4 4L19 7"
        /></svg
      ><span class="text-[12px]">В корзине</span>
    </div>
    <div  v-else-if="data.attributes.Active == false" class="w-full flex items-center justify-center gap-1">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 text-danger"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
        />
      </svg>
      <span class=" text-center text-danger">Временно недоступен</span>
    </div>
    <button
      @click="addToCart()"
      v-else
      class="flex justify-center items-center border bg-white  border-main rounded-[5px] sm:py-2 text-main  hover:bg-main hover:text-white anime h-[40px] px-[8px] text-[14px]"
    >
      <span class=""> В корзину</span>
    </button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    data: Object,
    bio: Array
  },
  methods: {
    addToCart () {
      this.$emit('addToCart', this.data)
    },
    
  },
  computed: {
    ...mapGetters(['CART', 'CART_IDS']),
    getTotalPrice () {
      const priceAnaliz =  this.data.attributes.Price
      let priceBiomateriales = this.data.attributes.biomaterialies.data.reduce((prev, item) => {
        return prev + parseInt(item.attributes.Price)
      }, priceAnaliz)

      return priceBiomateriales
    }
  }
}
</script>

<style></style>
