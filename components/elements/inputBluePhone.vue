<template>
  <div
    class="relative border  rounded-md px-4 py-3 shadow-sm anime"
    :class="[getValue1.length <= 2 ? 'text-[#343434]/70' : 'text-main']"
  >
    <label
      for=""
      class="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium anime"
      :class="[getValue1.length <= 2 ? 'text-[#343434]/70' : 'text-main']"
      >{{ label }}</label
    >
    <input
      v-bind:type="typeI"
      placeholder="+7(___)___−__−__*"
      v-facade="'+7(###)###-##-##'"
      v-bind:value="value"
      @input="toForm"
      class="block w-full border-0 p-0  focus:outline-none  sm:text-sm"
    />
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    typeI: String,
    placeholderI: String
  },
  data () {
    return {
      getValue1: '',
      value: ''
    }
  },
  methods: {
    toForm (event) {
      this.$emit('getValue', event.target.value)
    }
  }
}
</script>

<style></style>
