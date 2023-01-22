<template>
  <div>
    <div class="absolute sm:relative w-full top-0 left-0 px-[16px] sm:px-0">
      <div class="flex relative w-full  ">
        <div
          class="fixed bg-[#343434]/40  w-screen h-screen left-0 top-0 pt-[13px] z-[1]"
          v-if="searchInputFake.length >= 1 && showSearch == true"
          @click="showSearch = false"
        ></div>
        <div
          class="sm:hidden fixed bg-[#343434]/40  w-screen h-screen left-0 top-0 pt-[13px] z-[1] "
          @click="mobSearchClose()"
        ></div>
        <!-- @input="search($event.target.value)" -->
        <!-- v-bind:value="searchInput" -->
        <input
          @input="search($event.target.value)"
          v-bind:value="searchInput"
          type="text"
          id="default-search"
          class="block w-full pr-20 rounded-md
        bg-white p-3 focus:outline-none text-[#979797] z-[4] relative"
          placeholder="Поиск анализов"
          autocomplete="off"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-5 h-5 text-tem/70 absolute z-[4] top-[15px] right-2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </div>

      <ul
        v-show="searchInputFake.length >= 1 && showSearch == true"
        class="absolute top-[4rem] left-0 flex flex-col bg-white z-[4] pt-4 shadow-md sm:px-0 [px-16px] sm:rounded-[5px] w-full overflow-y-auto sm:h-auto  max-h-[320px]"
      >
        <search-item v-for="item in sortedArray" :key="item.id" :item="item" @productInCart="productInCart" @closeSearch="closeSearch"/>
        <span
          v-if="loading == true"
          class=" w-full flex justify-center items-center py-4 text-[#343434] hover:bg-[#CBCBCB] anime bg-[#E2E2E2]"
          >Идет поиск...</span
        >
        <span
          v-else-if="sortedArray.length == 0"
          class=" w-full flex justify-center items-center py-4 text-[#343434] hover:bg-[#CBCBCB] anime bg-[#E2E2E2]"
          >К сожалению ничего не найдено</span
        >
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import SEARCH_ANALIZES from '~/graphql/search-analizes.gql'
import searchItem from './search/search-item.vue'

export default {
  components: { searchItem },
  data () {
    return {
      searchInput: '',
      result: [],
      searchInputFake: '',
      searchProducts: [],
      searchResults: [],
      inCart: [],
      EnSearch: '',
      showSearch: false,
      loading: true,
      loadSearch: false
    }
  },
  computed: {
    ...mapGetters(['CART', 'CART_IDS']),
    sortedArray () {
      // const dataFilter = []
      // const testData = this.searchResults
      // this.searchResults.forEach(x => {
      //   if (x.attributes.Name.includes(this.searchInput)) {
      //     dataFilter.push(x)
      //   }
      // })
      return this.searchResults
    }
  },
  watch: {
    searchInput () {
      this.search(this.searchInput)
    }
  },
  methods: {
    ...mapActions(['ADD_TO_CART']),
    mobSearchClose () {
      this.showSearch = false
      this.$emit('mobSearchClose')
    },
    closeSearch () {
      this.searchInputFake = ''

      this.mobSearchClose()
      this.showSearch = false
    },
    async search (value) {
      this.searchInput = value
      this.searchInputFake = value
      this.showSearch = true
      this.loadSearch = true
      this.loading = true
      const string = value.toString()
      const lowerCase = string.toLowerCase()
      this.autoKeyboardLang(lowerCase)
      try {
        const res = await this.$apollo.query({
          query: SEARCH_ANALIZES,
          fetchPolicy: 'network-only',
          variables: {
            S_VALUE: lowerCase
          }
        })
        if (res) {
          this.loading = false
          this.loadSearch = false
          const results = res.data.search.analizies.data
          
          this.searchResults = results
          // this.searchToEn(value)
          
        }
      } catch (err) {
        this.searchToEn()
      }
    },

    async searchToEn () {
      try {
        const res = await this.$apollo.query({
          query: SEARCH_ANALIZES,
          fetchPolicy: 'network-only',
          variables: {
            S_VALUE: this.EnSearch
          }
        })
        if (res) {
          this.loading = false
          this.loadSearch = false
          const results = res.data.search.analizies.data
          this.searchResults = results
        }
      } catch (err) {
        this.searchResults = []
      }
    },
    autoKeyboardLang (str) {
      var s = [
        'й',
        'ц',
        'у',
        'к',
        'е',
        'н',
        'г',
        'ш',
        'щ',
        'з',
        'х',
        'ъ',
        'ф',
        'ы',
        'в',
        'а',
        'п',
        'р',
        'о',
        'л',
        'д',
        'ж',
        'э',
        'я',
        'ч',
        'с',
        'м',
        'и',
        'т',
        'ь',
        'б',
        'ю'
      ]
      var r = [
        'q',
        'w',
        'e',
        'r',
        't',
        'y',
        'u',
        'i',
        'o',
        'p',
        '\\[',
        '\\]',
        'a',
        's',
        'd',
        'f',
        'g',
        'h',
        'j',
        'k',
        'l',
        ';',
        "'",
        'z',
        'x',
        'c',
        'v',
        'b',
        'n',
        'm',
        ',',
        '\\.'
      ]
      for (var i = 0; i < r.length; i++) {
        var reg = new RegExp(r[i], 'mig')
        str = str.replace(reg, function (a) {
          return a == a.toLowerCase() ? s[i] : s[i].toUpperCase()
        })
      }

      return str, (this.EnSearch = str)
    },
    productInCart (item) {
      this.ADD_TO_CART(item)
    }
  }
}
</script>

<style>
.button-close {
  position: absolute;

  right: 60px;
  top: 8px;
  bottom: 8px;

  padding: 0 10px;

  transition: background 200ms;

  z-index: 4;
}
.button-close:hover {
  color: #a55b4a;
}

input::-webkit-input-placeholder {
  color: #8a8a8a;
}
</style>
