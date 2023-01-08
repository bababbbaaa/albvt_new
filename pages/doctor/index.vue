<template>
  <div class="bg-[#F9F9F9] min-h-screen">
    <div class="pt-2" v-if="usersPermissionsUser">
      <div class="container flex flex-col h-full justify-between gap-8">
        <div class="grid grid-cols-1 sm:grid-cols-2  w-full gap-2">
          <div class="grid grid-cols-3  w-full">
            <button
              @click="handlerTab(1)"
              :class="[
                TABDOCTOR == 1
                  ? 'border-b-main border-b-[2px] text-main'
                  : 'border-b-[#343434]/20 border-b-[1px] text-tem/50'
              ]"
              class="flex justify-center items-center py-3"
            >
              Пациенты
            </button>
            <button
              @click="handlerTab(2)"
              :class="[
                TABDOCTOR == 2
                  ? 'border-b-main border-b-[2px] text-main'
                  : 'border-b-[#343434]/20 border-b-[1px] text-tem/50'
              ]"
              class="flex justify-center items-center py-3"
            >
              Доступно
            </button>
            <button
              @click="handlerTab(3)"
              :class="[
                TABDOCTOR == 3
                  ? 'border-b-main border-b-[2px] text-main'
                  : 'border-b-[#343434]/20 border-b-[1px] text-tem/50'
              ]"
              class="flex justify-center items-center py-3"
            >
              Выведено
            </button>
          </div>
        </div>
        <!-- Пациенты -->
        <Transition name="fade">
          <section
            v-if="TABDOCTOR == 1 && getAllUsers.length"
            class="flex w-full"
          >
            <div class="grid grid-cols-1  gap-2 sm:gap-4 w-full">
              <div
                class="w-full border relative border-[#343434]/30 rounded-md bg-white flex justify-between items-center"
              >
                <input
                  type="text"
                  class="relative w-full"
                  @input="searchPaciens($event.target.value)"
                  v-bind:value="search"
                  placeholder="Поиск по пациентам"
                />
                <img
                  src="/img/icons/search-doctor.svg"
                  alt=""
                  class="w-6 h-6 m-4"
                />
              </div>
              <a-user-view
                v-for="user in getAllUsers"
                :key="user.id"
                :user_data="user"
                :type="'allPacient'"
              />
            </div>
          </section>
          <span
            v-else-if="TABDOCTOR == 1 && !getAllVivod.length"
            class="text-center text-sm"
            >У вас пока что нет активных пациентов</span
          >
        </Transition>
        <!-- Доступно -->
        <Transition name="fade">
          <!-- доступно -->
          <section
            v-if="TABDOCTOR == 2 && getAllDostupno.length"
            class="flex flex-col gap-4"
          >
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
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
          <span
            v-else-if="TABDOCTOR == 2 && !getAllDostupno.length"
            class="text-center text-sm"
            >У вас пока что нет доступных заказов к выводу</span
          >
        </Transition>
        <Transition name="fade">
          <section
            v-if="TABDOCTOR == 2"
            class="flex flex-col gap-4 items-center"
          >
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
                class="bg-main text-white flex flex-col gap-1 justify-center items-center py-3 px-6 rounded-md w-full max-w-[300px]"
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
                class="bg-main/50 text-white flex flex-col gap-1 justify-center items-center py-3 px-2 rounded-md w-full"
              >
                <b> {{ checkSummVidod.toLocaleString('ru-RU') }}₽ </b>
                Отправить запрос на вывод
              </span>
            </div>
          </section>
        </Transition>
        <!-- Выведено -->
        <Transition name="fade">
          <section
            v-if="TABDOCTOR == 3 && getAllVivod.length"
            class="flex flex-col gap-6"
          >
            <a-vivod-list
              v-for="item in getAllVivod"
              :key="item.id"
              :data_vivod="item"
              :active="vivodActive"
              @openVivod="openVivod(item.id)"
            />
          </section>
          <span
            v-else-if="TABDOCTOR == 3 && !getAllVivod.length"
            class="text-center text-sm"
            >У вас пока что не было выводов</span
          >
        </Transition>
      </div>
    </div>
  </div>
</template>

<script>
import aUserView from '~/components/doctor/a-user-view.vue'
import DOCTOR_PACIENTS from '~/graphql/doctor/doctor-pacients.gql'
import ADostupnoView from '~/components/doctor/a-dostupno-view.vue'
import AVivodList from '~/components/doctor/a-vivod-list.vue'
import { mapActions, mapGetters } from 'vuex'

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
      tabsActive: this.TABDOCTOR,
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
    handlerTab (id) {
      this.tabsActive = id
      this.SET_TAB_DOCTOR(id)
      console.log(id)
    },
    ...mapActions(['SET_TAB_DOCTOR'])
  },
  computed: {
    ...mapGetters(['TABDOCTOR']),
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
