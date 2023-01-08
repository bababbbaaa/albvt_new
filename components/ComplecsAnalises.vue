<template>
  <div class="flex flex-col gap-[20px] sm:gap-[58px] mt-[47px]">
    <heading-h-3>Комплексы анализов</heading-h-3>
    <div class="container relative">
      
      <client-only placeholder="Загрузка...">
        <agile
          :options="allComplecs"
          id="ComplecsSlider"
          class="flex flex-col items-center justify-center gap-[20px]"
        >
          <div
            class="slide"
            v-for="(slideContent, index) in filteredPost"
            :key="slideContent.id"
          >
           <div
            class="bg-white flex flex-col border-[0.5px] border-[#808080] rounded-[5px] overflow-hidden gap-[12px] mx-[10px]"
          >
        
            <img :src="slideContent.acf.kartinka" alt="" class="w-full h-[200px] object-cover" />
            <div class="flex flex-col gap-[16px] p-[10px]">
              <span class="text-[18px] border-b border-b-[#8D8D8D] w-full pb-4  ">{{ slideContent.acf.nazvanie }} </span>
              <span class="text-blue text-[18px]">{{ slideContent.acf.czena }} ₽</span>
              <button class="border  border-main rounded-[5px] py-2 text-main text-[16px] hover:bg-main hover:text-white anime">
               <nuxt-link :to="slideContent.acf.ssylka_na_kompleks">Подробнее</nuxt-link>
               
              </button>
            </div>
          </div>
          </div>
        </agile>
      </client-only>


    </div>
  </div>
</template>

<script>

import HeadingH3 from './HeadingH3.vue'
export default {
  data () {
    return {
      allComplecs: {
        navButtons: false,
        dots: true,
        centerMode: true,
        // swipeDistance: 20,
        pauseOnHover: true,
        responsive: [
          {
            breakpoint: 320,
            settings: {
              slidesToShow: 1
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 4
            }
          },
          {
            breakpoint: 900,
            settings: {
              slidesToShow: 5
            }
          }
        ]
      }
    }
  },
  props: {
    data_slider: Array
  },
  components: {  HeadingH3 },

  computed: {
    filteredPost: function () {
      return this.data_slider.filter(item => item.categories == 4726)
    }
  }

}
</script>

<style>
.shadow-swaiper {
  background: linear-gradient(
    270deg,
    #f8f8f8 0%,
    rgba(217, 217, 217, 0) 90.91%
  );
}
</style>
