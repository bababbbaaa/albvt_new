<template>
  <div
    class=" flex  items-center justify-between py-[8px] border-b-[0.5px] border-b-[#D9D9D9]/50"
  >
    <div class="flex gap-[8px] items-center justify-between w-full">
      <div class="flex gap-2 w-full">
        <div class="flex justify-between items-center gap-2  w-full">
          <span
            class="text-[12px] sm:text-[14px] w-4/6  cursor-pointer anime test-text3 "
            :title="bio_data.attributes.Name"
            >{{ bio_data.attributes.Name }}</span
          >

          <span class="text-[12px] sm:text-[14px] text-right w-2/6 text-[#717171] font-medium"
            >{{ parseInt(bio_data.attributes.Price).toLocaleString('ru-RU') }} руб.</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    bio_data: {
      type: Object
    }
  }
}
</script>

<style></style>
