<template>
  <div class="container mt-[47px] sm:mt-0">
    <div v-if="usersPermissionsUser">
      <tabs-vk>
        <tab-vk title="Результаты исследований">
          <div
            class="grid grid-cols-1  sm:grid-cols-[3fr,9fr] my-[47px] gap-[20px]"
          >
            <lk-user-info
              @handleReload="handleReload"
              @handleLogout="handleLogout"
            />

            <!-- мобильная -->

            <!-- <div
              class="sm:hidden grid grid-cols-1 gap-[20px]"
              v-if="
                dataOrders.orders.edges.length > 0 &&
                  dataOrders.orders.edges !== null
              "
            >
              <span class="text-[14px] font-medium">Мои заказы</span>
              <lk-zakaz
                v-for="(order, i) in dataOrders.orders.edges"
                :key="i"
                :order_data="order.node"
                @openItemInfo="openItemInfo(order.node.databaseId)"
                @oplata="oplata(order.node.total)"
                :itemID="itemID"
              />
            </div> -->

            <!-- десктоп -->

            <div
              class="hidden sm:grid grid-cols-1 gap-[20px]"
              v-if="usersPermissionsUser.data.attributes.zakazies.data"
            >
              <span class="text-[20px] font-medium">Мои заказы</span>
              <lk-zakaz-desc
                v-for="order in usersPermissionsUser.data.attributes.zakazies
                  .data"
                :key="order.id"
                :order_data="order"
                @DownloadResult="DownloadResult(order.id)"
                @openItemInfo="openItemInfo(order.id)"
                @oplata="oplata(order)"
                :itemID="itemID"
              />
              <!-- <lk-zakaz-desc
                v-for="(order, i) in dataOrders.orders.edges"
                :key="i"
                :order_data="order.node"
                @openItemInfo="openItemInfo(order.node.databaseId)"
                @oplata="oplata(order.node.total)"
                :itemID="itemID"
              /> -->
            </div>
            <!-- <span v-else>Вы еще не сделали заказ</span> -->
          </div>
        </tab-vk>
        <tab-vk title="Выгодные предложения">
          <div class="container relative my-[47px]">
            <client-only placeholder="Загрузка...">
              <agile
                :options="allLK"
                class="flex flex-col items-center justify-center gap-[20px]"
              >
                <div class="slide">
                  <img
                    src="/img/slide1.jpg"
                    alt=""
                    class="w-full object-cover rounded-[5px]"
                  />
                  <div
                    class="cursor-pointer border-[1px] border-white text-white font-medium text-[14px] rounded-full px-8 py-4 absolute bottom-10 left-10"
                  >
                    Подробнее
                  </div>
                </div>
                <div class="slide">
                  <img
                    src="/img/slide2.jpg"
                    alt=""
                    class="w-full object-cover rounded-[5px]"
                  />
                  <div
                    class="cursor-pointer border-[1px] border-white text-white font-medium text-[14px] rounded-full px-8 py-4 absolute bottom-10 left-10"
                  >
                    Подробнее
                  </div>
                </div>
                <div class="slide">
                  <img
                    src="/img/slide3.jpg"
                    alt=""
                    class="w-full  object-cover rounded-[5px]"
                  />
                  <div
                    class="cursor-pointer border-[1px] border-white text-white font-medium text-[14px] rounded-full px-8 py-4 absolute bottom-10 left-10"
                  >
                    Подробнее
                  </div>
                </div>
              </agile>
            </client-only>
          </div>
        </tab-vk>

        <tab-vk title="Личные данные">
          <!-- <div
            class="grid grid-cols-1 sm:grid-cols-[3fr,9fr] my-[47px] gap-[20px]"
          >
            <lk-user-info
              @handleReload="handleReload"
              @handleLogout="handleLogout"
            />
            <div
              class="bg-white rounded-[5px] shadow-md p-4 flex flex-col gap-4"
            >
              
              <span class="text-[30px]">Личные данные</span>
              <form
                v-if="dataMe.user.client_data !== null"
                @submit.prevent="updateUserInfo()"
                class="flex flex-col gap-[20px]"
              >
                <div class="flex flex-col gap-[20px]">
                  <div
                    class="flex w-full flex-col sm:flex-row justify-between gap-[20px]"
                  >
                    <input
                      class="input-med w-full sm:w-1/2 "
                      type="text"
                      v-model="dataMe.user.client_data.nomerTelefona"
                      placeholder="+7 (___) ___−__−__*"
                      v-facade="'+7 (###) ###-##-##'"
                    />
                    <input
                      class="input-med w-full sm:w-1/2 "
                      type="text"
                      v-model="dataMe.user.email"
                      placeholder="e-mail"
                    />
                  </div>
                 
                </div>
                <div
                  class="flex justify-between gap-[20px] flex-col sm:flex-row"
                >
                  <input
                    class="input-med w-full"
                    type="text"
                    v-model="pass"
                    placeholder="пароль"
                  />
                  <input
                    class="input-med w-full"
                    type="text"
                    v-model="passDetect"
                    placeholder="повторите пароль"
                  />
                </div>
                <div
                  class="flex justify-between gap-[20px] flex-col sm:flex-row"
                >
                  <input
                    class="input-med w-full"
                    type="text"
                    placeholder="Ростов на дону"
                  />
                  <input
                    class="input-med w-full"
                    type="text"
                    placeholder="улица"
                  />
                </div>
                <div
                  class="flex justify-between gap-[20px] flex-col sm:flex-row"
                >
                  <input
                    class="input-med w-full"
                    type="text"
                    v-model="dataMe.user.client_data.nomerDoma"
                    placeholder="дом"
                  />
                  <input
                    class="input-med w-full"
                    type="text"
                    v-model="dataMe.user.client_data.kvartira"
                    placeholder="квартира"
                  />
                </div>
                <div
                  class="flex justify-between gap-[20px] w-full text-[#343434]/50"
                >
                  <span class="w-full sm:w-1/2"
                    >Информация для врача консультанта</span
                  >
                </div>
                <div class="flex justify-between gap-[20px] w-full">
                  <div class="w-full sm:w-1/2 flex flex-col gap-[20px]">
                    <textarea
                      rows="5"
                      class="input-med w-full"
                      placeholder="Мои пожелания..."
                    ></textarea>
                    <div class="flex flex-col sm:flex-row gap-[20px] ">
                      <button
                        type="submit"
                        class="rounded-[5px]  border border-main h-[49px] hover:bg-main  anime text-main hover:text-white w-full flex justify-center items-center py-2 text-[16px]"
                      >
                        Сохранить изменения
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div> -->
        </tab-vk>
      </tabs-vk>
    </div>
    <div
      v-if="pdfView == true"
      class="fixed flex justify-center items-center bg-[#343434]/40  w-screen h-screen left-0 top-0  z-[1] backdrop-blur-sm"
    >
      <div
        class="w-[400px] h-auto z-[8] bg-[#FCFCFC] p-4 rounded-[5px] shadow-md flex flex-col gap-4 justify-center items-center fixed"
      >
        <span class="w-full text-center text-[24px]">Скачать результаты</span>
        <div class="flex flex-col gap-4">
          <!-- <div
            v-for="(item, i) in pdf"
            :key="i"
            class="bg-white p-4 rounded-[5px] shadow-md"
          >
            <a
              :href="item.guid.rendered"
              target="_blank"
              class="underline underline-offset-2"
              >Скачать результаты-{{ item.slug.substr(0, 5) }}-{{ i + 1 }}</a
            >
          </div> -->
        </div>

        <span
          @click="pdfView = false"
          class="text-[#343434] cursor-pointer hover:text-main anime"
          >Закрыть</span
        >
      </div>
    </div>
    <script
      type="text/javascript"
      src="https://auth.robokassa.ru/Merchant/bundle/robokassa_iframe.js"
    ></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.0.0/core.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/md5.js"></script>
    <!-- <div>{{ sortedDataDay }}</div> -->
    <!-- <div>{{ dataOrders }}</div> -->
  </div>
