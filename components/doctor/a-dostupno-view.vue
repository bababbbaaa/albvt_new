<template>
  <div
    class="flex flex-col  gap-4 w-full bg-white drop-shadow-sm border-[1px] border-[#E5E8F1] py-3   rounded-md anime cursor-pointer"
  >
    <div @click="openUser" class=" flex gap-2 justify-between px-2">
      <span
        v-if="active == user_data.id"
        class="flex text-base font-medium    justify-start   items-center w-4/5 rounded-md anime"
        :class="[active == user_data.id ? '' : 'truncate']"
        >{{ user_data.attributes.FIO_user }}</span
      >
      <span
        v-else
        class="flex text-base font-medium     justify-start   items-center w-4/5 rounded-md anime"
        :class="[active == user_data.id ? '' : 'truncate']"
        >{{ FIO_USER }}</span
      >

      <div class="flex flex-col justify-center h-full  items-end w-1/5 ">
        <span class="text-base flex items-center gap-2 font-semibold text-main">
          +{{ summUser.toLocaleString('ru-RU') }}₽</span
        >
        <span class="text-xs text-[#343434]/70 font-normal"
          > Заказы: {{ dostupnoVivod.length }}</span
        >
      </div>
    </div>
    <Transition name="fade">
      <div v-if="active == user_data.id && type == 'dostupno'" class="anime ">
        <div class="grid grid-cols-1 divide-y divide-[#343434]/70">
          <div
            v-for="(order, i) in dostupnoVivod"
            :key="i"
            class="flex justify-between items-center  px-2 py-2"
          >
            <div class="flex flex-col gap-1 items-start justify-center">
              <span class="text-sm font-semibold">№ {{ order.attributes.UID }} </span>
              <span class="text-xs font-normal text-tem/50">{{
                new Date(order.attributes.createdAt).toLocaleString(
                  'ru',
                  options
                )
              }}</span>
            </div>

            <div class="flex gap-2 items-center">
              <span
                v-if="order.attributes.Status == true"
                class="text-xs  font-semibold"
                >+{{
                  (
                    (order.attributes.SummOrder / 100) *
                    $auth.user.Stavka
                  ).toLocaleString('ru-RU')
                }}₽</span
              >
              <span v-else class="text-xs text-tem/50  font-semibold">Не оплачен</span>
              <nuxt-link
                class="text-xs flex gap-1 items-center justify-end"
                :to="`/doctor/dostupno/order/` + order.id"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-4 h-4 text-tem/50"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3"
                  />
                </svg>
              </nuxt-link>
            </div>

           
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script>
export default {
  props: {
    user_data: Object,
    active: Number || null || String,
    type: String,
    options: {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
      // weekday: 'long'
    }
  },
  methods: {
    openUser () {
      this.$emit('openUser')
    }
  },

  computed: {
    FIO_USER () {
      const fio = this.user_data.attributes.FIO_user.replaceAll('  ', ' ')
      return fio.replace(/(\S+) (\S)\S* (\S)\S*/, '$1 $2. $3.')
    },

    summUser () {
      const Competed = this.user_data.attributes.zakazies.data.filter(
        x => x.attributes.Status == true && x.attributes.ZaprosVivod == false
      )

      let total = Competed.reduce(function (accumulator, b) {
        return accumulator + b.attributes.SummOrder
      }, 0)
      const totalStavka = (total / 100) * this.$auth.user.Stavka

      return totalStavka
    },
    summUser2 () {
      const Competed = this.user_data.attributes.zakazies.data

      let total = Competed.reduce(function (accumulator, b) {
        return accumulator + b.attributes.SummOrder
      }, 0)

      return total
    },

    dostupnoVivod () {
      const data = this.user_data.attributes.zakazies.data
      const filteredData = data.filter(x => x.attributes.ZaprosVivod == false)
      return filteredData
    }
  }
}
</script>

<style></style>
