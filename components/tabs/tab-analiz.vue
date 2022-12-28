<template>
  <div>
    <div v-if="data" class="" v-show="isActive">
      <div v-html="replaceDAta" class="text-sm pt-4"></div>
    </div>
    
  </div>
</template>

<script>
var regex = /(&nbsp;|<([^>]+)>)/gi

export default {
  props: {
    title: {
      type: String,
      default: 'Tab'
    },
    crossel: Array,
    data: {
      type: String
    }
  },
  data () {
    return {
      isActive: true
    }
  },
  computed: {
    replaceDAta () {
      return this.data.replace(regex, '')
    }
  }
}
</script>
