<template>
  <div class="bg-white rounded-2xl  p-4 flex flex-col gap-4 justify-between w-full">
    <span class="text-main font-bold text-3xl w-full text-center">+{{ data.attributes.Price.toLocaleString('ru-RU')}} ₽</span>
    <p class="text-sm min-h-[70px]">
      {{data.attributes.analizy.data.attributes.Name}}
    </p>
    <div class="w-full flex justify-between items-center border-t border-tem/10 pt-4">
      <span class="text-sm text-tem/70">Артикул - {{data.attributes.analizy.data.attributes.Art}}</span>
      <a :href="data.attributes.Link" class="px-6 py-3 rounded-md bg-main text-white">Состав</a>
    </div>
  </div>
</template>

<script>
export default {
   props: {
    data: Object
  }
}
</script>

<style></style>
