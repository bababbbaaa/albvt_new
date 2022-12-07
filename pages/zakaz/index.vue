<template>
  <div
    class="container grid grid-cols-1 sm:grid-cols-[6fr,3fr,4fr] lg:grid-cols-[6fr,2fr,4fr] sm:gap-[20px] w-full pt-[47px] justify-between"
  >
    <div class="flex flex-col gap-[20px]">
      <div class="flex flex-col gap-[20px]">
        <h2
          class="text-[24px] font-medium text-center sm:text-right"
          v-show="!$auth.loggedIn"
        >
          Заполните форму для подачи online заявки
        </h2>
        <div
          v-show="register == false && !$auth.loggedIn"
          class="bg-white  shadow-md rounded-[5px] p-[24px] flex justify-center items-center  mt-24px"
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
          <span
            >Для оформления заказа необходимо <br />
            <span>авторизоваться</span>
            или
            <button
              @click="register = true"
              class="underline underline-offset-2 text-[#A75F4F]"
            >
              зарегистрироваться.
            </button>
          </span>
        </div>
        <div
          v-if="$auth.loggedIn"
          class="capitalize bg-white  shadow-md rounded-[5px] p-[24px] flex flex-col items-start gap-4 mt-24px"
        >
          <div>
            Привет,
            <b
              >{{ this.$auth.$state.user.firstName }}
              {{ this.$auth.$state.user.lastName }}</b
            >
          </div>
        </div>
        <div
          v-if="register == false && !$auth.loggedIn"
          class="capitalize bg-white  shadow-md rounded-[5px] p-[24px] flex w-full mb-[24px] sm:w-1/2 flex-col justify-center items-center gap-4 mt-24px"
        >
          <span>Авторизация</span>
          <div>
            <tabs-login>
      <tab-login title="По телефону">
         <!-- телефон -->
      <form @submit.prevent="handleLoginSubmit3()" class="flex flex-col gap-4">
        
        <div class="flex flex-col items-start justify-start gap-2 w-full ">
          <!-- <label for="login" class="text-[14px]">Логин</label> -->
          <input
            type="text"
            value="ofis_my"
            placeholder="+7(___)___−__−__*"
            v-facade="'+7(###)###-##-##'"
            v-model="credentials.username"
            class="w-full bg-white p-2 border-[1px] border-[#AEAEAE] rounded-[5px] focus:outline-[#8a8a8a]"
            id="login"
          />
        </div>
        <div class="flex flex-col items-start justify-start gap-2 w-full ">
          <!-- <label for="pass" class="text-[14px]">Пароль</label> -->
          <input
            type="password"
            placeholder="Пароль"
            value="ofis_my"
            v-model="credentials.password"
            class="w-full bg-white p-2 border-[1px] border-[#AEAEAE] rounded-[5px] focus:outline-[#8a8a8a]"
            id="pass"
          />
        </div>
        <div class="flex flex-col items-center justify-center gap-2">
          <button
            type="submit"
            class="rounded-[5px] border border-main h-[49px] hover:bg-main  anime text-main hover:text-white w-full flex justify-center items-center py-2 text-[16px]"
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
         <!-- email -->
      <form @submit.prevent="handleLoginSubmit2()" class="flex flex-col gap-4">
        
        <div class="flex flex-col items-start justify-start gap-2 w-full ">
          <!-- <label for="login" class="text-[14px]">Логин</label> -->
          <input
            type="text"
            placeholder="email"
            v-model="credentials2.username"
            class="w-full bg-white p-2 border-[1px] border-[#AEAEAE] rounded-[5px] focus:outline-[#8a8a8a]"
            id="login2"
          />
        </div>
        <div class="flex flex-col items-start justify-start gap-2 w-full ">
          <!-- <label for="pass" class="text-[14px]">Пароль</label> -->
          <input
            type="password"
            placeholder="Пароль"
            v-model="credentials2.password"
            class="w-full bg-white p-2 border-[1px] border-[#AEAEAE] rounded-[5px] focus:outline-[#8a8a8a]"
            id="pass2"
          />
        </div>
        <div class="flex flex-col items-center justify-center gap-2">
          <button
            type="submit"
            class="rounded-[5px] border border-main h-[49px] hover:bg-main  anime text-main hover:text-white w-full flex justify-center items-center py-2 text-[16px]"
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
          <div @click="closeLogin()">
            <nuxt-link to="/register" class="text-[#343434] w-full text-center"
              >Регистрация</nuxt-link
            >
          </div>
        </div>
      </form>
      </tab-login>
    </tabs-login>
          </div>
        </div>

        <!-- форма заявки -->
        <!-- открывается только по нажатию "зарегистрироваться" -->
        <div
          v-if="register == true || $auth.loggedIn"
          class="bg-white  shadow-md rounded-[5px] p-[24px] flex flex-col gap-[20px] mt-24px"
        >
          <form @submit.prevent="oplata()" class="flex flex-col gap-4">
            <div class="flex flex-col">
              <div
                class=" py-[16px] flex flex-col gap-4 text-[16px] font-light"
              >
                <span class="text-[#A55B4A] text-[16px] "
                  >Место сдачи анализов</span
                >
                <div class="flex gap-4 flex-wrap sm:flex-nowrap">
                  <div class="flex items-center gap-4 w-full sm:w-1/4">
                    <input
                      checked="checked"
                      type="radio"
                      value="ofis_my"
                      v-model="formZakaz.mesto"
                      id="mesto1"
                      class=""
                    />
                    <label for="mesto1" class="text-[14px]"
                      >У нас в офисе</label
                    >
                  </div>
                  <div class="flex items-center gap-4 w-full sm:w-1/4">
                    <input
                      type="radio"
                      value="sam"
                      v-model="formZakaz.mesto"
                      id="mesto2"
                      class=""
                    />
                    <label for="mesto2" class="text-[14px]">На дому</label>
                  </div>
                  <div class="flex items-center gap-4  w-full sm:w-2/4">
                    <input
                      type="radio"
                      value="ofic"
                      v-model="formZakaz.mesto"
                      id="mesto3"
                      class=""
                    />
                    <label for="mesto3" class="text-[14px]"
                      >В офисе нашего партнера ИНВИТРО, но по
                      <span class="text-main">НАШИМ</span> низким ценам</label
                    >
                  </div>
                </div>
              </div>
              <div>
                <div v-if="formZakaz.mesto == 'ofis_my'">
                  <div
                    class=" py-[16px] flex flex-col gap-4 text-[16px] font-light"
                  >
                    <div
                      class="input-med flex justify-between items-center h-[50px]"
                    >
                      <span class="text-[12px]"
                        >г. Ростов-на-Дону, ул. Восточная, 11. (Кировский
                        р-он)</span
                      >
                      <a
                        href="https://2gis.ru/rostov/firm/70000001044917415"
                        target="_blank"
                        class="px-4 text-center border-l-[0.5px] text-[12px] sm:text-[14px] border-[#343434]/70 hover:text-main"
                        >На карте</a
                      >
                    </div>
                    <span class="text-[#A55B4A] text-[16px] "
                      >Кто будет сдавать анализы?</span
                    >

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-[20px]">
                      <input
                        @input="doneformZakazZakaz()"
                        required
                        type="text"
                        placeholder="Фамилия*"
                        v-model="formZakaz.family"
                        :class="[
                          this.formZakaz.family.length == 0
                            ? ' !focus:outline-[#A55B4A] !border-[#A55B4A]'
                            : '!border-[green] !focus:outline-[green]'
                        ]"
                        class=" input-med "
                      />
                      <input
                        @input="doneformZakazZakaz()"
                        required
                        type="text"
                        v-model="formZakaz.name"
                        placeholder="Имя*"
                        :class="[
                          this.formZakaz.name.length == 0
                            ? ' !focus:outline-[#A55B4A] !border-[#A55B4A]'
                            : '!border-[green] !focus:outline-[green]'
                        ]"
                        class=" input-med "
                      />
                      <input
                        @input="doneformZakazZakaz()"
                        required
                        type="text"
                        placeholder="Отчество*"
                        v-model="formZakaz.otchestvo"
                        :class="[
                          this.formZakaz.otchestvo.length == 0
                            ? ' !focus:outline-[#A55B4A] !border-[#A55B4A]'
                            : '!border-[green] !focus:outline-[green]'
                        ]"
                        class=" input-med "
                      />
                      <input
                        @input="doneformZakazZakaz()"
                        required
                        type="text"
                        v-facade="'##.##.####'"
                        placeholder="Дата рождения*"
                        v-model="formZakaz.dataRozhdeniya"
                        :class="[
                          this.formZakaz.dataRozhdeniya.length !== 10
                            ? ' !focus:outline-[#A55B4A] !border-[#A55B4A]'
                            : '!border-[green] !focus:outline-[green]'
                        ]"
                        class=" input-med "
                      />
                    </div>
                    <div
                      class="flex items-center gap-4 mt-2 flex-wrap sm:flex-nowrap"
                    >
                      <div class="flex items-center gap-2 w-full sm:w-1/4">
                        <input
                          type="radio"
                          checked="checked"
                          value="male"
                          v-model="formZakaz.gender"
                          id="gender1"
                          class=""
                        />
                        <label for="gender1" class="text-[14px]">Мужчина</label>
                      </div>
                      <div class="flex items-center gap-2 w-full sm:w-1/4">
                        <input
                          type="radio"
                          value="female"
                          v-model="formZakaz.gender"
                          id="gender2"
                          class=""
                        />
                        <label for="gender2" class="text-[14px]">Женщина</label>
                      </div>
                      <div class="flex items-center gap-2 w-full sm:w-2/4">
                        <input
                          type="checkbox"
                          value="femalemale"
                          id="gender3"
                          v-model="formZakaz.genderDop"
                          class=""
                        />
                        <label for="gender3" class="text-[14px]"
                          >Пациент придёт с представителем</label
                        >
                      </div>
                    </div>
                  </div>
                  <!-- паспорт -->
                  <div
                    class=" py-[16px] flex flex-col gap-4 text-[16px] font-light"
                  >
                    <span class="text-[#A55B4A] text-[16px] "
                      >Укажите паспортные данные и желаемую дату сдачи
                      анализов</span
                    >
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-[20px]">
                      <input
                        @input="doneformZakazZakaz()"
                        type="text"
                        required="required"
                        placeholder="Паспорт (серия/номер)*"
                        v-facade="'#### ######'"
                        v-model="formZakaz.passportSeriya"
                        :class="[
                          this.formZakaz.passportSeriya.length !== 11
                            ? ' !focus:outline-[#A55B4A] !border-[#A55B4A]'
                            : '!border-[green] !focus:outline-[green]'
                        ]"
                        class=" input-med "
                      />
                      <input
                        @input="doneformZakazZakaz()"
                        type="text"
                        required="required"
                        placeholder="Паспорт (дата выдачи)* "
                        v-facade="'##.##.####'"
                        v-model="formZakaz.passportData"
                        :class="[
                          this.formZakaz.passportData.length !== 10
                            ? ' !focus:outline-[#A55B4A] !border-[#A55B4A]'
                            : '!border-[green] !focus:outline-[green]'
                        ]"
                        class=" input-med "
                      />
                      <input
                        @input="doneformZakazZakaz()"
                        type="text"
                        required="required"
                        placeholder="Паспорт (кем выдан)*"
                        v-model="formZakaz.passportKem"
                        :class="[
                          this.formZakaz.passportKem.length <= 1
                            ? ' !focus:outline-[#A55B4A] !border-[#A55B4A]'
                            : '!border-[green] !focus:outline-[green]'
                        ]"
                        class=" input-med "
                      />
                      <input
                        @input="doneformZakazZakaz()"
                        type="text"
                        required="required"
                        placeholder="Дата сдачи анализов*"
                        v-facade="'##.##.####'"
                        v-model="formZakaz.dataSdachi"
                        :class="[
                          this.formZakaz.dataSdachi.length !== 10
                            ? ' !focus:outline-[#A55B4A] !border-[#A55B4A]'
                            : '!border-[green] !focus:outline-[green]'
                        ]"
                        class=" input-med "
                      />
                    </div>
                  </div>
                  <!-- контакты -->
                  <div
                    class=" py-[16px] flex flex-col gap-4 text-[16px] font-light"
                  >
                    <span class="text-[#A55B4A] text-[16px] "
                      >Контакты для связи с Вами</span
                    >
                    <div class="grid grid-cols-1  sm:grid-cols-2 gap-[20px]">
                      <div class="flex flex-col gap-4">
                        <input
                          @input="doneformZakazZakaz()"
                          type="email"
                          required="required"
                          placeholder="E-mail*"
                          v-model="formZakaz.email"
                          id="us-phone-number-ex"
                          :class="[
                            this.formZakaz.email.length <= 6
                              ? ' !focus:outline-[#A55B4A] !border-[#A55B4A]'
                              : '!border-[green] !focus:outline-[green]'
                          ]"
                          class=" input-med "
                        />
                        <span class="text-[12px]"
                          >На эту почту будут отправлены результаты
                          анализов</span
                        >
                      </div>
                      <div class="flex flex-col gap-4">
                        <input
                          @input="doneformZakazZakaz()"
                          type="text"
                          required="required"
                          id="us-phone-number-ex2"
                          v-model="formZakaz.phone"
                          name="phone"
                          placeholder="+7(___)___−__−__*"
                          v-facade="'+7(###)###-##-##'"
                          :class="[
                            this.formZakaz.phone.length !== 16
                              ? ' !focus:outline-[#A55B4A] !border-[#A55B4A]'
                              : '!border-[green] !focus:outline-[green]'
                          ]"
                          class=" input-med "
                        />
                        <span class="text-[12px]"
                          >Этот номер будет использоваться в качестве логина для
                          доступа в личный кабинет</span
                        >
                      </div>
                    </div>
                  </div>
                  <!-- аккаунт -->
                  <div
                    class=" py-[16px] flex flex-col gap-4 text-[16px] font-light"
                    v-if="!$auth.loggedIn"
                  >
                    <span class="text-[#A55B4A] text-[16px] "
                      >Данные для входа в личный кабинет</span
                    >
                    <div class="grid grid-cols-1  sm:grid-cols-2 gap-[20px]">
                      <div class="flex flex-col gap-4">
                        <input
                          @input="doneformZakazZakaz()"
                          type="password"
                          required="required"
                          id="us-phone-number-password"
                          v-model="credentials.password"
                          name="phone"
                          placeholder="Придумайте пароль"
                          :class="[
                            this.credentials.password.length <= 8
                              ? ' !focus:outline-[#A55B4A] !border-[#A55B4A]'
                              : '!border-[green] !focus:outline-[green]'
                          ]"
                          class=" input-med "
                        />
                        <span class="text-[12px]"
                          >Этот пароль будет использоваться для доступа в личный
                          кабинет</span
                        >
                      </div>

                      <button
                        v-if="succes == false && !$auth.loggedIn"
                        @click="RegisterUser()"
                        class="text-[12px] xl:text-[14px] text-white bg-main hover:text-main hover:bg-white font-light px-[14px] py-[14px]  w-full  sm:flex sm:items-center sm:justify-center  border-[0.5px] border-main rounded-[5px] h-[50px]"
                      >
                        Зарегистрироваться и войти
                      </button>
                      <div
                        v-else
                        class="text-[14px] xl:text-[16px] text-white bg-green  hover:bg-white font-light px-[14px] py-[14px]  w-full  sm:flex sm:items-center sm:justify-center    rounded-[5px] h-[50px]"
                      ></div>
                      Успешно
                    </div>
                  </div>
                </div>
                <div v-if="formZakaz.mesto == 'sam'">
                  <div
                    class=" py-[16px] flex flex-col gap-4 text-[16px] font-light"
                  >
                    <span class="text-[#A55B4A] text-[16px] "
                      >Кто будет сдавать анализы?</span
                    >
                    <div class="grid  grid-cols-1 sm:grid-cols-2 gap-[20px]">
                      <input
                        @input="doneformZakazZakaz()"
                        required
                        type="text"
                        placeholder="Фамилия*"
                        v-model="formZakaz.family"
                        :class="[
                          this.formZakaz.family.length <= 1
                            ? ' !focus:outline-[#A55B4A] !border-[#A55B4A]'
                            : '!border-[green] !focus:outline-[green]'
                        ]"
                        class=" input-med "
                      />
                      <input
                        @input="doneformZakazZakaz()"
                        required
                        type="text"
                        v-model="formZakaz.name"
                        placeholder="Имя*"
                        :class="[
                          this.formZakaz.name.length <= 1
                            ? ' !focus:outline-[#A55B4A] !border-[#A55B4A]'
                            : '!border-[green] !focus:outline-[green]'
                        ]"
                        class=" input-med "
                      />
                      <input
                        @input="doneformZakazZakaz()"
                        required
                        type="text"
                        placeholder="Отчество*"
                        v-model="formZakaz.otchestvo"
                        :class="[
                          this.formZakaz.otchestvo.length <= 1
                            ? ' !focus:outline-[#A55B4A] !border-[#A55B4A]'
                            : '!border-[green] !focus:outline-[green]'
                        ]"
                        class=" input-med "
                      />
                      <input
                        @input="doneformZakazZakaz()"
                        required
                        type="text"
                        v-facade="'##.##.####'"
                        placeholder="Дата рождения*"
                        v-model="formZakaz.dataRozhdeniya"
                        :class="[
                          this.formZakaz.dataRozhdeniya.length !== 10
                            ? ' !focus:outline-[#A55B4A] !border-[#A55B4A]'
                            : '!border-[green] !focus:outline-[green]'
                        ]"
                        class=" input-med "
                      />
                    </div>
                    <div
                      class="flex items-center gap-4 mt-2 flex-wrap sm:flex-nowrap"
                    >
                      <div class="flex items-center gap-4 ">
                        <input
                          type="radio"
                          value="male"
                          v-model="formZakaz.gender"
                          id="gender1"
                          class=""
                        />
                        <label for="gender1" class="text-[14px]">Мужчина</label>
                      </div>
                      <div class="flex items-center gap-4 ">
                        <input
                          type="radio"
                          value="female"
                          v-model="formZakaz.gender"
                          id="gender2"
                          class=""
                        />
                        <label for="gender2" class="text-[14px]">Женщина</label>
                      </div>
                    </div>
                  </div>
                  <div
                    class=" py-[16px] flex flex-col gap-4 text-[16px] font-light"
                  >
                    <span class="text-[#A55B4A] text-[16px] "
                      >Укажите Ваш адрес и желаемую дату сдачи анализов</span
                    >
                    <div class="grid  grid-cols-1 sm:grid-cols-2 gap-[20px]">
                      <div
                        class="bg-white flex items-center p-2 border-[1px] border-[#AEAEAE] rounded-[5px] focus:outline-[#8a8a8a]"
                      >
                        г. Ростов-на-Дону
                      </div>
                      <input
                        @input="doneformZakazZakaz()"
                        type="text"
                        required="required"
                        placeholder="Улица*"
                        class=" input-med "
                        v-model="formZakaz.ulitcha"
                        :class="[
                          this.formZakaz.dataRozhdeniya.length <= 1
                            ? ' !focus:outline-[#A55B4A] !border-[#A55B4A]'
                            : '!border-[green] !focus:outline-[green]'
                        ]"
                      />
                      <input
                        @input="doneformZakazZakaz()"
                        type="text"
                        required="required"
                        placeholder="Номер дома*"
                        class=" input-med "
                        v-model="formZakaz.nomerDoma"
                        :class="[
                          this.formZakaz.nomerDoma.length <= 1
                            ? ' !focus:outline-[#A55B4A] !border-[#A55B4A]'
                            : '!border-[green] !focus:outline-[green]'
                        ]"
                      />
                      <input
                        @input="doneformZakazZakaz()"
                        type="text"
                        placeholder="Квартира(если есть)"
                        class=" input-med "
                        v-model="formZakaz.kvartira"
                      />
                      <input
                        @input="doneformZakazZakaz()"
                        type="text"
                        required="required"
                        placeholder="Паспорт (кем выдан)*"
                        v-model="formZakaz.passportKem"
                        :class="[
                          this.formZakaz.passportKem.length <= 1
                            ? ' !focus:outline-[#A55B4A] !border-[#A55B4A]'
                            : '!border-[green] !focus:outline-[green]'
                        ]"
                        class=" input-med "
                      />
                      <input
                        @input="doneformZakazZakaz()"
                        type="text"
                        required="required"
                        placeholder="Дата сдачи анализов*"
                        v-facade="'##.##.####'"
                        class=" input-med "
                        v-model="formZakaz.dataSdachi"
                      />
                    </div>
                  </div>
                  <div
                    class=" py-[16px] flex flex-col gap-4 text-[16px] font-light"
                  >
                    <span class="text-[#A55B4A] text-[16px] "
                      >Контакты для связи с Вами</span
                    >
                    <div class="grid  grid-cols-1 sm:grid-cols-2 gap-[20px]">
                      <input
                        @input="doneformZakazZakaz()"
                        type="email"
                        required="required"
                        placeholder="E-mail*"
                        v-model="formZakaz.email"
                        id="us-phone-number-ex"
                        :class="[
                          this.formZakaz.email.length <= 6
                            ? ' !focus:outline-[#A55B4A] !border-[#A55B4A]'
                            : '!border-[green] !focus:outline-[green]'
                        ]"
                        class=" input-med "
                      />
                      <input
                        @input="doneformZakazZakaz()"
                        type="text"
                        required="required"
                        id="us-phone-number-ex2"
                        v-model="formZakaz.phone"
                        name="phone"
                        placeholder="+7(___)___−__−__*"
                        v-facade="'+7(###)###-##-##'"
                        :class="[
                          this.formZakaz.phone.length !== 16
                            ? ' !focus:outline-[#A55B4A] !border-[#A55B4A]'
                            : '!border-[green] !focus:outline-[green]'
                        ]"
                        class=" input-med "
                      />
                    </div>
                  </div>
                  <!-- аккаунт -->
                  <div
                    class=" py-[16px] flex flex-col gap-4 text-[16px] font-light"
                    v-if="!$auth.loggedIn"
                  >
                    <span class="text-[#A55B4A] text-[16px] "
                      >Данные для входа в личный кабинет</span
                    >
                    <div class="grid grid-cols-1  sm:grid-cols-2 gap-[20px]">
                      <div class="flex flex-col gap-4">
                        <input
                          @input="doneformZakazZakaz()"
                          type="password"
                          required="required"
                          id="us-phone-number-password"
                          v-model="credentials.password"
                          name="phone"
                          placeholder="Придумайте пароль"
                          :class="[
                            this.credentials.password.length <= 8
                              ? ' !focus:outline-[#A55B4A] !border-[#A55B4A]'
                              : '!border-[green] !focus:outline-[green]'
                          ]"
                          class=" input-med "
                        />
                        <span class="text-[12px]"
                          >Этот пароль будет использоваться для доступа в личный
                          кабинет</span
                        >
                      </div>

                      <button
                        v-if="succes == false && !$auth.loggedIn"
                        @click="RegisterUser()"
                        class="text-[12px] xl:text-[14px] text-white bg-main hover:text-main hover:bg-white font-light px-[14px] py-[14px]  w-full  sm:flex sm:items-center sm:justify-center  border-[0.5px] border-main rounded-[5px] h-[50px]"
                      >
                        Зарегистрироваться и войти
                      </button>
                    </div>
                  </div>
                </div>
                <div v-if="formZakaz.mesto == 'ofic'">
                  <div
                    class=" py-[16px] flex flex-col gap-4 text-[16px] font-light"
                  >
                    <div class="relative">
                      <div
                        class="w-full mb-4  px-2  py-3 items-center border-[1px] border-[#AEAEAE] rounded-[5px] grid gap-[20px]"
                      >
                        <div
                          @click="
                            formZakaz.showInvitro = !formZakaz.showInvitro
                          "
                          class="cursor-pointer flex justify-between items-center"
                        >
                          <span>{{ formZakaz.invitroSelect }}</span>
                          <img
                            v-if="formZakaz.showInvitro"
                            src="/img/icons/arrow.svg"
                            alt=""
                            class="rotate-90 mr-2"
                          />
                          <img
                            v-else
                            src="/img/icons/arrow.svg"
                            alt=""
                            class="mr-2"
                          />
                        </div>
                        <div
                          class="rounded-[5px]  grid  grid-cols-1 sm:grid-cols-2 gap-[10px]"
                          v-show="formZakaz.showInvitro"
                        >
                          <div
                            v-for="(item, i) in formZakaz.invitro"
                            :key="i"
                            :id="item.name"
                            class="invitro px-2 border-[1px] border-[#AEAEAE]  rounded-[5px] flex justify-between items-center  h-[48px] hover:shadow-lg anime cursor-pointer text-[14px]"
                            @click="selectInvitroAdd(item)"
                          >
                            <span
                              class="h-full flex items-center text-[12px]"
                              >{{ item.name }}</span
                            >
                            <span
                              class="border-l-[1px] border-[#AEAEAE] pl-2 h-full flex items-center text-[12px]"
                              >{{ item.time }}</span
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                    <span class="text-[#A55B4A] text-[16px] "
                      >Кто будет сдавать анализы?</span
                    >
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-[20px]">
                      <input
                        @input="doneformZakazZakaz()"
                        required
                        type="text"
                        placeholder="Фамилия*"
                        v-model="formZakaz.family"
                        :class="[
                          this.formZakaz.family.length == 0
                            ? ' !focus:outline-[#A55B4A] !border-[#A55B4A]'
                            : '!border-[green] !focus:outline-[green]'
                        ]"
                        class=" input-med "
                      />
                      <input
                        @input="doneformZakazZakaz()"
                        required
                        type="text"
                        v-model="formZakaz.name"
                        placeholder="Имя*"
                        :class="[
                          this.formZakaz.name.length == 0
                            ? ' !focus:outline-[#A55B4A] !border-[#A55B4A]'
                            : '!border-[green] !focus:outline-[green]'
                        ]"
                        class=" input-med "
                      />
                      <input
                        @input="doneformZakazZakaz()"
                        required
                        type="text"
                        placeholder="Отчество*"
                        v-model="formZakaz.otchestvo"
                        :class="[
                          this.formZakaz.otchestvo.length == 0
                            ? ' !focus:outline-[#A55B4A] !border-[#A55B4A]'
                            : '!border-[green] !focus:outline-[green]'
                        ]"
                        class=" input-med "
                      />
                      <input
                        @input="doneformZakazZakaz()"
                        required
                        type="text"
                        v-facade="'##.##.####'"
                        placeholder="Дата рождения*"
                        v-model="formZakaz.dataRozhdeniya"
                        :class="[
                          this.formZakaz.dataRozhdeniya.length !== 10
                            ? ' !focus:outline-[#A55B4A] !border-[#A55B4A]'
                            : '!border-[green] !focus:outline-[green]'
                        ]"
                        class=" input-med "
                      />
                    </div>
                    <div
                      class="flex items-center gap-4 mt-2 flex-wrap sm:flex-nowrap"
                    >
                      <div class="flex items-center gap-2 w-full sm:w-1/4">
                        <input
                          type="radio"
                          checked="checked"
                          value="male"
                          v-model="formZakaz.gender"
                          id="gender1"
                          class=""
                        />
                        <label for="gender1" class="text-[14px]">Мужчина</label>
                      </div>
                      <div class="flex items-center gap-2 w-full sm:w-1/4">
                        <input
                          type="radio"
                          value="female"
                          v-model="formZakaz.gender"
                          id="gender2"
                          class=""
                        />
                        <label for="gender2" class="text-[14px]">Женщина</label>
                      </div>
                      <div class="flex items-center gap-2 w-full sm:w-2/4">
                        <input
                          type="checkbox"
                          value="femalemale"
                          id="gender3"
                          v-model="formZakaz.genderDop"
                          class=""
                        />
                        <label for="gender3" class="text-[14px]"
                          >Пациент придёт с представителем</label
                        >
                      </div>
                    </div>
                  </div>
                  <!-- паспорт -->
                  <div
                    class=" py-[16px] flex flex-col gap-4 text-[16px] font-light"
                  >
                    <span class="text-[#A55B4A] text-[16px] "
                      >Укажите паспортные данные и желаемую дату сдачи
                      анализов</span
                    >
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-[20px]">
                      <input
                        @input="doneformZakazZakaz()"
                        type="text"
                        required="required"
                        placeholder="Паспорт (серия/номер)*"
                        v-facade="'#### ######'"
                        v-model="formZakaz.passportSeriya"
                        :class="[
                          this.formZakaz.passportSeriya.length !== 11
                            ? ' !focus:outline-[#A55B4A] !border-[#A55B4A]'
                            : '!border-[green] !focus:outline-[green]'
                        ]"
                        class=" input-med "
                      />
                      <input
                        @input="doneformZakazZakaz()"
                        type="text"
                        required="required"
                        placeholder="Паспорт (дата выдачи)* "
                        v-facade="'##.##.####'"
                        v-model="formZakaz.passportData"
                        :class="[
                          this.formZakaz.passportData.length !== 10
                            ? ' !focus:outline-[#A55B4A] !border-[#A55B4A]'
                            : '!border-[green] !focus:outline-[green]'
                        ]"
                        class=" input-med "
                      />
                      <input
                        @input="doneformZakazZakaz()"
                        type="text"
                        required="required"
                        placeholder="Паспорт (кем выдан)*"
                        v-model="formZakaz.passportKem"
                        :class="[
                          this.formZakaz.passportKem.length <= 1
                            ? ' !focus:outline-[#A55B4A] !border-[#A55B4A]'
                            : '!border-[green] !focus:outline-[green]'
                        ]"
                        class=" input-med "
                      />
                      <input
                        @input="doneformZakazZakaz()"
                        type="text"
                        required="required"
                        placeholder="Дата сдачи анализов*"
                        v-facade="'##.##.####'"
                        v-model="formZakaz.dataSdachi"
                        :class="[
                          this.formZakaz.dataSdachi.length !== 10
                            ? ' !focus:outline-[#A55B4A] !border-[#A55B4A]'
                            : '!border-[green] !focus:outline-[green]'
                        ]"
                        class=" input-med "
                      />
                    </div>
                  </div>
                  <!-- контакты -->
                  <div
                    class=" py-[16px] flex flex-col gap-4 text-[16px] font-light"
                  >
                    <span class="text-[#A55B4A] text-[16px] "
                      >Контакты для связи с Вами</span
                    >
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-[20px]">
                      <input
                        @input="doneformZakazZakaz()"
                        type="email"
                        required="required"
                        placeholder="E-mail*"
                        v-model="formZakaz.email"
                        id="us-phone-number-ex"
                        :class="[
                          this.formZakaz.email.length <= 6
                            ? ' !focus:outline-[#A55B4A] !border-[#A55B4A]'
                            : '!border-[green] !focus:outline-[green]'
                        ]"
                        class=" input-med "
                      />
                      <input
                        @input="doneformZakazZakaz()"
                        type="text"
                        required="required"
                        id="us-phone-number-ex2"
                        v-model="formZakaz.phone"
                        name="phone"
                        placeholder="+7(___)___−__−__*"
                        v-facade="'+7(###)###-##-##'"
                        :class="[
                          this.formZakaz.phone.length !== 16
                            ? ' !focus:outline-[#A55B4A] !border-[#A55B4A]'
                            : '!border-[green] !focus:outline-[green]'
                        ]"
                        class=" input-med "
                      />
                    </div>
                  </div>
                  <!-- аккаунт -->
                  <div
                    class=" py-[16px] flex flex-col gap-4 text-[16px] font-light"
                    v-if="!$auth.loggedIn"
                  >
                    <span class="text-[#A55B4A] text-[16px] "
                      >Данные для входа в личный кабинет</span
                    >
                    <div class="grid grid-cols-1  sm:grid-cols-2 gap-[20px]">
                      <div class="flex flex-col gap-4">
                        <input
                          @input="doneformZakazZakaz()"
                          type="password"
                          required="required"
                          id="us-phone-number-password"
                          v-model="credentials.password"
                          name="phone"
                          placeholder="Придумайте пароль"
                          :class="[
                            this.credentials.password.length <= 8
                              ? ' !focus:outline-[#A55B4A] !border-[#A55B4A]'
                              : '!border-[green] !focus:outline-[green]'
                          ]"
                          class=" input-med "
                        />
                        <span class="text-[12px]"
                          >Этот пароль будет использоваться для доступа в личный
                          кабинет</span
                        >
                      </div>

                      <button
                        v-if="succes == false && !$auth.loggedIn"
                        @click="RegisterUser()"
                        class="text-[12px] xl:text-[14px] text-white bg-main hover:text-main hover:bg-white font-light px-[14px] py-[14px]  w-full  sm:flex sm:items-center sm:justify-center  border-[0.5px] border-main rounded-[5px] h-[50px]"
                      >
                        Зарегистрироваться и войти
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        <!-- конец форма заявки -->
      </div>
    </div>

    <!-- cart -->
    <div></div>
    <!-- cart consult -->
    <div>
      <div class="flex justify-end">
        <div class="w-full  bg-white    shadow-md rounded-[5px] ">
          <div
            v-if="CART.length >= 1"
            class="w-full justify-center  text-[16px] bg-[#EDEDED] h-[48px] flex items-center uppercase"
          >
            <span>корзина</span>
          </div>
          <div class="flex flex-col list-disc list-outside px-[24px] pt-[12px]">
            <cart-item
              v-for="(item, index) in CART"
              :key="item.name"
              :itemInCart="item"
              @deleteFromCart="deleteFromCart(index)"
            />
          </div>
          <!-- dop to price -->
          <div
            class="bg-[#ECECEC] py-[18px] px-[24px] mt-[24px] flex flex-col gap-[24px]"
            v-if="CART.length >= 1"
          >
            <ul class="flex flex-col gap-2">
              <span
                class="text-[#A55B4A] text-[16px] font-medium w-full text-center"
                >+ Взятие биоматериала:
              </span>
              <li
                v-for="(item, index) in bioMaterialsComplete"
                :key="item.sku"
                class="flex justify-between items-start  text-[12px] text-[#909090]"
              >
                <span class="font-medium text-[12px] ">- {{ item.name }} </span>
                <span>{{ item.price }} руб.</span>
              </li>
            </ul>
            <span class="text-[#54ACD2] text-[14px] text-center"
              >Взятие биоматериала не входит в общую стоимость выбранных вами
              исследований. Оно требуется для выбранных Вами услуг.</span
            >
          </div>
          <div class="bg-white p-[24px] flex flex-col gap-[24px]" v-else>
            <span
              class="text-[#A55B4A] text-[16px] font-medium w-full text-center"
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
                class="rounded-[5px] border border-main h-[49px] hover:bg-main  anime text-main hover:text-white w-full flex justify-center items-center py-2 text-[16px]"
                >Анализы</nuxt-link
              >
            </button>
          </div>
          <!-- end dop to price -->
          <div
            class="px-[24px] my-[24px] flex flex-col gap-[24px]"
            v-show="CART.length >= 1"
          >
            <div
              v-if="medSestra == true"
              class="flex justify-between items-end"
            >
              <span class="text-[14px]">Выезд м/с на дом </span>
              <span>+ 400 руб</span>
            </div>

            <div class="flex justify-between items-end">
              <span class="text-[14px]">ИТОГОВАЯ СТОИМОСТЬ: </span>
              <span class="text-[16px] font-bold"
                >{{ totalPriceInCart.toLocaleString('ru-RU') }} руб.</span
              >
            </div>
            <div class="flex justify-between items-center">
              <span class="text-[14px]">Место сдачи анализа: : </span>
              <span
                v-if="formZakaz.mesto == 'ofis_my'"
                class="text-[14px] font-bold text-[#A55B4A] underline underline-offset-2"
              >
                У нас в офисе</span
              >
              <span
                v-if="formZakaz.mesto == 'sam'"
                class="text-[14px] font-bold text-[#A55B4A] underline underline-offset-2"
              >
                На дому</span
              >
              <span
                v-if="formZakaz.mesto == 'ofic'"
                class="text-[14px]  font-bold text-[#A55B4A] underline underline-offset-2 text-right"
              >
                В офисе партнера: <br />
                <span
                  v-if="
                    formZakaz.invitroSelect !==
                      'Выберите ближайший офис нашего партнера ИНВИТРО:'
                  "
                >
                  {{ formZakaz.invitroSelect }}
                </span>
              </span>
            </div>

            <!-- v-f -->
            <div class="flex flex-col gap-[20px]">
              <button
                v-if="formZakaz.done == true && $auth.loggedIn"
                @click="modalOrder()"
                class="rounded-[5px]  border border-main h-[49px] hover:bg-main  anime text-main hover:text-white w-full flex justify-center items-center py-2 text-[16px]"
              >
                Отправить заявку
              </button>
              <div class="flex flex-col gap-[10px]" v-else>
                <div
                  class="opacity-50 rounded-[5px] cursor-not-allowed  border border-main h-[49px]   anime text-main w-full flex justify-center items-center py-2 text-[16px]"
                >
                  Отправить заявку
                </div>
                <span class="text-[#A55B4A] text-[14px]"
                  >* Заполните все поля
                </span>
              </div>
              <button
                @click="addConsult()"
                class="rounded-[5px] border bg-main h-[49px] hover:bg-[#4CBDEE]  anime  text-white w-full flex justify-center items-center py-2 text-[16px]"
              >
                Получить консультацию
              </button>
            </div>
            <!-- v-f -->
            <!-- <span class="text-[12px]">
              <nuxt-link
                to="/register"
                class="text-[#A55B4A] underline underline-offset-2"
              >
                Зарегистрируйтесь
              </nuxt-link>
              для дальнейшего доступа в личный кабинет
            </span> -->
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
      </div>
    </div>
    <!-- end cart -->
    <div
      v-if="
        modalInvitro == true &&
          formZakaz.invitroSelect !==
            'Выберите ближайший офис нашего партнера ИНВИТРО:'
      "
      @click="modalInvitro = !modalInvitro"
      class="fixed flex justify-center items-center bg-[#343434]/40  w-screen h-screen left-0 top-0  z-[1] backdrop-blur-sm"
    >
      <div
        class="w-[400px] h-full max-h-[780px] z-[6] bg-white p-4 rounded-[5px] shadow-md"
      >
        <div
          class="bg-white p-4 rounded-[5px] shadow-md flex flex-col gap-2"
          v-if="
            formZakaz.mesto == 'ofic' &&
              formZakaz.invitroSelect !==
                'Выберите ближайший офис нашего партнера ИНВИТРО:'
          "
        >
          <span class="text-[#746F6F] text-[14px] w-full text-center"
            >Вы находитесь на сайте нашего партнера ИНВИТРО</span
          >
          <span class="text-[#B07263] w-full text-center text-[14px]"
            >Ознакомьтесь с подробной информацией о работе данного офиса.</span
          >

          <iframe
            :src="formZakaz.invitroSite"
            height="600"
            align="left"
            class="w-full"
          >
            Ваш браузер не поддерживает плавающие фреймы!
          </iframe>
          <span
            @click="modalInvitro = !modalInvitro"
            class="text-[#746F6F] text-[14px] w-full text-center cursor-pointer"
            >Закрыть</span
          >
        </div>
      </div>
    </div>
    <div
      v-if="modalConsul == true"
      class="fixed flex justify-center items-center bg-[#343434]/40  w-screen h-screen left-0 top-0  z-[1] backdrop-blur-sm"
    >
      <div
        class="w-[400px] h-auto z-[8] bg-white p-4 rounded-[5px] shadow-md flex flex-col gap-4 justify-center items-center fixed"
      >
        <span class="w-full text-center text-[24px]"
          >Получить консультацию</span
        >
        <input
          type="text"
          placeholder="Имя"
          v-model="formZakaz.name"
          :class="[
            this.formZakaz.name.length <= 0
              ? ' !focus:outline-[#A55B4A] !border-[#A55B4A]'
              : '!border-[green] !focus:outline-[green]'
          ]"
          class=" input-med "
        />
        <input
          type="text"
          placeholder="+7(___)___−__−__*"
          v-facade="'+7(###)###-##-##'"
          v-model="formZakaz.phone"
          :class="[
            this.formZakaz.phone.length !== 16
              ? ' !focus:outline-[#A55B4A] !border-[#A55B4A]'
              : '!border-[green] !focus:outline-[green]'
          ]"
          class=" input-med "
        />
        <span v-if="status == true">Сообщение успешно отправлено</span>
        <!-- <span v-elseif="status == false"
          >Произошла ошибка, попробуйте еще раз</span
        > -->
        <button
          v-show="
            formZakaz.name.length !== 0 &&
              formZakaz.phone.length === 18 &&
              status !== true
          "
          @click="ConsultZayavka()"
          class="rounded-[5px]  border border-main h-[49px] hover:bg-main  anime text-main hover:text-white w-full max-w-[250px] flex justify-center items-center py-2 text-[16px]"
        >
          Отправить
        </button>
        <span @click="modalConsul = !modalConsul" class="cursor-pointer"
          >Закрыть</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import { gql } from 'graphql-tag'
