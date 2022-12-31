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
        <input
          @input="search($event.target.value)"
          v-bind:value="searchInput"
          type="text"
          id="default-search"
          class="block w-full pr-20 rounded-tl-[5px] rounded-bl-[5px] bg-white pl-4   h-[47px] focus:outline-none text-[#979797] z-[4]"
          placeholder="Поиск анализов"
          autocomplete="off"
        />
        <nuxt-link
          :to="{ path: '/search-result', query: { search: searchInput } }"
          @click="showSearch = false"
          class="flex justify-center items-center px-[16px]  z-[1] bg-white  anime rounded-tr-[5px] rounded-br-[5px]"
        >
          <img
            @click="closeSearch()"
            src="/img/icons/search.svg"
            alt=""
            class="block w-full h-auto hover:scale-110 anime"
          />
        </nuxt-link>
      </div>

      <ul
        v-show="searchInputFake.length >= 1 && showSearch == true"
        class="absolute top-[4rem] left-0 flex flex-col bg-white z-[4] pt-4 shadow-md sm:px-0 [px-16px] sm:rounded-[5px] w-full overflow-y-auto sm:h-auto  max-h-[320px]"
      >
        <li
          v-for="item in sortedArray"
          :key="item.id"
          @click="closeSearch()"
          class="border-b-[0.5px] border-b-[#D9D9D9]/50 px-4 py-3  grid grid-cols-[8fr,4fr] lg:grid-cols-[8fr,2fr] sm:grid-cols-[10fr,3fr] gap-2 items-center hover:bg-[#F5F5F5] anime"
        >
          <div class="flex flex-col gap-1">
            <!-- item.attributes.sub_cat.data.attributes.CatIdURL +
                  '/' +
                  item.attributes.sub_cat.data.attributes.URL +
                  '/' +
                  item.id -->
            <nuxt-link
              v-if="item.attributes.Complecs == true"
              :to="'/all-complecs/category/id/' + item.id"
              class=" text-[#777777] hover:text-[#343434] anime font-semibold text-[12px] sm:text-sm"
              :title="item.attributes.Name"
              >{{ item.attributes.Name }}</nuxt-link
            >

            <nuxt-link
              v-else
              :to="'/all-analyzes/category/id/' + item.id"
              class="text-[#777777] hover:text-[#343434] font-semibold anime text-[12px] sm:text-sm"
              :title="item.attributes.Name"
              >{{ item.attributes.Name }}</nuxt-link
            >

            <div class="flex gap-5 items-center flex-wrap sm:flex-nowrap">
              <span class="text-sm text-[#9A9A9A] "
                >код: {{ item.attributes.Art }}</span
              >
              <span
                v-if="parseInt(item.attributes.TimeDone) == 1"
                class="text-sm text-[#9A9A9A] "
                >{{ item.attributes.TimeDone }} день</span
              >
              <span
                v-else-if="parseInt(item.attributes.TimeDone) < 5"
                class="text-sm text-[#9A9A9A] "
                >{{ item.attributes.TimeDone }} дня</span
              >
              <span v-else class="text-sm text-[#9A9A9A] "
                >{{ item.attributes.TimeDone }} дней</span
              >
              <span
                v-if="item.attributes.Complecs == true"
                class="text-[12px] text-[#757575]  bg-main/20 px-2 py-1 rounded-[5px]"
                >Комплекс</span
              >
            </div>
          </div>
          <div
            v-if="
              inCart.includes(item.attributes.Name) ||
                CART_IDS.includes(item.id)
            "
            class="flex justify-center items-center   rounded-[5px] py-2 text-main gap-1   h-[40px] px-[8px] text-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 hidden sm:block"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span class="text-[12px]">В корзине</span>
          </div>
          <div
            v-else-if="item.attributes.Active !== true"
            class="w-full flex justify-center items-center"
          >
            <span class="text-[12px] text-danger text-center">Временно недоступен</span>
          </div>
          <button
            v-else
            @click="productInCart(item)"
            class="bg-main/20 sm:max-w-[140px]   text-[#343434] rounded-[5px] flex justify-center items-center gap-2 p-2"
          >
            <img src="/img/icons/add-to-cart.svg" alt="" />
            <span class="text-[12px] sm:text-sm"
              >{{
                parseInt(item.attributes.Price).toLocaleString('ru-RU')
              }}
              ₽</span
            >
          </button>
        </li>
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

export default {
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
      return this.searchResults.splice(0, 20)
    }
  },
  methods: {
    ...mapActions(['ADD_TO_CART']),
    mobSearchClose () {
      this.showSearch = false
      this.$emit('mobSearchClose')
    },
    closeSearch () {
      this.searchInputFake = this.searchInputFake.replace(
        this.searchInputFake,
        ''
      )
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
          variables: {
            S_VALUE: lowerCase
          }
        })
        if (res) {
          this.loading = false
          this.loadSearch = false
          const results = res.data.search.analizies.data
          this.searchResults = results
          if (results.length == 0) {
            this.loading = true
            this.searchToEn(value)
          }
        }
      } catch (err) {
        this.searchToEn()
        this.searchResults = []
      }
    },

    async searchToEn () {
      try {
        const res = await this.$apollo.query({
          query: SEARCH_ANALIZES,
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
