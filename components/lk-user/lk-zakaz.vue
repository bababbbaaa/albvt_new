<template>
  <div
    class="bg-white shadow-md rounded-[5px] p-[20px] flex flex-col gap-[20px]"
  >
    <div class="flex justify-between items-center">
      <span class="text-main text-[14px] font-semibold"
        >№ {{ order_data.databaseId }}
      </span>
      <div class="flex items-end gap-1">
        <img src="/img/icons/time.svg" alt="" />
        <span class="text-[12px] text-[#8B8B8B]">{{
          order_data.date.substring(10, 0)
        }}</span>
      </div>
      <button
        @click="openItemInfo(order_data.databaseId)"
        class="flex items-center gap-1 text-[12px] font-semibold"
      >
        Подробнее
        <img
          v-if="order_data.databaseId !== itemID"
          src="/img/icons/arrow-right.svg"
          alt=""
        />
        <img v-else src="/img/icons/arrow-right.svg" alt="" class="rotate-90" />
      </button>
    </div>
    <div
      class="grid grid-cols-2 grid-rows-2 gap-y-4"
      v-if="order_data.databaseId == itemID"
    >
      <div class="col-span-1 flex flex-col justify-center items-center gap-2">
        <span class="w-full text-center text-[12px] font-semibold"
          >Результаты анализов</span
        >
        <button class="flex items-center gap-2 text-[12px] text-main uppercase">
          Скачать
          <img src="/img/icons/download-results.svg" alt="" />
        </button>
      </div>
      <div class="col-span-1 flex flex-col justify-center items-center gap-2">
        <span class="w-full text-center text-[12px] font-semibold"
          >Срок выполнения:</span
        >
        <div class="text-[12px] ">
          <span>{{ sortedDataDay }} </span>
          <span v-if="sortedDataDay >= 5 && sortedDataDay <= 20">дней</span>
          <span v-if="sortedDataDay >= 2 && sortedDataDay < 5">дня</span>
          <span v-if="sortedDataDay == 1 || sortedDataDay == 21">день</span>
        </div>
      </div>
      <div class="col-span-2 w-full">
        <button
          v-if="order_data.status == 'ON-HOLD'"
          class="text-[14px] cursor-default text-white bg-[#5A5A5A]  font-light py-[14px]  w-full  sm:flex sm:items-center sm:justify-center  border-[0.5px] border-main rounded-[5px]"
        >
          Обработка
        </button>
        <span
          v-else-if="order_data.status == 'CANCELLED'"
          class="text-[14px] cursor-default text-white bg-[#AB6757]  font-light py-[14px]  w-full  sm:flex sm:items-center sm:justify-center  border-[0.5px] border-main rounded-[5px]"
          >Отменен</span
        >

        <div
          v-else-if="order_data.status == 'COMPLETED'"
          class="text-[14px] text-center cursor-default text-white bg-[#1EA750]  font-light py-[14px]  w-full  sm:flex sm:items-center sm:justify-center  border-[0.5px] border-main rounded-[5px]"
          >Оплачен</div
        >
        <button
          v-else
          @click="oplata()"
          class="text-[14px] text-white bg-main hover:text-main hover:bg-white font-light px-[14px] py-[14px]  w-full  sm:flex sm:items-center sm:justify-center  border-[0.5px] border-main rounded-[5px]"
        >
          Оплатить
          {{
            parseInt(order_data.total.replace('₽', '')).toLocaleString('ru-RU')
          }}
          ₽
        </button>
      </div>
    </div>
  </div>
  <!-- <div>tut</div> -->
</template>

<script>
export default {
  props: {
    order_data: Object,
    itemID: Number
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
    sortedDataDay: function () {
      const days = this.order_data.lineItems.edges
      const dayValue = days.map(item =>
        parseInt(item.node.product.node.attributes.edges[0].node.options[0])
      )
      return Math.max.apply(null, dayValue)
    }
  }
}
</script>

<style></style>
