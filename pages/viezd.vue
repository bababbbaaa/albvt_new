<template>
  <div class="container py flex flex-col gap-[20px] py-[47px]">
    <h1 class="text-[30px] font-medium">Выезд на дом</h1>

    <div class="grid grid-col-1 sm:grid-cols-[8fr,4fr] gap-[40px]  items-start">
      <div class="flex flex-col">
        <div
          class="grid grid-col-1 sm:grid-cols-[1fr,40px,1fr,40px,1fr] items-center mb-[47px] gap-[20px] sm:gap-0"
        >
          <div
            class="flex flex-col gap-2 bg-white shadow-md justify-center items-center w-full py-4"
          >
            <span class="text-[30px] text-main">1</span>
            <span>
              {{ dataViezd.acf.step_1 }}
            </span>
          </div>
          <span class="w-full h-[2px] bg-main hidden sm:block"></span>
          <div
            class="flex flex-col gap-2 bg-white shadow-md justify-center items-center w-full py-4"
          >
            <span class="text-[30px] text-main">2</span>
            <span>{{ dataViezd.acf.step_2 }}</span>
          </div>
          <span class="w-full h-[2px] bg-main hidden sm:block"></span>
          <div
            class="flex flex-col gap-2 bg-white shadow-md justify-center items-center w-full py-4"
          >
            <span class="text-[30px] text-main">3</span>
            <span>{{ dataViezd.acf.step_3 }}</span>
          </div>
        </div>
        <span class="test-[18px] py-2">Вопрос-ответ</span>
        <accordion title="Стоимость услуги и способ оплаты"
          ><p>
            - выезд медсестры к Вам по г. Ростову-н/Д – 0 руб. (при заказе услуг
            от 1500 руб.)<br /><br />
            - выезд медсестры к Вам по г. Ростову-н/Д – 400 руб. (при заказе
            услуг менее 1500 руб.)<br /><br />
            - забор крови – 150 руб.<br /><br />

            - оплата услуги – на нашем сайте через online заявку
          </p>
        </accordion>
        <accordion title="График работы выездной работы"
          >- время приёма заявок для выезда медсестры: пн – вскр 07:00 -
          18:00<br /><br />
          - время выезда медсестры к Вам: 07:00 - 11:00 (на следующий рабочий
          день после подачи заявки на выезд)
        </accordion>
        <accordion title="Какие исследования нельзя сдать на дому?">
          - глюкозотолерантный тест,<br /><br />
          - взятие урогенитальных мазков и соскобов,<br /><br />
          - приём биоматериала на спермограмму,<br /><br />
          - взятие секрета предстательной железы,<br /><br />
          - взятие биоматериала на демодекоз,<br /><br />
          - взятие мазков из раны или соскоб кожи,<br /><br />
          - пункции, биопсии и другие хирургические манипуляции.<br /><br />
          - Взятие на исследование волос и ногтей*<br /><br /><br />
          * Биоматериал (волосы и ногти) пациент собирает сам и доставляет в
          медицинский офис.</accordion
        >
        <accordion
          title="К какой группе лиц не осуществляется выезд медсестры на дом?"
          >- пациенты, имеющие склонность к кровотечениям (с нарушением
          процессов свёртывающей системы)<br /><br />
          - пациенты, имеющие тяжелую форму сердечно-лёгочной
          недостаточности,<br /><br />
          - пациенты с официально поставленным диагнозом «COVID-19»</accordion
        >
        <accordion
          title="Время прибытия медсестры? Не хочу весь день ожидать её."
          ><p>
            - Вы можете выбрать желаемый временной интервал прибытия
            медработника в заявке на сайте или сообщите оператору. <br /><br />
            - После согласования медработник приедет к Вам в 3-х часовой
            интервал. <br /><br />
            - Перед выездом к Вам медсестра прозванивает и предупреждает о своём
            скором прибытии.
          </p>

          <br />
        </accordion>
        <accordion
          title="Как можно оставить заявку на выезд медсестры? В какое время это лучше сделать?"
          ><p>
            - оставить online заявку для выезда к Вам медсестры и оплатить её
            можно через наш сайт.<br /><br />

            - приём заявок для выезда к Вам осуществляется с 7:00 – 18:00 только
            через online заявку.<br /><br />

            Обращаем Ваше внимание, что выезд медсестры к Вам осуществляется
            только после предварительной оплаты заявки через наш сайт в разделе
            online заявка.<br /><br />

            В этом случае медицинская сестра приедет к Вам на следующий день в
            согласованный 2-х часовой интервал.
          </p>
        </accordion>
        <accordion
          title="Уже оплатили online заявку, но забыли внести важный анализ?"
          ><p>
            Вы всегда можете оставить ещё одну онлайн заявку. И этот анализ
            будет включён в общий список ваших исследований, который вы оплатили
            ранее.<br />
            И даже, если медсестра уже у Вас дома, вы можете дозаказть нужное
            Вам исследование, предварительно оплатив его через online заявку.
          </p></accordion
        >
        <accordion title="Как получить результаты анализов?"
          ><p>
            По электронной почте: мы присылаем результаты анализов на тот
            e-mail, который был указан при оформлении заказа.<br />
            В отделении: бумажный вариант результата анализов можно получить у
            нас в медцентре, предъявив смету с номером заказа.
          </p></accordion
        >
      </div>

      <div
        class="bg-white  shadow-md rounded-[5px] p-[24px] flex flex-col gap-[20px]"
      >
        <span>
          <span class="text-main">{{ dataViezd.acf.blok_sinim }}</span>
          {{ dataViezd.acf.blok_sprava }}
        </span>
        <nuxt-link
          v-if="CART.length >= 1"
          to="/cart"
          class="flex w-full justify-center items-center border  border-main rounded-[5px] py-2 text-main  hover:bg-main hover:text-white anime h-[40px] px-[8px] text-[14px]"
        >
          Подать online заявку
        </nuxt-link>
        <nuxt-link
          to="/all-analyzes/gematologicheskie-issledovaniya/2849"
          v-if="CART.length == 0"
          class="flex w-full justify-center items-center border  border-main rounded-[5px] py-2 text-main  hover:bg-main hover:text-white anime h-[40px] px-[8px] text-[14px]"
        >
          Перейти в анализы
        </nuxt-link>
        <span
          v-if="CART.length == 0"
          class="w-full text-center  text-[12px] sm:text-[14px] text-[#343434]/50"
          >Ваша корзина пуста</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import accordion from '~/components/tabs/accordion.vue'
import { mapGetters } from 'vuex'
export default {
  components: { accordion },
  layout: 'MainLayout',
  data () {
    return {
      form: {
        year: '',
        checkedNames: []
      }
    }
  },
  methods: {
    onlineZakaz () {}
  },
  computed: {
    ...mapGetters(['CART'])
  },
  async asyncData({ $axios }) {
  const dataViezd = await $axios.$get('https://foxsis.ru/alvd/wp-json/wp/v2/pages/13922?_fields=acf')
  return { dataViezd }
}
}
</script>

<style></style>
