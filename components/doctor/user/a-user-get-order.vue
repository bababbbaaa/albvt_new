<template>
  <div
    class="p-2 rounded-md bg-white drop-shadow-sm border-[1px] border-[#E5E8F1]"
  >
    <div class="flex justify-between items-start">
      <div class="flex flex-col gap-1">
        <span class="font-bold text-base"
          >№ {{ data_order.attributes.UID }}</span
        >
        <span class=" text-xs text-tem/50">{{ getDate }}</span>
      </div>
      <div class="flex flex-col gap-1 items-end">
        <span class="font-bold text-base text-main"
          >{{ data_order.attributes.SummOrder.toLocaleString('ru-RU') }}₽</span
        >
        <!-- <span class="text-right text-xs text-tem/50"
          >{{ $auth.user.Stavka }}%</span
        > -->
        <span
          class=" text-xs text-[#2CC746]"
          v-if="data_order.attributes.Status == true"
          >Оплачен</span
        >
        <span
          class=" text-xs text-[#E72A2A]"
          v-else-if="data_order.attributes.Status == false"
          >Не оплачен</span
        >
      </div>
    </div>
    <div class="flex flex-col gap-2 mt-2">
      <div class="flex justify-between items-start">
        <button
          @click="$emit('openOrderResult')"
          class="bg-main text-white flex gap-2 px-4 py-3 rounded-md text-sm"
        >
          <div>
            <span v-if="activeResult == data_order.id">Скрыть</span>
            <span v-else>Результаты</span>
          </div>
        </button>
        <nuxt-link
          :to="'/doctor/pacient/order/' + data_order.id"
          class="bg-[#343434]/10 text-[#343434] px-4 py-3 rounded-md text-sm"
        >
          <span>Состав заказа</span>
        </nuxt-link>
      </div>

      <div
        class="w-full flex flex-col gap-2"
        v-if="activeResult == data_order.id"
      >
        <div
          v-if="data_order.attributes.Result.data"
          class="flex flex-col gap-2 mt-4"
        >
          <button
            v-for="result in data_order.attributes.Result.data"
            :key="result.id"
            class="flex gap-2 items center"
          >
            <img src="~/assets/icons/pdf.svg" class="w-[20px] h-auto" />
            <a
              :href="'https://api.albvt.ru' + result.attributes.url"
              download
              target="_blank"
              class="underline underline-offset-2"
              >Скачать</a
            >
          </button>
        </div>
      </div>
      <div
        class="w-full flex flex-col gap-2"
        v-if="activeAnalizes == data_order.id"
      >
        <div
          class="grid grid-cols-[4fr,1fr] gap-1 w-full text-sm font-semibold mt-4"
        >
          <span>Наименование</span>
          <span class="text-right w-full">Цена</span>
        </div>
        <div class="w-full flex flex-col gap-2 divide-y divide-[#343434]/30">
          <div
            v-for="item in data_order.attributes.analizies.data"
            :key="item.id"
            class="grid grid-cols-[4fr,1fr] gap-1 py-2 text-sm w-full "
          >
            <div class="overflow-hidden flex flex-col gap-2">
              <span class="text-xs text-tem/70"
                >Арт: {{ item.attributes.Art }}</span
              >
              <span> {{ item.attributes.Name }}</span>
            </div>
            <span class="text-right w-full"
              >{{ item.attributes.Price.toLocaleString('ru-RU') }}₽</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data_order: Object,
    stavka: Number,
    activeResult: Number,
    activeAnalizes: Number
  },
  data () {
    return {
      options: {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
      },
      activeAll: 1,
      activeId: null,
      openResult: false,
      openZakaz: false
    }
  },
  methods: {},
  computed: {
    getDate () {
      return new Date(this.data_order.attributes.createdAt).toLocaleString(
        'ru',
        this.options
      )
    }
  }
}
</script>

<style>
.line-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
