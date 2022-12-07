<template>
  <div
    class="container flex flex-col gap-[20px] justify-center items-center py-[47px]"
  >
    <heading-h-3>Регистрация</heading-h-3>
    <form
      @submit.prevent="registerOnGRAQH"
      class="max-w-[460px] bg-white  shadow-md rounded-[5px] p-[24px] flex flex-col gap-[20px] mt-24px"
    >
      <div class=" pb-[16px] flex flex-col gap-4 text-[16px] font-light">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-[20px]">
          <input
            required
            type="text"
            placeholder="Фамилия"
            @input="doneFormRegoster()"
            v-model="form.family"
            :class="[
              this.form.family.length <= 1
                ? ' !focus:outline-[#A55B4A] !border-[#A55B4A] '
                : '!border-[green] !focus:outline-[green]'
            ]"
            class="bg-white p-2 border-[1px] border-[#AEAEAE] rounded-[5px] focus:outline-[#8a8a8a]"
          />
          <input
            required
            type="text"
            v-model="form.name"
            :class="[
              this.form.name.length <= 1
                ? ' !focus:outline-[#A55B4A] !border-[#A55B4A] '
                : '!border-[green] !focus:outline-[green]'
            ]"
            placeholder="Имя"
            @input="doneFormRegoster()"
            class="bg-white p-2 border-[1px] border-[#AEAEAE] rounded-[5px] focus:outline-[#8a8a8a]"
          />
          <input
            required
            type="text"
            placeholder="Отчество"
            @input="doneFormRegoster()"
            v-model="form.otchestvo"
            :class="[
              this.form.otchestvo.length <= 1
                ? ' !focus:outline-[#A55B4A] !border-[#A55B4A] '
                : '!border-[green] !focus:outline-[green]'
            ]"
            class="bg-white p-2 border-[1px] border-[#AEAEAE] rounded-[5px] focus:outline-[#8a8a8a]"
          />
          <input
            required
            type="text"
            v-facade="'##.##.####'"
            placeholder="Дата рождения"
            @input="doneFormRegoster()"
            v-model="form.dataRozhdeniya"
            :class="[
              this.form.dataRozhdeniya.length !== 10
                ? ' !focus:outline-[#A55B4A] !border-[#A55B4A] '
                : '!border-[green] !focus:outline-[green]'
            ]"
            class="bg-white p-2 border-[1px] border-[#AEAEAE] rounded-[5px] focus:outline-[#8a8a8a]"
          />
        </div>
        <div class="flex items-center gap-4 mt-2 flex-wrap sm:flex-nowrap">
          <div class="flex items-center gap-2 w-full sm:w-1/2">
            <input
              type="radio"
              checked="checked"
              value="male"
              v-model="form.gender"
              id="gender1"
              class=""
            />
            <label for="gender1" class="text-[14px]">Мужчина</label>
          </div>
          <div class="flex items-center gap-2 w-full sm:w-1/2">
            <input
              type="radio"
              value="female"
              v-model="form.gender"
              id="gender2"
              class=""
            />
            <label for="gender2" class="text-[14px]">Женщина</label>
          </div>
        </div>
      </div>
      <div class=" flex flex-col gap-4 text-[16px] font-light">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-[20px]">
          <input
            type="text"
            required="required"
            placeholder="E-mail"
            @input="doneFormRegoster()"
            v-model="form.email"
            :class="[
              this.form.email.length == 0
                ? ' !focus:outline-[#A55B4A] !border-[#A55B4A]'
                : '!border-[green] !focus:outline-[green]'
            ]"
            id="us-phone-number-ex"
            class="bg-white p-2 border-[1px] border-[#AEAEAE] rounded-[5px] focus:outline-[#8a8a8a]"
          />
          <input
            type="text"
            required="required"
            id="us-phone-number-ex2"
            v-model="form.phone"
            :class="[
              this.form.phone.length !== 18
                ? ' !focus:outline-[#A55B4A] !border-[#A55B4A]'
                : '!border-[green] !focus:outline-[green]'
            ]"
            name="phone"
            placeholder="+7 (___) ___−__−__"
            @input="doneFormRegoster()"
            v-facade="'+7 (###) ###-##-##'"
            class="bg-white p-2 border-[1px] border-[#AEAEAE] rounded-[5px] focus:outline-[#8a8a8a]"
          />
          <input
            type="password"
            required="required"
            id="us-phone-number-ex2"
            v-model="form.password"
            :class="[
              this.form.password.length <= 8
                ? ' !focus:outline-[#A55B4A] !border-[#A55B4A]'
                : '!border-[green] !focus:outline-[green]'
            ]"
            name="password"
            placeholder="Пароль"
            @input="doneFormRegoster()"
            class="bg-white p-2 border-[1px] border-[#AEAEAE] rounded-[5px] focus:outline-[#8a8a8a]"
          />
        </div>
      </div>
      <div
        v-if="form.done == false"
        class="rounded-[5px] opacity-50 border bg-main cursor-not-allowed h-[49px]    text-white w-full flex justify-center items-center py-2 text-[16px]"
      >
        Зарегистрироваться
      </div>

      <button
        type="submit"
        v-else
        class="rounded-[5px] border bg-main h-[49px] hover:bg-[#4CBDEE]  anime  text-white w-full flex justify-center items-center py-2 text-[16px]"
      >
        Зарегистрироваться
      </button>
      <span v-if="form.done == false" class="text-[#A55B4A] text-[12px]"
        >Заполните все поля</span
      >
    </form>
    <span
      class="w-full max-w-[460px]  text-center text-[#343434]/90 text-[12px]"
    >
      Регистрируясь, Вы принимаете условия
      <nuxt-link
        to="/soglashenie"
        class="underline underline-offset-2 text-[#343434]/90 text-[12px]"
        >Соглашения</nuxt-link
      >
      об обработке персональных данных
    </span>
    <div v-if="user">
      {{ user }}
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import HeadingH3 from '~/components/HeadingH3.vue'

