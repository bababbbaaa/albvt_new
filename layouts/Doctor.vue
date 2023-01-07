<template>
  <div class="bg-[#fcfcfc]">
    <div class="w-full bg-main ">
      <div
        class="container w-full flex items-center justify-between text-white py-3"
      >
        <nuxt-link
          to="/"
          class="flex flex-col !text-white uppercase  justify-start cursor-pointer w-[122px] sm:w-[154px]"
        >
          <span class="text-[18px] sm:text-[22px]">Альба вита</span>

          <span class="text-[8px] sm:text-[10px]">медицинские анализы</span>
          <!-- <img
        src="/img/icons/full-logo.svg"
        alt=""
        class="w-[112px] sm:w-[152px] h-auto"
      /> -->
        </nuxt-link>
        <div class="flex gap-2 items-center">
          <nuxt-link to="/doctor/notifications" class="relative">
            <img src="~/assets/icons/doctor1.svg" alt="" />
            <span
              v-if="notifications && notifications.data.length > 0"
              class="text-tem absolute -top-1 -right-1 bg-white rounded-full  w-4 h-4 text-xs flex justify-center items-center"
            >
              {{ notifications.data.length }}
            </span>
          </nuxt-link>
          <nuxt-link to="/doctor/me">
            <img src="~/assets/icons/doctor2.svg" alt="" />
          </nuxt-link>
          <button @click="modal = true">
            <img src="~/assets/icons/doctor3.svg" alt="" />
          </button>
        </div>
      </div>
      <div
        v-if="modal == true"
        class="fixed bg-tem/50 w-screen h-screen flex justify-center items-start py-20 z-[99999]"
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
    <Nuxt />
  </div>
</template>

<script>
import NOTIFICATIONS from '~/graphql/doctor/NOTIFICATIONS.gql'
export default {
  data () {
    return {
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
    },
    async handleLogout () {
      this.$nuxt.$loading.start()
      await this.$auth.logout()
    }
  }
}
</script>

<style></style>
