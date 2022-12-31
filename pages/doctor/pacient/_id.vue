<template>
  <div class="bg-[#F9F9F9]">
    <div
      class="pt-2 container flex flex-col gap-8"
      v-if="usersPermissionsUser"
    >
      <div class="w-full flex items-center justify-between ">
        <button
          @click="$router.back()"
          class=" flex  justify-start items-center gap-1"
        >
         <img src="~/assets/icons/arrow-back.svg" alt="" />
         Назад
        </button>
        <span class="py-3 text-xl">Пациент</span>
      </div>
      <span class="text-2xl font-bold">{{
        usersPermissionsUser.data.attributes.FIO_user
      }}</span>
      <div class="grid grid-cols-1 gap-4 text-sm">
        <div class="flex gap-3">
          <span class="font-bold">Телефон:</span>
          <span class="">{{ usersPermissionsUser.data.attributes.Phone }}</span>
        </div>
        <div class="flex gap-4">
          <span class="font-bold">Дата рождения:</span>
          <span class="">{{
            usersPermissionsUser.data.attributes.DataRozgdeniya
          }}</span>
        </div>
        <div class="flex gap-4">
          <span class="font-bold">E-mail:</span>
          <span class="">{{ usersPermissionsUser.data.attributes.email }}</span>
        </div>
      </div>
      
      <div class="flex flex-col gap-1">
        <div class="w-full">Заказы: <b>{{usersPermissionsUser.data.attributes.zakazies.data.length}}</b> шт.</div>
        <a-user-list-orders
          :stavka="20"
          :data_orders="usersPermissionsUser.data.attributes.zakazies.data"
        />
      </div>
      <div class="flex justify-between items-center my-6"> 
        <span>Сумма всех заказов:</span>
        <span class=""> {{totalPagePrice}} ₽</span>
       
      </div>
    </div>
    <div v-else class="w-full h-full flex bg-white justify-center items-center">
      Загрузка...
    </div>
  </div>
</template>

<script>
import PACIENT_DOCTOR from '~/graphql/doctor/get-pacient.gql'
import aUserListOrders from '~/components/doctor/user/a-user-list-orders.vue'

export default {
  components: { aUserListOrders },
  layout: 'Doctor',
  data () {
    return {}
  },
  apollo: {
    usersPermissionsUser: {
      query: PACIENT_DOCTOR,
      prefetch: true,
      variables () {
        return {
          ID: this.$route.params.id
        }
      }
    }
  },
  computed: {
    totalPagePrice(){
      let total = this.usersPermissionsUser.data.attributes.zakazies.data.reduce(function (accumulator, b) {
        return accumulator + b.attributes.SummOrder
      }, 0)
      return total
    }
  },
}
</script>

<style></style>
