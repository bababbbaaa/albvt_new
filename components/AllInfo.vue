<template>
  <div class="flex flex-col gap-[20px] sm:gap-[58px]">
    <heading-h-3>Общая информация</heading-h-3>
    <div class="container relative">
      <client-only placeholder="Загрузка...">
        <agile
          :options="allInfo"
          class="flex flex-col items-center justify-center gap-[20px]"
        >
          <div
            class="slide"
            v-for="(slideContent, index) in filteredPost"
            :key="slideContent.id"
          >
            <!-- <img :src="slideContent.acf.kartinka" alt=""> -->
            <div
              class="bg-white flex flex-col border-[0.5px] border-[#808080] rounded-[5px] overflow-hidden gap-[12px] mx-[10px]"
            >
              <img
                :src="slideContent.acf.kartinka"
                alt=""
                class="w-full h-[138px] object-cover"
              />
              <div class="flex flex-col gap-[8px] p-[10px]">
                <span class="text-[14px] text-[#A0AFBD] w-full">{{
                  slideContent.acf.podzagolovok
                }}</span>
                <span
                  class="text-[16px] font-medium truncate"
                  :title="slideContent.acf.nazvanie"
                  >{{ slideContent.acf.nazvanie }}
                </span>
                <nuxt-link
                  v-if="slideContent.acf.ssylka_na_info.length >= 2"
                  :to="slideContent.acf.ssylka_na_info"
                >
                  <button
                    class="border  border-main rounded-[5px] mt-2 py-2 w-full text-main text-[15px] hover:bg-main hover:text-white anime"
                  >
                    Читать
                  </button>
                </nuxt-link>
                <span v-else>
                  <button
                    class="border  border-main rounded-[5px] mt-2 py-2 w-full text-main text-[15px] hover:bg-main hover:text-white anime"
                  >
                    нечего пока читать
                  </button>
                </span>
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
import { VueAgile } from 'vue-agile'

export default {
  data () {
    return {
      allInfo: {
        navButtons: false,
        dots: true,
        centerMode: true,
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
  components: { HeadingH3, agile: VueAgile },
  methods: {
    // onSwiper2 (swiper) {
    // },
    // onSlideChange () {
    // }
  },

  computed: {
    filteredPost: function () {
      return this.data_slider.filter(item => item.categories == 4727)
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

.agile__dot {
  margin: 0 10px;
}
.agile__dot button {
  background-color: #eee;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: block;
  height: 10px;
  font-size: 0;
  line-height: 0;
  margin: 0;
  padding: 0;
  transition-duration: 0.3s;
  width: 10px;
}
.agile__dot--current button, .agile__dot:hover button {
  background-color: #54ACD2;
}
</style>
