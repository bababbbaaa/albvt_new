<template>
  <div class="bg-[#F9F9F9] min-h-screen">
    <div class="pt-[47px] container grid grid-cols-1 gap-8">
      <div class="w-full py-8 text-center  font-medium">
        ЗАПРОС НА ВЫВОД СРЕДСТВ
      </div>
      <div
        class="flex justify-center items-center p-8 border-2 border-[#343434]/10"
      >
        <span class="text-center text-sm font-medium"
          >Вывод средств будет осуществлён в течение 2-х рабочих дней по номеру
          телефона, указанному при Вашей регистрации.</span
        >
      </div>
      <div class="w-full flex items-center justify-between">
        <span>Всего доступно:</span>
        <span v-if="checkZapros == false">{{ data.summ }} ₽</span>
        <span v-else>0 ₽</span>
      </div>
      <button
        v-if="checkZapros == false"
        @click="createZapros"
        class="w-full flex justify-center items-center py-3 text-white bg-main rounded-md"
      >
        Отправить запрос на вывод
      </button>

      <span
        v-if="checkZapros"
        class="w-full flex flex-col justify-center items-center text-center"
        ><img src="~/assets/icons/333331.png" alt="" /> Ваш запрос №
        {{ zaprosId }} принят. Ожидайте перевода.</span
      >

      <nuxt-link to="/doctor" class="text-center w-full "
        >ВЕРНУТЬСЯ К НАЧАЛЬНОЙ СТРАНИЦЕ</nuxt-link
      >
      <button
        @click="$router.back()"
        class=" flex  justify-start items-center gap-1"
      >
        <img src="~/assets/icons/arrow-back.svg" alt="" />
        Назад
      </button>
    </div>
  </div>
</template>

<script>
import CREATE_ZAPROS from '~/graphql/doctor/create-zapros.gql'
import UPDATE_ZAPROS_ID from '~/graphql/doctor/UPDATE_ZAPROS_ID.gql'

export default {
  layout: 'Doctor',
  data () {
    return {
      data: '',
      checkZapros: false,
      zaprosId: ''
    }
  },
  methods: {
    createZapros () {
      const zakaz2 = []

      this.data.zakaz.forEach(x => {
        Object.values(x)
        zakaz2.push(Number(x))
      })
      const summZapros = Number(this.data.summ)
      const UID = Math.floor(Math.random() * 1000)
      const UID2 = Math.floor(Math.random() * 1000)
      const UID3 = (this.data.doctor + '-' + UID + '-' + UID2).toString()
      this.$apollo
        .mutate({
          mutation: CREATE_ZAPROS,
          variables: {
            SUMM: summZapros,
            UID: UID3,
            DOCTOR_ID: this.data.doctor,
            ZAKAZIES: zakaz2
          }
        })
        .then(data => {
          this.checkZapros = true
          this.zaprosId = data.data.createZaprosyVrachej.data.attributes.UID
          this.$router.replace({ query: null })
          this.handlerStatusZapros()
        })
        .catch(error => {
          console.error(error)
        })
      
    },
    handlerStatusZapros () {
      const Zaprosies = []
      this.data.zakaz.forEach(x => {
        Object.values(x)
        Zaprosies.push(Number(x))
      })

      Zaprosies.forEach(x => {
        this.$apollo
          .mutate({
            mutation: UPDATE_ZAPROS_ID,
            variables: {
              ID: x
            }
          })
          .then(data => {
            console.log('handlerStatusZapros ok' ,data)
          })
          .catch(error => {
            console.error(error)
          })
      })
    }
  },
  mounted () {
    this.data = this.$route.query
  }
}
</script>

<style></style>
