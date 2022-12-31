<template>
<!-- консультация -->
  <div
    class="container w-full pt-[47px] mt-[47px] sm:mt-0 flex flex-col gap-8 justify-center items-center h-full max-w-[620px]"
  >
    <!-- <span class="w-full text-center text-[24px]" v-if="step == 0">Авторизация</span> -->
    <span class="w-full text-center text-[24px]" v-if="step == 1"
      >Оформление заказа</span
    >
    <div
      class="flex flex-col justify-center gap-[20px] items-center w-full"
      v-if="step == 0"
    >
      <span class="w-full text-center text-[20px]">Оформление заказа</span>
      <div
        v-show="!this.$auth.loggedIn"
        class=" flex justify-center items-center text-center text-sm"
        :class="[register == null ? ' mt-[48px]' : 'mt-4']"
      >
        <span
          >Для оформления заказа необходимо<br />
          <button
            @click="register = false"
            class=""
            :class="[
              register == true || register == null
                ? 'underline underline-offset-2 text-main'
                : ''
            ]"
          >
            авторизоваться
          </button>
          или
          <button
            @click="register = true"
            class=""
            :class="[
              register == false || register == null
                ? 'underline underline-offset-2 text-main'
                : ''
            ]"
          >
            зарегистрироваться.
          </button>
        </span>
      </div>
      <div
        v-if="this.$auth.loggedIn"
        class="capitalize remove-bg p-[24px] flex flex-col items-start gap-4 mt-24px"
      >
        <div>
          Привет,
          <b>{{ this.$auth.$state.user.FIO_user }}</b>
        </div>
      </div>
      <div
        v-if="register == false && !$auth.loggedIn"
        class="remove-bg flex w-full mb-[24px] flex-col justify-center items-center gap-4 mt-24px"
      >
        <span class="text-2xl font-medium">Авторизация</span>
        <div class="w-full">
          <tabs-login>
            <tab-login title="По телефону">
              <form
                @submit.prevent="handleLoginSubmit()"
                class="grid grid-cols-2 gap-4"
              >
                <div class="sm:col-span-1 col-span-2 flex flex-col gap-1">
                  <div
                    class="relative border-[1px] border-[#E5E4E8]    rounded-md px-4 py-3  shadow-sm anime"
                  >
                    <label
                      for=""
                      class="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs  anime"
                      :class="[
                        credentials.identifier.length !== 18
                          ? 'text-[#89888F]'
                          : 'text-main font-medium'
                      ]"
                      >Телефон*</label
                    >
                    <input
                      v-model="credentials.identifier"
                      class="block w-full border-0 p-0  focus:outline-none  sm:text-sm"
                      placeholder="+7"
                      v-facade="'+7 (###) ###-##-##'"
                    />
                  </div>
                </div>
                <div
                  class="sm:col-span-1 col-span-2 relative border-[1px] border-[#E5E4E8]    rounded-md px-4 py-3  shadow-sm anime"
                >
                  <label
                    for=""
                    class="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs  anime"
                    :class="[
                      credentials.password.length < 8
                        ? 'text-[#89888F]'
                        : 'text-main font-medium'
                    ]"
                    >Пароль*</label
                  >
                  <input
                    :type="typePassword"
                    v-model="credentials.password"
                    class="block w-full border-0 p-0  focus:outline-none  sm:text-sm"
                  />
                  <div
                    @click="show_hide_password()"
                    class="absolute right-[14px] top-[15px]"
                  >
                    <svg
                      v-if="typePassword == 'password'"
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4 text-[#343434]/70"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    <svg
                      v-else
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4 text-[#343434]/70"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  </div>
                </div>
                <div
                  class="col-span-2 flex flex-col items-center justify-center gap-2"
                >
                  <button
                    type="submit"
                    class="max-w-[300px] rounded-md border border-main h-[49px] mt-6 hover:bg-main  anime text-main hover:text-white w-full flex justify-center items-center py-2 text-sm"
                  >
                    Войти
                  </button>
                  <div
                    v-if="loginError == true"
                    class="flex justify-center gap-1 items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6 text-[#A75F4F] mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                    <span class="text-[#A55B4A] uppercase text-[12px]"
                      >Неправильный логин или пароль</span
                    >
                  </div>
                </div>
              </form>
            </tab-login>
            <tab-login title="По Email">
              <form
                @submit.prevent="handleLoginSubmit2()"
                class="grid grid-cols-2 gap-4"
              >
                <div class="sm:col-span-1 col-span-2 flex flex-col gap-1">
                  <div
                    class="relative border-[1px] border-[#E5E4E8]    rounded-md px-4 py-3  shadow-sm anime"
                  >
                    <label
                      for=""
                      class="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs  anime"
                      :class="[
                        !confirmEmail
                          ? 'text-[#89888F]'
                          : 'text-main font-medium'
                      ]"
                      >Email*</label
                    >
                    <input
                      v-model="credentials2.identifier"
                      class="block w-full border-0 p-0  focus:outline-none  sm:text-sm"
                    />
                  </div>
                </div>
                <div
                  class="sm:col-span-1 col-span-2 relative border-[1px] border-[#E5E4E8]    rounded-md px-4 py-3  shadow-sm anime"
                >
                  <label
                    for=""
                    class="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs  anime"
                    :class="[
                      credentials2.password.length < 8
                        ? 'text-[#89888F]'
                        : 'text-main font-medium'
                    ]"
                    >Пароль*</label
                  >
                  <input
                    :type="typePassword"
                    v-model="credentials2.password"
                    class="block w-full border-0 p-0  focus:outline-none  sm:text-sm"
                  />
                  <div
                    @click="show_hide_password()"
                    class="absolute right-[14px] top-[15px]"
                  >
                    <svg
                      v-if="typePassword == 'password'"
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4 text-[#343434]/70"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    <svg
                      v-else
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4 text-[#343434]/70"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  </div>
                </div>
                <div
                  class="col-span-2 flex flex-col items-center justify-center gap-2"
                >
                  <button
                    type="submit"
                    class="max-w-[300px] rounded-md border border-main h-[49px] mt-6 hover:bg-main  anime text-main hover:text-white w-full flex justify-center items-center py-2 text-sm"
                  >
                    Войти
                  </button>
                  <div
                    v-if="loginError == true"
                    class="flex justify-center gap-1 items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6 text-[#A75F4F] mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                    <span class="text-[#A55B4A] uppercase text-[12px]"
                      >Неправильный логин или пароль</span
                    >
                  </div>
                </div>
              </form>
            </tab-login>
          </tabs-login>
        </div>
      </div>
      <div
        v-if="register == true"
        class=" remove-bg flex w-full mb-[24px] flex-col justify-center items-center gap-4 mt-24px"
      >
        <span class="text-2xl font-medium">Регистрация</span>
        <!-- шан 2 -->
        <create-user />
      </div>
    </div>

    <!-- шан 1 -->

    <!-- шан 2 -->

    <!-- шан 3 -->
    <div
      class="flex flex-col justify-center gap-[20px] items-center w-full"
      v-if="step == 1"
    >
      <div class="flex justify-center w-full">
        Выберите место сдачи анализов
      </div>

      <div class=" flex flex-col gap-[20px] mt-[24px] w-full">
        <div class="flex flex-col gap-4">
          <div class="flex flex-col">
            <div class=" py-[16px] flex flex-col gap-4 text-sm">
              <div class="grid grid-cols-2 grid-rows-2 gap-4 ">
                <div
                  class="col-span-2 flex items-center justify-center gap-4  w-full overflow-hidden   p-3 rounded cursor-pointer"
                  @click="formZakaz.mesto = 'ofic'"
                  :class="[
                    formZakaz.mesto == 'ofic'
                      ? ' bg-main text-white '
                      : 'border-[1px] border-[#343434]/30  bg-white'
                  ]"
                >
                  <span class="w-full text-center">В офисе ИНВИТРО</span>
                </div>
                <div
                  class="col-span-2 flex items-center justify-center gap-4  w-full overflow-hidden   p-3 rounded cursor-pointer"
                  @click="formZakaz.mesto = 'ofis_my'"
                  :class="[
                    formZakaz.mesto == 'ofis_my'
                      ? ' bg-main text-white '
                      : 'border-[1px] border-[#343434]/30  bg-white'
                  ]"
                >
                  <span class="w-full text-center">В больнице (Ростов-на-Дону)</span>
                </div>
              </div>
            </div>
            <div v-if="sityesInvitros">
              <div v-if="formZakaz.mesto == 'ofis_my'">
                <div class=" py-[16px] flex flex-col gap-4 text-sm">
                  <gb-list @handlerOfic="handlerOfic"/>
                </div>
              </div>
              <div v-if="formZakaz.mesto == 'ofic'" class="flex flex-col gap-4">
                <div class=" py-[16px] flex flex-col gap-4 text-sm">
                  <div class="flex flex-col gap-2">
                    <span class="text-sm text-[#343434]/50"
                      >Выберите город</span
                    >
                    <div
                      @click="sityIdSelect = !sityIdSelect"
                      class="flex p-4 rounded-md border justify-between items-center cursor-pointer"
                    >
                      <span v-if="sityIdActive == null">Выберите город</span>
                      <span v-else>{{ sityNameActive }}</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6 text-main"
                        :class="[sityIdSelect == true ? 'rotate-180' : '']"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </div>
                  </div>

                  <div
                    v-if="sityIdSelect == true"
                    class=" py-[16px] flex flex-wrap gap-4 text-sm"
                  >
                    <div
                      v-for="sity in sityesInvitros.data"
                      :key="sity.id"
                      @click="scrollToArea(sity)"
                      class="border-[#343434]/10 cursor-pointer px-4 py-2 border-[1px]"
                      :class="[
                        sityIdActive == sity.id
                          ? 'bg-[#343434]/10'
                          : 'bg-[#343434]/5'
                      ]"
                    >
                      {{ sity.attributes.Name }}
                    </div>
                  </div>
                  <span v-else-if="sityesInvitros.data.length < 1"
                    >Ничего нет</span
                  >
                </div>
                <div class="flex flex-col gap-2">
                  <span class="text-sm font-normal text-[#343434]/50"
                    >Выберите офис</span
                  >
                  <div
                    @click="clinicIdSelect = !clinicIdSelect"
                    class="flex p-4 text-sm rounded-md border justify-between items-center cursor-pointer"
                  >
                    <span v-if="activeClinicInfo == null">Выберите офис</span>
                    <span v-else>{{ activeClinicInfo.Name }}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6 text-main"
                      :class="[clinicIdSelect == true ? 'rotate-180' : '']"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </div>
                </div>

                <div
                  v-if="sityesInvitro && clinicIdSelect == true"
                  id="scroll-to-area"
                  class="flex flex-col gap-1"
                >
                  <div
                    v-for="item in getAllClinics"
                    :key="item.id"
                    class="w-full flex flex-col gap-2"
                  >
                    <span class="text-right w-full text-main text-sm">
                      {{ item.attributes.Name }}</span
                    >

                    <div
                      v-for="clinic in item.attributes.goroda_invitros.data"
                      :key="clinic.id"
                      class="flex flex-col gap-1"
                      ref="Refclinic"
                    >
                      <div
                        class="text-sm flex justify-between items-center rounded-md border border-[#343434]/10 p-2"
                      >
                        <div class="flex items-center gap-1">
                          <svg
                            v-if="selectClinicId == clinic.id"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-4 h-4 text-main"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M4.5 12.75l6 6 9-13.5"
                            />
                          </svg>
                          <span
                            @click="scrollToAreaInfo(clinic)"
                            class="flex items-center pb-[1px] cursor-pointer"
                          >
                            {{ clinic.attributes.Name }}</span
                          >
                        </div>
                        <button
                          @click="handlerClinicMap(clinic.id)"
                          class="text-xs text-[#343434]/70"
                        >
                          <span v-if="activeClinicMap == clinic.id"
                            >Скрыть</span
                          >
                          <span v-else> На карте</span>
                        </button>
                      </div>
                      <div
                        class="w-full rounded-md overflow-hidden drop-shadow-lg"
                      >
                        <y-a-map
                          v-if="activeClinicMap == clinic.id"
                          :data_map="clinic.attributes"
                        />
                      </div>
                    </div>
                  </div>
                  <div v-if="activeClinicInfo !== null" id="area-info">
                    <div>
                      <span>{{ activeClinicInfo.Name }}</span>
                      <span>{{ activeClinicInfo.PnPt }}</span>
                      <span>{{ activeClinicInfo.Name }}</span>
                      <span>{{ activeClinicInfo.SbVs }}</span>
                    </div>
                  </div>
                </div>
                <!-- info clinic -->
                <div
                  class="flex flex-col gap-4"
                  v-if="activeClinicInfo !== null"
                >
                  <span class="text-xs text-main"
                    >Перед визитом в офис ИНВИТРО по данному адресу рекомендуем
                    ознакомиться с режимом его работы.</span
                  >
                  <div
                    class="border p-4 rounded-md border-[#343434]/20 flex flex-col gap-4"
                  >
                    <span
                      >г. {{ sityNameActive }},<br>
                      {{ activeClinicInfo.Name }}</span
                    >
                    <div class="text-[#343434]">
                      <span v-html="activeClinicInfo.GegimRaboty"></span>
                    </div>
                    <div class="mt-4 ">
                      <span class="text-[#76BB32]">Телефон</span>
                      <span
                        class="text-[#343434] underline underline-offset-4"
                        >{{ activeClinicInfo.Phone }}</span
                      >
                    </div>
                  </div>
                </div>
                <!-- end info clinic -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- корзина шаг 4 -->
    <div
      class="flex justify-center gap-[20px] items-center w-full sm:max-w-[420px]"
      v-if="step == 2"
    >
      <div>
        <div class="flex justify-end">
          <div class="w-full  bg-white    shadow-md rounded-md ">
            <div
              v-if="CART.length >= 1"
              class="w-full justify-center  text-sm bg-[#EDEDED] h-[48px] flex items-center uppercase"
            >
              <span>корзина</span>
            </div>
            <div
              v-if="CART.length >= 1"
              class=" flex flex-col gap-4 list-disc list-outside px-[24px] h-full "
            >
              <cart-item
                v-for="item in CART"
                :key="item.id"
                :itemInCart="item"
                @deleteFromCart="deleteFromCart(index)"
              />
              <div class="flex flex-col gap-4 ">
                <span
                  class="w-full text-center py-2  border-b-2 border-[#DDEEF6]"
                  >Взятие биоматериала</span
                >
                <div class="flex flex-col gap-2 ">
                  <cart-item-bio
                    v-for="(item, i) in bioMaterialsComplete"
                    :key="i"
                    :bio_data="item"
                  />
                </div>
              </div>
              <div class="my-[24px] flex flex-col gap-[24px]">
                <div class="flex justify-between items-end">
                  <span class="text-[14px]">ИТОГОВАЯ СТОИМОСТЬ: </span>
                  <span
                    v-if="totalpriceInCART && priceNotDiscounted"
                    class="flex flex-col gap-1 justify-end items-end text-sm font-bold"
                  >
                    <span
                      v-if="priceNotDiscounted != totalpriceInCART"
                      class="text-[#343434]/70 !text-sm line-through !font-normal"
                      >{{
                        priceNotDiscounted.toLocaleString('ru-RU')
                      }}
                      руб.</span
                    >
                    {{ totalpriceInCART.toLocaleString('ru-RU') }} руб.</span
                  >
                </div>
                <div class="flex flex-col justify-start items-start gap-1">
                  <span class="text-[14px]">Место сдачи анализа: </span>
                  <div
                    v-if="formZakaz.mesto == 'ofis_my'"
                    class="text-xs text-tem/70"
                  >
                    <span>В больнице:</span><br>
                    <span>{{activeOficInfo.attributes.Name}}</span> 
                    </div
                  >
                  <span
                    v-if="formZakaz.mesto == 'ofic'"
                    class="text-xs text-[#343434]/50 "
                  >
                    В офисе Инвитро:
                    <span class="" v-if="activeClinicInfo.Name !== null">
                      {{ activeClinicInfo.Name }}
                    </span>
                  </span>
                </div>
                <handler-promocode @setPromocode="getPromocode" />
                <div class="flex flex-col gap-[20px]">
                  <button
                    v-if="promocode"
                    @click="createOrder()"
                    class="rounded-md  border border-main h-[49px] hover:bg-main  anime text-main hover:text-white w-full flex justify-center items-center py-2 text-sm"
                  >
                    Отправить заявку
                  </button>
                  <button
                    v-else
                    class="opacity-50 cursor-not-allowed rounded-md  border border-main h-[49px] hover:bg-main  anime text-main hover:text-white w-full flex justify-center items-center py-2 text-sm"
                  >
                    Отправить заявку
                  </button>

                  <button
                    @click="addConsult()"
                    class="rounded-md border bg-main h-[49px] hover:bg-main/70  anime  text-white w-full flex justify-center items-center py-2 text-sm"
                  >
                    Получить консультацию
                  </button>
                </div>

                <span class="w-full text-center text-[#768C9F]/60 text-[12px]">
                  Оформляя заказ, Вы принимаете условия
                  <nuxt-link
                    to="/soglashenie"
                    class="underline underline-offset-2 text-[#768C9F]/90 text-[12px]"
                    >Соглашения</nuxt-link
                  >
                  об обработке персональных данных
                </span>
              </div>
            </div>

            <div v-else class="bg-white p-[24px] flex flex-col gap-[24px]">
              <span
                class="text-[#A55B4A] text-sm font-medium w-full text-center"
              >
                Ваша корзина пуста.
              </span>
              <span class="text-[14px]"
                >Впишите нужное исследование в поисковую строку или перейдите в
                раздел “Анализы”</span
              >
              <button>
                <nuxt-link
                  to="/all-analyzes"
                  class="rounded-md border border-main h-[49px] hover:bg-main  anime text-main hover:text-white w-full flex justify-center items-center py-2 text-sm"
                  >Анализы</nuxt-link
                >
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex w-full gap-4 justify-center items-center">
      <div v-if="step == 1" class="w-full flex justify-end">
        <button
          @click="nextStep()"
          v-if="formZakaz.mesto == 'ofis_my'"
          class="text-sm text-[#343434] hover:text-main  flex gap-2 items-center"
        >
          Дальше
          <img src="~/assets/icons/arrow-back.svg" alt="" class="rotate-180" />
        </button>
        <button
          @click="nextStep()"
          v-else-if="formZakaz.mesto == 'ofic' && activeClinicInfo !== null"
          class="text-sm text-[#343434] hover:text-main  flex gap-2 items-center"
        >
          Дальше
          <img src="~/assets/icons/arrow-back.svg" alt="" class="rotate-180" />
        </button>
      </div>
      <div v-else-if="step == 2" class="w-full flex justify-start">
        <button
          @click="backStep()"
          class="text-sm text-[#343434] hover:text-main flex gap-2 items-center justify-start"
        >
          <img src="~/assets/icons/arrow-back.svg" alt="" />
          Назад
        </button>
      </div>
    </div>

    <div
      v-if="modalConsul == true"
      class="fixed flex justify-center items-center bg-[#343434]/40  w-screen h-screen left-0 top-0  z-[1] backdrop-blur-sm"
    >
      <div
        class="w-[400px] h-auto z-[8] bg-white p-4 rounded-md shadow-md flex flex-col gap-4 justify-center items-center fixed"
      >
        <span class="w-full text-center text-[24px]"
          >Получить консультацию</span
        >
        <input
          type="text"
          placeholder="Имя"
          v-model="formZakaz.name"
          :class="[
            formZakaz.name.length <= 0
              ? ' !focus:outline-[#A55B4A] !border-[#A55B4A]'
              : '!border-[green] !focus:outline-[green]'
          ]"
          class=" input-med w-full max-w-[250px]"
        />
        <input
          type="text"
          placeholder="+7(___)___−__−__*"
          v-facade="'+7(###)###-##-##'"
          v-model="formZakaz.phone"
          :class="[
            formZakaz.phone.length !== 16
              ? ' !focus:outline-[#A55B4A] !border-[#A55B4A]'
              : '!border-[green] !focus:outline-[green]'
          ]"
          class=" input-med w-full max-w-[250px]"
        />
        <span v-if="status == true">Сообщение успешно отправлено</span>
        <span v-else-if="errors.length">{{ status }}</span>
        <button
          v-show="
            formZakaz.name.length !== 0 &&
              formZakaz.phone.length === 16 &&
              status == false
          "
          @click="ConsultZayavka()"
          class="rounded-md  border border-main h-[49px] hover:bg-main  anime text-main hover:text-white w-full max-w-[250px] flex justify-center items-center py-2 text-sm"
        >
          Отправить
        </button>
        <svg
          v-show="status == true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
          class="h-6 w-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M5 13l4 4L19 7"
          ></path>
        </svg>
        <span @click="modalConsul = !modalConsul" class="cursor-pointer"
          >Закрыть</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import CartItem from '~/components/cart/CartItem.vue'
