<template>
  <div
    class="grid grid-cols-[3fr,3fr,2fr,1fr]  lg:grid-cols-[3fr,3fr,1fr] xl:grid-cols-[2fr,13fr,2fr,3fr] grid-rows-2 xl:grid-rows-1  gap-2 xl:gap-[20px] items-center hover:bg-[#F5F5F5] p-[10px] anime border-b-[0.5px] border-b-[#e4e4e4]"
  >
    <span class="hidden xl:block font-medium text-sm "
      >{{ item.attributes.Art }}
    </span>

    <div
      class="row-span-1 col-span-4 xl:col-span-1 flex  flex-col font-medium text-sm     py-2 xl:py-[20px] "
    >
      <span @click="linkMed(item)">
        <p
          class="test-text2 anime cursor-pointer  h-full text-[#343434] xl:text-[#777777] hover:text-[#343434]"
          :title="item.attributes.Name"
        >
          {{ item.attributes.Name }}
        </p>
      </span>
    </div>

    <div class="hidden xl:flex flex-col col-span-1">
      <span
        class="text-[16px] font-semibold cursor-pointer flex items-start"
        v-tooltip.top-end="{
          content: 'Цена указана без учета забора биоматериала',
          classes: [
            'bg-white text-xs lg:text-sm px-2 py-4 border border-[#777777] rounded-[5px]'
          ]
        }"
        >{{ parseInt(item.attributes.Price).toLocaleString('ru-RU') }} ₽
        <article class="text-[#A75F4F]">*</article>
      </span>
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
    </div>

    <!-- modile -->

    <div
      class=" flex xl:hidden flex-wrap sm:flex-nowrap gap-2 lg:gap-4 col-span-2 items-center lg:text-sm font-normal text-[#777777]"
    >
      <span class="text-xs sm:text-sm w-full sm:w-auto"
        >Код: {{ item.attributes.Art }}</span
      >
      <span
        v-if="parseInt(item.attributes.TimeDone) == 1"
        class=" text-[#9A9A9A] text-xs sm:text-sm"
        >{{ item.attributes.TimeDone }} день</span
      >
      <span
        v-else-if="parseInt(item.attributes.TimeDone) < 5"
        class=" text-[#9A9A9A] text-xs sm:text-sm"
        >{{ item.attributes.TimeDone }} дня</span
      >
      <span v-else class=" text-[#9A9A9A] text-xs sm:text-sm"
        >{{ item.attributes.TimeDone }} дней</span
      >
      <div
        class="flex flex-wrap gap-2 cursor-pointer text-xs sm:text-sm"
        v-if="item.attributes.biomaterialies.data.length"
      >
        <span
          v-for="bio in item.attributes.biomaterialies.data"
          :key="bio.id"
          class=""
        >
          {{ bio.attributes.Name }} (+{{ bio.attributes.Price }}₽)
        </span>
      </div>
    </div>

    <!-- end modile -->

    <div
      v-if="CART.includes(item) || CART_IDS.includes(item.id)"
      :id="item.id"
      class="flex justify-center items-center col-span-4 sm:col-span-1   rounded-[5px] py-2 text-main gap-1    h-[40px] px-[8px] text-[14px]"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 "
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
      <span class="text-xs">В корзине</span>
    </div>

    <button
      @click="addToCart(item)"
      v-else
      class="col-span-4 lg:col-span-2 xl:col-span-1 group   flex justify-center items-center border bg-white  border-main rounded-[5px] xl:py-2 text-main  hover:bg-main hover:text-white anime h-[40px] px-[8px] text-[14px]"
    >
      <span class="flex xl:hidden pr-2 border-r-[1px] border-main text-[14px]"
        >{{ parseInt(item.attributes.Price).toLocaleString('ru-RU') }} ₽</span
      >

      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6 block xl:hidden group-hover:hidden pl-2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6 group-hover:block hidden pl-2 text-white"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
        />
      </svg>

      <span class="hidden xl:block"> В корзину</span>
    </button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    item: Object
  },
  computed: {
    ...mapGetters(['CART', 'CART_IDS'])
  },
  methods: {
    addToCart (item) {
      this.$emit('addToCart', item)
    },
    linkMed (item) {
      if (this.$route.fullPath == '/all-analyzes' || this.$route.fullPath == '/all-complecs' ) {
        this.$router
          .replace(this.$route.fullPath + '/populate/id/' + item.id)
          .catch(() => {})
      } else {
        this.$router.replace(this.$route.fullPath + '/' + item.id).catch(() => {})
      }
    }
  }
}
</script>

<style></style>
