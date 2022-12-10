<template>
  <div class="grid grid-cols-1 gap-2" v-if="gorodaInvitros">
    <div
      v-for="item in gorodaInvitros.data"
      :key="item.id"
      class="p-2 border rounded-md text-sm cursor-pointer"
    >
      <span class="">{{ item.attributes.Name }}</span>
    </div>
  </div>
</template>

<script>
import GET_BOLNIT_FALSE from '~/graphql/cart/GET_BOLNIT_FALSE.gql'
export default {
  apollo: {
    gorodaInvitros: {
      query: GET_BOLNIT_FALSE,
      prefetch: true
    }
  }
}
</script>

<style></style>
