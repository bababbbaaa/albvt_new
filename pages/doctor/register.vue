<template>
  <div class=" bg-[#fcfcfc]">
    <div
      class="container pt-[47px] mt-[47px] sm:mt-0 w-full max-w-[620px] h-full min-h-screen flex flex-col justify-center items-center"
    >
      <span>Заполните данные</span>

      <form
        method="POST"
        @submit.prevent="handleLoginSubmit"
        class="grid grid-cols-2 gap-4 my-12"
      >
        <div class="relative rounded-md shadow-sm anime w-full">
          <label for="" class="label-new">Врачебная специальность*</label>
          <input class="input-new" type="text" />
        </div>
        <div class="relative rounded-md shadow-sm anime w-full">
          <label for="" class="label-new">Место работы врача*</label>
          <input class="input-new" type="text" />
        </div>
        <div class="relative rounded-md shadow-sm anime">
          <label for="" class="label-new">Фамилия*</label>
          <input
            v-validate="'required|fio'"
            v-model.trim="dataDoctor.Family"
            type="text"
            name="fio"
            class="input-new px-4 py-3"
          />
          <span class="text-xs max-w-[200px]">{{ errors.first('fio') }}</span>
        </div>
        <div class="relative rounded-md shadow-sm anime">
          <label for="" class="label-new">Имя*</label>
          <input
            v-validate="'required|name'"
            v-model.trim="dataDoctor.Name"
            type="text"
            name="name"
            class="input-new px-4 py-3"
          />
          <span class="text-xs max-w-[200px]">{{ errors.first('name') }}</span>
        </div>
        <div class="relative rounded-md shadow-sm anime">
          <label for="" class="label-new">Отчество</label>
          <input
            v-validate="'required|otchestvo'"
            v-model.trim="dataDoctor.Otchestvo"
            type="text"
            class="input-new px-4 py-3"
            name="otchestvo"
          />
          <span class="text-xs max-w-[200px]">{{
            errors.first('otchestvo')
          }}</span>
        </div>
        <div class="relative rounded-md shadow-sm anime">
          <label for="" class="label-new">Дата рождения*</label>
          <input
            placeholder="__.__.____*"
            v-facade="'##.##.####'"
            v-model.trim="dataDoctor.DataRozgdeniya"
            type="text"
            class="input-new px-4 py-3"
          />
        </div>
        <div class="relative rounded-md shadow-sm anime flex flex-col gap-2">
          <label for="" class="label-new">E-mail*</label>
          <input
            v-validate="'required|email'"
            name="email"
            type="text"
            class="input-new px-4 py-3"
            v-model.trim="dataDoctor.email"
          />
          <span class="text-xs max-w-[200px]">{{ errors.first('email') }}</span>
        </div>
        <div class="relative rounded-md shadow-sm anime">
          <label for="" class="label-new">Телефон*</label>
          <input
            v-model.trim="dataDoctor.Phone"
            placeholder="+7(___)___−__−__*"
            v-facade="'+7(###)###-##-##'"
            type="text"
            class="input-new px-4 py-3"
          />
        </div>
        <div class="relative rounded-md shadow-sm anime">
          <label for="" class="label-new">Пароль</label>
          <input
            v-model.trim="dataDoctor.password"
            type="text"
            class="input-new px-4 py-3"
          />
          <span class="text-xs">Минимум 8 символов</span>
        </div>
        <div class="relative rounded-md shadow-sm anime">
          <label for="" class="label-new">Повторите пароль</label>
          <input
            v-model.trim="dataDoctor.changePassword"
            type="text"
            class="input-new px-4 py-3"
          />
          <span class="text-xs">Повторите пароль</span>
        </div>

        <button
          type="submit"
          class="w-full bg-main text-white rounded-md py-3"
          :disabled="formBusy"
        >
          <span v-if="formBusy" small class="mr-2" /> Зарегистрироваться
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'MainLayout',
  data () {
    return {
      form: {
        identifier: 'vrach9@test.ru',
        password: '123123123'
      },
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
        changePassword: ''
      },
      formBusy: false
    }
  },
  methods: {
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
    createDoctor () {
      console.log('отлично')
    }
  },
  mounted () {
    const dict = {
      custom: {
        email: {
          required: 'Обязательное поле'
        },
        fio: {
          required: 'Обязательное поле'
        },
        name: {
          required: 'Обязательное поле'
        },
        otchestvo: {
          required: 'Обязательное поле'
        }
      }
    }
    // or use the instance method
    this.$validator.localize('ru', dict)
  }
}
</script>

<style></style>
