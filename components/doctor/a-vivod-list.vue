<template>
  <div
    class="flex flex-col gap-2 p-3 bg-white drop-shadow-md rounded-md w-full"
  >
    <div class="w-full flex items-stretch justify-between h-full">
      <div class="flex flex-col gap-1 items-start justify-between">
        <div class=" text-xs font-medium flex gap-1">
          <span>Статус: </span>
          <span v-if="data_vivod.attributes.Done == true" class="text-[#2CC746]"
            >Переведено</span
          >
          <span v-else class="text-[#E72A2A]">Ожидает перевода</span>
        </div>
        <span class="font-medium text-xs"
          >Запрос: №{{ data_vivod.attributes.UID }}</span
        >
        <span class="font-medium text-xs">Дата: {{ getDate }}</span>
      </div>

      <div class="flex flex-col justify-between gap-2 items-end h-full">
        <span class="font-semibold text-main text-base h-full"
          >-{{ summUser.toLocaleString('ru-RU') }}₽</span
        >
        <span class="text-xs font-normal"
          >{{ data_vivod.attributes.zakazies.data.length }} заказа</span
        >
        <span
          @click="openVivod"
          class="flex items-center gap-1 text-sm h-full cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6 text-main"
            :class="[active == data_vivod.id ? 'rotate-180' : '']"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
          Подробнее</span
        >
      </div>
    </div>
    <Transition name="fade">
      <div v-if="active == data_vivod.id" class="border-t border-dashed  border-[#343434]/50 mt-2">
        <section class="w-full divide-y divide-[#343434]/70">
          <div
            v-for="item in data_vivod.attributes.zakazies.data"
            :key="item.id"
            class="flex items-center w-full gap-1 py-2"
          >
            <div class="w-2/5  flex flex-col gap-1">
            <span class="text-sm font-medium">{{
                item.attributes.user.data.attributes.FIO_user.replace(
                  /(\S+) (\S)\S* (\S)\S*/,
                  '$1 $2. $3.'
                )
              }}</span>
            <span class="text-xs font-normal text-black/70">{{new Date(item.attributes.createdAt).toLocaleString(
                  'ru',
                  options
                )}}</span>
              
            </div>
            <nuxt-link
              class="w-2/5 text-sm flex gap-1 items-center"
              :to="`/doctor/order/` + item.id"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-4 h-4 text-main"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
              В заказ</nuxt-link
            >
            <span class="w-1/5 font-semibold text-main text-right"
              >{{
                ((item.attributes.SummOrder / 100) * $auth.user.Stavka).toFixed(2)
              }}₽</span
            >
          </div>
        </section>
        <span v-if="data_vivod.attributes.Done == true"
          class="cursor-pointer w-full flex items-center justify-center gap-1 text-sm mt-2 py-2 rounded bg-main text-white"
          ><img src="~/assets/icons/download.svg" alt="" /> Скачать чек</span
        >
        <span v-else
          class="w-full flex items-center justify-center gap-1 text-sm py-2 rounded  text-[#343434]/70"
          >Ожидайте перевод</span
        >
      </div>
    </Transition>
  </div>
</template>

<script>
export default {
  props: {
    data_vivod: Object,
    active: Number || null || String
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
    openVivod () {
      this.$emit('openVivod')
    }
  },
  computed: {
    summUser () {
      const Competed = this.data_vivod.attributes.zakazies.data.filter(
        x => x.attributes.Status == true
      )

      let total = Competed.reduce(function (accumulator, b) {
        return accumulator + b.attributes.SummOrder
      }, 0)
      const totalStavka = (total / 100) * this.$auth.user.Stavka

      return totalStavka
    },
    getDate () {
      return new Date(this.data_vivod.attributes.createdAt).toLocaleString(
        'ru',
        this.options
      )
    }
  }
}
</script>

<style></style>
