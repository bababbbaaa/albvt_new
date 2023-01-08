<template>
  <div
    class="flex flex-col  gap-4  bg-white drop-shadow-sm border-[1px] border-[#E5E8F1] py-3   rounded-md anime cursor-pointer w-full"
  >
    <div @click="openUser" class=" flex  justify-between px-2">
      <nuxt-link
        prefetch
        :to="'/doctor/pacient/' + user_data.id"
        class="sm:flex hidden text-base font-medium   justify-start   items-center w-9/12 rounded-md anime"
        >{{ FIO_USER_MOB }}</nuxt-link
      >
      <nuxt-link
        prefetch
        :to="'/doctor/pacient/' + user_data.id"
        class="sm:hidden flex text-base font-medium   justify-start   items-center w-9/12 rounded-md anime"
        >{{ FIO_USER_DESC }}</nuxt-link
      >
      <div class="w-3/12 flex gap-1 items-center justify-end text-xs">
        <div
          v-if="user_data.attributes.zakazies.data.length >= 1"
          class="flex gap-1 items-end"
        >
          <span class="text-tem/50">Заказы:</span>
          <span class=""> {{ user_data.attributes.zakazies.data.length }}</span>
        </div>
        <div v-else class="flex gap-1 items-center">
          <span class="text-tem/50">Заказы:</span>
          <span class=""> 0</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user_data: Object,
    active: Number || null,
    type: String
  },
  methods: {
    openUser () {
      console.log('ss')
      this.$emit('openUser')
    }
  },
  computed: {
    FIO_USER_DESC () {
      const fio = this.user_data.attributes.FIO_user.replaceAll('  ', ' ')
      return fio.replace(/(\S+) (\S)\S* (\S)\S*/, '$1 $2. $3.')
    },
    FIO_USER_MOB () {
      return this.user_data.attributes.FIO_user
    }
  }
}
</script>

<style></style>
