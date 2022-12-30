<template>
  <div class="w-full flex flex-col justify-center items-center">
    <div class="flex justify-center gap-[20px] items-center w-full ">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        <!-- step == 1 -->
        <div class="flex flex-col gap-1 w-full" v-if="step == 1">
          <div class="mt-1 flex flex-col gap-1 rounded-md shadow-sm">
            <div
              class="relative border-[1px] border-[#E5E4E8]  rounded-md px-4 py-3  shadow-sm anime"
            >
              <label
                for=""
                class="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium anime"
                :class="[
                  formCreate.email.length <= 6 &&
                  !formCreate.email.includes('@')
                    ? 'text-[#ADACB3]'
                    : 'text-main'
                ]"
                >Email*</label
              >
              <input
                v-model="formCreate.email"
                class="block w-full border-0 p-0  focus:outline-none  sm:text-sm"
              />
            </div>
            <span class="text-[12px] text-[#ADACB3]"
              >На эту почту придут результаты анализов</span
            >
          </div>
        </div>

        <!-- phone -->
        <div class="flex flex-col gap-1" v-if="step == 1">
          <div
            class="relative border-[1px] border-[#E5E4E8]  rounded-md px-4 py-3  shadow-sm anime"
          >
            <label
              for=""
              class="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium anime"
              :class="[
                formCreate.phone.length !== 18 ? 'text-[#ADACB3]' : 'text-main'
              ]"
              >Телефон*</label
            >
            <input
              v-model="formCreate.phone"
              class="block w-full border-0 p-0  focus:outline-none  sm:text-sm"
              placeholder="+7"
              v-facade="'+7 (###) ###-##-##'"
            />
          </div>

          <div class="mt-1 flex flex-col gap-1 rounded-md shadow-sm"></div>
        </div>

        <div class="flex flex-col gap-1" v-if="step == 1">
          <!-- password -->

          <div
            class="relative border-[1px]  border-[#E5E4E8]  rounded-md px-4 py-3  shadow-sm anime"
          >
            <label
              for=""
              class="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium anime"
              :class="[
                formCreate.password.length < 8 ? 'text-[#ADACB3]' : 'text-main'
              ]"
              >Пароль*</label
            >
            <input
              :type="typePassword"
              placeholder=""
              v-model="formCreate.password"
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

          <!-- password end-->

          <div class="flex flex-col gap-1 rounded-md shadow-sm relative">
            <span class="text-[12px] text-[#ADACB3] w-full text-right">Не менее 8 символов </span>
          </div>
        </div>
        <div class="flex flex-col gap-1" v-if="step == 1">
          <div
            class="relative border-[1px] border-[#E5E4E8]   rounded-md px-4 py-3  shadow-sm anime"
            
          >
            <label
              for=""
              class="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium anime"
              :class="[
                formCreate.password == formCreate.ConfPassword &&
                formCreate.password.length > 8
                  ? 'text-main'
                  : '  text-[#ADACB3]'
              ]"
              >Повторите пароль</label
            >
            <input
              :type="typePassword"
              placeholder=""
              v-model="formCreate.ConfPassword"
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
        </div>

        <!-- step 2 -->

        <div
          v-if="step == 2"
          class="relative border-[1px] border-[#E5E4E8]   rounded-md px-4 py-3  shadow-sm anime"
          
        >
          <label
            for=""
            class="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium anime"
            :class="[
              formCreate.family.length <= 2 ? 'text-[#ADACB3]' : 'text-main'
            ]"
            >Фамилия*</label
          >
          <input
            v-model="formCreate.family"
            class="block w-full border-0 p-0  focus:outline-none  sm:text-sm"
          />
        </div>

        <div
          v-if="step == 2"
          class="relative border-[1px]   rounded-md px-4 py-3  shadow-sm anime"
          :class="[
            formCreate.name.length <= 2 ? 'border-[#E5E4E8]' : 'border-main'
          ]"
        >
          <label
            for=""
            class="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium anime"
            :class="[
              formCreate.name.length <= 2 ? 'text-[#ADACB3]' : 'text-main'
            ]"
            >Имя*</label
          >
          <input
            v-model="formCreate.name"
            class="block w-full border-0 p-0  focus:outline-none  sm:text-sm"
          />
        </div>

        <div
          v-if="step == 2"
          class="relative border-[1px]   rounded-md px-4 py-3  shadow-sm anime"
          :class="[
            formCreate.otchestvo.length <= 2
              ? 'border-[#E5E4E8]'
              : 'border-main'
          ]"
        >
          <label
            for=""
            class="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium anime"
            :class="[
              formCreate.otchestvo.length <= 2 ? 'text-[#ADACB3]' : 'text-main'
            ]"
            >Отчество</label
          >
          <input
            v-model="formCreate.otchestvo"
            class="block w-full border-0 p-0  focus:outline-none  sm:text-sm"
          />
        </div>
        <div class="grid grid-cols-2 gap-3" v-if="step == 2">
          <div
            class="relative border-[1px]   rounded-md px-4 py-3  shadow-sm anime"
            :class="[
              formCreate.dataRozgdeniya.length !== 10
                ? 'border-[#E5E4E8]'
                : 'border-main'
            ]"
          >
            <label
              for=""
              class="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium anime"
              :class="[
                formCreate.dataRozgdeniya.length !== 10
                  ? 'text-[#ADACB3]'
                  : 'text-main'
              ]"
              >Дата рождения</label
            >
            <input
              v-model="formCreate.dataRozgdeniya"
              class="block w-full border-0 p-0  focus:outline-none  sm:text-sm"
              placeholder="__.__.____"
              v-facade="'##.##.####'"
            />
          </div>

          <div
            class="flex items-center flex-wrap sm:flex-nowrap  overflow-hidden"
          >
            <span
              @click="formCreate.gender = true"
              for="gender1"
              class="text-[14px] cursor-pointer w-1/2 p-4 flex justify-center items-center rounded-l-md"
              :class="[
                formCreate.gender !== true
                  ? 'border-[#343434]/30 border text-[#343434]/30'
                  : 'text-[#343434] border border-main bg-main/10'
              ]"
              >М</span
            >

            <span
              @click="formCreate.gender = false"
              for="gender2"
              class="text-[14px] cursor-pointer w-1/2 p-4 flex justify-center items-center rounded-r-md"
              :class="[
                formCreate.gender !== false
                  ? 'border-[#343434]/30 border text-[#343434]/30'
                  : 'text-[#343434] border border-main bg-main/10'
              ]"
              >Ж</span
            >
          </div>
        </div>

        <div
          v-if="step == 2"
          class="relative border-[1px]   rounded-md px-4 py-3  shadow-sm anime"
          :class="[
            formCreate.passportSeriya.length !== 12
              ? 'border-[#E5E4E8]'
              : 'border-main'
          ]"
        >
          <label
            for=""
            class="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium anime"
            :class="[
              formCreate.passportSeriya.length !== 12
                ? 'text-[#ADACB3]'
                : 'text-main'
            ]"
            >Паспорт (серия/номер)</label
          >
          <input
            v-model="formCreate.passportSeriya"
            class="block w-full border-0 p-0  focus:outline-none  sm:text-sm"
            placeholder="__ __ ______"
            v-facade="'## ## ######'"
          />
        </div>
      </div>
    </div>
    <button
      v-if="step == 2"
      @click="updateUser()"
      :class="[
        formCreate.family.length >= 2 &&
        formCreate.name.length >= 2 &&
        formCreate.dataRozgdeniya.length == 10 &&
        formCreate.passportSeriya.length == 12
          ? 'cursor-pointer'
          : 'cursor-not-allowed opacity-30'
      ]"
      class="max-w-[300px] rounded-md border border-main h-[49px] mt-6 hover:bg-main  anime text-main hover:text-white w-full flex justify-center items-center py-2 text-[16px]"
    >
      Зарегистрироваться
    </button>
    <button
      v-else-if="step == 1"
      @click="registerUser()"
      :class="[
        formCreate.phone.length == 18 &&
        formCreate.password.length >= 8 &&
        formCreate.password == formCreate.ConfPassword
          ? 'cursor-pointer'
          : 'cursor-not-allowed opacity-30'
      ]"
      class="max-w-[300px] rounded-md border border-main h-[49px] mt-6 hover:bg-main  anime text-main hover:text-white w-full flex justify-center items-center py-2 text-[16px]"
    >
      Продолжить
    </button>
    <span
      class=""
      v-if="
        formCreate.family.length >= 2 &&
          formCreate.name.length >= 2 &&
          formCreate.dataRozgdeniya.length == 10 &&
          formCreate.passportSeriya.length == 12
      "
    ></span>
    <span class="text-[green]" v-else-if="succesRegister == true"
      >Успешно!</span
    >
    <span class="text-[#A75F4F]" v-else-if="succesRegister == false"
      >Попробуйте еще раз!</span
    >
    <span class="mt-4 text-sm" v-else-if="errors == 'Введите корректный Email'"
      >Введите корректный Email</span
    >
  </div>
