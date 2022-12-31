<template>
  <div class="grid grid-cols-1 gap-2" v-if="gorodaInvitros">
    <div
      v-for="item in gorodaInvitros.data"
      :key="item.id"
      class="p-2 border-[1px] border-tem/30 rounded-md text-sm cursor-pointer"
    >
      <div class="text-sm flex gap-1 items-center justify-start" @click="selectOfic(item)">
        <svg
          v-if="activeOfic == item.id"
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
        <span> {{ item.attributes.Name }}</span>
      </div>
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
  },
  data () {
    return {
      activeOfic: null
    }
  },
  methods: {
    selectOfic (item) {
      if (this.activeOfic == item.id) {
        this.activeOfic = null
      } else {
        this.activeOfic = item.id
      }
      this.$emit('handlerOfic', item)
    }
  }
}
</script>

<style></style>
