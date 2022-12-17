<template>
  <div class="bg-[#fcfcfc]">
    <div class="w-full bg-main ">
      <div class="container w-full flex items-center justify-between text-white py-3">
        <nuxt-link
      to="/"
      class="flex flex-col !text-white uppercase  justify-start cursor-pointer w-[122px] sm:w-[154px]"
    >
      <span class="text-[18px] sm:text-[22px]">Альба вита</span>

      <span class="text-[8px] sm:text-[10px]">медицинские анализы</span>
      <!-- <img
        src="/img/icons/full-logo.svg"
        alt=""
        class="w-[112px] sm:w-[152px] h-auto"
      /> -->
    </nuxt-link>
      <div class="flex gap-2 items-center">
        <button>
          <img src="~/assets/icons/doctor1.svg" alt="" />
        </button>
        <nuxt-link to="/doctor/me">
          <img src="~/assets/icons/doctor2.svg" alt="" />
        </nuxt-link>
        <button @click="handleLogout()">
          <img src="~/assets/icons/doctor3.svg" alt="" />
        </button>
      </div>
      </div>
      
    </div>
    <Nuxt />
  </div>
</template>

<script>

export default {
  methods: {
    async handleLogout () {
      this.$nuxt.$loading.start()
      await this.$auth.logout()
    },
  }
}
</script>

<style></style>
