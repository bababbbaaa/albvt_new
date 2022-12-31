<template>
  <!-- стреллки  на категории -->
  <!-- скролл попробовать -->
  <div>
    <div class="flex flex-col gap-[20px]">
      <!-- left sidebar -->
      <div class="flex flex-col gap-[20px] w-full mt-4 sm:mt-0">
        <!-- mobile -->
        <div v-if="isMobile == true" class="flex  justify-between w-full gap-4">
          <nuxt-link
            to="/all-analyzes/"
            class="flex bg-main !text-white  justify-center cursor-pointer items-center border  rounded-[5px] h-[40px]  text-[16px] w-1/2"
            >Анализы</nuxt-link
          >
          <nuxt-link
            to="/all-complecs/"
            class="flex  justify-center cursor-pointer items-center border border-main rounded-[5px] h-[40px]  text-[16px] w-1/2"
            >Комплексы</nuxt-link
          >
        </div>
        <!-- desctop -->
        <div v-else class="flex  justify-between w-full gap-4">
          <nuxt-link
            to="/all-analyzes/gematologicheskie-issledovaniya/2849"
            class="flex bg-main !text-white  justify-center cursor-pointer items-center border  rounded-[5px] h-[40px]  text-[16px] w-1/2"
            >Анализы</nuxt-link
          >
          <nuxt-link
            to="/all-complecs/1-dlya-zhenshhin/2797"
            class="flex  justify-center cursor-pointer items-center border border-main rounded-[5px] h-[40px]  text-[16px] w-1/2"
            >Комплексы</nuxt-link
          >
        </div>

        <!-- mobile -->

        <!-- v-if="isMobile == true && this.$route.path == '/all-analyzes/'" -->

        <div
          v-if="isMobile == true"
          class="bg-white shadow-md rounded-[5px] p-[10px] "
          :class="[viewAll ? 'h-full' : 'h-full']"
        >
          <ul class="flex flex-col">
            <li
              v-for="item in testCat.data.productCategories.edges"
              class="pt-[12px]"
              :key="item.node.databaseId"
            >
              <h4
                v-if="item.node.children.edges.length"
                class="hover:text-main anime cursor-pointer text-sm sm:text-[16px] pb-[12px] border-b-[0.5px] border-b-[#343434]/10 "
                @click="clickCategory(item.node.databaseId)"
              >
                {{ item.node.name }}
              </h4>
              <h4
                v-else
                @click="viewItem = null"
                class="hover:text-main anime cursor-pointer text-sm sm:text-[16px] pb-[12px] border-b-[0.5px] border-b-[#343434]/10 "
              >
                <nuxt-link
                  :to="
                    '/all-analyzes/' +
                      item.node.slug +
                      '/' +
                      item.node.databaseId
                  "
                  class="w-full hover:text-main anime  cursor-pointer text-sm sm:text-[16px] pb-[12px] border-b-[0.5px] border-b-[#343434]/10 "
                  >{{ item.node.name }}
                </nuxt-link>
              </h4>
              <transition name="fade">
                <ul
                  v-if="viewItem == item.node.databaseId"
                  class=" pt-2  flex flex-col gap-[10px]"
                >
                  <li
                    v-for="subitem in item.node.children.edges"
                    :key="subitem.node.databaseId"
                    class="text-sm "
                  >
                    <!-- с подкатегориями -->
                    <div v-if="subitem.node.children">
                      <div
                        class="text-left flex gap-2 justify-start hover:text-main anime cursor-pointer"
                      >
                        <span
                          class="text-left flex gap-2 justify-start items-center"
                          @click="preFetchDataSubCat(subitem.node)"
                        >
                          <svg
                            v-if="subitem.node.databaseId == viewSubItem"
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-4 w-4 rotate-45"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="2"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M12 4v16m8-8H4"
                            />
                          </svg>

                          <svg
                            v-else
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="2"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M12 4v16m8-8H4"
                            />
                          </svg>
                          {{ subitem.node.name }}
                        </span>
                      </div>
                      <ul
                        class="pt-4 pl-4  flex flex-col gap-[10px]"
                        v-if="
                          subitem.node.children &&
                            subitem.node.databaseId == viewSubItem
                        "
                      >
                        <li
                          v-for="itemSubSub in subitem.node.children.edges"
                          :key="itemSubSub.node.databaseId"
                          class=""
                        >
                          <nuxt-link
                            :to="
                              '/all-analyzes/' +
                                itemSubSub.node.slug +
                                '/' +
                                itemSubSub.node.databaseId
                            "
                            class="text-left flex gap-2 justify-start text-sm hover:text-main anime cursor-pointer"
                          >
                            <span
                              class="text-left flex gap-2 justify-start"
                              @click="preFetchDataSubCat(itemSubSub.node)"
                            >
                              <span>-</span>
                              {{ itemSubSub.node.name }}
                            </span>
                          </nuxt-link>
                        </li>
                      </ul>
                    </div>
                    <!-- с подкатегориями -->
                    <div v-else>
                      <nuxt-link
                        :to="
                          '/all-analyzes/' +
                            item.node.slug +
                            '/' +
                            subitem.node.databaseId
                        "
                        class="text-left flex gap-2 justify-start hover:text-main anime cursor-pointer"
                      >
                        <span
                          class="text-left flex gap-2 justify-start"
                          @click="preFetchDataCat(subitem.node)"
                        >
                          <span>-</span>
                          {{ subitem.node.name }}
                        </span>
                      </nuxt-link>
                    </div>
                  </li>
                </ul>
              </transition>
            </li>
          </ul>
        </div>
        <!-- desctop -->
        <div
          v-else-if="isMobile == false"
          class="bg-white shadow-md rounded-[5px] p-[10px] "
          :class="[viewAll ? 'h-full' : 'h-full']"
        >
          <ul class="flex flex-col">
            <li
              v-for="item in testCat.data.productCategories.edges"
              class="pt-[12px]"
              :key="item.node.databaseId"
            >
              <h4
                v-if="item.node.children.edges.length"
                class="hover:text-main anime cursor-pointer text-sm sm:text-[16px] pb-[12px] border-b-[0.5px] border-b-[#343434]/10 "
                @click="clickCategory(item.node.databaseId)"
              >
                {{ item.node.name }}
              </h4>
              <h4
                v-else
                @click="viewItem = null"
                class="hover:text-main anime cursor-pointer text-sm sm:text-[16px] pb-[12px] border-b-[0.5px] border-b-[#343434]/10 "
              >
                <nuxt-link
                  :to="
                    '/all-analyzes/' +
                      item.node.slug +
                      '/' +
                      item.node.databaseId
                  "
                  class=" w-full hover:text-main anime cursor-pointer text-sm sm:text-[16px] pb-[12px]"
                  >{{ item.node.name }}</nuxt-link
                >
              </h4>
              <transition name="fade">
                <ul
                  v-if="viewItem == item.node.databaseId"
                  class=" pt-2  flex flex-col gap-[10px]"
                >
                  <li
                    v-for="subitem in item.node.children.edges"
                    :key="subitem.node.databaseId"
                    class="text-sm "
                  >
                    <!-- с подкатегориями -->
                    <div v-if="subitem.node.children">
                      <div
                        class="text-left flex gap-2 justify-start hover:text-main anime cursor-pointer"
                      >
                        <span
                          class="text-left flex gap-2 justify-start items-center"
                          @click="preFetchDataSubCat(subitem.node)"
                        >
                          <svg
                            v-if="subitem.node.databaseId == viewSubItem"
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-4 w-4 rotate-45"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="2"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M12 4v16m8-8H4"
                            />
                          </svg>

                          <svg
                            v-else
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="2"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M12 4v16m8-8H4"
                            />
                          </svg>
                          {{ subitem.node.name }}
                        </span>

                        <!-- .replace(/[0-9]/g, '')
                              .replace(/\./g, '') -->
                      </div>
                      <ul
                        class="pt-4 pl-4  flex flex-col gap-[10px]"
                        v-if="
                          subitem.node.children &&
                            subitem.node.databaseId == viewSubItem
                        "
                      >
                        <li
                          v-for="itemSubSub in subitem.node.children.edges"
                          :key="itemSubSub.node.databaseId"
                          class=""
                        >
                        <!-- починить ссылки на 3 уровень -->
                          <nuxt-link
                          
                            :to="
                              '/all-analyzes/' +
                                itemSubSub.node.slug +
                                '/' +
                                itemSubSub.node.databaseId
                            "
                            class="text-left flex gap-2 justify-start text-sm hover:text-main anime cursor-pointer"
                          >
                            <span
                              class="text-left flex gap-2 justify-start"
                              @click="preFetchDataSubCat(itemSubSub.node)"
                            >
                              <span>-</span>
                              {{ itemSubSub.node.name }} ввв
                            </span>
                          </nuxt-link>
                           <!-- починить ссылки на 3 уровень -->
                        </li>
                      </ul>
                    </div>
                    <!-- с подкатегориями 2 уровня -->
                    <div v-else>
                      <nuxt-link
                        :to="'/all-analyzes/' + subitem.node.databaseId"
                        class="text-left flex gap-2 justify-start hover:text-main anime cursor-pointer"
                      >
                        <span
                          class="text-left flex gap-2 justify-start"
                          @click="preFetchDataCat(subitem.node)"
                        >
                          <span>-</span>
                          {{ subitem.node.name }} 2 уровня
                        </span>
                      </nuxt-link>
                    </div>
                  </li>
                </ul>
              </transition>
            </li>
          </ul>
        </div>
        <!-- <span v-else>Выберите анализ</span> -->
      </div>
    </div>
  </div>
