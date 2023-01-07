<template>
  <div
    class=" flex  items-center justify-between py-2 border-b-[1px] border-b-[#D9D9D9]/50 gap-1"
  >
    <div class="flex gap-[8px] items-center justify-between w-full">
      <div class="flex gap-2 w-full">
        <div class="flex flex-col w-full">
          <span
            class="text-sm  sm:text-base leading-4  cursor-pointer text-main anime "
            :title="itemInCart.attributes.Name"
            >{{ itemInCart.attributes.Name }}
          </span>
          <div
            class="text-[12px] text-[#9A9A9A] pt-1 flex flex-col justify-start gap-2 items-start"
          >
            <span> Арт {{ itemInCart.attributes.Art }} </span>
          </div>

          <div class="flex items-center justify-between gap-[10px]  pt-2">
            <span class="text-sm  sm:text-base  text-[#717171] font-medium"
              >{{
                parseInt(itemInCart.attributes.Price).toLocaleString('ru-RU')
              }}
              руб.</span
            >
          </div>
          <div
            v-if="itemInCart.attributes.DopAnalizes.data.length"
            class="flex flex-col gap-3 mt-2"
          >
            <span class="py-2 text-sm w-full text-center"
              >Этот анализ идет в комплексе:</span
            >
            <div
              class="text-sm flex flex-col gap-1 items-start justify-between pr-4"
              v-for="itemDop in itemInCart.attributes.DopAnalizes.data"
              :key="itemDop.id"
            >
              <span class="text-main">{{ itemDop.attributes.Name }}</span>
              <span class="text-xs text-tem/70"
                >Арт {{ itemDop.attributes.Art }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <button
      @click="deleteFromCart(itemInCart)"
      class="bg-[#F3F6FD] h-full px-2 flex justify-center items-center"
    >
      
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-4 h-4 cursor-pointer hover:scale-125 anime"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    itemInCart: {
      type: Object,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      newTest: []
    }
  },
  methods: {
    deleteFromCart () {
      this.$emit('deleteFromCart')
    }
  },
  computed: {
    ...mapGetters(['GET_ALL_BIOMATERIALS'])
  }
}
</script>

<style></style>
