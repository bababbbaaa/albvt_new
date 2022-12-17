<template>
  <div class="bg-[#F9F9F9]">
    <div class="pt-2" v-if="usersPermissionsUser">
      <div class="container flex flex-col h-full justify-between gap-8">
        <div class="grid grid-cols-1  w-full gap-2">


          <div class="grid grid-cols-3  w-full gap-2">
            <button
              @click="tabsActive = 1"
              :class="[
                tabsActive == 1
                  ? 'border-main border-[2px] text-main'
                  : 'border-[#343434]/30 border-[1px]'
              ]"
              class="flex justify-center py-3 rounded-[3px]"
            >
              Пациенты
            </button>
            <button
              @click="tabsActive = 2"
              :class="[
                tabsActive == 2
                  ? 'border-main border-[2px] text-main'
                  : 'border-[#343434]/30 border-[1px]'
              ]"
              class="flex justify-center py-3 rounded-[3px]"
            >
              Доступно
            </button>
            <button
              @click="tabsActive = 3"
              :class="[
                tabsActive == 3
                  ? 'border-main border-[2px] text-main'
                  : 'border-[#343434]/30 border-[1px]'
              ]"
              class="flex justify-center py-3 rounded-[3px]"
            >
              Выведено
            </button>
          </div>

          <div
            class="w-full border relative border-[#343434]/30 rounded-[3px] bg-white flex justify-between items-center"
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
            <div
              v-if="searchResult.length && search.length >= 1"
              class="absolute  z-[4] top-[58px] left-0 right-0 bg-white drop-shadow-xl rounded-md p-3"
            >
              <div class="flex flex-col gap-2">
                <div v-for="item in searchResult" :key="item.id" class="">
                  <nuxt-link
                    :to="'/doctor/pacient/' + item.id"
                    class="flex py-3 justify-between items-center border-b border-[#343434]/30"
                  >
                    <span>
                      {{ item.attributes.FIO_user }}
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-4 h-4 text-main"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25"
                      />
                    </svg>
                  </nuxt-link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Пациенты -->
        <Transition name="fade">
          <section v-if="tabsActive == 1 && getAllUsers.length ">
            <div  class="flex flex-col gap-2">
              <a-user-view
                v-for="user in getAllUsers"
                :key="user.id"
                :user_data="user"
                :type="'allPacient'"
              /> 
            </div>
          </section>
        </Transition>
        <!-- Доступно -->
        <Transition name="fade">
          <!-- доступно -->
          <section
            v-if="tabsActive == 2 && getAllUsers.length"
            class="flex flex-col gap-4"
          >
            <div class="flex flex-col gap-2">
              <a-dostupno-view
                v-for="user in getAllUsers"
                :key="user.id"
                :user_data="user"
                :active="userActive"
                @openUser="openUser(user.id)"
                :type="'dostupno'"
              />
            </div>
          </section>
        </Transition>
        <Transition name="fade">
          <section
            v-if="tabsActive == 2"
            class="flex flex-col gap-4 items-center"
          >
            <span class="text-main text-right w-full"
              >Всего доступно
              <span class="text-[#343434]"
                >+{{ checkSummVidod.toLocaleString('ru-RU') }}₽</span
              >
            </span>

            <nuxt-link
              :to="{
                path: '/doctor/conclusion',
                query: {
                  summ: checkSummVidod,
                  doctor: $auth.user.id,
                  zakaz: checkZakazies
                }
              }"
              class="bg-main text-white flex flex-col justify-center items-center gap-1 py-3 px-6 rounded-[3px] w-3/5"
            >
              Вывести средства
            </nuxt-link>
          </section>
        </Transition>
        <!-- Выведено -->
        <Transition name="fade">
          <section
            v-if="tabsActive == 3 && getAllVivod.length"
            class="flex flex-col gap-2"
          >
            <a-vivod-list
              v-for="item in getAllVivod"
              :key="item.id"
              :data_vivod="item"
            />
          </section>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script>
import aUserView from '~/components/doctor/a-user-view.vue'
import DOCTOR_PACIENTS from '~/graphql/doctor/doctor-pacients.gql'
import ADostupnoView from '../../components/doctor/a-dostupno-view.vue'
import AVivodList from '../../components/doctor/a-vivod-list.vue'

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
      tabsActive: 1,
      userActive: null,
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
      return this.usersPermissionsUser.data.attributes.Pacientis.data
    },
    getAllVivod () {
      return this.usersPermissionsUser.data.attributes.zaprosy_vrachejs.data
    },
    checkSummVidod () {
      let sss = []
      const iter1 = this.usersPermissionsUser.data.attributes.Pacientis.data
      iter1.forEach(x => {
        x.attributes.zakazies.data.forEach(z => {
          if (z.attributes.Status == true) {
            sss.push(z)
          }
        })
      })

      let total = sss.reduce(function (accumulator, b) {
        return accumulator + b.attributes.SummOrder
      }, 0)
      const totalStavka = (total / 100) * 20

      return totalStavka
    },
    checkZakazies () {
      let sss = []
      const iter1 = this.usersPermissionsUser.data.attributes.Pacientis.data
      iter1.forEach(x => {
        x.attributes.zakazies.data.forEach(z => {
          if (z.attributes.Status == true) {
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