</template>

<script>
import REGISTER_USER_FIRST from '~/graphql/register/REGISTER_USER_FIRST.gql'
import UPDATE_USER_FIRST from '~/graphql/register/UPDATE_USER_FIRST.gql'
export default {
  components: {},
  data () {
    return {
      formCreate: {
        family: '',
        name: '',
        otchestvo: ' ',
        passportSeriya: '',
        email: '',
        phone: '',
        password: '',
        ConfPassword: '',
        dataRozgdeniya: '',
        gender: true
      },
      typePassword: 'password',
      succes: '',
      succesRegister: null,
      errors: '',
      idUser: '',
      usernameUser: '',
      step: 1
    }
  },
  methods: {
    show_hide_password () {
      if (this.typePassword == 'password') {
        this.typePassword = 'text'
      } else {
        this.typePassword = 'password'
      }
    },
    testUser () {
      const username = this.formCreate.phone
        .replaceAll('-', '')
        .replace('(', '')
        .replace(')', '')
        .replaceAll(' ', '')
      console.log(username)
    },
    async updateUser () {
      const fio = (
        this.formCreate.family +
        ' ' +
        this.formCreate.name +
        ' ' +
        this.formCreate.otchestvo
      ).toString()
      const phone = this.usernameUser
        .replaceAll('-', '')
        .replace('(', '')
        .replace(')', '')
        .replaceAll(' ', '')

      try {
        const res = await this.$apollo.mutate({
          mutation: UPDATE_USER_FIRST,
          variables: {
            ID: this.idUser,
            FIO: fio,
            PHONE: phone,
            DATA: this.formCreate.dataRozgdeniya,
            GEN: this.formCreate.gender,
            PASSPORT: this.formCreate.passportSeriya
          }
        })
        if (res) {
          const results = res.data
          this.succesRegister = true

          this.handleLoginSubmit()

          console.log(results)
        }
      } catch (err) {
        this.errors = err
      }
    },
    async registerUser () {
      const username = this.formCreate.phone
        .replaceAll('-', '')
        .replace('(', '')
        .replace(')', '')
        .replaceAll(' ', '')

      try {
        const res = await this.$apollo.mutate({
          mutation: REGISTER_USER_FIRST,
          variables: {
            USERNAME: username,
            EMAIL: this.formCreate.email,
            PASS: this.formCreate.password
          }
        })
        if (res) {
          const results = res.data
          this.step = 2
          this.idUser = results.register.user.id
          this.usernameUser = results.register.user.username

          console.log(results)
        }
      } catch (err) {
        if (err.message) {
          this.errors = 'Введите корректный Email'
        }
      }
    },
    async handleLoginSubmit () {
      try {
        await this.$auth.loginWith('graphql', {
          identifier: this.usernameUser,
          password: this.formCreate.password
        })
        setTimeout(() => {
          this.$nuxt.$router.replace({ path: '/cart' })
          location.reload()
        }, 1000)
      } catch (errors) {
        console.log(errors)
      }
    }
  }
}
</script>

<style></style>