</template>

<script>
import tab from '../tabs/tab.vue'
import Tabs from '../tabs/tabs.vue'
import categoryAnaliz from '~/static/fakeBD/category.json'
import categoryComplecs from '~/static/fakeBD/categoryComplecs.json'
import { mapActions } from 'vuex'

export default {
  components: { tab, Tabs },
  data () {
    return {
      testCat: categoryAnaliz,
      testCatCom: categoryComplecs,
      viewAllAnalizes: true,
      // viewItem: 2824,
      viewItem: null,
      viewSubItem: null,
      mouseItem: null,
      WidhtDevice: null,
      complecs: [],
      analizes: [],
      subAnalizesData: [],
      preSubAnalizesData: [],
      viewAll: false,
      isMobile: false
    }
  },
  beforeDestroy () {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.onResize, { passive: true })
    }
  },
  methods: {
    onResize () {
      this.isMobile = window.innerWidth < 600
    },

    viewAllAnalizesTrue () {
      this.viewAll = !this.viewAll
    },
    viewSubMenu (item) {
      this.viewItem = !this.viewItem
    },
    clickCategory (subcategory) {
      if (this.viewItem == null) {
        this.viewItem = subcategory
      } else if (this.viewItem !== subcategory) {
        this.viewItem = subcategory
      } else {
        this.viewItem = null
      }
    },
    preFetchDataCat (item) {
      console.log(item)
    },
    preFetchDataSubCat (item) {
      if (this.viewSubItem == null) {
        this.viewSubItem = item.databaseId
      } else if (this.viewSubItem !== item.databaseId) {
        this.viewSubItem = item.databaseId
      } else {
        this.viewSubItem = null
      }
    }
  },

  mounted () {
    this.onResize()
    window.addEventListener('resize', this.onResize, { passive: true })
  }
}
</script>

<style></style>
