<template>
  <div
    class="bg-white shadow-md rounded-[5px] p-[20px] flex flex-col gap-[20px]"
  >
    <div class="grid grid-cols-3 items-center">
      <!-- {{ order_data }} -->
      <span class="text-main text-sm font-semibold col-span-1"
        >№ {{ order_data.attributes.UID }}
      </span>
      <div class="flex items-center gap-1 col-span-1">
        <img src="/img/icons/time.svg" alt="" />
        <span class="text-sm text-[#8B8B8B]">{{ getDate }}</span>
      </div>
    </div>
    <div class="grid grid-cols-3 grid-rows-1 gap-y-4">
      <div class="col-span-1 flex flex-col justify-center items-start gap-2">
        <span class="w-full  text-sm font-semibold">Результаты анализов</span>
        <button
        @click="$emit('DownloadResult')"
          v-if="order_data.attributes.Result.data.length"
          class="flex items-center gap-2 text-sm text-main uppercase"
        >
          Скачать ({{ order_data.attributes.Result.data.length }})
          <img src="/img/icons/download-results.svg" alt="" />
        </button>
        <button
          v-else
          class="flex items-center gap-2 text-xs text-main uppercase"
        >
          Нет готовых результатов
        </button>
      </div>
      <div class="col-span-1 flex flex-col justify-center items-start gap-2">
        <span class="w-full  text-sm font-semibold">Срок выполнения:</span>
        <div class="text-sm ">
          <span>{{ sortedDataDay }} </span>
          <span v-if="sortedDataDay >= 5 && sortedDataDay <= 20">дней</span>
          <span v-if="sortedDataDay >= 2 && sortedDataDay < 5">дня</span>
          <span v-if="sortedDataDay == 1 || sortedDataDay == 21">день</span>
          <span v-if="sortedDataDay >= 20 && sortedDataDay < 25">дня</span>
        </div>
      </div>
      <div class="col-span-1 w-full flex justify-end">
        <span
          v-if="
            order_data.attributes.Status == false &&
              order_data.attributes.StatusOplata !== true
          "
          class="text-sm text-white bg-[#5A5A5A] font-light px-[14px] py-[14px]  w-full max-w-[220px]  sm:flex sm:items-center sm:justify-center  border-[0.5px] border-main rounded-[5px]"
          >Обработка</span
        >
        <button
          @click="oplata()"
          v-else-if="
            order_data.attributes.StatusOplata == true &&
              order_data.attributes.Status == false
          "
          class="text-sm text-white bg-main hover:text-main hover:bg-white font-light px-[14px] py-[14px]  w-full max-w-[220px]  sm:flex sm:items-center sm:justify-center  border-[0.5px] border-main rounded-[5px]"
        >
          Оплатить
          {{ order_data.attributes.SummOrder.toLocaleString('ru-RU') }}
          ₽
        </button>
        <span
          v-else
          class="text-sm text-white bg-[#1EA750] font-light px-[14px] py-[14px]  w-full max-w-[220px]  sm:flex sm:items-center sm:justify-center  border-[0.5px] border-main rounded-[5px]"
          >Оплачен</span
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    order_data: Object,
    itemID: Number
  },
  data () {
    return {
      options: {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
      }
    }
  },
  methods: {
    openItemInfo () {
      this.$emit('openItemInfo')
    },
    oplata () {
      this.$emit('oplata')
    }
  },
  computed: {
    getDate () {
      return new Date(this.order_data.attributes.createdAt).toLocaleString(
        'ru',
        this.options
      )
    },
    sortedDataDay () {
      const days = this.order_data.attributes.analizies.data
      if (days !== null) {
        const dayValue = days.map(day => day.attributes.TimeDone)
        return Math.max.apply(null, dayValue)
      } else {
        return 1
      }
    }
  }
}
</script>

<style></style>
