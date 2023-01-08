<template>
  <div>
    <div class="flex flex-col gap-[20px]">
      <!-- left sidebar -->
      <div class="flex flex-col gap-[20px] w-full mt-4 sm:mt-0">
        <!-- mobile -->
        <div class="flex sm:hidden  justify-between w-full gap-4">
          <nuxt-link
            to="/all-analyzes"
            class="flex  justify-center cursor-pointer items-center border border-main rounded-md h-[40px]  text-base  w-1/2"
            >Анализы</nuxt-link
          >
          <nuxt-link
            to="/all-complecs"
            class="flex bg-main !text-white  justify-center cursor-pointer items-center border  rounded-md h-[40px]  text-base  w-1/2"
            >Комплексы</nuxt-link
          >
        </div>
        <!-- desctop -->
        <div class="hidden sm:flex  justify-between w-full gap-4">
          <nuxt-link
            to="/all-analyzes"
            class="flex  justify-center cursor-pointer items-center border border-main rounded-md h-[40px]  text-base  w-1/2"
            >Анализы</nuxt-link
          >
          <nuxt-link
            to="/all-complecs"
            class="flex bg-main !text-white  justify-center cursor-pointer items-center border  rounded-md h-[40px]  text-base  w-1/2"
            >Комплексы</nuxt-link
          >
        </div>
        <!-- mobile -->
        <div
          title="Комплексы"
          class="cursor-pointer block sm:hidden w-full h-auto"
        >
          <div
            @click="openSelect"
            class="p-3 bg-white rounded-md border-[1px] border-tem/30 w-full flex justify-between items-center"
          >
            <span class="w-11/12 text-sm">{{ activeCatName }} </span>

            <svg
              v-if="activeCat == false"
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
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-4 h-4 text-main rotate-180"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </div>
          <transition name="fade" mode="in-out">
            <div
              class="bg-white shadow-md rounded-md p-3 mt-3"
              v-if="activeCat"
            >
              <ul class="flex flex-col divide-y divide-tem/10">
                <li
                  v-for="item in testCatCom.data.productCategories.edges"
                  class="pt-[12px]"
                  :key="item.node.databaseId"
                >
                  <h4
                    @click="pushComplecs(item)"
                    class="hover:text-main anime cursor-pointer text-base  pb-[12px] "
                  >
                    {{ item.node.name }}
                  </h4>
                </li>
              </ul>
            </div>
          </transition>
        </div>
        <!-- desctop -->
        <div title="Комплексы" class="cursor-pointer hidden sm:block">
          <div class="">
            <div class="bg-white shadow-md rounded-md p-[10px]">
              <ul class="flex flex-col divide-y divide-tem/10">
                <li
                  v-for="item in testCatCom.data.productCategories.edges"
                  class="pt-[12px]"
                  :key="item.node.databaseId"
                >
                  <h4
                    class="hover:text-main anime cursor-pointer text-base  pb-[12px]  "
                  >
                    <nuxt-link
                      :to="
                        '/all-complecs/' +
                          item.node.slug +
                          '/' +
                          item.node.databaseId
                      "
                    >
                      <span>
                        {{ item.node.name }}
                      </span>
                    </nuxt-link>
                  </h4>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- end left sidebar -->
    </div>
  </div>
</template>

<script>
import categoryAnaliz from '~/static/fakeBD/category.json'
import categoryComplecs from '~/static/fakeBD/categoryComplecs.json'
import TabsComplecs from '../tabs/tabs-complecs.vue'
import TabComplecs from '../tabs/tab-complecs.vue'

export default {
  components: { TabsComplecs, TabComplecs },
  data () {
    return {
      testCat: categoryAnaliz,
      testCatCom: categoryComplecs,
      viewAllAnalizes: true,
      viewItem: null,
      mouseItem: null,
      WidhtDevice: null,
      complecs: [],
      analizes: [],
      subAnalizesData: [],
      preSubAnalizesData: [],
      isMobile: false,
      activeCat: false,
      activeCatName: 'Выберите категорию:'
    }
  },
  methods: {
    openSelect () {
      if (this.activeCat == true) {
        this.activeCat = false
      } else {
        this.activeCat = true
      }
    },
    pushComplecs (item) {
      this.activeCatName = item.node.name
      this.activeCat = false
      this.$router.push({
        path: '/all-complecs/' + item.node.slug + '/' + item.node.databaseId
      })
    }
  }
}
</script>

<style></style>
