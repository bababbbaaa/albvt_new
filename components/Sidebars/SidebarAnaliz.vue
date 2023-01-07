<template>
  <!-- стреллки  на категории +++ -->
  <!-- скролл попробовать -->
  <div>
    <div class="flex flex-col gap-[20px]">
      <!-- left sidebar -->
      <div class="flex flex-col gap-[20px] w-full mt-4 sm:mt-0">
        <!-- mobile -->
        <div v-if="isMobile == true" class="flex  justify-between w-full gap-4">
          <nuxt-link
            to="/all-analyzes/"
            class="flex bg-main !text-white  justify-center cursor-pointer items-center border  rounded-[5px] h-[40px]  text-sm  w-1/2"
            >Анализы</nuxt-link
          >
          <nuxt-link
            to="/all-complecs/"
            class="flex  justify-center cursor-pointer items-center border border-main rounded-[5px] h-[40px]  text-sm  w-1/2"
            >Комплексы</nuxt-link
          >
        </div>
        <!-- desctop -->
        <div v-else class="flex  justify-between w-full gap-4">
          <nuxt-link
            to="/all-analyzes/gematologicheskie-issledovaniya/2849"
            class="flex bg-main !text-white  justify-center cursor-pointer items-center border  rounded-[5px] h-[40px]  text-sm  w-1/2"
            >Анализы</nuxt-link
          >
          <nuxt-link
            to="/all-complecs/1-dlya-zhenshhin/2797"
            class="flex  justify-center cursor-pointer items-center border border-main rounded-[5px] h-[40px]  text-sm  w-1/2"
            >Комплексы</nuxt-link
          >
        </div>

        <!-- mobile -->
        <div
          @click="openSelect"
          class="p-3 bg-white rounded-md border-[1px] border-main w-full flex sm:hidden justify-between items-center "
        >
          <span class="w-11/12 text-sm"
            ><span v-if="completName4 !== ''">{{ completName4 }} > </span>
            {{ activeCatName }}
          </span>

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

        <div
          v-if="activeCat"
          class="bg-white shadow-md rounded-[5px] p-[10px] flex sm:hidden h-full"
        >
          <ul class="flex flex-col divide-y divide-tem/10">
            <li
              v-for="item in testCat.data.productCategories.edges"
              class="pt-[12px] "
              :key="item.node.databaseId"
            >
              <h4
                v-if="item.node.children.edges.length"
                class="hover:text-main anime cursor-pointer text-sm sm:text-sm  pb-[12px] flex items-center justify-between gap-1 "
                @click="clickCategory(item.node.databaseId)"
              >
                {{ item.node.name }}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="min-w-4 min-h-4 max-w-4 max-h-4 text-main "
                  :class="[
                    viewItem == item.node.databaseId
                      ? 'rotate-[-270deg]'
                      : 'rotate-[-90deg]'
                  ]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </h4>
              <h4
                v-else
                @click="pushComplecs2(item)"
                class="w-full hover:text-main anime  cursor-pointer text-sm sm:text-sm  pb-[12px] "
              >
                {{ item.node.name }} 2+
                <!-- <nuxt-link
                  :to="
                    '/all-analyzes/' +
                      item.node.slug +
                      '/' +
                      item.node.databaseId
                  "
                  class="w-full hover:text-main anime  cursor-pointer text-sm sm:text-sm  pb-[12px] "
                  >{{ item.node.name }} 2
                </nuxt-link> -->
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
                          {{ subitem.node.name }} 3
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
                        >
                          <!-- <nuxt-link
                            :to="
                              '/all-analyzes/' +
                                itemSubSub.node.slug +
                                '/' +
                                itemSubSub.node.databaseId
                            "
                            class="text-left flex gap-2 justify-start text-sm hover:text-main anime cursor-pointer"
                          > -->
                          <span
                            class="text-left flex gap-2 justify-start"
                            @click="pushComplecs4(itemSubSub)"
                          >
                            <span>-</span>
                            {{ itemSubSub.node.name }} 4-
                          </span>
                          <!-- </nuxt-link> -->
                        </li>
                      </ul>
                    </div>
                    <!-- с подкатегориями -->
                    <div v-else @click="pushComplecs5(subitem)">
                      <!-- <nuxt-link
                        :to="
                          '/all-analyzes/' +
                            item.node.slug +
                            '/' +
                            subitem.node.databaseId
                        "
                        class="text-left flex gap-2 justify-start hover:text-main anime cursor-pointer"
                         @click="preFetchDataCat(subitem.node)"
                      > -->
                      <span class="text-left flex gap-2 justify-start">
                        <span>-</span>
                        {{ subitem.node.name }} 5+
                      </span>
                      <!-- </nuxt-link> -->
                    </div>
                  </li>
                </ul>
              </transition>
            </li>
          </ul>
        </div>
        <!-- desctop -->
        <div
          class="bg-white shadow-md rounded-[5px] p-[10px] hidden sm:flex"
          :class="[viewAll ? 'h-full' : 'h-full']"
        >
          <ul class="flex flex-col divide-y divide-tem/10">
            <li
              v-for="item in testCat.data.productCategories.edges"
              class="pt-[12px]"
              :key="item.node.databaseId"
            >
              <h4
                v-if="item.node.children.edges.length"
                class="hover:text-main anime cursor-pointer text-sm sm:text-sm  pb-[12px] flex items-center justify-between gap-1"
                @click="clickCategory(item.node.databaseId)"
              >
                {{ item.node.name }}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="min-w-4 min-h-4 max-w-4 max-h-4 text-main "
                  :class="[
                    viewItem == item.node.databaseId
                      ? 'rotate-[-270deg]'
                      : 'rotate-[-90deg]'
                  ]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </h4>
              <h4
                v-else
                @click="viewItem = null"
                class="hover:text-main anime cursor-pointer text-sm sm:text-sm  pb-[12px]"
              >
                <nuxt-link
                  :to="
                    '/all-analyzes/' +
                      item.node.slug +
                      '/' +
                      item.node.databaseId
                  "
                  class=" w-full hover:text-main anime cursor-pointer text-sm sm:text-sm  pb-[12px]"
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
                        <nuxt-link
                          v-for="itemSubSub in subitem.node.children.edges"
                          :key="itemSubSub.node.databaseId"
                          :to="
                            '/all-analyzes/' +
                              itemSubSub.node.slug +
                              '/' +
                              itemSubSub.node.databaseId
                          "
                          class="text-left flex gap-2 justify-start text-sm hover:text-main anime cursor-pointer"
                        >
                          <!-- починить ссылки на 3 уровень -->
                          <span
                            class="text-left flex gap-2 justify-start"
                            @click="preFetchDataSubCat(itemSubSub.node)"
                          >
                            <span>-</span>
                            {{ itemSubSub.node.name }} 33
                          </span>
                          <!-- починить ссылки на 3 уровень -->
                        </nuxt-link>
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
      viewItem: null,
      viewSubItem: null,
      mouseItem: null,
      WidhtDevice: null,
      complecs: [],
      analizes: [],
      subAnalizesData: [],
      preSubAnalizesData: [],
      viewAll: false,
      isMobile: false,
      activeCatName: 'Выберите категорию:',
      activeCat: false,
      viewSubItemName: '',
      completName4: ''
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
    pushComplecs2 (item) {
      this.activeCatName = item.node.name
      this.activeCat = false
      this.completName4 = ''
      this.viewItem = null
      console.log(item.node)
      this.$router.push({
        path: '/all-analyzes/' + item.node.databaseId
      })
    },
    pushComplecs3 (item) {
      this.activeCatName = item.node.name
      this.activeCat = false
      this.completName4 = ''
      this.$router.push({
        path: '/all-analyzes/' + item.node.databaseId
      })
    },
    pushComplecs4 (itemSubSub) {
      this.activeCatName = itemSubSub.node.name
      this.activeCat = false
      this.completName4 = this.viewSubItemName
      console.log(itemSubSub)
      this.$router.push({
        path: '/all-analyzes/' + itemSubSub.node.databaseId
      })
    },
    pushComplecs5 (subitem) {
      this.activeCatName = subitem.node.name
      this.activeCat = false
      this.completName4 = ''
      this.$router.push({
        path: '/all-analyzes/' + subitem.node.databaseId
      })
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
    preFetchDataSubCat (item) {
      console.log(item)
      if (this.viewSubItem == null) {
        this.viewSubItem = item.databaseId
        this.viewSubItemName = item.name
      } else if (this.viewSubItem !== item.databaseId) {
        this.viewSubItem = item.databaseId
        this.viewSubItemName = item.name
      } else {
        this.viewSubItem = null
        this.viewSubItemName = ''
      }
    }
  }
}
</script>

<style></style>
