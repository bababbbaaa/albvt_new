<template>
  <div class="bg-[#F9F9F9]">
    <div
      class="pt-8 mt-8 container flex flex-col gap-4"
      v-if="usersPermissionsUser"
    >
      <div class="w-full flex items-center justify-between">
        <button
          @click="$router.back()"
          class=" flex sm:hidden justify-start items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8 text-main"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <span class="py-3 text-xl">Личные данные</span>
      </div>
      <div class="flex justify-between items-center w-full">
        <span>Мой промокод:</span>
        <div class="flex items-center">
          <input
            v-on:focus="$event.target.select()"
            ref="clone"
            readonly
            :value="usersPermissionsUser.data.attributes.Promo"
            class="bg-transparent text-xl font-bold p-1 border-1 border-main max-w-[100px]"
          />
          <button @click="copy">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 text-main"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
              />
            </svg>
          </button>
        </div>
      </div>

      <div class="flex flex-col gap-6">
        <div class="relative">
          <label class="label-new">ФИО</label>
          <input
            type="text"
            :placeholder="usersPermissionsUser.data.attributes.FIO_user"
            v-model="me.fio"
            class="input-new"
          />
        </div>
        <div class="relative">
          <label class="label-new">Телефон</label>
          <input
            type="text"
            :placeholder="usersPermissionsUser.data.attributes.Phone"
            v-model="me.phone"
            class="input-new"
          />
        </div>
        <div class="relative">
          <label class="label-new">Дата рождения</label>
          <input
            type="text"
            :placeholder="usersPermissionsUser.data.attributes.DataRozgdeniya"
            v-model="me.data"
            class="input-new"
          />
        </div>
        <div class="relative">
          <label class="label-new">Email</label>
          <input
            type="text"
            :placeholder="usersPermissionsUser.data.attributes.email"
            v-model="me.email"
            class="input-new"
          />
        </div>
        <div class="relative">
          <label class="label-new">Новый пароль</label>
          <input
            type="text"
            placeholder="*"
            v-model="me.password"
            class="input-new"
          />
        </div>
        <button class="w-full p-3 rounded-md bg-main text-white">
          Сохранить
        </button>
      </div>
    </div>
    <span v-else>Загрузка...</span>
  </div>
</template>

<script>
import ME_DOCTOR from '~/graphql/doctor/me-doctor.gql'

export default {
  layout: 'Doctor',
  data () {
    return {
      me: {
        phone: '',
        fio: '',
        data: '',
        password: '',
        email: ''
      }
    }
  },
  apollo: {
    usersPermissionsUser: {
      query: ME_DOCTOR,
      prefetch: true,
      variables () {
        return {
          ID: this.$auth.user.id
        }
      }
    }
  },
  mounted () {
    if (this.usersPermissionsUser) {
      this.me.email = this.usersPermissionsUser.data.attributes.email
      this.me.phone = this.usersPermissionsUser.data.attributes.Phone
      this.me.fio = this.usersPermissionsUser.data.attributes.FIO_user
      this.me.data = this.usersPermissionsUser.data.attributes.DataRozgdeniya
    }
  },
  methods: {
    copy () {
      this.$refs.clone.focus()
      document.execCommand('copy')
    }
  }
}
</script>

<style></style>
