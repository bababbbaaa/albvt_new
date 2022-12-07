<template>
  <div class="w-full h-full min-h-screen flex justify-center items-center">
    <div class="">
      <form method="POST" @submit.prevent="handleLoginSubmit" class="flex flex-col gap-4">
        <div class="flex justify-between gap-4 items-center">
          <label for="identifier">Логин</label>
          <input
            id="identifier"
            v-model="form.identifier"
            type="email"
            class="form-control border p-4"
            aria-describedby="emailHelp"
          />
        </div>
        <div class="flex justify-between gap-4 items-center">
          <label for="password">Пароль</label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            class="form-control border p-4"
          />
        </div>

        <button type="submit" class="w-full bg-main text-white rounded-md py-3" :disabled="formBusy">
          <span v-if="formBusy" small class="mr-2" /> Войти
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  layout: 'MainLayout',
  auth: 'guest',

  data () {
    return {
      form: {
        identifier: 'vrach9@test.ru',
        password: '123123123'
      },
      formBusy: false
    }
  },

  methods: {
    async handleLoginSubmit () {
      const credentials = this.form
      this.formBusy = true

      try {
        // Using our custom strategy
        await this.$auth.loginWith('graphql', credentials)

        this.formBusy = false
         setTimeout(() => {
          if (this.$auth.user.RoleUser == 'Vrach') {
              this.$nuxt.$router.replace({ path: "/doctor" });
          }
          else {
            this.$nuxt.$router.replace({ path: "/my-account" });
          }
        }, 1000);
      } catch (errors) {
        this.formBusy = false
        // Handle errors
      }
    }
  }
}
</script>
