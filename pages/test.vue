<template>
  <div class="container py-[47px]">
    <button @click="send">send</button>
  </div>
</template>

<script>
export default {
  layout: 'MainLayout',
  methods: {
    send () {
      this.$mail.send({
        from: 'John Doe',
        subject: 'Incredible',
        text: 'This is an incredible test message'
      })
    }
  }
}
</script>

<style></style>
