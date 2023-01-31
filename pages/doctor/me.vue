<template>
  <div class="bg-[#F9F9F9] flex flex-col pb-10 justify-center">
    <span class="pt-6 text-xl text-center w-full px-4">Личные данные</span>
    <div
      class="py-8 mt-2 container flex flex-col gap-4"
      v-if="usersPermissionsUser"
    >
      <div class="w-full flex items-center justify-between">
        <button
          @click="$router.back()"
          class=" flex  justify-start items-center gap-1"
        >
          <img src="~/assets/icons/arrow-back.svg" alt="" />
          Назад
        </button>
      </div>
      <div class="flex justify-between items-center w-full">
        <span>Мой промокод:</span>
        <div class="flex flex-col items-end gap-2">
          <div class="flex items-center">
            <input
              v-on:focus="$event.target.select()"
              ref="clone"
              readonly
              :value="usersPermissionsUser.data.attributes.Promo"
              class="bg-transparent text-xl font-bold p-1 border-1 border-main max-w-[100px] tracking-wider"
            />
            <button @click="copy">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6 text-main"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
                />
              </svg>
            </button>
          </div>

          <span v-if="me.cloneDone == true" class="text-xs">Скопированно!</span>
        </div>
      </div>

      <div
        class="bg-white rounded-[5px] shadow-md p-4 flex flex-col-reverse sm:flex-row justify-between gap-4"
      >
        <!-- left -->
        <div class="flex flex-col gap-4 items-start">
          <div
            class="col-span-1 sm:col-span-2 relative border-[1px] border-[#E5E4E8]  rounded-md px-4 py-3  shadow-sm anime flex items-center w-full"
          >
            <label
              for=""
              class="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium anime"
              :class="[
                me.phone.length !== 18
                  ? 'text-[#ADACB3]'
                  : 'text-main'
              ]"
              >Телефон*</label
            >
            <input
              v-model="me.phone"
              class="block w-full border-0 p-0  focus:outline-none  sm:text-sm"
              :placeholder="usersPermissionsUser.data.attributes.Phone"
              v-facade="'+7 (###) ###-##-##'"
            />
          </div>
          <div
            class="col-span-1 sm:col-span-6 w-full flex flex-col gap-2 justify-center items-center"
          >
            <button
              v-if="me.phone.length !== 18"
              class="opacity-50 sm:max-w-[300px] rounded-md border border-main h-[49px]  hover:bg-main  anime text-main hover:text-white w-full flex justify-center items-center py-2 text-[16px]"
            >
              Сохранить
            </button>
            <button
            v-else
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
            <span class="text-tem/50 text-xs">Дата рождения</span>
            <span>{{ this.$auth.user.DataRozgdeniya }}</span>
            <span class="w-full h-[1px] bg-[#E5E4E8] my-1"></span>
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-tem/50 text-xs">Email</span>
            <span>{{ usersPermissionsUser.data.attributes.email }}</span>
            <span class="w-full h-[1px] bg-[#E5E4E8] my-1"></span>
          </div>
          
        </div>
      </div>
    </div>
    <span v-else>Загрузка...</span>
  </div>
</template>

<script>
import ME_DOCTOR from '~/graphql/doctor/me-doctor.gql'
import RESET_PHONE_USER from '~/graphql/RESET_PHONE_USER.gql'

export default {
  layout: 'Doctor',
    middleware: ['isAuth'],
  data () {
    return {
      me: {
        phone: '',
        fio: '',
        data: '',
        password: '',
        email: '',
        cloneDone: false
      }
    }
  },
  apollo: {
    usersPermissionsUser: {
      query: ME_DOCTOR,
      prefetch: true,
      variables () {
        return {
          ID: this.$auth.user.id
        }
      }
    }
  },
  mounted () {
    if (this.usersPermissionsUser) {
      this.me.email = this.usersPermissionsUser.data.attributes.email
     
      this.me.fio = this.usersPermissionsUser.data.attributes.FIO_user
      this.me.data = this.usersPermissionsUser.data.attributes.DataRozgdeniya
    }
  },
  methods: {
     async updateUserMe () {
      const phone = this.me.phone
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
    async handleLogout () {
      this.$nuxt.$loading.start()
      await this.$auth.logout()
    },
    copy () {
      this.$refs.clone.focus()
      document.execCommand('copy')
      this.me.cloneDone = true
      console.log('copy')
      setTimeout(() => {
        this.me.cloneDone = false
      }, 1000)
    }
  }
}
</script>

<style></style>
