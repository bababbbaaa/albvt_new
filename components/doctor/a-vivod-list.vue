<template>
  <div
    class="flex flex-col gap-2 p-3 bg-white drop-shadow-md rounded-md w-full relative"
  >
    <div class="w-full flex items-stretch justify-between h-full">
      <div class="flex flex-col gap-1 items-start justify-between w-1/2">
        <div class=" text-xs font-medium flex gap-1">
          <span v-if="data_vivod.attributes.Done == true" class="text-[#2CC746]"
            >Переведено</span
          >
          <span v-else class="text-[#E72A2A]">Ожидает перевода</span>
        </div>
        <div class="grid grid-cols-2 gap-1">
          <span class="font-medium text-xs text-tem/50">Запрос:</span>
          <span class="font-medium text-xs text-tem/50">{{
            data_vivod.attributes.UID
          }}</span>
          <span class="font-medium text-xs text-tem/50">Дата:</span>
          <span class="font-medium text-xs text-tem/50">{{ getDate }}</span>
        </div>
      </div>

      <div class="flex flex-col justify-between items-end h-full">
        <span class="font-semibold text-main text-base h-full"
          >-{{ summUser.toLocaleString('ru-RU') }}₽</span
        >
        <span class="text-xs font-normal text-tem/50"
          >{{ data_vivod.attributes.zakazies.data.length }} заказа</span
        >
        <button
          @click="openVivod"
          class="button-doctor-arrow absolute -bottom-3 cursor-pointer"
        >
          <img v-if="active == null" src="~/assets/icons/doctor-arrow.svg" alt="" class="w-8 h-8"/>
           <img v-else src="~/assets/icons/doctor-arrow.svg" alt="" class="w-8 h-8 rotate-180"/>
        </button>
      </div>
    </div>
    <Transition name="fade">
      <div
        v-if="active == data_vivod.id"
        class=" border-t border-dashed  border-[#343434]/50 mt-2"
      >
        <section class="w-full divide-y divide-[#343434]/70">
          <div
            v-for="item in data_vivod.attributes.zakazies.data"
            :key="item.id"
            class="flex items-center w-full gap-1 py-2"
          >
            <div class="w-2/5  flex flex-col gap-1">
              <span class="text-sm font-medium">{{
                item.attributes.users.data[0].attributes.FIO_user.replace(
                  '  ',
                  ' '
                ).replace(/(\S+) (\S)\S* (\S)\S*/, '$1 $2. $3.')
              }}</span>
              <span class="text-xs font-normal text-black/70">{{
                new Date(item.attributes.createdAt).toLocaleString(
                  'ru',
                  options
                )
              }}</span>
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
                ((item.attributes.SummOrder / 100) * $auth.user.Stavka).toFixed(
                  2
                )
              }}₽</span
            >
          </div>
        </section>
         <Transition name="fade">
        <span
          v-if="data_vivod.attributes.Done == true"
          class="cursor-pointer w-full flex items-center justify-center gap-1 text-sm mt-2 py-2 rounded bg-main text-white"
          ><img src="~/assets/icons/download.svg" alt="" /> Скачать чек</span
        >
        <span
          v-else
          class="w-full flex items-center justify-center gap-1 text-sm py-2 rounded  text-[#343434]/70"
          >Ожидайте перевод</span
        >
        </Transition>
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
    FIO_USER () {
      const fio = this.user_data.attributes.FIO_user.replaceAll('  ', ' ')
      return fio.replace(/(\S+) (\S)\S* (\S)\S*/, '$1 $2. $3.')
    },
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

<style>
.button-doctor-arrow {
    left: 50%;
    transform: translateX(-50%);
}
</style>
