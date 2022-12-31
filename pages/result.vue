<template>
  <div
    class="container flex flex-col pt-[47px] my-[47px] sm:my-0 gap-10 justify-center items-center h-full"
  >
    <heading-h-3>Поиск по результатам</heading-h-3>
    <label class="relative block w-full sm:w-1/2 ">
      <span class="sr-only">Search</span>
      <span
        class="absolute inset-y-0 right-0 flex items-center pr-[16px] z-[99]"
      >
        <img
          src="/img/icons/search.svg"
          alt=""
          class="block w-full h-auto hover:scale-110 anime"
        />
      </span>
      <input
        @input="searchResult($event.target.value)"
        v-bind:value="searchInput"
        type="text"
        id="default-search2"
        class="block w-full pr-20 rounded-[5px] text-center   pl-4 border-[2px] border-[#343434]/20   h-[60px] focus:outline-none text-[#979797]"
        placeholder="Введите номер заказа"
        autocomplete="off"
      />
    </label>

    <div v-if="searchResults !== null">
      <div class="flex flex-col gap-4" v-if="searchResults.orders.data.length">
        <div
          v-for="(item, i) in searchResults.orders.data[0].attributes.Result
            .data"
          :key="i"
          class="bg-white p-4 rounded-[5px] shadow-md"
        >
          <a
            :href="`https://api.albvt.ru` + item.attributes.url"
            target="_blank"
            class="flex justify-start gap-2 items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
              />
            </svg>
            <span  class="underline underline-offset-2">Скачать результаты-{{ item.attributes.name }}</span>
            </a
          >
        </div>
      </div>
    </div>

    <!-- предупреждения -->

    <!-- результаты -->
  </div>
</template>

<script>
import HeadingH3 from '~/components/HeadingH3.vue'
import RESULTS from '~/graphql/RESULTS.gql'
export default {
  components: { HeadingH3 },
  data () {
    return {
      searchInput: '',
      pdf: [],
      error: '',
      searchResults: null,
      errors: null,
      loading: false
    }
  },
  layout: 'MainLayout',
  methods: {
    async searchResult (value) {
      this.searchInput = value
      try {
        const res = await this.$apollo.query({
          query: RESULTS,
          variables: {
            UID: value
          }
        })
        if (res) {
          this.loading = false
          this.searchResults = res.data
        }
      } catch (err) {
        this.searchResults = []
      }
    },

    alertResponse (id) {
      this.errors = id
    }
  }
}
</script>

<style></style>
