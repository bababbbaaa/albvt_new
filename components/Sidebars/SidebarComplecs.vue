<template>
  <div>
    <div class="flex flex-col gap-[20px]">
      <!-- left sidebar -->
      <div class="flex flex-col gap-[20px] w-full mt-4 sm:mt-0">
         <!-- mobile -->
        <div v-if="isMobile == true" class="flex  justify-between w-full gap-4">
          <nuxt-link
            to="/all-analyzes/"
            class="flex  justify-center cursor-pointer items-center border border-main rounded-[5px] h-[40px]  text-[16px] w-1/2"
            >Анализы</nuxt-link
          >
          <nuxt-link
            to="/all-complecs/"
            class="flex bg-main !text-white  justify-center cursor-pointer items-center border  rounded-[5px] h-[40px]  text-[16px] w-1/2"
            >Комплексы</nuxt-link
          >
        </div>
        <!-- desctop -->
        <div v-else class="flex  justify-between w-full gap-4">
          <nuxt-link
            to="/all-analyzes/gematologicheskie-issledovaniya/2849"
            class="flex  justify-center cursor-pointer items-center border border-main rounded-[5px] h-[40px]  text-[16px] w-1/2"
            >Анализы</nuxt-link
          >
          <nuxt-link
            to="/all-complecs/1-dlya-zhenshhin/2797"
            class="flex bg-main !text-white  justify-center cursor-pointer items-center border  rounded-[5px] h-[40px]  text-[16px] w-1/2"
            >Комплексы</nuxt-link
          >
        </div>
         <!-- mobile -->
        <div
        v-if="isMobile == true "
         title="Комплексы" class="cursor-pointer">
          <div class="">
            <div class="bg-white shadow-md rounded-[5px] p-[10px]">
              <ul class="flex flex-col">
                <li
                  v-for="item in testCatCom.data.productCategories.edges"
                  class="pt-[12px]"
                  :key="item.node.databaseId"
                >
                  <h4
                    class="hover:text-main anime cursor-pointer text-[16px] pb-[12px] border-b-[0.5px] border-b-[#343434]/10 "
                  >
                    <nuxt-link
                      :to="
                        '/all-complecs/' +
                          item.node.slug +
                          '/' +
                          item.node.databaseId
                      "
                    >
                      <span >
                        {{
                          item.node.name
                        }}
                      </span>
                    </nuxt-link>
                  </h4>
                </li>
              </ul>
            </div>
          </div>
        </div>
         <!-- desctop -->
         <div
         v-else-if="isMobile == false"
          title="Комплексы" class="cursor-pointer">
          <div class="">
            <div class="bg-white shadow-md rounded-[5px] p-[10px]">
              <ul class="flex flex-col">
                <li
                  v-for="item in testCatCom.data.productCategories.edges"
                  class="pt-[12px]"
                  :key="item.node.databaseId"
                >
                  <h4
                    class="hover:text-main anime cursor-pointer text-[16px] pb-[12px] border-b-[0.5px] border-b-[#343434]/10 "
                  >
                    <nuxt-link
                      :to="
                        '/all-complecs/' +
                          item.node.slug +
                          '/' +
                          item.node.databaseId
                      "
                    >
                      <span >
                        {{
                          item.node.name
                        }}
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

    viewSubMenu (item) {
      console.log(item.id)
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
   
  },

  mounted () {
    this.onResize()
    window.addEventListener('resize', this.onResize, { passive: true })
  }
}
</script>

<style>

</style>
