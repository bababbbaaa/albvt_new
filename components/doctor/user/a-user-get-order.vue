<template>
  <div class="p-2 rounded-md bg-white drop-shadow-md">
    <div class="flex justify-between items-start">
      <div class="flex flex-col gap-1">
        <span class="font-bold text-lg">№ {{ data_order.id }}</span>
        <span class="text-[#343434]/70">{{ getDate }}</span>
      </div>
      <div class="flex flex-col gap-1">
        <span class="font-bold text-lg text-main"
          >{{ data_order.attributes.SummOrder.toLocaleString('ru-RU') }}₽</span
        >
        <span class="text-right">{{ $auth.user.Stavka }}%</span>
      </div>
    </div>
    <div class="flex flex-col gap-2 mt-2">
      <div class="flex justify-between items-start">
        <button
          @click="$emit('openOrderResult')"
          class="bg-main text-white flex gap-2 px-4 py-3 rounded-md text-sm"
        >
          <div>
            <span v-if="activeResult == data_order.id"
              >Скрыть</span
            >
            <span v-else>Результаты</span>
          </div>
          <span v-if="data_order.attributes.Result.data">
            ({{ data_order.attributes.Result.data.length }})</span
          >
          <span v-else>(0)</span>
        </button>
        <button
          @click="$emit('openOrderAnalizes')"
          class="bg-[#343434]/10 text-[#343434] px-4 py-3 rounded-md text-sm"
        >
          <div>
            <span v-if="activeAnalizes == data_order.id"
              >Скрыть ({{data_order.attributes.analizies.data.length}})</span
            >
            <span v-else>Состав заказа ({{data_order.attributes.analizies.data.length}})</span>
          </div>
        </button>
      </div>

      <div
        class="w-full flex flex-col gap-2"
        v-if="activeResult == data_order.id"
      >
        <div
          v-if="data_order.attributes.Result.data"
          class="flex flex-col gap-2"
        >
          <button
            v-for="result in data_order.attributes.Result.data"
            :key="result.id"
            class="flex gap-2 items center"
          >
            <img src="~/assets/icons/pdf.svg" class="w-[20px] h-auto" />
            <a :href="'https://api.albvt.ru' + result.attributes.url" download target="_blank" class="underline underline-offset-2">{{
              result.attributes.name
            }}</a>
          </button>
        </div>
      </div>
      <div
        class="w-full flex flex-col gap-2"
        v-if="activeAnalizes == data_order.id"
      >
        <div class="grid grid-cols-[1fr,4fr,1fr] gap-1 w-full text-sm font-semibold">
          <span>Арт</span>
          <span>Наименование</span>
          <span class="text-right w-full">Цена</span>
        </div>
        <div class="w-full flex flex-col gap-2">
          <div
            v-for="item in data_order.attributes.analizies.data"
            :key="item.id"
            class="grid grid-cols-[1fr,4fr,1fr] gap-1 pb-3 text-sm w-full border-b border-b-[#343434]/30"
          >
            <span>{{item.attributes.Art}}</span>
            <span class="line-clamp overflow-hidden" >{{item.attributes.Name}}</span>
            <span class="text-right w-full">{{item.attributes.Price.toLocaleString('ru-RU')}}₽</span>
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
    activeAnalizes: Number,
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
  methods: {
  },
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
