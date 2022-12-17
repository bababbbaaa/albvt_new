<template>
  <div
    class="flex flex-col  gap-4 w-full bg-white drop-shadow-md py-3   rounded-[3px] anime cursor-pointer"
  >
    <div @click="openUser" class=" flex  justify-between px-2">
      <nuxt-link prefetch :to="'/doctor/pacient/' + user_data.id"
        v-if="active == user_data.id"
        class="flex text-base font-medium   justify-start   items-center w-9/12 rounded-[3px] anime"
        :class="[active == user_data.id ? '' : 'truncate']"
        >{{ user_data.attributes.FIO_user }}</nuxt-link
      >
      <nuxt-link prefetch :to="'/doctor/pacient/' + user_data.id"
        v-else
        class="flex text-base font-medium   justify-start   items-center w-9/12 rounded-[3px] anime"
        :class="[active == user_data.id ? '' : 'truncate']"
        >{{
          user_data.attributes.FIO_user.replace(
            /(\S+) (\S)\S* (\S)\S*/,
            '$1 $2. $3.'
          )
        }}</nuxt-link
      >
      <div class="w-3/12 flex gap-1 items-center justify-end text-xs">
        <div
          v-if="user_data.attributes.zakazies.data.length >= 1"
          class="flex gap-1 items-center"
        >
          <span>{{ user_data.attributes.zakazies.data.length }}</span>
          <span>заказов</span>
        </div>
        <div v-else class="flex gap-1 items-center">
          <span>0 заказов</span>
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
  }
}
</script>

<style></style>
