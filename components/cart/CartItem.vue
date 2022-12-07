<template>
  <div
    class=" flex  items-center justify-between py-[8px] border-b-[0.5px] border-b-[#D9D9D9]/50"
  >
    <div class="flex gap-[8px] items-center justify-between w-full">
      <div class="flex gap-2">
        <div class="flex flex-col">
          <span
            class="text-[14px] sm:text-[16px]  cursor-pointer text-main anime test-text3 "
            :title="itemInCart.attributes.Name"
            >{{ itemInCart.attributes.Name }}</span
          >
          <div
            class="text-[12px] text-[#9A9A9A] pt-1 flex flex-col justify-start gap-2 items-start"
          >
            <span>
              {{ itemInCart.attributes.Art }}
            </span>
            <!-- <div
              v-for="item in newTest"
              :key="item.id"
              class="grid grid-cols-[2fr,1fr] gap-2 "
            >
              <span
                class="text-[12px] text-[#838383] font-thin"
                v-for="name in item"
                :key="name.id"
              >
                {{ name.name }}
              </span>
            </div> -->
            <!-- <span v-if="itemInCart.cross_sell_ids.length >= 1">
              ({{ itemInCart.cross_sell_ids.length }}) Анализов
            </span> -->
          </div>

          <div class="flex items-center justify-between gap-[10px]  pt-2">
            <span class="text-[14px] sm:text-[16px] text-[#717171] font-medium"
              >{{
                parseInt(itemInCart.attributes.Price).toLocaleString('ru-RU')
              }}
              руб.</span
            >
          </div>
        </div>
      </div>
    </div>

    <button @click="deleteFromCart(itemInCart)">
      <img
        src="/img/icons/close_cart.svg"
        alt=""
        title="Удалить"
        class="cursor-pointer hover:scale-125 anime"
      />
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
  },
  // mounted () {
  //   this.itemInCart.attributes.data.forEach(element => {
  //     this.newTest.push(
  //       this.GET_ALL_BIOMATERIALS.filter(item => item.id == element)
  //     )
  //   })
  // }
}
</script>

<style></style>
