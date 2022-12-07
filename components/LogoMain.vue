<template>
  <div class="flex justify-start w-full">
    <nuxt-link
      to="/"
      class="flex flex-col !text-white uppercase  justify-start cursor-pointer w-[122px] sm:w-[154px]"
    >
      <span class="text-[18px] sm:text-[22px]">{{ logo.logotip_main }}</span>

      <span class="text-[8px] sm:text-[10px]">{{ logo.logotip_subname }}</span>
      <!-- <img
        src="/img/icons/full-logo.svg"
        alt=""
        class="w-[112px] sm:w-[152px] h-auto"
      /> -->
    </nuxt-link>
  </div>
</template>

<script>
export default {
  data () {
    return {
      logoOne: '',
      logoTwo: '',
      logo: ''
    }
  },
  methods: {
    async fetchSomethingLogo () {
      const logo = await this.$axios.$get(
        'https://foxsis.ru/alvd/wp-json/wp/v2/pages/11904'
      )
      this.logo = logo.acf
    }
  },
  mounted () {
    this.fetchSomethingLogo()
  }
}
</script>

<style></style>
