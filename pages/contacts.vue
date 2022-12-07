<template>
  <div class="container ">
    <div class="py-[47px] mt-[47px] sm:mt-0 flex flex-col w-full gap-12">
      <heading-h-3>Контакты</heading-h-3>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-[20px]">
        <div class="flex flex-col gap-2">
          <p class="font-bold">Наш адрес:</p>
          <br />
          <p>344022,  ул. Восточная, 11</p>
          <br />
          <div class="flex gap-2">
            <div class="flex flex-col gap-1">
              <p>Тел:</p>
              <p>E-mail:</p>
            </div>
            <div class="flex flex-col gap-1">
              <a :href="`tel:` + data.acf.tel.replace('(', '').replace(')', '').replaceAll('-', '')" class="text-main">
                {{data.acf.tel}}</a
              >
              <a :href="`email:` + data.acf.email" class="text-main">
                {{data.acf.email}}</a
              >
            </div>
          </div>

          <br />
          <p>Время и график работы:</p>
          <p>{{data.acf.vremya_i_grafik_raboty1}}</p>
          <p>{{data.acf.vremya_i_grafik_raboty2}}</p>
        </div>
        <div>
          <div class="flex flex-col gap-2">
            <p class="font-bold">Адреса медицинских офисов нашего партнера в г. Ростове-на-Дону:</p>
            <br />
            <p>–  ул. Станиславского, 54/11</p>
            <p>–  ул. Ленина, 44/6</p>
            <p>–  пр. Космонавтов, 6/13</p>
            <p>–  ул. 1-й Конной Армии, 29а</p>
            <p>–  ул. Зорге, 52</p>
            <p>–  ул. Таганрогская, 143</p>
            <p>–  ул. Текучева, 143</p>
            <p>–  пр. Стачки, 26</p>
            <p>–  пр. 40-летия Победы, 89</p>
            <p>–  пер. Днепровский, 105/98</p>
            <p>–  ул. Еременко, 97/29</p>
            <p>–  ул. Богданова, 79</p>
            <p>–  ул. Миронова, 10</p>
            <p>–  ул. Большая Садовая, 130/33</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeadingH3 from '~/components/HeadingH3.vue'
export default {
  components: { HeadingH3 },
  layout: 'MainLayout',
  async asyncData ({ $axios }) {
    let { data } = await $axios.get(
      'https://foxsis.ru/alvd/wp-json/wp/v2/pages/13926',
    )
    

    return { data }
  }
}
</script>

<style></style>
