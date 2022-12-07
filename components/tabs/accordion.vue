<template>
  <div class="">
    <div class="tab__header">
      <a
        href="#"
        class="tab__link py-4  bg-blue-dark hover:bg-blue-darker no-underline text-white border-b-[1px]  border-[#C6CFD7] flex justify-between items-center"
        @click.prevent="active = !active"
      >
        <span class="text-[#343434] text-[14px] hover:text-main anime" :class="{ '!text-main': active}">{{ title }}</span>
        <span class="down-Arrow" v-show="!active"><img src="/img/icons/arrow.svg" alt="" class="w-5 h-5"></span>
        <span class="up-Arrow" v-show="active"><img src="/img/icons/arrow.svg" alt="" class="rotate-90 w-5 h-5"></span>
      </a>
    </div>
    <div class="tab__content px-2 py-4 text-[13px] bg-white" v-show="active"><slot /></div>
  </div>
</template>

<script>
export default {
  props: ['title'],
  data () {
    return {
      active: false
    }
  }
}
</script>

<style></style>
