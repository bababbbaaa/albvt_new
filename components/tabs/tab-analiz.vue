<template>
  <div v-if="data" class='' v-show='isActive'>
    <p  class="text-[14px] pt-4">{{replaceDAta}}</p> 
    <!-- <p v-html="data" ></p> -->
    <div class="my-4" v-if="crossel">
      <span class="text-center w-full font-medium text-[16px]"
                  >Состав комплекса:</span
                >
                <div class="flex flex-col gap-2 mt-4">
                  <div
                    v-for="(item, i) in crossel"
                    :key="i"
                    class="bg-white p-4 rounded-[5px] shadow-md  h-full grid grid-cols-5 items-center gap-4"
                  >
                    <div
                      class="h-full flex flex-col gap-2 col-span-5 sm:col-span-4"
                    >
                      <nuxt-link
                        :to="
                          `/all-analyzes/in-complecs/` +
                            item.categories[0].id +
                            '/' +
                            item.id
                        "
                        class="text-[14px] sm:text-[16px] text-[#4CBDEE]"
                        >{{ item.name }}</nuxt-link
                      >
                      <span class="text-[14px] text-[#343434]/70">
                        Код: {{ item.attributes[2].options[0] }}
                      </span>
                    </div>
                    <div
                      class="font-medium text-[14px] sm:text-[16px] h-full col-span-5 sm:col-span-1 flex justify-end"
                    >
                      {{ item.price }} ₽
                    </div>
                  </div>
                </div>
    </div>
  </div>
</template>

<script>

var regex = /(&nbsp;|<([^>]+)>)/ig

  


export default {
  props: {
    title: {
      type: String,
      default: 'Tab'
    },
    crossel: {
      type: Array
    },
    data: {
      type: String,
    }
  },
  data () {
    return {
      isActive: true
    }
  },
  computed: {
    replaceDAta(){
      return this.data.replace(regex, "")
    }
  }
}
</script>