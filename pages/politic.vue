<template>
  <div class="container py-[47px] flex justify-center flex-col items-center gap-20">
      <heading-h-3>Политика обработки персональных данных</heading-h-3>
      <iframe src="/politic.pdf" width="1000" height="600"></iframe>
  </div>
</template>

<script>
import HeadingH3 from '~/components/HeadingH3.vue'
export default {
  components: { HeadingH3 },
    layout: 'MainLayout',
}
</script>

<style>

</style>