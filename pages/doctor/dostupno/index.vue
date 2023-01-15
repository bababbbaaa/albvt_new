<template>
  <div class="container bg-[#F9F9F9] min-h-screen pt-2">
      <div v-if="usersPermissionsUser " class="flex flex-col gap-6">
       <section v-if="getAllDostupno.length" class="flex flex-col gap-4">
      <div class="grid grid-cols-1  gap-2 sm:gap-4">
        <a-dostupno-view
          v-for="user in getAllDostupno"
          :key="user.id"
          :user_data="user"
          :active="userActive"
          @openUser="openUser(user.id)"
          :type="'dostupno'"
        />
      </div>
    </section>
    <span v-else-if="!getAllDostupno.length" class="text-center text-sm"
      >У вас пока что нет доступных заказов к выводу</span
    >
    <Transition name="fade">
      <section  class="flex flex-col gap-4 items-center">
        <div class="flex flex-col gap-2 w-full items-center justify-center">
          <nuxt-link
            v-if="checkSummVidod >= 500"
            :to="{
              path: '/doctor/conclusion',
              query: {
                summ: checkSummVidod,
                doctor: $auth.user.id,
                zakaz: checkZakazies
              }
            }"
            class="bg-main text-white flex flex-col gap-1 justify-center items-center py-3 px-6 rounded-md w-full sm:max-w-[300px]"
          >
            <b>{{ checkSummVidod.toLocaleString('ru-RU') }}₽</b>
            Отправить запрос на вывод
          </nuxt-link>

          <span
            v-else-if="checkSummVidod < 500 && getAllDostupno.length"
            class="text-xs w-full text-center text-[#343434]/70"
            >Минимальная сумма вывода 500₽</span
          >
          <span
            v-else
            class="bg-main/50 text-white flex flex-col gap-1 justify-center items-center py-3 px-2 rounded-md w-full sm:max-w-[300px]"
          >
            <b> {{ checkSummVidod.toLocaleString('ru-RU') }}₽ </b>
            Отправить запрос на вывод
          </span>
        </div>
      </section>
    </Transition>
      </div>
   
  </div>
</template>

<script>
import aUserView from '~/components/doctor/a-user-view.vue'
import DOCTOR_PACIENTS from '~/graphql/doctor/doctor-pacients.gql'
import ADostupnoView from '~/components/doctor/a-dostupno-view.vue'
import AVivodList from '~/components/doctor/a-vivod-list.vue'

export default {
  components: { aUserView, ADostupnoView, AVivodList },
  layout: 'Doctor',
  apollo: {
    usersPermissionsUser: {
      query: DOCTOR_PACIENTS,
      prefetch: true,
      variables () {
        return {
          ID: this.$auth.user.id
        }
      }
    }
  },
  data () {
    return {
      userActive: null,
      vivodActive: null,
      searchInput: '',
      orders: [],
      summVivod: 0,
      search: '',
      searchResult: []
    }
  },
  methods: {
    openUser (id) {
      this.userActive == id ? (this.userActive = null) : (this.userActive = id)
    },
    openVivod (id) {
      this.vivodActive == id
        ? (this.vivodActive = null)
        : (this.vivodActive = id)
    },
    searchPaciens (value) {
      this.search = value
      const litle = value.toLowerCase()
      const data2 = this.usersPermissionsUser.data.attributes.Pacientis.data
      const dataP = data2.filter(x =>
        x.attributes.FIO_user.toLowerCase().includes(litle)
      )
      this.searchResult = dataP
      console.log(dataP)
    },
  },
  computed: {
    getAllUsers () {
      if (this.searchResult.length) {
        return this.searchResult
      } else {
        return this.usersPermissionsUser.data.attributes.Pacientis.data
      }
    },

    getAllDostupno () {
      const x = this.usersPermissionsUser.data.attributes.Pacientis.data
      const x2 = x.filter(item =>
        item.attributes.zakazies.data.some(
          a => a.attributes.Status == true && a.attributes.ZaprosVivod == false
        )
      )
      console.log(x2)
      return x2
    },
    getAllVivod () {
      return this.usersPermissionsUser.data.attributes.zaprosy_vrachejs.data
    },
    checkSummVidod () {
      let sss = []
      const iter1 = this.usersPermissionsUser.data.attributes.Pacientis.data
      iter1.forEach(x => {
        x.attributes.zakazies.data.forEach(z => {
          if (
            z.attributes.Status == true &&
            z.attributes.ZaprosVivod == false
          ) {
            sss.push(z)
          }
        })
      })

      let total = sss.reduce(function (accumulator, b) {
        return accumulator + b.attributes.SummOrder
      }, 0)
      const totalStavka = (total / 100) * this.$auth.user.Stavka

      return totalStavka
    },
    checkZakazies () {
      let sss = []
      const iter1 = this.usersPermissionsUser.data.attributes.Pacientis.data
      iter1.forEach(x => {
        x.attributes.zakazies.data.forEach(z => {
          if (
            z.attributes.Status == true &&
            z.attributes.ZaprosVivod == false
          ) {
            sss.push(z.id)
          }
        })
      })

      return sss
    }
  }
}
</script>

<style></style>
