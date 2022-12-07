<template>
  <div class="bg-[#fcfcfc]">
    <the-header />
    <div
      class="container grid grid-cols-1 sm:grid-cols-[1fr,3fr] py-[44px] gap-[20px]"
    >
      <sidebar-complecs/>
      <Nuxt />
    </div>

    <the-footer />
  </div>
</template>

<script>
import SidebarComplecs from '~/components/Sidebars/SidebarComplecs.vue'
import TheFooter from '~/components/TheFooter.vue'
import TheHeader from '~/components/TheHeader.vue'




export default {
  components: { TheHeader, TheFooter, SidebarComplecs },
  data(){
    return {
    }
  },

}
</script>

<style></style>
