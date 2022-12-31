<template>
  <div class="flex flex-col gap-[1rem] pb-[1rem] sm:pb-0">
    <div
      class="grid grid-cols-2 sm:grid-cols-4 gap-[10px] sm:gap-[20px] pt-[40px]  px-4 sm:px-0  sm:pt-0 sm:pb-0"
    >
      <div
        v-for="(item, i) in itemsgroup"
        :key="i"
        class="hidden bg-white rounded-[5px] h-[140px] lg:h-[122px] xl:h-[172px] sm:flex justify-center items-center flex-col gap-[11px] hover:shadow-xl anime"
      >
        <img :src="item.img" alt="уу" class="w-[48px] h-auto" />
        <NuxtLink
          :to="item.link"
          class="font-medium text-[14px] text-[#343434] w-full flex justify-center items-center"
        >
          <span class="sm:w-full w-2/3 text-center">{{ item.name }}</span>
        </NuxtLink>
      </div>
      <!-- mobile -->
      <div
        class="bg-white rounded-[5px] h-[140px] lg:h-[122px] xl:h-[172px] flex sm:hidden justify-center items-center flex-col gap-[11px] hover:shadow-xl anime"
      >
        <img src="/img/icons/Group950.svg" alt="уу" class="w-[48px] h-auto" />
        <NuxtLink
          to="/all-analyzes"
          class="font-medium text-[14px] text-[#343434] w-full flex justify-center items-center"
        >
          <span class="sm:w-full w-2/3 text-center">Анализы по группам</span>
        </NuxtLink>
      </div>

      <div
        class="bg-white rounded-[5px] h-[140px] lg:h-[122px] xl:h-[172px] flex sm:hidden justify-center items-center flex-col gap-[11px] hover:shadow-xl anime"
      >
        <img src="/img/icons/Group951.svg" alt="уу" class="w-[48px] h-auto" />
        <NuxtLink
          to="/all-complecs"
          class="font-medium text-[14px] text-[#343434] w-full flex justify-center items-center"
        >
          <span class="sm:w-full w-2/3 text-center">Комплексы анализов</span>
        </NuxtLink>
      </div>

      <div
        class="bg-white rounded-[5px] h-[140px] lg:h-[122px] xl:h-[172px] flex sm:hidden justify-center items-center flex-col gap-[11px] hover:shadow-xl anime"
      >
        <img src="/img/icons/Group952.svg" alt="уу" class="w-[48px] h-auto" />
        <NuxtLink
          to="/viezd"
          class="font-medium text-[14px] text-[#343434] w-full flex justify-center items-center"
        >
          <span class="sm:w-full w-2/3 text-center">Анализы на дому</span>
        </NuxtLink>
      </div>

      <div
        class="bg-white rounded-[5px] h-[140px] lg:h-[122px] xl:h-[172px] flex sm:hidden justify-center items-center flex-col gap-[11px] hover:shadow-xl anime"
      >
        <img src="/img/icons/Group953.svg" alt="уу" class="w-[48px] h-auto" />
        <NuxtLink
          to="/podgotovka"
          class="font-medium text-[14px] text-[#343434] w-full flex justify-center items-center"
        >
          <span class="sm:w-full w-2/3 text-center">Подготовка к анализам</span>
        </NuxtLink>
      </div>
    </div>
    <div class="w-full flex justify-center sm:hidden container">
      <nuxt-link
        to="/result"
        type=""
        class=" border-[1px] border-[#746F6F] w-full  flex justify-center items-center h-[48px] rounded-[5px] bg-white"
      >
        Результаты анализов
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      itemsgroup: [
        {
          img: '/img/icons/Group950.svg',
          name: 'Анализы по группам',
          link: '/all-analyzes/gematologicheskie-issledovaniya/2849',
          mobile: '/all-analyzes'
        },
        {
          img: '/img/icons/Group951.svg',
          name: 'Комплексы анализов',
          link: '/all-complecs/1-dlya-zhenshhin/2797',
          mobile: '/all-complecs'
        },
        {
          img: '/img/icons/Group952.svg',
          name: 'Анализы на дому',
          link: '/viezd',
          mobile: '/viezd'
        },
        {
          img: '/img/icons/Group953.svg',
          name: 'Подготовка к анализам',
          link: '/podgotovka',
          mobile: '/podgotovka'
        }
      ]
    }
  }
}
</script>

<style></style>
