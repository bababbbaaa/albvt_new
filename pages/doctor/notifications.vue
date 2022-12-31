<template>
  <div class="container mt-8 flex justify-center items-center flex-col ">
    <div class="w-full flex items-center justify-between">
      <button
        @click="$router.back()"
        class=" flex  justify-start items-center gap-1"
      >
        <img src="~/assets/icons/arrow-back.svg" alt="" />
        Назад
      </button>
    </div>
    <div class="mt-8 flex flex-col gap-4 w-full" v-if="notifications && notifications.data.length > 0">
      <div
        v-for="item in notifications.data"
        :key="item.id"
        class="bg-[#EDEDED] text-tem p-3 rounded-md flex flex-col gap-3
        "
      >
       <div class="w-full flex justify-between text-tem/50">
       <span>Администрация</span>
       <span> {{
            new Date(item.attributes.createdAt).toLocaleString('ru', options)
          }}</span>
         </div
        >
        <span v-html="item.attributes.Text"></span>
       
      </div>
    </div>
    <span v-else class="pt-4 text-center w-full text-tem/50">Нет новых уведомлений...</span>
  </div>
</template>

<script>
import NOTIFICATIONS from '../../graphql/doctor/NOTIFICATIONS.gql'
export default {
  layout: 'Doctor',
  data () {
    return {
      options: {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
      }
    }
  },
  apollo: {
    notifications: {
      query: NOTIFICATIONS,
      prefetch: true
    }
  }
}
</script>

<style></style>
