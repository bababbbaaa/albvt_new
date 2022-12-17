<template>
  <div class="flex flex-col gap-4">
    <div class="flex w-full flex-col gap-2 relative">
      <label for="" class=" label-new !bg-white">Введите промокод</label>
      <input type="text" class="input-new tracking-[0.5em] font-semibold" v-model="promocode" />
      <button
        @click="getPromoCart"
        class="absolute top-0 right-0 flex justify-center items-center  bg-main text-white rounded-md text-sm h-full px-6"
      >
        Применить
      </button>
    </div>
    <span v-if="vrach !== null && vrach" class="text-sm">
      Ваш врач:
      <span class="font-medium underline underline-offset-4">{{
        vrach.attributes.FIO_user
      }}</span>
    </span>
    <span v-else-if="vrach !== null && !vrach" class="text-sm text-[#E72A2A]"
      >Не правильно введен промокод</span
    >
  </div>
</template>

<script>
import GET_PROMOCODE from '~/graphql/cart/get-promocode.gql'

export default {
  data () {
    return {
      promocode: '',
      vrach: null,
      loading: false
    }
  },
  methods: {
    getPromoCart () {
      this.loading = true
      const promo = this.promocode
      this.$apollo
        .query({
          query: GET_PROMOCODE,
          variables: {
            PROMO: promo
          }
        })
        .then(({ data }) => {
          this.vrach = data.usersPermissionsUsers.data[0]
          const dataPromo = data.usersPermissionsUsers

          this.getAllPacientisVrach(dataPromo, this.vrach.id)
        })
    },

    getAllPacientisVrach (Pacients, id) {
      if (Pacients.data.length) {
        const dataPacients = Pacients.data[0].attributes.Pacientis.data.map(
          x => x.id
        )
        this.getCartComplite(dataPacients, Pacients, id)
      } else {
        this.getCartComplite(null, null, null)
      }
    },
    getCartComplite (data, pacients,  id) {
      if (data !== null && data) {
        this.$emit('setPromocode', data, pacients, id)
      } else {
        this.$emit('setPromocode', null, null, null)
      }
    }
  }
}
</script>

<style></style>
