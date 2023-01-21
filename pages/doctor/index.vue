<template>
  <div class="bg-[#F9F9F9] min-h-screen pb-10">
    <div class="pt-2">
      <div class="container flex flex-col h-full justify-between gap-6 mt-6">
        <section v-if="notifications">
          <a-notific
            v-for="item in notifications.data"
            :key="item.id"
            :data="item"
          />
        </section>
        <span class="w-full text-center text-2xl font-semibold">Акции</span>
        <section v-if="promotions">
          <client-only placeholder="Загрузка...">
            <agile
              :options="slidersDoctor"
              class="flex flex-col items-center justify-center  rounded-md  gap-4"
            >
              <div class="slide" v-for="item in promotions.data" :key="item.id">
                <a-akchita :data="item" />
              </div>
            </agile>
          </client-only>
        </section>
        <span class="w-full text-center text-2xl font-semibold"
          >Выгодные предложения</span
        >
        <div class="grid grid-cols-1 sm:grid-cols-2 sm:gap-10">
          <section v-if="vigComplecs" class="flex flex-col gap-2">
            <span class="text-sm sm:text-base text-tem/70">Комплексные исследования:</span>
            <client-only placeholder="Загрузка...">
              <agile
                :options="slidersDoctor"
                class="flex flex-col items-center justify-center  rounded-md drop-shadow-lg gap-4"
              >
                <div
                  class="slide"
                  v-for="item in vigComplecs.data"
                  :key="item.id"
                >
                  <a-vigodnie-complecs :data="item" />
                </div>
              </agile>
            </client-only>
          </section>
          <section v-if="vigAnalizs" class="flex flex-col gap-2">
            <span class="text-sm sm:text-base text-tem/70">Анализы:</span>
            <client-only placeholder="Загрузка...">
              <agile
                :options="slidersDoctor"
                class="flex flex-col items-center justify-center  rounded-md drop-shadow-lg gap-4"
              >
                <div
                  class="slide"
                  v-for="item in vigAnalizs.data"
                  :key="item.id"
                >
                  <a-vigodnie-analiz :data="item" />
                </div>
              </agile>
            </client-only>
          </section>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import aUserView from '~/components/doctor/a-user-view.vue'
import AAkchita from '../../components/doctor/main/a-akchita.vue'
import ANotific from '../../components/doctor/main/a-notific.vue'
import AVigodnieAnaliz from '../../components/doctor/main/a-vigodnie-analiz.vue'
import AVigodnieComplecs from '../../components/doctor/main/a-vigodnie-complecs.vue'

import NOTIFICATIONS from '~/graphql/doctor/NOTIFICATIONS.gql'
import PROMOTIONS from '~/graphql/doctor/PROMOTIONS.gql'
import VIG_COMPLECS from '~/graphql/doctor/VIG_COMPLECS.gql'
import VIG_ANALIZ from '~/graphql/doctor/VIG_ANALIZ.gql'

export default {
  components: {
    aUserView,
    AAkchita,
    ANotific,
    AVigodnieComplecs,
    AVigodnieAnaliz
  },
  layout: 'Doctor',
  apollo: {
    notifications: {
      query: NOTIFICATIONS
    },
    promotions: {
      query: PROMOTIONS
    },
    vigComplecs: {
      query: VIG_COMPLECS
    },
    vigAnalizs: {
      query: VIG_ANALIZ
    }
  },
  data () {
    return {
      modal: false,
      slidersDoctor: {
        navButtons: false,
        dots: true,
        centerMode: true,
        pauseOnHover: true,
        responsive: [
          {
            breakpoint: 320,
            settings: {
              slidesToShow: 1
            }
          }
        ]
      }
    }
  },
  methods: {
    openModal () {
      this.modal = true
    },
    async handleLogout () {
      this.$nuxt.$loading.start()
      await this.$auth.logout()
    }
  }
}
</script>

<style></style>
