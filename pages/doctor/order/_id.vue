<template>
  <div class="container py-6 flex flex-col gap-4">
    <button
        @click="$router.back()"
        class=" flex  justify-start items-center gap-1 my-4"
      >
        <img src="~/assets/icons/arrow-back.svg" alt="" />
        Назад
      </button>
    <div v-if="order" class="flex flex-col gap-4">
      <div class="flex justify-between items-center w-full">
        <div class="flex flex-col gap-1">
          <span>№ {{ order.data.attributes.UID }}</span>
          <span class="text-xs text-[#343434]/50">{{
            new Date(order.data.attributes.createdAt).toLocaleString(
              'ru',
              options
            )
          }}</span>
        </div>
        <div class="flex flex-col items-end gap-1">
          <span class="text-main font-medium">{{ order.data.attributes.SummOrder }} ₽</span>
          <span class="text-xs">{{ $auth.user.Stavka }} %</span>
        </div>
      </div>
      <span class="w-full text-center">Состав заказа:</span>
      <table class="w-full divide-y divide-[#343434]/30">
        <thead class="bg-gray-50 ">
          <tr>
            <th
              scope="col"
              class="px-4 py-3 text-left text-sm align-top font-medium text-gray-600  tracking-wider"
            >
              Наименование
            </th>
            <th
              scope="col"
              class="px-4 py-3 text-left text-sm align-top font-medium text-gray-600  tracking-wider"
            >
              Цена
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-[#343434]/30">
          <tr
            class="   group  anime cursor-pointer bg-white"
            v-for="item in order.data.attributes.analizies.data"
            :key="item.id"
          >
           
            <td class="px-4 py-4  text-xs text-gray-600 flex flex-col gap-1">
              <span class="text-tem/70">Арт: {{ item.attributes.Art }}</span>
              <span>{{ item.attributes.Name }}</span>
              
            </td>
            <td class="px-4 py-4 whitespace-nowrap text-xs text-gray-600">
              {{ item.attributes.Price }} ₽
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <span v-else>Загружается...</span>
  </div>
</template>

<script>
import DOCTOR_ID_ORDER from '~/graphql/doctor/DOCTOR_ID_ORDER.gql'
export default {
  layout: 'Doctor',
  apollo: {
    order: {
      query: DOCTOR_ID_ORDER,
      prefetch: true,
      variables () {
        return {
          ID: this.$route.params.id
        }
      }
    }
  },
  data () {
    return {
      options: {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
        // weekday: 'long'
      }
    }
  }
}
</script>

<style></style>