import { mapActions, mapGetters } from 'vuex'
import CartItem from '~/components/cart/CartItem.vue'
import TabLogin from '~/components/tabs/tab-login.vue'
import tabsLogin from '~/components/tabs/tabs-login.vue'

const ME_USER = gql`
  query ME_USER($id: ID!) {
    user(id: $id, idType: DATABASE_ID) {
      client_data {
        kvartira
        nomerDoma
        nomerTelefona
        otchestvo
        datarozhdeniya
        pasport
      }
      firstName
      lastName
      username
      email
      id
      databaseId
      jwtRefreshToken
    }
  }
`

export default {
  data () {
    return {
      modalInvitro: false,
      modalConsul: false,
      register: false,
      auth: false,
      formZakaz: {
        family: 'Петров',
        name: 'Петр',
        otchestvo: 'Петрович',
        dataRozhdeniya: '',
        dataSdachi: '',
        passportSeriya: '',
        passportData: '',
        passportKem: '',
        gorod: '',
        ulitcha: '',
        nomerDoma: '',
        kvartira: '',
        dateAnaliz: '',
        email: 'test@test.ru',
        phone: '',
        year: '',
        checkedNames: [],
        mesto: 'ofis_my',
        gender: 'male',
        genderDop: false,
        invitroSelect: 'Выберите ближайший офис нашего партнера ИНВИТРО:',
        invitroSite: '',
        showInvitro: false,
        invitro: [
          {
            name: 'Днепровский, 105',
            time: '07:00 - 19:00',
            invitro:
              'https://www.invitro.ru/offices/rostovnadony/clinic.php?ID=32430'
          },
          {
            name: '1 Конной Армии, 29А',
            time: '07:00 - 19:00',
            invitro:
              'https://www.invitro.ru/offices/rostovnadony/clinic.php?ID=10929'
          },
          {
            name: '40 лет Победы, 89',
            time: '07:00 - 16:00',
            invitro:
              'https://www.invitro.ru/offices/rostovnadony/clinic.php?ID=23175'
          },
          {
            name: 'Богданова, 79',
            time: '07:00 - 19:00',
            invitro:
              'https://www.invitro.ru/offices/rostovnadony/clinic.php?ID=56318'
          },
          {
            name: ' Космонавтов, 6/13',
            time: '06:30 - 19:00',
            invitro:
              'https://www.invitro.ru/offices/rostovnadony/clinic.php?ID=8551'
          },
          {
            name: 'Б. Садовая, 130/30',
            time: '07:00 - 19:00',
            invitro:
              'https://www.invitro.ru/offices/rostovnadony/clinic.php?ID=64268'
          },
          {
            name: 'Ленина, 44/6',
            time: '07:00 - 19:00',
            invitro:
              'https://www.invitro.ru/offices/rostovnadony/clinic.php?ID=4964'
          },
          {
            name: 'Текучёва, 143',
            time: '07:00 - 16:00',
            invitro:
              'https://www.invitro.ru/offices/rostovnadony/clinic.php?ID=22955'
          },
          {
            name: 'Стачки, 26',
            time: '07:00 - 16:00',
            invitro:
              'https://www.invitro.ru/offices/rostovnadony/clinic.php?ID=23176'
          },
          {
            name: 'Миронова, 10',
            time: '07:00 - 16:00',
            invitro:
              'https://www.invitro.ru/offices/rostovnadony/clinic.php?ID=57266'
          },
          {
            name: 'Ерёменко, 97/29',
            time: '07:00 - 16:00',
            invitro:
              'https://www.invitro.ru/offices/rostovnadony/clinic.php?ID=52856'
          },
          {
            name: 'Таганрогская, 143',
            time: '07:00 - 16:00',
            invitro:
              'https://www.invitro.ru/offices/rostovnadony/clinic.php?ID=13119'
          },
          {
            name: 'Зорге, 52',
            time: '07:00 - 16:00',
            invitro:
              'https://www.invitro.ru/offices/rostovnadony/clinic.php?ID=13116'
          },
          {
            name: 'Станиславского, 54',
            time: '07:00 - 19:00',
            invitro:
              'https://www.invitro.ru/offices/rostovnadony/clinic.php?ID=3092'
          }
        ],
        done: false
      },
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
        username: '',
        password: ''
      },
      credentials2: {
        username: '',
        password: ''
      },
      okeyRegister: false,
      succes: '',
      dataMe: [],
      loginError: false,
      jjj22: []
    }
  },
  components: { CartItem, tabsLogin, TabLogin },
  methods: {
    RegisterUser () {
      const dsfdf33 = this.formZakaz.phone.toString()
      const phoneForRegister = dsfdf33
        .replace('-', '')
        .replace('-', '')
        .replace('+7', '')
        .replace('(', '')
        .replace(')', '')
      const url = 'https://foxsis.ru/alvd/wp-json/wp/v2/users'
      const dataUserRegister = {
          "first_name": this.formZakaz.name,
          "last_name": this.formZakaz.family,
          "password": this.credentials.password,
          "email": this.formZakaz.email,
          "username": phoneForRegister,
          "acf": {
            "otchestvo": this.credentials.otchestvo,
            "dataRozhdeniya": this.credentials.dataRozhdeniya,
            "nomer_doma": this.credentials.nomerDoma,
            "pasport": this.credentials.passportSeriya,
            "kvartira": this.credentials.kvartira,
            "nomer_telefona": phoneForRegister,
            "data_vydachi_pasport": this.credentials.passportData,
            "pasport_kem": this.credentials.passportKem,
            "gender": this.credentials.gender
          }
      }

      this.$axios
        .post(url, dataUserRegister)
        .then(data => {
          // Result
          this.succes = true
          this.dataNewUser = data
          this.handleLoginSubmit()
          this.reloadPage()
        })
        .catch(error => {
          // Error
          console.error(error)
          this.succes = 'Что то пошло не так'
        })
    },
    oplata () {
      console.log('1344')
    },
    
    addConsult () {
      if (
        (this.formZakaz.name, length !== 0 && this.formZakaz.phone.length == 18)
      ) {
        console.log('da')
      } else {
        this.modalConsul = true
      }
    },
    ConsultZayavka () {
      const cartToMail = this.CART
      const finalCartToMail = cartToMail.map(element => element.name)
      const convertCart = JSON.stringify(finalCartToMail)
      console.log(convertCart)
      // 2. Create a FormData object, and append each field to the object
      const emailBody = {
        'text-859': this.formZakaz.name,
        'text-893': this.formZakaz.phone,
        'your-message': convertCart
      }

      const form = new FormData()
      for (const field in emailBody) {
        form.append(field, emailBody[field])
      }

      this.$axios
        .$post(
          'https://foxsis.ru/alvd/wp-json/contact-form-7/v1/contact-forms/11757/feedback',
          form
        )
        .then(response => {
          console.log(response)
          this.status = true
          this.errors = false
        })
        .catch(error => {
          // this.errors = error.response.data.message
          this.errors = true
        })
    },
    selectInvitroAdd (item) {
      this.formZakaz.invitroSelect = item.name
      this.formZakaz.invitroSite = item.invitro
      this.formZakaz.showInvitro = false
      this.modalInvitro = true
      // this.scrolltoInvitro()
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
      console.log('reset cart is reset')
    },
    doneformZakazZakaz () {
      if (this.formZakaz.mesto == 'ofis_my') {
        if (
          this.formZakaz.family !== '' &&
          this.formZakaz.name !== '' &&
          this.formZakaz.otchestvo !== '' &&
          this.formZakaz.dataRozhdeniya.length == 10 &&
          this.formZakaz.email.length >= 5 &&
          this.formZakaz.phone.length == 16 &&
          this.formZakaz.passportSeriya.length == 11 &&
          this.formZakaz.passportData.length == 10 &&
          this.formZakaz.passportKem.length >= 1 &&
          this.formZakaz.dataSdachi.length == 10
        ) {
          this.formZakaz.done = true
        } else {
          this.formZakaz.done = false
        }
      }
      if (this.formZakaz.mesto == 'ofic') {
        if (
          this.formZakaz.family !== '' &&
          this.formZakaz.name !== '' &&
          this.formZakaz.otchestvo !== '' &&
          this.formZakaz.dataRozhdeniya.length == 10 &&
          this.formZakaz.email.length >= 5 &&
          this.formZakaz.phone.length == 16 &&
          this.formZakaz.passportSeriya.length == 11 &&
          this.formZakaz.passportData.length == 10 &&
          this.formZakaz.passportKem.length >= 1 &&
          this.formZakaz.dataSdachi.length == 10
        ) {
          this.formZakaz.done = true
        } else {
          this.formZakaz.done = false
        }
      }
      if (this.formZakaz.mesto == 'sam') {
        if (
          this.formZakaz.family !== '' &&
          this.formZakaz.name !== '' &&
          this.formZakaz.otchestvo !== '' &&
          this.formZakaz.dataRozhdeniya.length == 10 &&
          this.formZakaz.email.length >= 5 &&
          this.formZakaz.phone.length == 16 &&
          this.formZakaz.passportKem.length >= 1 &&
          this.formZakaz.dataSdachi.length == 10
        ) {
          this.formZakaz.done = true
        } else {
          this.formZakaz.done = false
        }
      }
    },
    createOrder () {
      const adress =
        this.formZakaz.ulitcha +
        ', ' +
        this.formZakaz.nomerDoma +
        ', ' +
        this.formZakaz.kvartira
      const orderCart = this.CART.map(item => item.id)
      const formedDataCart = []
      const bioMaterials = this.preMaterial.map(item => item.id)
      const SDSD_test =
        'gender' +
        '%' +
        this.formZakaz.gender +
        '$' +
        'dataRozhdeniya' +
        '%' +
        this.formZakaz.dataRozhdeniya +
        '$' +
        'dataSdachi' +
        '%' +
        this.formZakaz.dataSdachi +
        '$' +
        'passportSeriya' +
        '%' +
        this.formZakaz.passportSeriya +
        '$' +
        'passportData' +
        '%' +
        this.formZakaz.passportData +
        '$' +
        'passportKem' +
        '%' +
        this.formZakaz.passportKem +
        '$' +
        'ulitcha' +
        '%' +
        this.formZakaz.ulitcha +
        '$' +
        'dateAnaliz' +
        '%' +
        this.formZakaz.dateAnaliz +
        '$' +
        'year' +
        '%' +
        this.formZakaz.year +
        '$' +
        'mesto' +
        '%' +
        this.formZakaz.mesto +
        '$' +
        'otchestvo' +
        '%' +
        this.formZakaz.otchestvo +
        '$' +
        'invitroSelect' +
        '%' +
        this.formZakaz.invitroSelect

      const DonUlictsa = (
        this.formZakaz.ulitcha +
        ', ' +
        this.formZakaz.nomerDoma +
        ', ' +
        this.formZakaz.kvartira
      ).toString()

      const metaData = [
        {
          key: 'field_1',
          value: this.formZakaz.gender
        },
        {
          key: 'field_2',
          value: this.formZakaz.dataRozhdeniya
        },
        {
          key: 'field_3',
          value: this.formZakaz.dataSdachi
        },
        {
          key: 'field_4',
          value: this.formZakaz.passportSeriya
        },
        {
          key: 'field_5',
          value: this.formZakaz.passportData
        },
        {
          key: 'field_6',
          value: this.formZakaz.passportKem
        },
        {
          key: 'field_7',
          value: DonUlictsa
        },
        {
          key: 'field_8',
          value: this.formZakaz.dateAnaliz
        },
        {
          key: 'field_9',
          value: this.formZakaz.genderDop.toString()
        },
        {
          key: 'field_10',
          value: this.formZakaz.mesto
        },
        {
          key: 'field_11',
          value: this.formZakaz.otchestvo
        },
        {
          key: 'field_12',
          value: this.formZakaz.invitroSelect
        }
      ]
      const setClientDone = SDSD_test.toString()
      const clientInfo = bioMaterials.forEach(element => {
        formedDataCart.push({
          product_id: element,
          quantity: 1
        })
      })

      orderCart.forEach(element => {
        formedDataCart.push({
          product_id: element,
          quantity: 1
        })
      })

      const data = {
        payment_method: 'bacs',
        payment_method_title: 'Direct Bank Transfer',
        customer_id: this.jjj22.user.databaseId,
        set_paid: false,
        status: 'processing',
        billing: {
          first_name: this.formZakaz.name,
          last_name: this.formZakaz.family,
          address_1: this.formZakaz.ulitcha,
          email: this.formZakaz.email,
          phone: this.formZakaz.phone
        },
        customer_note: setClientDone,
        line_items: formedDataCart,
        meta_data: metaData
      }
      this.$axios
        .$post('https://foxsis.ru/alvd/wp-json/wc/v3/orders', data)
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          this.errors = error.response.data.message
          this.errors = true
        })
    },
    modalOrder () {
      this.modalOrderOpen = !this.modalOrderOpen
      this.createOrder()
    },
    async handleLogoutZakaz () {
      this.$nuxt.$loading.start()
      await this.$auth.logout()
    },
    async handleLoginSubmit () {
      
      const phoneUser = this.formZakaz.phone
      const getPhone = phoneUser
        .replace('-', '')
        .replace('-', '')
        .replace('+7', '')
        .replace('(', '')
        .replace(')', '')
      this.formZakaz.phone = getPhone
      this.formBusy = true
      try {
        await this.$auth.loginWith('graphql', {
          username: getPhone,
          password: this.credentials.password
        })
        // console.log(localStorage["auth._token.graphql"]);
        this.formBusy = false
        this.loginError = false
        // this.validUserCheck()
        this.userFetch()
        this.reloadPage()
      } catch (errors) {
        this.formBusy = false
        this.loginError = true
        console.log(errors)
      }
    },
    async handleLoginSubmit2 () {
      const emailUser = this.credentials2.username
      this.formBusy = true
      try {
        await this.$auth.loginWith('graphql', {
        username: emailUser,
        password: this.credentials2.password
      })
        // console.log(localStorage["auth._token.graphql"]);
        this.formBusy = false
        this.loginError = false
        this.reloadPage()
      } catch (errors) {
        this.formBusy = false
        this.loginError = true
        console.log(errors)
      }
    },
     async handleLoginSubmit3 () {
      
     const phoneUser = this.credentials.username
      const getPhone = phoneUser.replace('-','').replace('-','').replace('+7','').replace('(','').replace(')','')
      this.credentials.username = getPhone
      console.log(getPhone);
      const credentials = this.credentials
      this.formBusy = true
      try {
        await this.$auth.loginWith('graphql', {
        username: getPhone,
        password: this.credentials.password
      })
        // console.log(localStorage["auth._token.graphql"]);
        this.formBusy = false
        this.loginError = false
        this.reloadPage()
      } catch (errors) {
        this.formBusy = false
        this.loginError = true
        console.log(errors)
      }
    },
    async onLogout () {
      await this.$apolloHelpers.onLogout()
      this.isAuthenticated = false
    },
    closeLogin () {
      this.$emit('loginView')
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
        console.log('eyseyseys')
      } else {
        console.log('nonono')
        this.reNameInput()
      }
    },
    reNameInput () {
      //  client_data {
      //   kvartira
      //   nomerDoma
      //   nomerTelefona
      //   otchestvo
      //   datarozhdeniya
      //   pasport
      // }
      if (this.formZakaz.email) {
        this.formZakaz.email = this.jjj22.user.email
      }
      if (this.formZakaz.name) {
        this.formZakaz.name = this.jjj22.user.firstName
      }

      if (this.formZakaz.family) {
        this.formZakaz.family = this.jjj22.user.lastName
      }
      if (this.formZakaz.phone) {
        this.formZakaz.phone = this.jjj22.user.username
      }
      if (this.formZakaz.otchestvo) {
        this.formZakaz.otchestvo = this.jjj22.user.client_data.otchestvo
      }
      if (this.formZakaz.dataRozhdeniya) {
        this.formZakaz.dataRozhdeniya = this.jjj22.user.client_data.datarozhdeniya
      }
      if (this.formZakaz.passportSeriya) {
        this.formZakaz.passportSeriya = this.jjj22.user.client_data.pasport
      }
    },
    reloadPage(){
      location.reload()
    }
  },
  computed: {
    ...mapGetters(['CART', 'GET_ALL_BIOMATERIALS']),
    totalPrice: function () {
      let result = this.CART.reduce((prev, item) => {
        return prev + parseInt(item.price)
      }, 0)
      return result
    },
    // bioMaterialsActive: function () {
    //   let activeItem = this.dopItems.filter(item => item.active == true)
    //   return activeItem
    // },
    bioMaterialsComplete: function () {
      let chars = this.dopTest
      let uniqueChars = []
      chars.forEach(element => {
        element.forEach(subelement => {
          if (!uniqueChars.includes(subelement)) {
            uniqueChars.push(subelement)
          }
        })
      })

      return uniqueChars, (this.preMaterial = uniqueChars)
    },
    totalPriceInCart: function () {
      let result = this.CART.reduce((prev, item) => {
        return prev + parseInt(item.price)
      }, 0)
      this.prePrice = result
      let totalPriceInCartReduce = this.preMaterial.reduce((prev, item) => {
        return prev + parseInt(item.price)
      }, this.prePrice)
      if (totalPriceInCartReduce <= 1500 && this.formZakaz.mesto == 'sam') {
        this.medSestra = true
        return totalPriceInCartReduce + 400
      } else {
        this.medSestra = false
        return totalPriceInCartReduce
      }
    }
  },
  layout: 'MainLayout',
  mounted () {
    this.CART.forEach(element => {
      element.upsell_ids.forEach(element => {
        this.dopTest.push(
          this.GET_ALL_BIOMATERIALS.filter(item => item.id == element)
        )
      })
    }),
      this.validUserCheck()
  },
  async asyncData (ctx) {
    if (ctx.app.$auth.loggedIn) {
      const databaseId = ctx.app.$auth.$state.user.databaseId
      const client = ctx.app.apolloProvider.defaultClient

      //fetch user
      const resMe = await client.query({
        query: ME_USER,
        variables: {
          id: databaseId
        }
      })
      const jjj22 = resMe.data

      return { jjj22 }
    }
  }
}
</script>

<style>
input[type='radio'] {
  accent-color: #7c7c7c;
  padding: 4px;
}
</style>