</template>

<script>
import tabsVk from '~/components/tabs/tabs-vk.vue'
import TabVk from '~/components/tabs/tab-vk.vue'
import LkZakaz from '~/components/lk-user/lk-zakaz.vue'
import LkZakazDesc from '~/components/lk-user/lk-zakaz-desc.vue'
import { VueAgile } from 'vue-agile'
import LkUserInfo from '~/components/lk-user/lk-user-info.vue'

import GET_ME from '~/graphql/pacient/get-me.gql'

export default {
  components: {
    tabsVk,
    TabVk,
    LkZakaz,
    LkZakazDesc,
    agile: VueAgile,
    LkUserInfo
  },
  layout: 'MainLayout',
  apollo: {
    usersPermissionsUser: {
      query: GET_ME,
      prefetch: true,
      variables () {
        return {
          ID: this.$auth.user.id
        }
      }
    }
  },

  middleware: ['isAuth'],
  data () {
    return {
      products_cart: [],
      me_ID: this.$auth.user.id,
      selected: '',
      dataMe: [],
      pdf: [],
      pdfView: false,
      pass: '',
      passDetect: '',
      meResUograde: [],
      userID: null,
      itemID: 0,
      orders: [],
      allLK: {
        navButtons: false,
        dots: true,
        centerMode: true,
        pauseOnHover: true,
        slidesToShow: 1
      }
    }
  },

  methods: {
    oplata (total) {
      console.log(total)
      const sum = total.attributes.SummOrder.toString()
      const test = 'MerchantLogin:OutSum:InvId:Пароль#1'
      var value = ('albvt:' + sum + ':1:' + 'kZqrav14Gq6afwQ7OaD5').toString()
      var result = CryptoJS.MD5(value)
      console.log('865  ' + result + ' / ' + sum + ' / ' + value)
      Robokassa.StartPayment({
        MerchantLogin: 'albvt',
        OutSum: sum,
        InvId: 1,
        Description: '',
        Culture: 'ru',
        Encoding: 'utf-8',
        SignatureValue: result
      })
    },
    DownloadResult(id){
      console.log();
    },
    async handleLogout () {
      this.$nuxt.$loading.start()
      await this.$auth.logout()
    },
    openItemInfo (id) {
      console.log(id)
      if (this.itemID == id) {
        this.itemID = 0
      } else if (this.itemID != id || this.itemID == 0) {
        this.itemID = id
      } else {
        this.itemID = id
      }
    },
    handleReload () {
      location.reload()
    },
  }
}
</script>

<style>
.cartAll {
  transition: all 0.5s;
}

.todo-leave-active {
  position: absolute;
}

.todo-leave-to {
  transform: translateX(200px);
  opacity: 0;
}

input[type='number']::-webkit-outer-spin-button,
input[type='number']::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
