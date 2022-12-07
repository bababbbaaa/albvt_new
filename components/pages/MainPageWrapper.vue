<template>
  <div class="sm:container flex flex-col gap-[40px] sm:gap-[100px]">
    <!-- <the-block-one class="mt-[47px] hidden " /> -->
    <header-group-items class="mt-[47px] sm:hidden block bg-main" />
    <complecs-analises  :data_slider="data_wrap"/>

    <all-info  :data_slider="data_wrap"/>
  </div>
</template>

<script>
import AllInfo from '../AllInfo.vue'
import ComplecsAnalises from '../ComplecsAnalises.vue'
import HeaderGroupItems from '../HeaderGroupItems.vue'
import TheBlockOne from '../TheBlockOne.vue'
export default {
  components: { TheBlockOne, ComplecsAnalises, AllInfo, HeaderGroupItems },
  data () {
    return {}
  },
  props: {
    data_wrap: Array,
  }
}
</script>

<style></style>
