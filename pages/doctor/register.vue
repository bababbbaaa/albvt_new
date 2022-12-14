<template>
  <div class=" bg-[#fcfcfc]">
    <div
      v-if="speczialnosts && gorodaInvitros"
      class="container pt-[47px] mt-[47px] sm:mt-0 w-full max-w-[620px] h-full min-h-screen flex flex-col justify-center items-center"
    >
    <div v-if="registerActive == true" class="w-full container  text-center flex flex-col justify-center items-center">
      <img src="~/assets/icons/333331.png" alt="">
      Вы успешно зарегистрировались , ожидайте звонка менеджера для активации аккаунта
    </div>
    <span v-else-if="registerActive == false">Заполните данные</span>

      <div v-if="step == 1" class="grid grid-cols-1 sm:grid-cols-2 gap-4 my-12">
        <!-- step == 1 -->
        <div class="flex flex-col gap-1" v-if="step == 1">
          <div class="mt-1 flex flex-col gap-1 rounded-md shadow-sm">
            <div
              class="relative border-[1px]   rounded-md px-4 py-3  shadow-sm anime"
              :class="[
                dataDoctor.email.length <= 6 && !dataDoctor.email.includes('@')
                  ? 'border-[#E5E4E8]'
                  : 'border-main'
              ]"
            >
              <label
                for=""
                class="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium anime"
                :class="[
                  dataDoctor.email.length <= 6 &&
                  !dataDoctor.email.includes('@')
                    ? 'text-[#ADACB3]'
                    : 'text-main'
                ]"
                >Email*</label
              >
              <input
                v-model="dataDoctor.email"
                class="block w-full border-0 p-0  focus:outline-none  sm:text-sm"
              />
            </div>
            <span class="text-[12px] text-[#ADACB3]"
              >На эту почту будут отправлены результаты анализов</span
            >
          </div>
        </div>

        <!-- Phone -->
        <div class="flex flex-col gap-1">
          <div
            class="relative border-[1px]   rounded-md px-4 py-3  shadow-sm anime"
            :class="[
              dataDoctor.Phone.length !== 17
                ? 'border-[#E5E4E8]'
                : 'border-main'
            ]"
          >
            <label
              for=""
              class="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium anime"
              :class="[
                dataDoctor.Phone.length !== 17 ? 'text-[#ADACB3]' : 'text-main'
              ]"
              >Телефон*</label
            >
            <input
              v-model="dataDoctor.Phone"
              class="block w-full border-0 p-0  focus:outline-none  sm:text-sm"
              placeholder="+7(___) ___-__-__"
              v-facade="'+7(###) ###-##-##'"
            />
          </div>

          <div class="mt-1 flex flex-col gap-1 rounded-md shadow-sm">
            <span class="text-[12px] text-[#ADACB3]"
              >Используйте в качестве логина для входа</span
            >
          </div>
        </div>

        <div class="flex flex-col gap-1">
          <!-- password -->

          <div
            class="relative border-[1px]    rounded-md px-4 py-3  shadow-sm anime"
            :class="[
              dataDoctor.password.length < 8 ? 'text-[#ADACB3]' : 'text-main'
            ]"
          >
            <label
              for=""
              class="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium anime"
              :class="[
                dataDoctor.password.length < 8 ? 'text-[#ADACB3]' : 'text-main'
              ]"
              >Пароль*</label
            >
            <input
              type="password"
              placeholder="Пароль"
              v-model="dataDoctor.password"
              class="block w-full border-0 p-0  focus:outline-none  sm:text-sm"
            />
          </div>

          <!-- password end-->

          <div class="mt-1 flex flex-col gap-1 rounded-md shadow-sm relative">
            <span class="text-[12px] text-[#ADACB3]"
              >Пароль должен состоять из 8 и более символов</span
            >
          </div>
        </div>
        <div class="flex flex-col gap-1">
          <div
            class="relative border-[1px]    rounded-md px-4 py-3  shadow-sm anime"
            :class="[
              dataDoctor.password !== dataDoctor.ConfPassword
                ? 'text-[#ADACB3]'
                : 'text-main'
            ]"
          >
            <label
              for=""
              class="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium anime"
              :class="[
                dataDoctor.password !== dataDoctor.ConfPassword
                  ? 'text-[#ADACB3]'
                  : 'text-main'
              ]"
              >Повторите пароль</label
            >
            <input
              type="password"
              placeholder="Пароль"
              v-model="dataDoctor.ConfPassword"
              class="block w-full border-0 p-0  focus:outline-none  sm:text-sm"
            />
          </div>
        </div>

        <button
          class="w-full bg-main text-white rounded-md py-3"
          :disabled="formBusy"
          @click="registerUser()"
        >
          <span v-if="formBusy" small class="mr-2" /> Продолжить
        </button>
      </div>

      <!-- step == 2 -->

      <div
        v-else-if="step == 2"
        class="grid grid-cols-1 sm:grid-cols-2 gap-4 my-12"
      >
        <div class="relative rounded-md shadow-sm anime w-full">
          <label for="" class="label-new">Врачебная специальность*</label>
          <div
            @click="speczialnostsSelectView = !speczialnostsSelectView"
            class="relative border border-[#E5E4E8] p-3 rounded-md bg-transparent text-sm w-full"
          >
            <span>{{ speczialnostsSelectName }}</span>
            <div
              class=" p-3 bg-white flex flex-col gap-3 absolute  w-[300px] h-[300px] overflow-y-auto top-0 left-0 z-[10] rounded-md drop-shadow-xl"
              v-if="speczialnostsSelectView"
            >
              <div
                v-for="item in speczialnosts.data"
                :key="item.id"
                @click="speczialnostsSelectHandler(item)"
                class="bg-white text-sm cursor-pointer text-[#343434]"
              >
                {{ item.attributes.Name }}
              </div>
            </div>
          </div>
        </div>
        <div class="relative rounded-md shadow-sm anime w-full">
          <label for="" class="label-new">Место работы врача*</label>
          <div
            @click="gorodaInvitrosSelectView = !gorodaInvitrosSelectView"
            class="relative border border-[#E5E4E8] p-3 rounded-md bg-transparent text-sm w-full"
          >
            <span>{{ gorodaInvitrosSelectName }}</span>
            <div
              class=" bg-white flex flex-col  absolute  w-[300px] h-[300px] overflow-y-auto top-0 left-0 z-[10] rounded-md drop-shadow-xl"
              v-if="gorodaInvitrosSelectView"
            >
              <div
                v-for="item in gorodaInvitros.data"
                :key="item.id"
                @click="gorodaInvitrosHandler(item)"
                class="bg-white  p-3 text-xs cursor-pointer text-[#343434] hover:bg-[#343434]/10"
              >
                <span
                  class="font-semibold"
                  v-if="item.attributes.area_invitro.data !== null"
                  >{{
                    item.attributes.area_invitro.data.attributes.sityes_invitros
                      .data[0].attributes.Name
                  }}</span
                >
                <span class="font-semibold" v-else>Ростов-Н/д</span>
                - {{ item.attributes.Name }}
              </div>
            </div>
          </div>
        </div>
        <div class="relative rounded-md shadow-sm anime">
          <label for="" class="label-new">Фамилия*</label>
          <input
            v-model.trim="dataDoctor.Family"
            type="text"
            name="fio"
            class="input-new px-4 py-3"
          />
        </div>
        <div class="relative rounded-md shadow-sm anime">
          <label for="" class="label-new">Имя*</label>
          <input
            v-model.trim="dataDoctor.Name"
            type="text"
            name="name"
            class="input-new px-4 py-3"
          />
        </div>
        <div class="relative rounded-md shadow-sm anime">
          <label for="" class="label-new">Отчество</label>
          <input
            v-model="dataDoctor.Otchestvo"
            type="text"
            class="input-new px-4 py-3"
            name="otchestvo"
          />
        </div>
        <div class="relative rounded-md shadow-sm anime">
          <label for="" class="label-new">Дата рождения*</label>
          <input
            placeholder="__.__.____*"
            v-facade="'##.##.####'"
            v-model="dataDoctor.DataRozgdeniya"
            type="text"
            class="input-new px-4 py-3"
          />
        </div>
        <div
          class="flex items-center flex-wrap sm:flex-nowrap  overflow-hidden"
        >
          <span
            @click="dataDoctor.gender = true"
            for="gender1"
            class="text-[14px] cursor-pointer w-1/2 p-4 flex justify-center items-center rounded-l-md"
            :class="[
              dataDoctor.gender !== true
                ? 'border-[#343434]/30 border text-[#343434]/30'
                : 'text-[#343434] border border-main bg-main/10'
            ]"
            >М</span
          >

          <span
            @click="dataDoctor.gender = false"
            for="gender2"
            class="text-[14px] cursor-pointer w-1/2 p-4 flex justify-center items-center rounded-r-md"
            :class="[
              dataDoctor.gender !== false
                ? 'border-[#343434]/30 border text-[#343434]/30'
                : 'text-[#343434] border border-main bg-main/10'
            ]"
            >Ж</span
          >
        </div>

        <button
          class="w-full bg-main text-white rounded-md py-3"
          :disabled="formBusy"
          @click="updateUser()"
        >
          <span v-if="formBusy" small class="mr-2" /> Зарегистрироваться
        </button>
      </div>
      <div v-if="step == 3"></div>
    </div>
    <span class="mt-4 text-sm" v-if="errors == 'Введите корректный Email'"
      >Введите корректный Email</span
    >
    
  </div>