import TabLogin from '~/components/tabs/tab-login.vue'
import tabsLogin from '~/components/tabs/tabs-login.vue'

import GET_SITIES from '~/graphql/cart/get-all-invitro.gql'
import GET_SITY_ID from '~/graphql/cart/get-areas-invitro.gql'
import HandlerPromocode from '~/components/cart/HandlerPromocode.vue'
import SET_USER_TO_VRACH from '~/graphql/cart/SET_USER_TO_VRACH.gql'
import CREATE_ORDER_CART from '~/graphql/cart/CREATE_ORDER_CART.gql'
import GbList from '~/components/cart/gb-list.vue'
import CreateUser from '~/components/cart/create-user.vue'
import YAMap from '../../components/y-a-map.vue'

export default {
  layout: 'MainLayout',
  components: {
    CartItem,
    tabsLogin,
    TabLogin,
    HandlerPromocode,
    GbList,
    CreateUser,
    YAMap
  },
  apollo: {
    sityesInvitros: {
      query: GET_SITIES,
      prefetch: true
    },
    sityesInvitro: {
      query: GET_SITY_ID,
      prefetch: true,
      variables () {
        return {
          ID: this.sityIdActive
        }
      }
    }
  },
  data () {
    return {
      typePassword: 'password',
      start: 0,
      step: 0,
      activeClinicMap: null,
      sityIdActive: 1,
      sityNameActive: 'Ростов-н/Д',
      sityIdSelect: false,
      selectClinicId: null,
      clinicIdSelect: false,
      activeClinicInfo: null,
      activeOficInfo: null,
      promocode: null,
      pacientsForDoctor: null,
      DoctorID: null,
      totalpriceInCART: null,
      priceNotDiscounted: null,
      modalInvitro: false,
      modalConsul: false,
      register: true,
      auth: false,
      formZakaz: {
        mesto: 'ofic'
      },
      confirmEmail: false,
      dopTest: [],
      totalCartPrice: null,
      prePrice: null,
      preMaterial: [],
      medSestra: false,
      errors: [],
      status: false,
      modalOrderOpen: true,
      password: '',
      credentials: {
        identifier: '',
        password: ''
      },
      credentials2: {
        identifier: '',
        password: ''
      },
      okeyRegister: false,
      succes: '',
      succesRegister: null,
      dataMe: [],
      loginError: false
    }
  },
  methods: {
    handlerClinicMap (id) {
      if (this.activeClinicMap !== id) {
        this.activeClinicMap = id
      } else {
        this.activeClinicMap = null
      }
    },
    handlerOfic(id){
      this.activeOficInfo = id
    },
    async handleLoginSubmit () {
      const getPhone = this.credentials.identifier
        .replaceAll('-', '')
        .replace('(', '')
        .replace(')', '')
        .replaceAll(' ', '')
      this.formBusy = true
      try {
        await this.$auth.loginWith('graphql', {
          identifier: getPhone,
          password: this.credentials.password
        })

        this.formBusy = false
      } catch (errors) {
        this.formBusy = false
        // Handle errors
      }
    },
    async handleLoginSubmit2 () {
      const getPhone = this.credentials2.identifier
      this.formBusy = true
      try {
        await this.$auth.loginWith('graphql', {
          identifier: getPhone,
          password: this.credentials2.password
        })

        this.formBusy = false
      } catch (errors) {
        this.formBusy = false
        // Handle errors
      }
    },
    show_hide_password () {
      if (this.typePassword == 'password') {
        this.typePassword = 'text'
      } else {
        this.typePassword = 'password'
      }
      return false
    },
    nextStep () {
      if (this.step == 1) {
        this.validUserCheck()
      }
      this.step++

      window.scrollTo(0, -50)
    },
    backStep () {
      this.step--
      window.scrollTo(0, -50)
    },
    RegisterUser () {
      if (
        this.formCreate.phone.length == 16 &&
        this.formCreate.password.length >= 8 &&
        this.formCreate.password == this.formCreate.ConfPassword &&
        this.formCreate.family.length > 1 &&
        this.formCreate.name.length > 1 &&
        this.formCreate.otchestvo.length > 1 &&
        this.formCreate.passportSeriya.length == 11
      ) {
      }
    },
    closeCart () {
      this.$emit('cartView')
    },
    ...mapActions(['DELETE_FROM_CART', 'RESET_CART']),
    deleteFromCart (index) {
      this.DELETE_FROM_CART(index)
      console.log('delete: ' + index)
    },
    resetCart () {
      this.RESET_CART()
    },
    createOrder () {
      const UID = Math.floor(Math.random() * 1000)
      const UID2 = Math.floor(Math.random() * 1000)
      const UID3 = this.$auth.user.id
        .concat(UID)
        .concat(UID2)
        .toString()

      const allAnalizies = this.CART.map(item => item.id)

      const order = {
        SummOrder: this.totalpriceInCART,
        UID: UID3,
        analizies: allAnalizies,
        user: this.$auth.user.id,
        office: this.selectClinicId
      }

      this.$apollo
        .mutate({
          mutation: CREATE_ORDER_CART,
          variables: {
            UID: order.UID,
            ANALIZES: order.analizies,
            USER: order.user,
            SUMM: order.SummOrder,
            OFFICE: order.office
          }
        })
        .then(({ data }) => {
          this.$router.push({
            path: '/cart/thanks',
            query: { id: data.createOrder.data.attributes.UID }
          })
          this.AddPacientToDoctor()
          this.RESET_CART()
        })
    },
    AddPacientToDoctor () {
      const allPacientsOnDoctor = this.pacientsForDoctor
      allPacientsOnDoctor.push(this.$auth.user.id)
      this.$apollo.mutate({
        mutation: SET_USER_TO_VRACH,
        variables: {
          ID_VRACH: this.DoctorID,
          ID_USERS: allPacientsOnDoctor
        }
      })
    },
    async handleLogoutZakaz () {
      this.$nuxt.$loading.start()
      await this.$auth.logout()
    },

    async onLogout () {
      await this.$apolloHelpers.onLogout()
      this.isAuthenticated = false
    },
    closeLogin () {
      this.$emit('loginView')
    },
    validUserCheck () {
      if (!this.$auth.loggedIn) {
        console.log('не авторизован')
      } else {
        console.log('Авторизован')
        this.step = 1
      }
    },

    reloadPage () {
      location.reload()
    },
    modalInvitroView () {
      this.modalInvitro = !this.modalInvitro
    },
    scrollToArea (id) {
      this.sityIdActive = id.id
      this.sityNameActive = id.attributes.Name
      this.sityIdSelect = false
    },
    scrollToAreaInfo (clinic) {
      this.selectClinicId = clinic.id
      this.activeClinicInfo = clinic.attributes
      this.clinicIdSelect = false
    },
    getPromocode (pacients, promo, id) {
      if (promo !== null) {
        this.promocode = promo
        this.pacientsForDoctor = pacients
        this.DoctorID = id
      } else {
        this.promocode = null
        this.pacientsForDoctor = null
      }
      this.reTotalPrice()
    },
    reTotalPrice () {
      let result = this.CART.reduce((prev, item) => {
        return prev + parseInt(item.attributes.Price)
      }, 0)
      let totalPriceInCartReduce = this.bioMaterialsComplete.reduce(
        (prev, item) => {
          return prev + parseInt(item.price)
        },
        result
      )
      this.totalpriceInCART =
        this.promocode !== null
          ? totalPriceInCartReduce - (totalPriceInCartReduce / 100) * 10
          : totalPriceInCartReduce
      this.priceNotDiscounted = totalPriceInCartReduce
    }
  },
  layout: 'MainLayout',
  computed: {
    ...mapGetters(['CART', 'GET_ALL_BIOMATERIALS']),
    getOneClinicInfo () {
      return 1
    },
    getAllClinics () {
      const data = this.sityesInvitro.data.attributes.area_invitros.data
      return data
    },
    bioMaterialsComplete: function () {
      const allBio = []
      this.CART.forEach(cart => {
        cart.attributes.biomaterialies.data.forEach(x => {
          const biomaterial = {
            id: x.id,
            name: x.attributes.Name,
            price: x.attributes.Price
          }
          allBio.push(biomaterial)
        })
      })

      let biomaterialsFiltered = allBio.reduce(
        (acc, item) =>
          acc.map[item.id]
            ? acc
            : ((acc.map[item.id] = true),
              acc.biomaterialsFiltered.push(item),
              acc),
        {
          map: {},
          biomaterialsFiltered: []
        }
      ).biomaterialsFiltered

      return biomaterialsFiltered
    }
  },
  mounted () {
    this.validUserCheck()
  },
  created () {
    this.reTotalPrice()
  },
  watch: {
    promocode () {
      return this.reTotalPrice()
    },
    'credentials2.identifier' () {
      if (this.credentials2.identifier.includes('@')) {
        this.confirmEmail = true
      } else {
        this.confirmEmail = false
      }
    }
  }
}
</script>

<style></style>
