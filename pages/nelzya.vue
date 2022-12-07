<template>
  <div class="container flex flex-col gap-[20px] py-[47px] mt-[47px] sm:mt-0">
      <heading-h-3>Какие исследования нельзя сдать на дому?</heading-h-3>
        <ul class="list-disc list-outside pl-4 pt-4 text-[14px] font-light flex flex-col gap-2">
            <li>глюкозотолерантный тест, (ГТТ, ГТГС, ГТБ-С)</li>
            <li>взятие урогенитальных мазков и соскобов</li>
            <li>приём биоматериала на спермограмму</li>
            <li>взятие секрета предстательной железы</li>
            <li>взятие биоматериала на демодекоз</li>
            <li>взятие мазков из раны или соскоб кожи</li>
            <li>пункции, биопсии и другие хирургические манипуляции</li>
            <li>Взятие на исследование волос и ногтей*</li>
        </ul>
        <span class="text-[14px] text-danger">* Биоматериал (волосы и ногти) пациент собирает сам и доставляет в медицинский офис.</span>


  </div>
</template>

<script>
import HeadingH3 from '~/components/HeadingH3.vue'
export default {
  components: { HeadingH3 },
    layout: 'MainLayout'
}
</script>

<style>

</style>