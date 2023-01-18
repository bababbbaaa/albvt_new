<template>
  
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    data: Object,
    bio: Array
  },
  methods: {
    addToCart () {
      this.$emit('addToCart', this.data)
    }
  },
  computed: {
    ...mapGetters(['CART', 'CART_IDS']),
    getTotalPrice () {
      const priceAnaliz = this.data.attributes.Price
      let priceBiomateriales = this.data.attributes.biomaterialies.data.reduce(
        (prev, item) => {
          return prev + parseInt(item.attributes.Price)
        },
        priceAnaliz
      )

      return priceBiomateriales
    }
  }
}
</script>

<style>

</style>