const REGISTER_USER = gql`
  mutation REGISTER_USER(
    $username: String
    $password: String
    $nickname: String
    $lastName: String
    $email: String
    $firstName: String
    $description: String
  ) {
    registerUser(
      input: {
        username: $username
        email: $email
        lastName: $lastName
        nickname: $nickname
        firstName: $firstName
        description: $description
        password: $password
      }
    ) {
      user {
        email
        id
        username
        wooSessionToken
        client_data {
          dataRozhdeniya
          dataSdachiAnalizov
          fieldGroupName
          gorod
          kvartira
          nomerDoma
          nomerTelefona
          otchestvo
          pasport
        }
      }
    }
  }
`

export default {
  components: { HeadingH3 },
  layout: 'MainLayout',
  data () {
    return {
      form: {
        family: '',
        name: '',
        otchestvo: '',
        dataRozhdeniya: '',
        email: '',
        phone: '',
        gender: 'male',
        done: false,
        password: ''
      },
      client: null,
      clentDataRes: null
    }
  },
  methods: {
    doneFormRegoster () {
      if (
        this.form.family !== '' &&
        this.form.name !== '' &&
        this.form.otchestvo !== '' &&
        this.form.dataRozhdeniya.length == 10 &&
        this.form.email.length >= 5 &&
        this.form.phone.length == 18  &&
        this.form.password.length <= 8
      ) {
        this.form.done = true
      } else {
        this.form.done = false
      }
    },
    async registerOnWP () {
      const dataClient = {
        email: this.form.email,
        first_name: this.form.name,
        last_name: this.form.family,
        username: this.form.email,
        billing: {
          first_name: this.form.name,
          last_name: this.form.family,
          email: this.form.email,
          phone: this.form.phone
        }
      }

      this.$axios
        .post('https://foxsis.ru/alvd/wp-json/wc/v3/customers/', dataClient)
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    registerOnGRAQH () {

      const nicknameForm = (
        this.form.name.toString() +
        ' ' +
        this.form.family.toString() +
        ' ' +
        this.form.otchestvo.toString()
      ).toString()

      console.log(nicknameForm);

      this.$apollo.mutate({
        mutate: REGISTER_USER,
        variables: {
          username: this.form.phone,
          email: this.form.email,
          lastName: this.form.family,
          nickname: nicknameForm,
          firstName: this.form.name,
          description: 'Описание',
          password: this.form.password
        }
      })
    }
  }
}
</script>

<style></style>
