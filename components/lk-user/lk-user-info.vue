<template>
  <div class=" bg-white rounded-[5px] shadow-md flex flex-col h-full max-h-[240px]">
              <div
                class="bg-[#EDEDED] p-4  flex flex-col gap-4 font-medium text-[18px]"
              >
                <span class=" capitalize">{{ $auth.user.FIO_user }}</span>
              </div>

              <div class="flex flex-col gap-4  justify-start p-4">
                <!-- <div>Ваша скидка 0%</div> -->
                <button
                  @click="handleReload()"
                  class="rounded-[5px] border border-main h-[49px] hover:bg-main  anime text-main hover:text-white w-full flex justify-center items-center py-2 text-[16px]"
                >
                  Обновить информацию
                </button>
                <button
                  @click="handleLogout()"
                  class="rounded-[5px] border border-main h-[49px] hover:bg-main  anime text-main hover:text-white w-full flex justify-center items-center py-2 text-[16px]"
                >
                  Выйти
                </button>
              </div>
            </div>
</template>

<script>
export default {
    methods: {
        handleReload(){
            this.$emit('handleReload')
        },
        handleLogout(){
            this.$emit('handleLogout')
        }
    }
}
</script>

<style>

</style>