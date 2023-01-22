<template>
  <div class="bg-[#F9F9F9] flex flex-col relative ">
    <div class="w-full bg-main">
      <div
        class="container w-full flex items-center justify-between text-white py-3 relative"
      >
        <nuxt-link
          to="/doctor"
          class="flex flex-col !text-white uppercase  justify-start cursor-pointer w-[122px] sm:w-[154px]"
        >
          <span class="text-[18px] sm:text-[22px]">Альба вита</span>

          <span class="text-[8px] sm:text-[10px]">медицинские анализы</span>
        </nuxt-link>
        <div class="flex gap-2 items-center">
          <a href="tel:88632418555" class="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-6 h-6"
            >
              <path
                fill-rule="evenodd"
                d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="hidden sm:block">+7 (863) 241-85-55</span>
          </a>
          <div @click="show = !show">
            <Transition name="fade">
              <svg
                v-if="show == false"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-8 h-8"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                  clip-rule="evenodd"
                />
              </svg>

              <svg
                v-if="show == true"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-8 h-8"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                  clip-rule="evenodd"
                />
              </svg>
            </Transition>
          </div>
        </div>
        <Transition name="nested" :duration="{ enter: 500, leave: 500 }" appear>
          <div
            v-if="show"
            class="absolute top-16 right-0 left-0 w-full bg-white drop-shadow-lg rounded-b-lg overflow-hidden p-4 z-[99]"
          >
            <ul class="flex flex-col gap-3 text-tem menu-slide">
              <nuxt-link to="/" >Главная</nuxt-link>
              <button @click="getMe" class="flex justify-start" >Личные данные</button>
              <nuxt-link to="/all-analyzes" >Анализы</nuxt-link>
              <nuxt-link to="/all-complecs" >Комплексы</nuxt-link>
              <button @click="openModal" class="flex justify-start" >Выйти</button>
            </ul>
          </div>
        </Transition>
      </div>
    </div>
    <div id="tabs-doctor" class="sticky top-0 z-[2]">
      <div
        class="flex justify-center gap-6  w-full drop-shadow-xl bg-white rounded-b-2xl text-sm font-medium"
      >
        <nuxt-link
          to="/doctor/pacient"
          class="flex justify-center items-center py-3"
        >
          Пациенты
        </nuxt-link>
        <nuxt-link
          to="/doctor/dostupno"
          class="flex justify-center items-center py-3"
        >
          Доступно
        </nuxt-link>
        <nuxt-link
          to="/doctor/vivod"
          class="flex justify-center items-center py-3"
        >
          Выведено
        </nuxt-link>
      </div>
    </div>
    <div class="pt-4">
      <Nuxt />
    </div>
    <div
      v-if="modal == true"
      class="absolute top-0 bg-tem/50 w-screen h-screen flex justify-center items-start pt-[40%] sm:pt-[20%] z-[99999]"
    >
      <div
        class="flex flex-col gap-8 justify-center items-center bg-white rounded-md p-4"
      >
        <span class="w-full text-center">Выйти из кабинета врача?</span>
        <div class="flex gap-4 items-center justify-between  w-full">
          <button
            class="py-3 px-4 rounded-md text-white bg-[#54D283] text-sm"
            @click="handleLogout()"
          >
            Выйти
          </button>
          <button
            @click="modal = false"
            class="py-3 px-4 rounded-md text-white bg-[#EF5C5B] text-sm"
          >
            Отменить
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NOTIFICATIONS from '~/graphql/doctor/NOTIFICATIONS.gql'
export default {
  data () {
    return {
      show: false,
      modal: false
    }
  },
  apollo: {
    notifications: {
      query: NOTIFICATIONS,
      prefetch: true
    }
  },
  methods: {
    openModal () {
      this.modal = true
       this.show = false
    },
    getMe(){
      this.show = false
      this.$router.push({path: '/doctor/me'});
    },
    async handleLogout () {
      this.$nuxt.$loading.start()
      await this.$auth.logout()
    }
  }
}
</script>

<style>


.nested-enter-active .menu-slide,
.nested-leave-active .menu-slide {
  transition: all 0.3s ease-in-out;
}

.nested-enter-from .menu-slide,
.nested-leave-to .menu-slide {
  transition: all 0.3s ease-in-out;
  opacity: 0;
}
</style>
