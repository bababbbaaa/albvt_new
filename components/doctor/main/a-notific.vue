<template>
  <div class="bg-white rounded-2xl p-4 drop-shadow-lg flex justify-between">
    <div class="flex flex-col justify-between items-start gap-6">
      <div class="flex flex-col">
        <span class="font-medium">Новое объявление</span>
        <span class="text-xs text-tem/50">{{
          new Date(data.attributes.createdAt).toLocaleString('ru', options)
        }}</span>
      </div>

      <p class="text-sm" v-html="data.attributes.Text">График работ в праздничные дни:</p>
    </div>
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-12 h-12 text-[#F85959]"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
        />
      </svg>
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
