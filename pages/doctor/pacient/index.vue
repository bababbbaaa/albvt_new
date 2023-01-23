<template>
  <div class="container bg-[#F9F9F9] min-h-screen pt-2">
    <div v-if="usersPermissionsUser" class="flex justify-center w-full">
      <section v-if="getAllUsers.length" class="flex w-full">
        <div class="grid grid-cols-1  gap-6  w-full">
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
          <div class="grid grid-cols-1  gap-2 sm:gap-4  w-full">
            <a-user-view
              v-for="user in getAllUsers"
              :key="user.id"
              :user_data="user"
              :type="'allPacient'"
            />
          </div>
        </div>
      </section>
      <span v-else-if="!getAllUsers.length" class="text-center text-sm"
        >У вас пока что нет активных пациентов</span
      >
    </div>
  </div>
</template>

<script>
import aUserView from '~/components/doctor/a-user-view.vue'
import ALL_PICIENTIS from '~/graphql/doctor/ALL_PICIENTIS.gql'

export default {
  components: { aUserView },
  layout: 'Doctor',
  apollo: {
    usersPermissionsUser: {
      query: ALL_PICIENTIS,
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

      searchInput: '',

      search: '',
      searchResult: []
    }
  },
  methods: {
    searchPaciens (value) {
      this.search = value
      const litle = value.toLowerCase()
      const data2 = this.usersPermissionsUser.data.attributes.Pacientis.data
      const dataP = data2.filter(x =>
        x.attributes.FIO_user.toLowerCase().includes(litle)
      )
      this.searchResult = dataP
      console.log(dataP)
    }
  },
  computed: {
    getAllUsers () {
      if (this.searchResult.length) {
        return this.searchResult
      } else {
        return this.usersPermissionsUser.data.attributes.Pacientis.data
      }
    }
  }
}
</script>

<style></style>
