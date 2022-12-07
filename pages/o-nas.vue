<template>
  <div class="container ">
    <div class="py-[47px] mt-[47px] sm:mt-0 flex flex-col w-full gap-12">
      <heading-h-3>О нас</heading-h-3>
      <div class="flex flex-col w-full gap-4">
        <span class="font-medium">Наша лицензия, ОГРН и ИНН</span>
        <div class="grid grid-cols-2 gap-[20px] lg:grid-cols-4 w-full">
          <div
            v-for="(img, i) in photo"
            :key="img.id"
            class="flex flex-col justify-center items-center gap-1 bg-white shadow-md py-2 rounded-[5px] "
          >
            <img
              :src="img.src"
              alt=""
              @click="openPhoto(i)"
              class="cursor-pointer"
            />
            <span v-if="img.title == ''" class="w-full text-center text-[14px]"
              >Лицензия Альба Вита ({{ img.id }} страница)</span
            >
            <span v-else class="w-full text-center text-[14px]"
              >{{ img.title }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="modalPhoto == true "
      class="fixed w-screen top-0 left-0 h-screen  flex justify-center items-center z-[999999]"
    >
      <div
        class="fixed w-screen top-0 left-0 h-screen bg-[#343434]/50"
        @click="modalPhoto = false"
      ></div>
      <!-- desctop -->
      <div
        class="hidden sm:flex gap-0 sm:gap-[20px] justify-center items-center w-full  sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px]"
      >
        <button
          @click="prevSlide()"
          class="z-[3]"
          :class="[
            id !== 1 ? 'opacity-100' : 'opacity-30 cursor-disable'
          ]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-12 w-12 text-white z-[3]"
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
        <a :href="`/img/${id}-o-nas.jpg`" target="_blank" class="absolute z-[4] ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-20 w-20 hover:text-[#343434]/30 text-[#343434]/50  anime"
            title="Увеличить"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
              clip-rule="evenodd"
            />
          </svg>
        </a>

        <img :src="`/img/${id}-o-nas.jpg`" alt="" class="w-full  h-auto object-cover z-[3]" />
        <button
          @click="nextSlide()"
          class="z-[3]"
          :class="[
            id !== 6 ? 'opacity-100' : 'opacity-30 cursor-disable'
          ]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-12 w-12 text-white z-[3]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
      <!-- mobile -->
      <div
        class="flex flex-col sm:hidden gap-4 sm:gap-[20px] justify-center items-center w-full  max-w-[200px]"
      >
        <img :src="`/img/${id}-o-nas.jpg`" alt="" class="w-full  h-auto object-cover z-[5]" />

        <div class="flex justify-center items-center gap-4">
          <button
            @click="prevSlide()"
            class="z-[3]"
            :class="[
              id !== 0 ? 'opacity-100' : 'opacity-30 cursor-disable'
            ]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-12 w-12 text-white z-[3]"
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
          <button
            @click="nextSlide()"
            class="z-[3]"
            :class="[
             id !== 6 ? 'opacity-100' : 'opacity-30 cursor-disable'
            ]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-12 w-12 text-white z-[3]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeadingH3 from '~/components/HeadingH3.vue'

export default {
  components: { HeadingH3 },
  data () {
    return {
      id: '',
      indexPhoto: null,
      photo: [
        { src: '/img/1-o-nas.jpg', title: '', id: 1 },
        { src: '/img/2-o-nas.jpg', title: '', id: 2 },
        { src: '/img/3-o-nas.jpg', title: '', id: 3 },
        { src: '/img/4-o-nas.jpg', title: '', id: 4 },
        // { src: '/img/license-4-b-400x516.png' },
        {
          src: '/img/5-o-nas.jpg',
          title: 'Свидетельство ОГРН Альба Вита',
          id: 5
        },
        {
          src: '/img/6-o-nas.jpg',
          title: 'Свидетельство ИНН Альба Вита',
          id: 6
        }
      ],
      modalPhoto: false
    }
  },
  layout: 'MainLayout',
  methods: {
    openPhoto (id) {
      this.id = id + 1
      this.indexPhoto = id
      this.modalPhoto = true
    },
    nextSlide () {
      if (this.id !== 6) {
        this.id =  this.id + 1
      }
    },
    prevSlide () {
      if (this.id !== 1) {
        this.id =  this.id - 1
      }
    }
  }
}
</script>

<style></style>
