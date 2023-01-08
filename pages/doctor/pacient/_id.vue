<template>
  <div class="bg-[#F9F9F9]">
    <div class="pt-2 container flex flex-col gap-8" v-if="usersPermissionsUser">
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
          <span class="text-tem/50 text-xs">Email</span>
          <span>{{ usersPermissionsUser.data.attributes.email }}</span>
          <span class="w-full h-[1px] bg-[#E5E4E8] my-1"></span>
        </div>
        <div class="flex flex-col gap-1">
          <span class="text-tem/50 text-xs">Дата рождения</span>
          <span>{{  usersPermissionsUser.data.attributes.DataRozgdeniya }}</span>
          <span class="w-full h-[1px] bg-[#E5E4E8] my-1"></span>
        </div>
      </div>

      <!-- -------- -->


      <div class="flex flex-col gap-1">
        <div class="w-full">
          <b>Заказы:</b>
          {{ usersPermissionsUser.data.attributes.zakazies.data.length }}
          шт
        </div>
        <a-user-list-orders
          :stavka="this.$auth.user.Stavka"
          :data_orders="usersPermissionsUser.data.attributes.zakazies.data"
        />
      </div>
      <div class="flex justify-between items-center my-6">
        <span>Сумма всех заказов:</span>
        <span class=""> {{ totalPagePrice }} ₽</span>
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
