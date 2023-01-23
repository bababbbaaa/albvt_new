<template>
  <div class="container bg-[#F9F9F9] min-h-screen pt-2">
    <div v-if="usersPermissionsUser" class="w-full flex justify-center">
      <Transition name="fade">
        <section v-if="getAllVivod.length" class="flex flex-col gap-6 w-full">
          <a-vivod-list
            v-for="item in getAllVivod"
            :key="item.id"
            :data_vivod="item"
            :active="vivodActive"
            @openVivod="openVivod(item.id)"
          />
        </section>
      </Transition>
      <span v-if="!getAllVivod.length" class="text-center w-full text-sm"
      >У вас пока что не было выводов</span
    >
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
    }
  },
  computed: {
    getAllUsers () {
      if (this.searchResult.length) {
        return this.searchResult
      } else {
        return this.usersPermissionsUser.data.attributes.Pacientis.data
      }
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
