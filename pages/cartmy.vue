<template>
  <div class="container pt-[47px] mt-[47px]">
    <div class="grid grid-cols-1 gap-[20px] sm:grid-cols-2">
      <div>Корзина</div>
      <div>
        <div>
          <cart-item
            v-for="(item, index) in CART"
            :key="item.name"
            :itemInCart="item"
            @deleteFromCart="deleteFromCart(index)"
          />
        </div>
        <button>
          <nuxt-link
            to="/cart"
            class="rounded-[5px] border border-main h-[49px] hover:bg-main  anime text-main hover:text-white w-full flex justify-center items-center py-2 text-[16px]"
          >
            Оформить заказ
          </nuxt-link>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import CartItem from '~/components/cart/CartItem.vue'
import { mapActions, mapGetters } from 'vuex'
export default {
  components: { CartItem },
  layout: 'MainLayout',
  computed: {
    ...mapGetters(['CART', 'GET_ALL_BIOMATERIALS'])
  },
  methods: {
    ...mapActions(['DELETE_FROM_CART', 'RESET_CART']),
    deleteFromCart (index) {
      this.DELETE_FROM_CART(index)
    }
  }
}
</script>

<style></style>