</template>

<script>
import REGISTER_DOCTOR_FIRST from '~/graphql/register/REGISTER_DOCTOR_FIRST.gql'
import SPEC from '~/graphql/register/SPEC.gql'
import REGISTER_OFIS from '~/graphql/register/REGISTER_OFIS.gql'
import CREATE_DOCTOR from '~/graphql/doctor/CREATE_DOCTOR.gql'

export default {
  layout: 'MainLayout',
  apollo: {
    speczialnosts: {
      query: SPEC
    },
    gorodaInvitros: {
      query: REGISTER_OFIS
    }
  },
  data () {
    return {
      step: 1,
      errors: '',
      idUser: '',
      speczialnostsSelect: '1',
      speczialnostsSelectView: false,
      speczialnostsSelectName: 'Выберите',
      gorodaInvitrosSelect: '1',
      gorodaInvitrosSelectView: false,
      gorodaInvitrosSelectName: 'Выберите',
      usernameUser: '',
      registerData: {
        sity: '',
        adress: '',
        spec: ''
      },
      dataDoctor: {
        username: '',
        email: '',
        Family: '',
        Name: '',
        Otchestvo: '',
        Phone: '',
        DataRozgdeniya: '',
        Promo: '',
        password: '',
        ConfPassword: '',
        gender: true
      },
      formBusy: false,
      registerActive: false
    }
  },
  methods: {
    speczialnostsSelectHandler (item) {
      this.speczialnostsSelect = item.id
      this.speczialnostsSelectName = item.attributes.Name
    },
    gorodaInvitrosHandler (item) {
      this.gorodaInvitrosSelect = item.id
      this.gorodaInvitrosSelectName = item.attributes.Name
    },
    handleLoginSubmit () {
      var promo = ''
      var possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

      for (var i = 0; i < 6; i++)
        promo += possible.charAt(Math.floor(Math.random() * possible.length))
      const credentials = this.form
      this.formBusy = true
      this.createDoctor()
    },
    async registerUser () {
      const username = this.dataDoctor.Phone.replaceAll('-', '')
        .replace('(', '')
        .replace(')', '')
        .replaceAll(' ', '')

      try {
        const res = await this.$apollo.mutate({
          mutation: REGISTER_DOCTOR_FIRST,
          variables: {
            USERNAME: username,
            EMAIL: this.dataDoctor.email,
            PASS: this.dataDoctor.password
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
        if (err) {
          this.errors = 'Введите корректный Email'
          console.log(err)
        }
      }
    },
    async updateUser () {
      const fio = (
        this.dataDoctor.Family +
        ' ' +
        this.dataDoctor.Name +
        ' ' +
        this.dataDoctor.Otchestvo
      ).toString()
      const phone = this.usernameUser
        .replaceAll('-', '')
        .replace('(', '')
        .replace(')', '')
        .replaceAll(' ', '')

      var promo = ''
      var possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

      for (var i = 0; i < 6; i++)
        promo += possible.charAt(Math.floor(Math.random() * possible.length))
      try {
        const res = await this.$apollo.mutate({
          mutation: CREATE_DOCTOR,
          variables: {
            ID: this.idUser,
            FIO: fio,
            PHONE: phone,
            DATAROZHDENIYA: this.dataDoctor.DataRozgdeniya,
            GENDER: this.dataDoctor.gender,
            PROMO: promo,
            SPEC: new Array(this.speczialnostsSelect),
            OFIC: new Array(this.gorodaInvitrosSelect)
          }
        })
        if (res) {
          const results = res.data
          this.succesRegister = true
          this.registerActive = true
          this.step = 3
          console.log(results)
        }
      } catch (err) {
        this.errors = err
      }
    },
    createDoctor () {
      console.log('отлично')
    }
  }
}
</script>

<style></style>
