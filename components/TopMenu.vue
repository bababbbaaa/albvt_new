<template>
  <div class="w-full text-white flex">
    <nav class=" w-full flex items-center">
      <ul
        class="flex w-full justify-between gap-[20px] font-base text-[14px] xl:text-[16px] relative"
      >
        <li class="group">
          <nuxt-link
            to="/o-nas"
            class="!text-white hover:underline hover:underline-offset-2 anime"
            >О нас</nuxt-link
          >
        </li>
        <li class="group flex items-center gap-1 dropdown relative anime">
          <nuxt-link
            to="/"
            class="!text-white hover:underline hover:underline-offset-2 anime dropbtn"
            >Услуги</nuxt-link
          >
          <img src="/img/icons/arrow-white.svg" alt="" />
          <div class="dropdown-content top-4 left-0 bg-white shadow-md  min-w-[250px] rounded-[5px] anime">
            <ul class="text-[14px]">
              <!-- <li class="hover:bg-[#343434]/10 px-4 py-2 anime">
                <nuxt-link to="/test-pages/capelnica">Постановка капельниц</nuxt-link>
              </li>
              <li class="hover:bg-[#343434]/10 px-4 py-2 anime">
                <nuxt-link to="/test-pages/two">ЭКГ</nuxt-link>
              </li> -->
              <li class="hover:bg-[#343434]/10 px-4 py-2 anime">
                <nuxt-link to="/reis"
                  >Предрейсовые и послерейсовые медицинские осмотры</nuxt-link
                >
              </li>
            </ul>
          </div>
        </li>
        <li class="group">
          <nuxt-link
            to="/all-analyzes"
            class="!text-white hover:underline hover:underline-offset-2 anime"
            >Анализы</nuxt-link
          >
        </li>
        <li class="group">
          <nuxt-link
            to="/all-complecs"
            class="!text-white hover:underline hover:underline-offset-2 anime"
            >Комплексы анализов</nuxt-link
          >
        </li>
        <li class="group">
          <nuxt-link
            to="/contacts"
            class="!text-white hover:underline hover:underline-offset-2 anime"
            >Контакты</nuxt-link
          >
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activesubmenu: false,
      submenu: [
        {
          name: 'Постановка капельниц',
          link: '/test-pages/one',
          active: true
        },
        {
          name: 'ЭКГ',
          link: '/test-pages/two',
          active: true
        },

        {
          name: 'Предрейсовые и послерейсовые медицинские осмотры',
          link: '/zakaz',
          active: true
        }
      ],
      topmenu: [
        {
          name: 'О нас',
          sub: false,
          link: '/o-nas'
        },
        {
          name: 'Услуги',
          sub: true,
          link: ''
        },
        {
          name: 'Анализы',
          sub: false,
          link: '/all-analyzes'
        },
        {
          name: 'Комплексы анализов',
          sub: false,
          link: '/404'
        },
        {
          name: 'Контакты',
          sub: false,
          link: '/404'
        }
      ]
    }
  }
}
</script>

<style>
.dropdown-content {
  display: none;
  position: absolute;
  z-index: 1;
}

.dropdown-content li {
  color: #343434;
  text-decoration: none;
  display: block;
}


.dropdown:hover .dropdown-content {
  display: block;
}
</style>
