<template>
  <div
    class="p-3 bg-white drop-shadow-md rounded-md w-full flex items-center justify-between"
  >
    <div class="flex flex-col gap-1 items-start justify-center">
      <span class="font-medium">{{ getDate }}</span>
      <span class="text-xs font-normal"
        >{{ data_vivod.attributes.zakazies.data.length }} заказа</span
      >
    </div>
    <div class="text-[#2CC746] text-sm">
      <span v-if="data_vivod.attributes.Done == true">Переведено</span>
      <span v-else>Ожидает перевода</span>
    </div>
    <div class="font-semibold text-main text-[16px]">
      -{{ summUser.toLocaleString('ru-RU') }}₽
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data_vivod: Object
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
  computed: {
    summUser () {
      const Competed = this.data_vivod.attributes.zakazies.data.filter(
        x => x.attributes.Status == true
      )

      let total = Competed.reduce(function (accumulator, b) {
        return accumulator + b.attributes.SummOrder
      }, 0)
      const totalStavka = (total / 100) * 20

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
