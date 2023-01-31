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
          <span class="text-main font-medium"
            >{{ order.data.attributes.SummOrder.toLocaleString('ru-RU') }} ₽</span
          >
          <span class="text-xs">{{ $auth.user.Stavka }} %</span>
        </div>
      </div>
      <span class="w-full text-center">Состав заказа:</span>
      <table class="w-full divide-y divide-[#343434]/30">
        <thead class="bg-gray-50 ">
          <tr>
            <th
              scope="col"
              class="px-4 py-3 text-left text-sm align-top font-medium text-tem  tracking-wider"
            >
              Наименование
            </th>
            <th
              scope="col"
              class="px-4 py-3 text-right text-sm align-top font-medium text-tem  tracking-wider"
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
            <td class="px-4 py-2  text-xs text-tem flex flex-col gap-1">
              <span class="text-tem/70">Арт: {{ item.attributes.Art }}</span>
              <span>{{ item.attributes.Name }}</span>
            </td>
            <td class="px-4 py-2 whitespace-nowrap text-xs text-right text-tem">
              {{ item.attributes.Price.toLocaleString('ru-RU') }} ₽
            </td>
          </tr>
          <!-- bio -->
          <tr
            class="   group  anime cursor-pointer bg-white"
            v-for="bioItem in bio.result"
            :key="bioItem.id"
          >
            <td class="px-4 py-2  text-xs text-tem flex flex-col gap-1">
              <span class="text-tem/70">Биоматериал:</span>
              <span>{{ bioItem.Name }}</span>
            </td>
            <td class="px-4 py-2 whitespace-nowrap text-xs text-right text-tem">
              {{ bioItem.Price.toLocaleString('ru-RU') }} ₽
            </td>
          </tr>
          <!-- itogo -->
          <tr class="   group  anime cursor-pointer bg-tem/10">
            <td class="px-4 pt-2 pb-2  text-xs text-tem flex flex-col gap-1">
              <span>Итого:</span>
            </td>
            <td
              class="px-4 pt-2 pb-2  whitespace-nowrap text-xs text-right text-tem"
            >
              {{ price.itogoDiscont.toLocaleString('ru-RU') }} ₽
            </td>
          </tr>
          <!-- itogo -->
          <tr class="   group  anime cursor-pointer bg-tem/10">
            <td class="px-4 py-2  text-xs text-tem flex flex-col gap-1">
              <span>Итого с учетом скидки 10%:</span>
            </td>
            <td class="px-4 py-2 whitespace-nowrap text-xs text-right text-tem">
              {{ order.data.attributes.SummOrder.toLocaleString('ru-RU') }} ₽
            </td>
          </tr>
          <!-- itogo -->
          <tr class="   group  anime cursor-pointer bg-tem/10">
            <td class="px-4 py-2  text-xs text-tem flex flex-col gap-1">
              <span>Вознаграждение:</span>
            </td>
            <td class="px-4 py-2 whitespace-nowrap text-xs text-right text-tem">
              {{ price.pros.toLocaleString('ru-RU') }} ₽
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
    middleware: ['isAuth'],
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
  },
  computed: {
    bio () {
      const allBio = []
      const bioData = this.order.data.attributes.analizies.data.map(
        x => x.attributes.biomaterialies
      )

      bioData.forEach(element => {
        element.data.forEach(el2 => {
          allBio.push(el2.attributes)
        })
      })

      let result = []

      for (let str of allBio) {
        if (!result.includes(str)) {
          result.push(str)
        }
      }

      return { allBio, result }
    },
    price () {
      let stavka = Number(this.$auth.user.Stavka)
      const analizes = this.order.data.attributes.analizies.data.map(
        x => x.attributes.Price
      )
      let itogo = Number(this.order.data.attributes.SummOrder)
      let pros = Number(((itogo / 100) * stavka).toFixed(2))
      const summAnalizes = analizes.reduce(function (pr, cur) {
        return pr + cur
      })

      const bio = this.bio.result.map(bio => bio.Price)
      let summBio = bio.reduce(function (b1, b2) {
        return b1 + b2
      })

      let itogoDiscont = (summBio += summAnalizes)
      // const skidka = 100
      return { itogo, pros, itogoDiscont, summAnalizes, summBio }
    }
  }
}
</script>

<style></style>
