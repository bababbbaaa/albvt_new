<template>
  <div
    class=" bg-white rounded-md shadow-md flex flex-col h-full max-h-[240px]"
  >
    <div class="bg-[#EDEDED] p-4  flex flex-col gap-4 font-medium text-base">
      <span class=" capitalize">{{ $auth.user.FIO_user }}</span>
    </div>

    <div class="flex flex-col gap-4  justify-start p-4">
      <!-- <div>Ваша скидка 0%</div> -->
      <button
        @click="handleReload()"
        class="rounded-md border border-main py-3 hover:bg-main  anime text-main hover:text-white w-full flex justify-center items-center text-base"
      >
        Обновить информацию
      </button>
      <button
        @click="handleLogout()"
        class="rounded-md border border-main py-3 hover:bg-main  anime text-main hover:text-white w-full flex justify-center items-center text-base"
      >
        Выйти
      </button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    handleReload () {
      this.$emit('handleReload')
    },
    handleLogout () {
      this.$emit('handleLogout')
    }
  }
}
</script>

<style></style>
