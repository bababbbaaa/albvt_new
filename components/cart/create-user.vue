<template>
  <div>
    <div class="flex justify-center gap-[20px] items-center w-full ">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div
          class="relative border-[1px]   rounded-md px-4 py-3  shadow-sm anime"
          :class="[
            formCreate.family.length <= 2
              ? 'border-[#343434]/70'
              : 'border-main'
          ]"
        >
          <label
            for=""
            class="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium anime"
            :class="[
              formCreate.family.length <= 2 ? 'text-[#343434]/70' : 'text-main'
            ]"
            >Фамилия*</label
          >
          <input
            v-model="formCreate.family"
            class="block w-full border-0 p-0  focus:outline-none  sm:text-sm"
          />
        </div>

        <div
          class="relative border-[1px]   rounded-md px-4 py-3  shadow-sm anime"
          :class="[
            formCreate.name.length <= 2 ? 'border-[#343434]/70' : 'border-main'
          ]"
        >
          <label
            for=""
            class="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium anime"
            :class="[
              formCreate.name.length <= 2 ? 'text-[#343434]/70' : 'text-main'
            ]"
            >Имя*</label
          >
          <input
            v-model="formCreate.name"
            class="block w-full border-0 p-0  focus:outline-none  sm:text-sm"
          />
        </div>

        <div
          class="relative border-[1px]   rounded-md px-4 py-3  shadow-sm anime"
          :class="[
            formCreate.otchestvo.length <= 2
              ? 'border-[#343434]/70'
              : 'border-main'
          ]"
        >
          <label
            for=""
            class="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium anime"
            :class="[
              formCreate.otchestvo.length <= 2
                ? 'text-[#343434]/70'
                : 'text-main'
            ]"
            >Отчество</label
          >
          <input
            v-model="formCreate.otchestvo"
            class="block w-full border-0 p-0  focus:outline-none  sm:text-sm"
          />
        </div>

        <div
          class="relative border-[1px]   rounded-md px-4 py-3  shadow-sm anime"
          :class="[
            formCreate.dataRozgdeniya.length !== 11
              ? 'border-[#343434]/70'
              : 'border-main'
          ]"
        >
          <label
            for=""
            class="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium anime"
            :class="[
              formCreate.dataRozgdeniya.length !== 11
                ? 'text-[#343434]/70'
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
            @click="formCreate.gender = 'female'"
            for="gender1"
            class="text-[14px] cursor-pointer w-1/2 p-4 flex justify-center items-center rounded-l-md"
            :class="[
              formCreate.gender !== 'female'
                ? 'border-[#343434]/30 border text-[#343434]/30'
                : 'text-[#343434] border border-main bg-main/10'
            ]"
            >М</span
          >

          <span
            @click="formCreate.gender = 'male'"
            for="gender2"
            class="text-[14px] cursor-pointer w-1/2 p-4 flex justify-center items-center rounded-r-md"
            :class="[
              formCreate.gender !== 'male'
                ? 'border-[#343434]/30 border text-[#343434]/30'
                : 'text-[#343434] border border-main bg-main/10'
            ]"
            >Ж</span
          >
        </div>

        <input-blue
          typeI="text"
          placeholderI="test"
          label="Паспорт (серия/номер)"
        />

        <div class="flex flex-col gap-1">
          <input-blue typeI="text" placeholderI="test" label="E-mail" />

          <div class="mt-1 flex flex-col gap-1 rounded-md shadow-sm">
            <span class="text-[12px] text-[#343434]/70"
              >На эту почту будут отправлены результаты анализов</span
            >
          </div>
        </div>
        <div class="flex flex-col gap-1">
          <input-blue-phone typeI="text" placeholderI="test" label="Телефон" />
          <div class="mt-1 flex flex-col gap-1 rounded-md shadow-sm">
            <span class="text-[12px] text-[#343434]/70"
              >Используйте в качестве логина для входа</span
            >
          </div>
        </div>
        <div class="flex flex-col gap-1">
          <input-blue typeI="text" placeholderI="test" label="Пароль" />

          <div class="mt-1 flex flex-col gap-1 rounded-md shadow-sm relative">
            <span class="text-[12px] text-[#343434]/70"
              >Пароль должен состоять из 8 и более символов</span
            >
          </div>
        </div>
        <div class="flex flex-col gap-1">
          <input-blue
            typeI="text"
            placeholderI="test"
            label="Повторите пароль"
          />
        </div>
      </div>
    </div>
    <button
      @click="RegisterUser()"
      :class="[
        formCreate.phone.length == 16 &&
        formCreate.password.length >= 8 &&
        formCreate.password == formCreate.ConfPassword &&
        formCreate.family.length > 1 &&
        formCreate.name.length > 1 &&
        formCreate.otchestvo.length > 1 &&
        formCreate.passportSeriya.length == 11
          ? ' cursor-pointer opacity-100 '
          : 'cursor-not-allowed opacity-30'
      ]"
      class="rounded-md border border-main h-[49px] mt-6 hover:bg-main  anime text-main hover:text-white w-full flex justify-center items-center py-2 text-[16px]"
    >
      Зарегистрироваться
    </button>
    <span class="" v-if="succesRegister == null">Введите данные</span>
    <span class="text-[green]" v-if="succesRegister == true">Успешно!</span>
    <span class="text-[#A75F4F]" v-if="succesRegister == false"
      >Попробуйте еще раз!</span
    >
  </div>
</template>

<script>
import InputBlue from '~/components/elements/inputBlue.vue'
import InputBluePhone from '~/components/elements/inputBluePhone.vue'
export default {
  components: {
    InputBlue,
    InputBluePhone
  },
  data () {
    return {
      formCreate: {
        family: '',
        name: '',
        otchestvo: '',
        passportSeriya: '',
        email: '',
        phone: '',
        password: '',
        ConfPassword: '',
        dataRozgdeniya: '',
        gender: 'male'
      },
      succes: '',
      succesRegister: null
    }
  }
}
</script>

<style></style>
