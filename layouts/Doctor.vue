<template>
  <div class="bg-[#fcfcfc] flex flex-col gap-4 relative">
    <div class="w-full bg-main ">
      <div
        class="container w-full flex items-center justify-between text-white py-3"
      >
        <nuxt-link
          to="/doctor"
          class="flex flex-col !text-white uppercase  justify-start cursor-pointer w-[122px] sm:w-[154px]"
        >
          <span class="text-[18px] sm:text-[22px]">Альба вита</span>

          <span class="text-[8px] sm:text-[10px]">медицинские анализы</span>
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

        </div>
      </div>
      
    </div>
    <div class="container grid grid-cols-1 sm:grid-cols-2  w-full gap-2" id="tabs-doctor">
      <div class="grid grid-cols-3  w-full">
        <nuxt-link to="/doctor/pacient" class="flex justify-center items-center py-3">
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
    <Nuxt />
  </div>
</template>

<script>
import NOTIFICATIONS from '~/graphql/doctor/NOTIFICATIONS.gql'
export default {
  data () {
    return {
     
    }
  },
  apollo: {
    notifications: {
      query: NOTIFICATIONS,
      prefetch: true
    }
  },

}
</script>

<style></style>
