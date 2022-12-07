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
          <form @submit.prevent="handleLoginSubmit()" class="flex flex-col gap-4">
            <div class="flex flex-col items-start justify-start gap-2 w-full">
              <!-- <label for="login" class="text-[14px]">Логин</label> -->
              <input
                type="text"
                value="ofis_my"
                placeholder="+7(___)___−__−__*"
                v-facade="'+7(###)###-##-##'"
                v-model="credentials.identifier"
                @input="(evt) => (credentials.identifier = evt.target.value)"
                class="w-full bg-white p-2 border-[1px] border-[#AEAEAE] rounded-[5px] focus:outline-[#8a8a8a]"
                id="login"
              />
            </div>
            <div class="flex flex-col items-start justify-start gap-2 w-full relative">
              <!-- <label for="pass" class="text-[14px]">Пароль</label> -->
              <input
                :type="typePassword"
                placeholder="Пароль"
                value="ofis_my"
                v-model="credentials.password"
                @input="(evt) => (credentials.password = evt.target.value)"
                class="w-full bg-white p-2 border-[1px] border-[#AEAEAE] rounded-[5px] focus:outline-[#8a8a8a] password-area"
                id="passHeader"
              />
              <div @click="show_hide_password()" class="absolute right-[14px] top-[14px]">
                <svg
                  v-if="typePassword == 'password'"
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 text-[#343434]/70"
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
                  class="h-6 w-6 text-[#343434]/70"
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
          <form @submit.prevent="handleLoginSubmit2()" class="flex flex-col gap-4">
            <div class="flex flex-col items-start justify-start gap-2 w-full">
              <!-- <label for="login" class="text-[14px]">Логин</label> -->
              <input
                type="text"
                placeholder="email"
                v-model="credentials2.identifier"
                @input="(evt) => (credentials2.identifier = evt.target.value)"
                class="w-full bg-white p-2 border-[1px] border-[#AEAEAE] rounded-[5px] focus:outline-[#8a8a8a]"
                id="login2"
              />
            </div>
            <div class="flex flex-col items-start justify-start gap-2 w-full relative">
              <!-- <label for="pass" class="text-[14px]">Пароль</label> -->
              <input
                :type="typePassword"
                placeholder="Пароль"
                v-model="credentials2.password"
                @input="(evt) => (credentials2.password = evt.target.value)"
                class="w-full bg-white p-2 border-[1px] border-[#AEAEAE] rounded-[5px] focus:outline-[#8a8a8a]"
                id="pass2"
              />
              <div @click="show_hide_password()" class="absolute right-[14px] top-[14px]">
                <svg
                  v-if="typePassword == 'password'"
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 text-[#343434]/70"
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
                  class="h-6 w-6 text-[#343434]/70"
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
import TabLogin from "../tabs/tab-login.vue";
import tabsLogin from "../tabs/tabs-login.vue";
export default {
  components: { tabsLogin, TabLogin },
  data() {
    return {
      isAuthenticated: false,
      submitting: false,
      error: null,
      credentials: {
        identifier: "",
        password: "",
      },
      credentials2: {
        identifier: "",
        password: "",
      },
      successfulData: null,
      loginError: false,
      dataErrors: "",
      typePassword: "password",
    };
  },
  mounted() {
    this.isAuthenticated = !!this.$apolloHelpers.getToken();
  },
  methods: {
    show_hide_password() {
      if (this.typePassword == "password") {
        this.typePassword = "text";
      } else {
        this.typePassword = "password";
      }
    },
    async handleLoginSubmit() {
      const getPhone = this.credentials.identifier
        .replaceAll("-", "")
        .replace("(", "")
        .replace(")", "");
      console.log(getPhone);

      this.formBusy = true;
      try {
        await this.$auth.loginWith("graphql", {
          identifier: getPhone,
          password: this.credentials.password,
        });
        // console.log(localStorage["auth._token.graphql"]);
        this.formBusy = false;
        this.loginError = false;
        setTimeout(() => {
          if (this.$auth.user.RoleUser == 'Vrach') {
              this.$nuxt.$router.replace({ path: "/doctor" });
          }
          else {
            this.$nuxt.$router.replace({ path: "/my-account" });
          }
        }, 1000);
      } catch (errors) {
        this.formBusy = false;
        this.loginError = true;
        this.dataErrors = errors;
        console.log(errors);
      }
    },
    // async handleLoginSubmit2() {
    //   const emailUser = this.credentials2.identifier;
    //   this.formBusy = true;
    //   try {
    //     await this.$auth.loginWith("graphql", {
    //       identifier: emailUser,
    //       password: this.credentials2.password,
    //     });
    //     // console.log(localStorage["auth._token.graphql"]);
    //     this.formBusy = false;
    //     this.loginError = false;
    //     // setTimeout(() => {
    //     //   this.$nuxt.$router.replace({ path: "/my-account" });
    //     // }, 1000);
    //   } catch (errors) {
    //     this.formBusy = false;
    //     this.loginError = true;
    //     this.dataErrors = errors;
    //     console.log(errors);
    //   }
    // },
    async onLogout() {
      await this.$apolloHelpers.onLogout();
      this.isAuthenticated = false;
    },
    closeLogin() {
      this.$emit("loginView");
    },
  },
};
</script>

<style></style>
