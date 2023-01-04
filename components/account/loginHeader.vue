<template>
  <div class="">
    <div
      class="fixed bg-[#343434]/40 w-screen h-screen left-0 top-0 pt-[13px] z-[11]"
      @click="closeLogin()"
    ></div>
    <div
      class="bg-white absolute overflow-hidden p-[24px] right-0 top-0 w-full max-w-[370px] shadow-md rounded-bl-[5px] z-[999999]"
    >
      <span class="w-full text-right pb-4">Вход в личный кабинет</span>
      <tabs-login>
        <tab-login title="По телефону">
          <!-- телефон -->
          <form
            @submit.prevent="handleLoginSubmit()"
            class="flex flex-col gap-4"
          >
            <div class="flex flex-col gap-1">
              <div
                class="relative border-[1px] border-[#E5E4E8]    rounded-md px-4 py-3  shadow-sm anime"
              >
                <label
                  for=""
                  class="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs  anime"
                  :class="[
                    credentials.identifier.length !== 18
                      ? 'text-[#89888F]'
                      : 'text-main font-medium'
                  ]"
                  >Телефон*</label
                >
                <input
                  v-model="credentials.identifier"
                  class="block w-full border-0 p-0  focus:outline-none  sm:text-sm"
                  placeholder="+7"
                  v-facade="'+7 (###) ###-##-##'"
                />
              </div>
            </div>

            <div
              class="relative border-[1px] border-[#E5E4E8]    rounded-md px-4 py-3  shadow-sm anime"
            >
              <label
                for=""
                class="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs  anime"
                :class="[
                  credentials.password.length < 8
                    ? 'text-[#89888F]'
                    : 'text-main font-medium'
                ]"
                >Пароль*</label
              >
              <input
                :type="typePassword"
                v-model="credentials.password"
                class="block w-full border-0 p-0  focus:outline-none  sm:text-sm"
              />
              <div
                @click="show_hide_password()"
                class="absolute right-[14px] top-[15px]"
              >
                <svg
                  v-if="typePassword == 'password'"
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 text-[#343434]/70"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 text-[#343434]/70"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                  />
                </svg>
              </div>
            </div>
            <div class="flex flex-col items-center justify-center gap-2">
              <button
                type="submit"
                class="rounded-[5px] border border-main h-[49px] hover:bg-main anime text-main hover:text-white w-full flex justify-center items-center py-2 text-[16px]"
              >
                Войти
              </button>
              <button @click="getResetPass" class="text-tem/70 text-xs pb-2">
                Забыли пароль?
              </button>
              <div
                v-if="loginError == true"
                class="flex justify-center gap-1 items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 text-[#A75F4F] mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <div class="flex flex-col gap-2">
                  <span class="text-[#A55B4A] uppercase text-[12px]"
                    >Неправильный логин или пароль</span
                  >
                  <!-- <span>{{dataErrors}}</span> -->
                </div>
              </div>
              <!-- <div @click="closeLogin()">
            <nuxt-link to="/register" class="text-[#343434] w-full text-center"
              >Регистрация</nuxt-link
            >
          </div> -->
            </div>
          </form>
        </tab-login>
        <tab-login title="По Email">
          <!-- email -->
          <form
            @submit.prevent="handleLoginSubmit2()"
            class="flex flex-col gap-4"
          >
            <div class="flex flex-col gap-1">
              <div
                class="relative border-[1px] border-[#E5E4E8]    rounded-md px-4 py-3  shadow-sm anime"
              >
                <label
                  for=""
                  class="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs  anime"
                  :class="[
                    confirmEmail == false
                      ? 'text-[#89888F]'
                      : 'text-main font-medium'
                  ]"
                  >Email*</label
                >
                <input
                  v-model="credentials2.identifier"
                  class="block w-full border-0 p-0  focus:outline-none  sm:text-sm"
                />
                <span class="border text-xs p-2">{{credentials2.identifier}} - {{confirmEmail}}</span>
              </div>
            </div>

            <div
              class="relative border-[1px] border-[#E5E4E8]    rounded-md px-4 py-3  shadow-sm anime"
            >
              <label
                for=""
                class="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs  anime"
                :class="[
                  credentials2.password.length < 8
                    ? 'text-[#89888F]'
                    : 'text-main font-medium'
                ]"
                >Пароль*</label
              >
              <input
                :type="typePassword"
                v-model="credentials2.password"
                class="block w-full border-0 p-0  focus:outline-none  sm:text-sm"
              />
              <div
                @click="show_hide_password()"
                class="absolute right-[14px] top-[15px]"
              >
                <svg
                  v-if="typePassword == 'password'"
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 text-[#343434]/70"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 text-[#343434]/70"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                  />
                </svg>
              </div>
            </div>
            <div class="flex flex-col items-center justify-center gap-2">
              <button
                type="submit"
                class="rounded-[5px] border border-main h-[49px] hover:bg-main anime text-main hover:text-white w-full flex justify-center items-center py-2 text-[16px]"
              >
                Войти
              </button>
              <button @click="getResetPass" class="text-tem/70 text-xs pb-2">
                Забыли пароль?
              </button>
              <div
                v-if="loginError == true"
                class="flex justify-center gap-1 items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 text-[#A75F4F] mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <span class="text-[#A55B4A] uppercase text-[12px]"
                  >Неправильный логин или пароль</span
                >
              </div>
              <!-- <div @click="closeLogin()">
            <nuxt-link to="/register" class="text-[#343434] w-full text-center"
              >Регистрация</nuxt-link
            >
          </div> -->
            </div>
          </form>
        </tab-login>
      </tabs-login>
    </div>
  </div>
</template>

<script>
import TabLogin from '../tabs/tab-login.vue'
import tabsLogin from '../tabs/tabs-login.vue'
export default {
  components: { tabsLogin, TabLogin },
  data () {
    return {
      isAuthenticated: false,
      submitting: false,
      error: null,
      credentials: {
        identifier: '',
        password: ''
      },
      credentials2: {
        identifier: '',
        password: ''
      },
      successfulData: null,
      loginError: false,
      dataErrors: '',
      typePassword: 'password',
      confirmEmail: false
    }
  },
  mounted () {
    this.isAuthenticated = !!this.$apolloHelpers.getToken()
  },
  methods: {
    show_hide_password () {
      if (this.typePassword == 'password') {
        this.typePassword = 'text'
      } else {
        this.typePassword = 'password'
      }
    },
    getResetPass () {
      this.closeLogin()
      this.$nuxt.$router.replace({ path: '/reset-pass' })
    },
    async handleLoginSubmit () {
      const getPhone = this.credentials.identifier
        .replaceAll('-', '')
        .replaceAll(' ', '')
        .replace('(', '')
        .replace(')', '')
      console.log(getPhone)

      this.formBusy = true
      try {
        await this.$auth.loginWith('graphql', {
          identifier: getPhone,
          password: this.credentials.password
        })
        // console.log(localStorage["auth._token.graphql"]);
        this.formBusy = false
        this.loginError = false
        setTimeout(() => {
          if (this.$auth.user.RoleUser == 'Vrach') {
            this.$nuxt.$router.replace({ path: '/doctor' })
          } else {
            this.$nuxt.$router.replace({ path: '/my-account' })
          }
        }, 1000)
      } catch (errors) {
        this.formBusy = false
        this.loginError = true
        this.dataErrors = errors
        console.log(errors)
      }
    },
    async handleLoginSubmit2 () {
      const getPhone = this.credentials2.identifier

      this.formBusy = true
      try {
        await this.$auth.loginWith('graphql', {
          identifier: getPhone,
          password: this.credentials2.password
        })
        // console.log(localStorage["auth._token.graphql"]);
        this.formBusy = false
        this.loginError = false
        setTimeout(() => {
          if (this.$auth.user.RoleUser == 'Vrach') {
            this.$nuxt.$router.replace({ path: '/doctor' })
          } else {
            this.$nuxt.$router.replace({ path: '/my-account' })
          }
        }, 1000)
      } catch (errors) {
        this.formBusy = false
        this.loginError = true
        this.dataErrors = errors
        console.log(errors)
      }
    },
    async onLogout () {
      await this.$apolloHelpers.onLogout()
      this.isAuthenticated = false
    },
    closeLogin () {
      this.$emit('loginView')
    }
  },
  watch: {
    'credentials2.identifier' () {
      if (this.credentials2.identifier.includes('@')) {
        this.confirmEmail = true
      } else {
        this.confirmEmail = false
      }
    }
  }
}
</script>

<style></style>
