<template>
  <div
    class="container py-[47px] mt-[47px] flex justify-center flex-col items-center gap-[20px]"
  >
  <div class="flex flex-col gap-4 justify-center items-center">
    <span class="text-center">Ваш заказ № <span class="text-main text-[20px]">{{id}}</span>  в обработке.</span>
    <span class="text-center">Наш менеджер свяжется с Вами в течение 15 минут.</span>
     </div>
    
    <div class="flex gap-[20px]">
      <nuxt-link to="/my-account" class="underline">В личный кабинет</nuxt-link>
      <nuxt-link to="/" class="underline">На главную</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'MainLayout',
  data () {
    return {
      id: ''
    }
  },
  methods: {
    CurentInOrder () {
      this.id = this.$route.query.id
    }
  },
  created () {
    this.CurentInOrder()
  }
}
</script>

<style></style>
