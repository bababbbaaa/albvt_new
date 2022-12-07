<template>
  <div
    class="container flex flex-col pt-[47px] my-[47px] sm:my-0 gap-10 justify-center items-center h-full"
  >
    <heading-h-3>Поиск по результатам</heading-h-3>
    <label class="relative block w-full sm:w-1/2 ">
      <span class="sr-only">Search</span>
      <span
        class="absolute inset-y-0 right-0 flex items-center pr-[16px] z-[99]"
      >
        <img
          src="/img/icons/search.svg"
          alt=""
          class="block w-full h-auto hover:scale-110 anime"
        />
      </span>
      <input
        @input="DownloadResult()"
        type="text"
        v-model="resultInput"
        id="default-search2"
        class="block w-full pr-20 rounded-[5px] text-center   pl-4 border-[2px] border-[#343434]/20   h-[60px] focus:outline-none text-[#979797]"
        placeholder="Введите номер заказа"
        autocomplete="off"
      />
    </label>
     <span v-if="pdf.length == 0 && errors !== 2 && resultInput.length === 5"
        >Заказ не готов, попробуйте позже</span
      >
      <span v-if="errors == 2 && pdf.length == 0">Заказ не найден, проверьте правильность введенных данных</span>
      <span v-if="resultInput.length !== 5 && errors !== 2"
        >Введите 5 цифр полученных при оформлении заказа</span
      >
    <div class="flex flex-col gap-4">
      <div
        v-for="(item, i) in pdf"
        :key="i"
        class="bg-white p-4 rounded-[5px] shadow-md"
      >
        <a
          :href="item.guid.rendered"
          target="_blank"
          class="underline underline-offset-2"
          >Скачать результаты-{{ item.slug.substr(0, 5) }}-{{ i + 1 }}</a
        >
      </div>
    </div>
    <!-- предупреждения -->
    
     
    
    

    <!-- результаты -->
  </div>
</template>

<script>
import HeadingH3 from '~/components/HeadingH3.vue'
export default {
  components: { HeadingH3 },
  data () {
    return {
      resultInput: '',
      pdf: [],
      error: '',
      orderReally: [],
      errors: null
    }
  },
  layout: 'MainLayout',
  methods: {
    async DownloadResult () {
      if (this.resultInput.length == 5) {
        const requestSearh = this.resultInput
        const url =
          'https://foxsis.ru/alvd/wp-json/wp/v2/media?search=' + requestSearh
        const pdf = await this.$axios.$get(url)
        this.DownloadOrder()
        this.pdf = pdf
      }
      //
    },
    DownloadOrder () {
      const requestSearh = this.resultInput
      this.$axios
        .get('https://foxsis.ru/alvd/wp-json/wc/v3/orders/' + requestSearh)
        .then(({ response }) => {
              this.alertResponse (1)  
        })
        .catch(({ response }) => {
          console.log(response)
          if (response.status == 404) {
              this.alertResponse (2)

              
          } 
          
           
        })
    },
    alertResponse (id) {
      this.errors = id
    }
  }
}
</script>

<style></style>
