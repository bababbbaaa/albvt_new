<template>
  <div class="bg-[#F9F9F9]">
    <div class="pt-[47px] mt-[47px] container grid grid-cols-1 gap-8">
      <div class="w-full py-12 text-center  font-medium">
        ЗАПРОС НА ВЫВОД СРЕДСТВ
      </div>
      <div
        class="flex justify-center items-center p-8 border-2 border-[#343434]/30"
      >
        <span class="text-center"
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
      <span v-if="checkZapros"
        >Ваш запрос #{{ zaprosId }} принят. Ожидайте перевода.</span
      >
    </div>
  </div>
</template>

<script>
import CREATE_ZAPROS from '~/graphql/doctor/create-zapros.gql'

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

      const UID = Math.floor(Math.random() * 1000)
      const UID2 = Math.floor(Math.random() * 1000)
      const UID3 = (this.data.doctor + '-' + UID + '-' + UID2).toString()
      this.$apollo
        .mutate({
          mutation: CREATE_ZAPROS,
          variables: {
            SUMM: this.data.summ,
            UID: UID3,
            DOCTOR_ID: this.data.doctor,
            ZAKAZIES: zakaz2
          }
        })
        .then(data => {
          this.checkZapros = true
          this.zaprosId = data.data.createZaprosyVrachej.data.id
          this.$router.replace({'query': null});
        })
        .catch(error => {
          console.error(error)
        })
    }
  },
  mounted () {
    this.data = this.$route.query
  }
}
</script>

<style></style>
