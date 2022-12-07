<template>
  <div class="bg-[#fcfcfc]">
    <the-header  />
    <Nuxt 
    />
    <the-footer />
  </div>
</template>

<script>
import TheFooter from '~/components/TheFooter.vue'
import TheHeader from '~/components/TheHeader.vue'
export default {
  components: { TheHeader, TheFooter },
  data() {
    return {

    }
  },

}
</script>

<style></style>
