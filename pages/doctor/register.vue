<template>
  <div class=" bg-[#fcfcfc]">
    <div
      v-if="speczialnosts && gorodaInvitros"
      class="container pt-[47px] mt-[47px] sm:mt-0 w-full max-w-[620px] h-full  flex flex-col justify-center items-center"
    >
      <div
        v-if="registerActive == true"
        class="w-full container  text-center flex flex-col justify-center items-center"
      >
        <img src="~/assets/icons/333331.png" alt="" />
        Вы успешно зарегистрировались
      </div>
      <span v-else-if="registerActive == false" class="font-medium text-xl"
        >Регистрация</span
      >

      <div v-if="step == 1" class="flex flex-col w-full items-center">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 my-12 w-full">
          <!-- step == 1 -->
          <div class="flex flex-col gap-1" v-if="step == 1">
            <div class=" flex flex-col gap-1 rounded-md shadow-sm">
              <div
                class="relative border-[1px] border-[#E5E4E8]    rounded-md px-4 py-3  shadow-sm anime"
                :class="[
                  dataDoctor.email.length <= 6 &&
                  !dataDoctor.email.includes('@')
                    ? 'border-[#E5E4E8]'
                    : 'border-main'
                ]"
              >
                <label
                  for=""
                  class="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs  anime"
                  :class="[
                    dataDoctor.email.length <= 6 &&
                    !dataDoctor.email.includes('@')
                      ? 'text-[#89888F]'
                      : 'text-main font-medium'
                  ]"
                  >Email*</label
                >
                <input
                  v-model="dataDoctor.email"
                  class="block w-full border-0 p-0  focus:outline-none  sm:text-sm"
                />
              </div>
            </div>
          </div>

          <!-- Phone -->
          <div class="flex flex-col gap-1">
            <div
              class="relative border-[1px] border-[#E5E4E8]    rounded-md px-4 py-3  shadow-sm anime"
              :class="[
                dataDoctor.Phone.length !== 18
                  ? 'border-[#E5E4E8]'
                  : 'border-main'
              ]"
            >
              <label
                for=""
                class="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs  anime"
                :class="[
                  dataDoctor.Phone.length !== 18
                    ? 'text-[#89888F]'
                    : 'text-main font-medium'
                ]"
                >Телефон*</label
              >
              <input
                v-model="dataDoctor.Phone"
                class="block w-full border-0 p-0  focus:outline-none  sm:text-sm"
                placeholder="+7"
                v-facade="'+7 (###) ###-##-##'"
              />
            </div>
          </div>

          <div class="flex flex-col gap-1">
            <!-- password -->

            <div
              class="relative border-[1px] border-[#E5E4E8]     rounded-md px-4 py-3  shadow-sm anime"
              :class="[
                dataDoctor.password.length < 8 ? 'text-[#89888F]' : 'text-main font-medium'
              ]"
            >
              <label
                for=""
                class="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs  anime"
                :class="[
                  dataDoctor.password.length < 8
                    ? 'text-[#89888F]'
                    : 'text-main font-medium'
                ]"
                >Пароль*</label
              >
              <input
                type="password"
                placeholder=""
                v-model="dataDoctor.password"
                class="block w-full border-0 p-0 focus:outline-none  sm:text-sm"
              />
            </div>
            <div class=" flex flex-col gap-1 rounded-md shadow-sm relative">
              <span class="text-[12px] text-[#89888F] text-right"
                >Пароль не менее 8 символов</span
              >
            </div>
          </div>

          <!-- password end-->

          <div class="flex flex-col gap-1">
            <div
              class="relative border-[1px] border-[#E5E4E8]  rounded-md px-4 py-3 shadow-sm anime"
              :class="[
                dataDoctor.password == dataDoctor.ConfPassword &&
                dataDoctor.password.length > 8
                  ? 'text-main font-medium'
                  : 'text-[#89888F]'
              ]"
            >
              <label
                for=""
                class="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs  anime"
                :class="[
                  dataDoctor.password == dataDoctor.ConfPassword &&
                  dataDoctor.password.length > 8
                    ? 'text-main'
                    : 'text-[#89888F]'
                ]"
                >Повторите пароль*</label
              >
              <input
                type="password"
                placeholder=""
                v-model="dataDoctor.ConfPassword"
                class="block w-full border-0 p-0 focus:outline-none sm:text-sm"
              />
            </div>
          </div>
        </div>
        <button
          class="w-full bg-main text-white rounded-md py-3  max-w-[300px]"
          :disabled="formBusy"
          @click="registerUser()"
        >
          Продолжить
        </button>
        <span class="mt-4 text-sm" v-if="errors == 'Введите корректный Email'"
          >Введите корректный Email</span
        >
      </div>

      <!-- step == 2 -->

      <div
        v-else-if="step == 2"
        class="grid grid-cols-1 sm:grid-cols-2 gap-4 my-12 w-full"
      >
        <div class="relative rounded-md shadow-sm anime w-full">
          <label
            for=""
            class="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs  anime z-[2]"
            :class="[
              speczialnostsSelectName == 'Выберите'
                ? 'text-[#89888F]'
                : 'text-main font-medium'
            ]"
            >Врачебная специальность*</label
          >
          <div
            @click="speczialnostsSelectView = !speczialnostsSelectView"
            class="relative border border-[#E5E4E8] p-3 rounded-md bg-transparent text-sm w-full"
          >
            <span
              class="text-transparent"
              v-if="speczialnostsSelectName == 'Выберите'"
              >Выберите</span
            >
            <span v-else>{{ speczialnostsSelectName }}</span>
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
            <svg
              v-if="speczialnostsSelectView"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-4 h-4  rotate-180 absolute top-3 right-3"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-4 h-4 text-main  absolute top-4 right-3"
              :class="[
                speczialnostsSelectName == 'Выберите'
                  ? 'text-[#343434]/50'
                  : 'text-main font-medium'
              ]"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </div>
        </div>
        <div class="relative rounded-md shadow-sm anime w-full">
          <label
            for=""
            class="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs  anime z-[2]"
            :class="[
              gorodaInvitrosSelectName == 'Выберите'
                ? 'text-[#89888F]'
                : 'text-main font-medium'
            ]"
            >Место работы врача*</label
          >
          <div
            @click="gorodaInvitrosSelectView = !gorodaInvitrosSelectView"
            class="relative border border-[#E5E4E8] p-3 rounded-md bg-transparent text-sm w-full"
          >
            <span
              class="text-transparent"
              v-if="gorodaInvitrosSelectName == 'Выберите'"
              >Выберите</span
            >
            <span v-else>{{ gorodaInvitrosSelectName }}</span>
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
          <svg
            v-if="gorodaInvitrosSelectView"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-4 h-4  rotate-180 absolute top-3 right-3"
            :class="[
              gorodaInvitrosSelectName !== 'Выберите'
                ? 'text-[#343434]/50'
                : 'text-main font-medium'
            ]"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-4 h-4 text-main  absolute top-4 right-3"
            :class="[
              gorodaInvitrosSelectName == 'Выберите'
                ? 'text-[#343434]/50'
                : 'text-main font-medium'
            ]"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </div>

        <div class="flex flex-col gap-1">
          <div
            class="relative border-[1px]   rounded-md px-4 py-3 shadow-sm anime"
            :class="[
              dataDoctor.Family.length <= 1 ? 'border-[#E5E4E8]' : 'border-main'
            ]"
          >
            <label
              for=""
              class="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs  anime"
              :class="[
                dataDoctor.Family.length <= 1 ? 'text-[#89888F]' : 'text-main font-medium'
              ]"
              >Фамилия*</label
            >
            <input
              placeholder=""
              v-model="dataDoctor.Family"
              class="block w-full border-0 p-0 focus:outline-none sm:text-sm"
            />
          </div>
        </div>

        <div class="flex flex-col gap-1">
          <div
            class="relative border-[1px]   rounded-md px-4 py-3 shadow-sm anime"
            :class="[
              dataDoctor.Name.length <= 1 ? 'border-[#E5E4E8]' : 'border-main'
            ]"
          >
            <label
              for=""
              class="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs  anime"
              :class="[
                dataDoctor.Name.length <= 1 ? 'text-[#89888F]' : 'text-main font-medium'
              ]"
              >Имя*</label
            >
            <input
              placeholder=""
              v-model.trim="dataDoctor.Name"
              class="block w-full border-0 p-0 focus:outline-none sm:text-sm"
            />
          </div>
        </div>

        <div class="flex flex-col gap-1">
          <div
            class="relative border-[1px]   rounded-md px-4 py-3 shadow-sm anime"
            :class="[
              dataDoctor.Otchestvo.length <= 1 ? 'border-[#E5E4E8]' : 'border-main'
            ]"
          >
            <label
              for=""
              class="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs  anime"
              :class="[
                dataDoctor.Otchestvo.length <= 1
                  ? 'text-[#89888F]'
                  : 'text-main font-medium'
              ]"
              >Отчество</label
            >
            <input
              placeholder=""
              v-model.trim="dataDoctor.Otchestvo"
              class="block w-full border-0 p-0 focus:outline-none sm:text-sm"
            />
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="flex flex-col gap-1">
            <div
              class="relative border-[1px]   rounded-md px-4 py-3 shadow-sm anime"
              :class="[
                dataDoctor.DataRozgdeniya.length !== 10
                  ? 'border-[#E5E4E8]' : 'border-main'
              ]"
            >
              <label
                for=""
                class="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs  anime"
                :class="[
                  dataDoctor.DataRozgdeniya.length !== 10
                    ? 'text-[#89888F]'
                    : 'text-main font-medium'
                ]"
                >Дата рождения*</label
              >
              <input
                placeholder="__.__.____*"
                v-facade="'##.##.####'"
                v-model.trim="dataDoctor.DataRozgdeniya"
                class="block w-full border-0 p-0 focus:outline-none sm:text-sm"
              />
            </div>
          </div>

          <div
            class="flex items-center flex-wrap sm:flex-nowrap  overflow-hidden"
          >
            <span
              @click="dataDoctor.gender = true"
              for="gender1"
              class="text-[14px] cursor-pointer w-1/2 p-[13px] flex justify-center items-center rounded-l-md"
              :class="[
                dataDoctor.gender !== true
                  ? 'border-[#343434]/30 border text-[#343434]/30'
                  : 'text-[#343434] border border-main'
              ]"
              >М</span
            >

            <span
              @click="dataDoctor.gender = false"
              for="gender2"
              class="text-[14px] cursor-pointer w-1/2 p-[13px] flex justify-center items-center rounded-r-md"
              :class="[
                dataDoctor.gender !== false
                  ? 'border-[#343434]/30 border text-[#343434]/30'
                  : 'text-[#343434] border border-main'
              ]"
              >Ж</span
            >
          </div>
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
