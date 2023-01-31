<template>
  <div class="bg-[#F9F9F9] ">
    <div class="pt-2 container flex flex-col gap-4 pb-6" v-if="usersPermissionsUser">
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

      <!-- -------- -->

      <div class="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-6 gap-4">
        <div class="flex flex-col gap-1">
          <span class="text-tem/50 text-xs">Телефон</span>
          <span>{{ usersPermissionsUser.data.attributes.Phone }}</span>
          <span class="w-full h-[1px] bg-[#E5E4E8] my-1"></span>
        </div>
        <div class="flex flex-col gap-1">
          <span class="text-tem/50 text-xs">Дата рождения</span>
          <span>{{ usersPermissionsUser.data.attributes.DataRozgdeniya }}</span>
          <span class="w-full h-[1px] bg-[#E5E4E8] my-1"></span>
        </div>
        <div class="flex flex-col gap-1">
          <span class="text-tem/50 text-xs">Email</span>
          <span>{{ usersPermissionsUser.data.attributes.email }}</span>
          <span class="w-full h-[1px] bg-[#E5E4E8] my-1"></span>
        </div>
        
      </div>

      <!-- -------- -->

      <div class="flex flex-col gap-4">
        <div class="p-2 flex justify-between rounded-md bg-white drop-shadow-sm border-[1px] border-[#E5E8F1]">
          <div class="flex justify-between w-full">
            <div class="">
            <b>Заказы:</b>
            {{ usersPermissionsUser.data.attributes.zakazies.data.length }}
            
          </div>
          <span class=""><b>Сумма:</b> {{ totalPagePrice.toLocaleString('ru-RU') }} ₽</span>
          </div>
          
        </div>
        <!-- <span class="font-semibold text-2xl">Заказы</span> -->
        <a-user-list-orders
          :stavka="this.$auth.user.Stavka"
          :data_orders="usersPermissionsUser.data.attributes.zakazies.data"
        />
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
    middleware: ['isAuth'],
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
    totalPagePrice () {
      let total = this.usersPermissionsUser.data.attributes.zakazies.data.reduce(
        function (accumulator, b) {
          return accumulator + b.attributes.SummOrder
        },
        0
      )
      return total
    }
  }
}
</script>

<style></style>
