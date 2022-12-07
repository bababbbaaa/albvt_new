<template>
  <div
    class="relative border-[1px]   rounded-md px-4 py-3  shadow-sm anime"
    :class="[value.length <= 2 ? 'border-[#343434]/70' : 'border-main']"
  >
    <label
      for=""
      class="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium anime"
      :class="[value.length <= 2 ? 'text-[#343434]/70' : 'text-main']"
      >{{ label }}</label
    >
    <input
      v-bind:type="typeI"
      v-bind:value="value"
      @input="toForm($event.target.value)"
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
      value: ''
    }
  },
  methods: {
    toForm (event) {
      this.value = event
      this.$emit('getValue', event)
    }
  }
}
</script>

<style></style>
