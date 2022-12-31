<template>
  <yandex-map
    :coords="coorsMap"
    :zoom="15"
    v-if="showMap"
    class="h-[200px] sm:h-[300px] w-full"
  >
    <ymap-marker :coords="coorsMap" marker-id="123" :hint-content="data_map.Name" />
  </yandex-map>
</template>
<script>
export default {
  props: {
    data_map: Object
  },
  data () {
    return {
      showMap: false
    }
  },
  methods: {
   
  },
  computed: {
    coorsMap () {
      return this.data_map.Coords.split(',')
    }
  },
  mounted () {
    this.showMap = true
  }
}
</script>

<style></style>
