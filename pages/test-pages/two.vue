<template>
<!-- формы -->
  <div class="container py flex flex-col gap-[20px] py-[47px]">
    <h1 class="text-[30px] font-medium">Справка для предоставления в ИФНС</h1>

    <div class="grid grid-cols-1 sm:grid-cols-[8fr,4fr] gap-[40px] items-start">
      <div class="flex flex-col">
        <span class="test-[18px] py-2">Вопрос-ответ</span>
        <accordion
          title="Как заказать справку и копию лицензии для предоставления в ИФНС России?"
          ><p>
            Справку для оформления налогового вычета Вы можете получить при
            личном обращении в медицинский центр АЛЬБА ВИТА. Для этого Вам нужно
            предоставить:
          </p>
          <ul class="list-disc list-outside pl-4 pt-4  flex flex-col gap-2">
            <li>
              Лекарства (влияние лекарственных препаратов на результат
              лабраторных тестов разнаплановое и не всегда предсказуемое).
            </li>
            <li>
              Приём пищи (возможно как прямое влияние за счет всасывания
              компонентов пищии, так и косвенное - сдвиги уровня гормонов в
              ответ на приём пищи, мутность пробы, связанная с повышенным
              содержанием жировых частиц).
            </li>
          </ul>
          <br />
          <p>
            Справка для оформления налогового вычета будет готова через 1 (один)
            рабочий день от даты последней сдачи анализов, чтобы последняя
            оплаченная сумма тоже была включена в справку. Справка оформляется
            не более чем за 3 года, предшествующих обращению.
          </p></accordion
        >
        <accordion
          title="В какие сроки можно получить справку для  налогового вычета?"
          >Справка для оформления налогового вычета будет готова через 1 (один)
          рабочий день от даты последней сдачи анализов.
        </accordion>
        <accordion
          title="Можно ли получить справку для налоговой и копию лицензии, если утерян чек?"
          >Да, можно. Для получения данной справки чек не требуется. Нужно знать
          свой ИНН и номер вашего Договора.</accordion
        >
        <accordion
          title="Как получить справку в ИФНС, если сдавал анализы более 3-х лет назад."
          >Справка в ИФНС оформляется не более чем за 3 года, предшествующих
          обращению. Справку можно получить при личном визите в медицинский
          офис. При оформлении справки в медицинском офисе необходимо
          предоставить ИНН налогоплательщика (знать номер или принести копию
          самого свидетельства) и номер Вашего Договора.</accordion
        >
        <accordion
          title="В каком случае можно получить справку для налогового вычета за платные медицинские услуги?"
          ><p>
            Социальный налоговый вычет по расходам на лечение и (или)
            приобретение медикаментов предоставляется налогоплательщику,
            оплатившему за счет собственных средств:
          </p>
          <ul class="list-disc list-outside pl-4 pt-4  flex flex-col gap-2">
            <li>
              Услуги по своему лечению;
            </li>
            <li>
              Услуги по лечению супруга (супруги), своих родителей и (или) своих
              детей в возрасте до 18 лет.
            </li>
          </ul>
          <br />
          <p>
            Порядок предоставления социального налогового вычета по расходам на
            лечение и приобретение медикаментов определен п.3 ст. 219 НК РФ.
            Перечни медицинских услуг и медикаментов, при оплате которых
            предоставляется вычет, утверждены Постановлением Правительства РФ от
            19.03.2001 № 201.
          </p></accordion
        >
        <accordion
          title="Какие документы нужно предоставить в налоговую инспекцию для получения социального вычета?"
          ><p>
            Для получения социального вычета Вам потребуется предъявить в ИФНС
            России:
          </p>
          <ul class="list-disc list-outside pl-4 pt-4  flex flex-col gap-2">
            <li>
              Справку о получении платных медицинских услуг (можно получить при
              личном визите в медицинский офис и копию Лицензии.
            </li>
            <li>
              Необходимо заполнить налоговую декларацию (по форме 3-НДФЛ) по
              окончании года, в котором была произведена оплата медицинских
              услуг
            </li>
            <li>
              Получить справку из бухгалтерии по месту работы о суммах
              начисленных и удержанных налогов за соответствующий год по форме
              2-НДФЛ
            </li>
            <li>
              Подготовить копии документов, подтверждающих степень родства с
              лицом, за которое были оплачены медицинские услуги. Если утеряны
              чеки, то пациент не теряет право на получение налогового вычета.
            </li>
            <li>
              В комплект документов, подтверждающих право на получение
              социального налогового вычета по расходам на медицинские услуги,
              необходимо приложить Договор на оказание платных медицинских
              услуг, Приложение к Договору не требуется.
            </li>
          </ul>
          <br />
          <p>
            Порядок предоставления социального налогового вычета по расходам на
            лечение и приобретение медикаментов определен п.3 ст. 219 НК РФ.
            Перечни медицинских услуг и медикаментов, при оплате которых
            предоставляется вычет, утверждены Постановлением Правительства РФ от
            19.03.2001 № 201.
          </p></accordion
        >
        <accordion
          title="Можно ли оставить online заявку для получения справки по налоговому вычету?"
          ><p>
            Да, можно.
          </p></accordion
        >
      </div>

      <div
        class="bg-white  shadow-md rounded-[5px] p-[24px] flex flex-col gap-[20px]"
      >
        <form @submit.prevent="getFNS()" class="flex flex-col gap-4">
          <span class="text-[15px] font-medium"
            >Оставить заявку для получения справки в ИФНС</span
          >
          <div class="flex flex-col">
            <div
              class="border-b-[1px] border-[#AEAEAE] py-[14px] flex flex-col gap-2 text-[15px] font-light"
            >
              <span class="text-[#A55B4A] text-[15px] "
                >Кто будет получать налоговый вычет?</span
              >
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-[10px]">
               <div class="flex flex-col gap-1">
                  <label for="company-website" class="block text-[12px]">
                    Фамилия
                  </label>
                  <div class="mt-1 flex rounded-[5px] shadow-sm">
                    <input
                      required
                      type="text"
                      v-model="formZakaz.family"
                      :class="[
                        formZakaz.family.length < 2
                          ? ' !focus:outline-[#A55B4A] !border-[#A55B4A]'
                          : '!border-[green] !focus:outline-[green]'
                      ]"
                      class=" input-med "
                    />
                  </div>
                </div>
                <div class="flex flex-col gap-1">
                  <label for="company-website" class="block text-[12px]">
                    Имя
                  </label>
                  <div class="mt-1 flex rounded-[5px] shadow-sm">
                    <input
                      required
                      type="text"
                      v-model="formZakaz.name"
                      :class="[
                        formZakaz.name.length < 1
                          ? ' !focus:outline-[#A55B4A] !border-[#A55B4A]'
                          : '!border-[green] !focus:outline-[green]'
                      ]"
                      class=" input-med "
                    />
                  </div>
                </div>
                <div class="flex flex-col gap-1">
                  <label for="company-website" class="block text-[12px]">
                    Отчество
                  </label>
                  <div class="mt-1 flex rounded-[5px] shadow-sm">
                    <input
                      required
                      type="text"
                      v-model="formZakaz.otchestvo"
                      :class="[
                        formZakaz.otchestvo.length < 2
                          ? ' !focus:outline-[#A55B4A] !border-[#A55B4A]'
                          : '!border-[green] !focus:outline-[green]'
                      ]"
                      class=" input-med "
                    />
                  </div>
                </div>
                <div class="flex flex-col gap-1">
                  <label for="company-website" class="block text-[12px]">
                    ИНН
                  </label>
                  <div class="mt-1 flex rounded-[5px] shadow-sm">
                    <input
                      required
                      type="text"
                      v-facade="'##########'"
                      placeholder="__________"
                      v-model="formZakaz.inn"
                      :class="[
                        formZakaz.inn.length !== 10
                          ? ' !focus:outline-[#A55B4A] !border-[#A55B4A]'
                          : '!border-[green] !focus:outline-[green]'
                      ]"
                      class=" input-med "
                    />
                  </div>
                </div>
              </div>
              <div>
                
              </div>
            </div>

            <div
              class="border-b-[1px] border-[#AEAEAE] py-[14px] flex flex-col gap-2 text-[15px] font-light"
            >
              <span class="text-[#A55B4A] text-[15px] "
                >Кто получал медицинские услуги ?</span
              >
              <div class="flex gap-2">
                <input
                  type="radio"
                  value="Я сам"
                  v-model="form.year"
                  class=""
                />
                <label for="Я сам">Я сам</label>

                <input
                  type="radio"
                  value="Другой человек"
                  v-model="form.year"
                  class=""
                />
                <label for="Другой человек">Другой человек</label>
              </div>
            </div>
            <div
              class="border-b-[1px] border-[#AEAEAE] py-[14px] flex flex-col gap-2 text-[15px] font-light"
            >
              <span class="text-[#A55B4A] text-[15px] ">Период вычета</span>
              <div class="flex gap-3 ">
                <input
                  type="checkbox"
                  id="2022"
                  value="2022 год"
                  v-model="form.checkedNames"
                />
                <label for="2022">2022 год</label>
                <input
                  type="checkbox"
                  id="2021"
                  value="2021 год"
                  v-model="form.checkedNames"
                />
                <label for="2021">2021 год</label>
                <input
                  type="checkbox"
                  id="2020"
                  value="2020 год"
                  v-model="form.checkedNames"
                />
                <label for="2020">2020 год</label>
              </div>
            </div>
            <div
              class="border-b-[1px] border-[#AEAEAE] py-[14px] flex flex-col gap-2 text-[15px] font-light"
            >
              <span class="text-[#A55B4A] text-[15px] "
                >Контакты для связи с Вами</span
              >
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-[10px]">
                <div class="flex flex-col gap-1">
                  <label for="company-website" class="block text-[12px]">
                    Email
                  </label>
                  <div class="mt-1 flex rounded-[5px] shadow-sm">
                    <input
                      required
                      type="text"
                      v-model="formZakaz.email"
                      :class="[
                        this.formZakaz.email.length < 4
                          ? ' !focus:outline-[#A55B4A] !border-[#A55B4A]'
                          : '!border-[green] !focus:outline-[green]'
                      ]"
                      class=" input-med "
                    />
                  </div>
                </div>
                <div class="flex flex-col gap-1">
                  <label for="company-website" class="block text-[12px]">
                    Телефон
                  </label>
                  <div class="mt-1 flex rounded-[5px] shadow-sm">
                    <input
                      required
                      type="text"
                      v-facade="'+7(###)###-##-##'"
                      placeholder="+7(___)___−__−__"
                      v-model="formZakaz.phone"
                      :class="[
                        this.formZakaz.phone.length !== 16
                          ? ' !focus:outline-[#A55B4A] !border-[#A55B4A]'
                          : '!border-[green] !focus:outline-[green]'
                      ]"
                      class=" input-med "
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
        
        <button
        type="submit"
        @click="getFNS()"
          class="flex w-full justify-center items-center border  border-main rounded-[5px] py-2 text-main  hover:bg-main hover:text-white anime h-[40px] px-[8px] text-[14px]"
        >
          Отправить заявку
        </button>
        <span v-if="status.length" class="">{{ status }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import accordion from '~/components/tabs/accordion.vue'
export default {
  components: { accordion },
  layout: 'MainLayout',
  data () {
    return {
      
      form: {
        year: 'Я сам',
        checkedNames: []
      },
      formZakaz: {
        name: '',
        family: '',
        inn: '',
        otchestvo: '',
        email: '',
        phone: ''
      },
      test : '',
      status: ''
    }
  },
  methods: {
    getFNS(){
      const period = this.form.checkedNames.map( (item) => item ).toString()
      const emailBody = {
        'text-fio':    this.formZakaz.family + ' ' + this.formZakaz.name + ' ' + this.formZakaz.otchestvo,
        'text-inn':    this.formZakaz.inn,
        'text-kto':    this.form.year,
        'text-period': period,
        'email-438':   this.formZakaz.email,
        'text-phone':  this.formZakaz.phone
      }

      const form = new FormData()
      for (const field in emailBody) {
        form.append(field, emailBody[field])
      }

      this.$axios
        .$post(
          'https://foxsis.ru/alvd/wp-json/contact-form-7/v1/contact-forms/11895/feedback', 
          form
        )
        .then(response => {
          console.log(response.message)
          this.status = response.message
          this.errors = ''
        })
        .catch(error => {
          this.status = error.message
        })
    }
  }
}
</script>

<style></style>
