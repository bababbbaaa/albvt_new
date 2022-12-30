<template>
  <div class="container mx-auto mt-20 flex justify-center">
    <div
      v-if="step == 1"
      class="flex flex-col gap-8 justify-center items-center"
    >
      <span class="text-bold text-4xl">Забыли пароль?</span>
      <span
        >для восстановления пароля введите email указанный при регистрации</span
      >
      <div class="flex flex-col gap-4">
        <div
          class="relative border-[1px] border-[#E5E4E8]    rounded-md px-4 py-3  shadow-sm anime"
        >
          <label
            for=""
            class="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs  anime"
            :class="[
              credentials.email <= 2
                ? 'text-[#89888F]'
                : 'text-main font-medium'
            ]"
            >Email*</label
          >
          <input
            v-model="credentials.email"
            class="block w-full border-0 p-0  focus:outline-none  sm:text-sm"
          />
        </div>
        <button
        @click="forgotPass"
        class="rounded-md border border-main  hover:bg-main anime text-main hover:text-white w-full flex justify-center items-center py-3 text-sm"
      >
        Отправить
      </button>
      </div>
      
    </div>
    <!-- step 2 -->
    <div
      v-else-if="step == 2"
      class="w-full max-w-[640px] flex flex-col justify-center items-center gap-4"
    >
      <span class="mb-8 text-center"
        >Для сброса пароля вставьте код, отправленный на почту<br>(проверьте папку "спам")</span
      >
      <div class="flex flex-col gap-4">
        <div
          class="relative border-[1px] border-[#E5E4E8]    rounded-md px-4 py-3  shadow-sm anime"
        >
          <label
            for=""
            class="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs  anime"
            :class="[
              credentials.code.length <= 2
                ? 'text-[#89888F]'
                : 'text-main font-medium'
            ]"
            >Код*</label
          >
          <input
            v-model="credentials.code"
            class="block w-full border-0 p-0  focus:outline-none  sm:text-sm"
          />
        </div>
        <div
          class="relative border-[1px] border-[#E5E4E8]    rounded-md px-4 py-3  shadow-sm anime"
        >
          <label
            for=""
            class="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs  anime"
            :class="[
              credentials.pass.length < 8
                ? 'text-[#89888F]'
                : 'text-main font-medium'
            ]"
            >Новый пароль*</label
          >
          <input
            v-model="credentials.pass"
            class="block w-full border-0 p-0  focus:outline-none  sm:text-sm"
          />
        </div>
        
        <button
        @click="resetPass"
          class="rounded-md border border-main  hover:bg-main anime text-main hover:text-white w-full flex justify-center items-center py-3 text-sm"
        >
          Сохранить
        </button>
      </div>
    </div>
    <!-- step 3 -->
    <div
      v-else-if="step == 3"
      class="w-full max-w-[640px] flex flex-col justify-center items-center gap-4"
    >
    <span class="text-2xl text-center" v-if="fio !== null">{{fio.resetPassword.user.FIO_user}}<br> <span class="text-[#5CF07C]">пароль успешно изменен!</span> </span>
    <nuxt-link to="/" class="text-main">На главную</nuxt-link>
    </div>
  </div>
</template>

<script>
import FORGOT_PASS from '../graphql/resetPass/FORGOT_PASS.gql'
import RESET_PASS from '../graphql/resetPass/RESET_PASS.gql'
export default {
  layout: 'MainLayout',
  data () {
    return {
      credentials: {
        email: '',
        pass: '',
        confPass: '',
        code: ''
      },
      step: 1,
      errors: null,
      confirm: false,
      fio: null
    }
  },
  methods: {
    async forgotPass () {
      this.$apollo
        .mutate({
          mutation: FORGOT_PASS,
          variables: {
            EMAIL: this.credentials.email
          }
        })
        .then(data => {
          this.step = 2
          console.log('ok', data)
        })
        .catch(error => {
          this.errors = error
        })
    },
    async resetPass () {
      this.$apollo
        .mutate({
          mutation: RESET_PASS,
          variables: {
            PASS: this.credentials.pass,
            PASS_CONF: this.credentials.pass,
            CODE: this.credentials.code
          }
        })
        .then(data => {
          this.step = 3
          this.fio = data.data
          console.log('ok', data)
        })
        .catch(error => {
          this.errors = error
        })
    }
  }
}
</script>

<style></style>
