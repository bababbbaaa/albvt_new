<template>
  <div
    class="flex flex-col  gap-4 w-full bg-white drop-shadow-md py-3   rounded-[3px] anime cursor-pointer"
  >
    <div @click="openUser" class=" flex gap-2 justify-between px-2">
      <span
        v-if="active == user_data.id"
        class="flex text-base font-medium    justify-start   items-center w-4/5 rounded-[3px] anime"
        :class="[active == user_data.id ? '' : 'truncate']"
        >{{ user_data.attributes.FIO_user }}</span
      >
      <span
        v-else
        class="flex text-base font-medium     justify-start   items-center w-4/5 rounded-[3px] anime"
        :class="[active == user_data.id ? '' : 'truncate']"
        >{{
          user_data.attributes.FIO_user.replace(
            /(\S+) (\S)\S* (\S)\S*/,
            '$1 $2. $3.'
          )
        }}</span
      >

      <div class="flex flex-col justify-center h-full  items-end w-1/5 ">
        <span
          class="text-base flex items-center gap-2 font-semibold text-main"
        >
          +{{ summUser.toLocaleString('ru-RU') }}₽</span
        >
        <span class="text-xs text-[#343434]/70 font-normal"
          >{{ dostupnoVivod.length }} заказа</span
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
            <div class="flex flex-col items-start justify-center">
              <span class="text-sm font-semibold">№ {{ order.id }} </span>
              <span class="text-xs font-normal">{{
                new Date(order.attributes.createdAt).toLocaleString(
                  'ru',
                  options
                )
              }}</span>
            </div>
           <nuxt-link :to="`/doctor/order/` + order.id" class="text-sm">Подробнее</nuxt-link>
            <span
              v-if="order.attributes.Status == true"
              class="text-xs  font-semibold"
              >+{{
                ((order.attributes.SummOrder / 100) * $auth.user.Stavka).toLocaleString(
                  'ru-RU'
                )
              }}₽</span
            >
            <span v-else class="text-xs  font-semibold"
              >Заказ не оплачен</span
            >
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
      day: 'numeric',
      // weekday: 'long'
    }
  },
  methods: {
    openUser () {
      this.$emit('openUser')
    }
  },

  computed: {
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
