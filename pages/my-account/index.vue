<template>
  <div class="container mt-[47px] sm:mt-0">
    <div v-if="usersPermissionsUser">
      <tabs-vk>
        <tab-vk title="Мои заказы">
          <div
            class="grid grid-cols-1  sm:grid-cols-[3fr,9fr] my-[47px] gap-[20px]"
          >
            <lk-user-info
              @handleReload="handleReload"
              @handleLogout="handleLogout"
            />

            <!-- мобильная -->

            <!-- десктоп -->

            <div
              class="grid grid-cols-1 gap-[20px]"
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
                @oplata="oplata(order, order.id)"
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
        <tab-vk title="Акции">
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

        <tab-vk title="Аккаунт">
          <div
            class="grid grid-cols-1 sm:grid-cols-[3fr,9fr] my-[47px] gap-[20px]"
          >
            <lk-user-info
              @handleReload="handleReload"
              @handleLogout="handleLogout"
            />
            <div
              class="bg-white rounded-[5px] shadow-md p-4 flex justify-between gap-4"
            >
              
              <!-- left -->
              <div class="flex flex-col gap-4 items-start">
                <span class="text-[30px]">Личные данные</span>
                <div
                  class="col-span-1 sm:col-span-2 relative border-[1px] border-[#E5E4E8]  rounded-md px-4 py-3  shadow-sm anime flex items-center"
                >
                  <label
                    for=""
                    class="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium anime"
                    :class="[
                      dataUserUpdate.phone.length !== 18
                        ? 'text-[#ADACB3]'
                        : 'text-main'
                    ]"
                    >Телефон*</label
                  >
                  <input
                    v-model="dataUserUpdate.phone"
                    class="block w-full border-0 p-0  focus:outline-none  sm:text-sm"
                    :placeholder="this.$auth.user.username"
                    v-facade="'+7 (###) ###-##-##'"
                  />
                </div>
                <div
                  class="col-span-1 sm:col-span-6 w-full flex flex-col gap-2 justify-center items-center"
                >
                  <button
                    @click="updateUserMe()"
                    class="sm:max-w-[300px] rounded-md border border-main h-[49px]  hover:bg-main  anime text-main hover:text-white w-full flex justify-center items-center py-2 text-[16px]"
                  >
                    Сохранить
                  </button>
                  <nuxt-link
                    to="/reset-pass"
                    class="w-full text-center text-sm text-tem/50"
                  >
                    Сбросить пароль
                  </nuxt-link>
                </div>
              </div>
              <!-- left -->
              <div class="flex flex-col gap-4">
                <div class="flex flex-col gap-1">
                  <span class="text-tem/50 text-xs">ФИО</span>
                  <span>{{ this.$auth.user.FIO_user }}</span>
                  <span class="w-full h-[1px] bg-[#E5E4E8] my-1"></span>
                </div>
                <div class="flex flex-col gap-1">
                  <span class="text-tem/50 text-xs">Email</span>
                  <span>{{ this.$auth.user.email }}</span>
                  <span class="w-full h-[1px] bg-[#E5E4E8] my-1"></span>
                </div>
                <div class="flex flex-col gap-1">
                  <span class="text-tem/50 text-xs">Дата рождения</span>
                  <span>{{ this.$auth.user.DataRozgdeniya }}</span>
                  <span class="w-full h-[1px] bg-[#E5E4E8] my-1"></span>
                </div>
              </div>
              
            </div>
          </div>
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
import RESET_PHONE_USER from '~/graphql/RESET_PHONE_USER.gql'

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
      succesUpdate: false,
      errors: null,
      dataUserUpdate: {
        username: '',
        phone: '',
        name: '',
        family: '',
        otchestvo: ''
      },
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
    async updateUserMe () {
      const phone = this.dataUserUpdate.phone
        .replaceAll('-', '')
        .replace('(', '')
        .replace(')', '')
        .replaceAll(' ', '')

      try {
        const res = await this.$apollo.mutate({
          mutation: RESET_PHONE_USER,
          variables: {
            ID: this.$auth.user.id,
            PHONE: phone
          }
        })
        if (res) {
          const results = res.data
          this.succesUpdate = true
          console.log(results)
          this.handleLogout()
        }
      } catch (err) {
        this.errors = err
      }
    },

    // DEV0AkTIRfqbepb4v404

    // guxNAyiYhi4WpjQ2m660
    oplata (total, id) {
      console.log(total)
      const sum = total.attributes.SummOrder.toString()
      const invIDValue = id
      // const test = 'MerchantLogin:OutSum:InvId:Пароль#1'
      var value = (
        'albvt:' +
        sum +
        ':' +
        invIDValue +
        ':' +
        'DEV0AkTIRfqbepb4v404'
      ).toString()

      var result = CryptoJS.MD5(value)
      Robokassa.StartPayment({
        MerchantLogin: 'albvt',
        OutSum: sum,
        InvId: id,
        Description: '',
        Culture: 'ru',
        Encoding: 'utf-8',
        SignatureValue: result
      })
    },
    DownloadResult (id) {
      console.log()
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
    }
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
