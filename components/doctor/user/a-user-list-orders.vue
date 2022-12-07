<template>
  <div class="flex flex-col gap-4">
    <a-user-get-order
      v-for="item in data_orders"
      :key="item.id"
      :stavka="stavka"
      :data_order="item"
      :activeResult="orderActiveResult"
      :activeAnalizes="orderActiveAnalizes"
      @openOrderResult="openOrderResult(item.id)"
      @openOrderAnalizes="openOrderAnalizes(item.id)"
    />
  </div>
</template>

<script>
import aUserGetOrder from './a-user-get-order.vue'
export default {
  components: { aUserGetOrder },
  props: {
    data_orders: Array,
    stavka: Number
  },
  data () {
    return {
      orderActiveResult: null,
      orderActiveAnalizes: null
    }
  },
  methods: {
    openOrderResult (id) {
      this.orderActiveResult == id
        ? (this.orderActiveResult = null)
        : (this.orderActiveResult = id),
        (this.orderActiveAnalizes = null)
    },
    openOrderAnalizes (id) {
      this.orderActiveAnalizes == id
        ? (this.orderActiveAnalizes = null)
        : (this.orderActiveAnalizes = id),
        (this.orderActiveResult = null)
    }
  }
}
</script>

<style></style>
