<template>
  <div class="bg-[#EDEDED]">
    <div class="container mt-[100px]">
      <div class="grid grid-cols-[1fr,1fr] grid-rows-2 lg:grid-rows-1 lg:grid-cols-[1fr,1fr,2fr] py-[44px] gap-[20px]">
        <div class="flex col-span-1 flex-col gap-[11px]">
          <span class="font-semibold text-[17px]">Пациентам</span>
          <ul class="flex flex-col gap-[14px]">
            <li v-for="(item, i) in footermenu" :key="i">
              <nuxt-link class="visible sm:hidden text-xs" :to="item.mobileLink"> {{ item.name }}</nuxt-link>
              <NuxtLink
                :to="item.link"
                class="sm:visible hidden cursor-pointer text-xs !text-tem hover:!text-main"
              >
                {{ item.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>
        <div class="flex col-span-1 flex-col gap-[11px]">
          <span class="font-semibold text-[17px]">О нас</span>
          <ul class="flex flex-col gap-[14px]">
            <li>
              <nuxt-link
                to="/o-nas"
                class="cursor-pointer text-[13px] !text-tem hover:!text-main"
              >
                Нормативные документы
              </nuxt-link>
              
            </li>
          </ul>
          <br>
          <span class="font-semibold text-[17px]">Контакты</span> 
          <div class="flex flex-col gap-[14px]">
            <div class="flex gap-[22px]">
              <img
                src="/img/icons/Marker.svg"
                alt=""
                class="w-[18px] h-[18px] object-cover hidden lg:block"
              />
              <span class="text-[13px]"
                >344022,<br /> г. Ростов-на-Дону,<br />
                ул. Восточная, 11</span
              >
            </div>
            <div class="flex gap-[22px]">
              <img
                src="/img/icons/Callsettings.svg"
                alt=""
                class="w-[18px] h-[18px] object-cover hidden lg:block"
              />
              <span class="text-[13px]">+7 (863) 241 85 55</span>
            </div>
            <div class="flex gap-[22px]">
              <img
                src="/img/icons/Message.svg"
                alt=""
                class="w-[18px] h-[18px] object-cover hidden lg:block"
              />
              <span class="text-[13px]">albavita2019@yandex.ru</span>
            </div>
          </div>
        </div>
        <!-- <div class="pyrder-2 lg:col-span-1 col-span-2">
         <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3Adaf7dfa6bc4d1d3631e0e20b828484c5faf7118d65f939ad39ec025cbae30557&amp;source=constructor" width="100%" height="350" frameborder="0"></iframe>
        </div> -->
      </div>
    </div>
    <!-- mobile bottom-bar -->
    <div
      class="sm:hidden fixed bottom-0 left-0 bg-white drop-shadow(0px_0px_20px_rgba(0,0,0,0.1)) px-4 py-2 z-[1] w-full"
    >
      <div class="grid grid-cols-4 w-full text-[10px]">
        <nuxt-link to="/" 
        class="flex flex-col gap-2 justify-center items-center border-r-[1px] border-tem/20 !text-tem">
          <img class="" src="/img/icons/mob-to-main.svg" alt="" />
          <span>
            Главная
          </span>
        </nuxt-link>
        <nuxt-link to="/all-analyzes" 
        class="flex flex-col gap-2 justify-center items-center border-r-[1px] border-tem/20">
         <img class="" src="/img/icons/mob-foo-2.svg" alt="" />
          <span>
            Анализы
          </span>
        </nuxt-link>
        <nuxt-link to="/result" 
        class="flex flex-col gap-2 justify-center items-center border-r-[1px] border-tem/20">
         <img class="" src="/img/icons/mob-foo-3.svg" alt="" />
          <span>
            Результаты
          </span>
        </nuxt-link>
        <nuxt-link to="/contacts" 
        class="flex flex-col gap-2 justify-center items-center">
         <img src="/img/icons/mob-foo-4.svg" alt="" />
          <span>
            Адреса
          </span>
        </nuxt-link>
      </div>
    </div>
    <!-- end mobile bottom-bar -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      footermenu: [
        {
          name: 'Анализы и цены',
          link: '/all-analyzes/gematologicheskie-issledovaniya/2849/',
          mobileLink:'/all-analyzes'
        },
        {
          name: 'Результаты анализов',
          link: '/result',
          mobileLink:'/result'
        },
        {
          name: 'Анализы на дому',
          link: '/viezd',
          mobileLink:'/viezd'
        },
        {
          name: 'Комплексы анализов',
          link: '/all-complecs/1-dlya-zhenshhin/2797',
          mobileLink:'/all-complecs'
        },
        {
          name: 'Часто задаваемые вопросы',
          link: '/test-pages/one',
          mobileLink:'/test-pages/one'
        },
        {
          name: 'Политика обработки персональных данных',
          link: '/politic',
          mobileLink:'/politic'
        },
        {
          name: 'Пользовательское соглашение',
          link: '/soglashenie',
          mobileLink:'/soglashenie'
        },
        {
          name: 'Оплата и возврат',
          link: '/oplata',
          mobileLink:'/oplata'
        }
      ]
    }
  }
}
</script>

<style></style>
