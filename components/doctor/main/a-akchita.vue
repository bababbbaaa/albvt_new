<template>
  <div
    class=" rounded-2xl p-4  flex flex-col gap-6 justify-between items-center ackc text-white"
  >
    <span class="w-full text-center font-medium text-xl"
      >{{data.attributes.Name}}</span
    >
    <div class="flex justify-center gap-4 items-start">
      <div class="flex flex-col text-white/50">
        <span class="font-medium text-6xl">{{data.attributes.OldStavka}}<span class="text-base">%</span> </span>
        <span class="uppercase text-sm">старая ставка</span>
      </div>
      <div class="flex flex-col">
        <span class="font-medium text-6xl">{{data.attributes.NewStavka}}<span class="text-base">%</span> </span>
        <span class="uppercase text-sm">новая ставка</span>
      </div>
    </div>
    <span class="text-xs w-full text-center text-white/70">Период проведения акции: {{data.attributes.Period}}</span>
  </div>
</template>

<script>
export default {
   props: {
    data: Object
  }
}
</script>

<style>
.ackc {
  background: linear-gradient(237.29deg, #6e9aef -11.76%, #6e90d0 114.85%);
}
</style>
