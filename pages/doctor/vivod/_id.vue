<template>
  <div class="container py-2 flex flex-col justify-between pb-10">
    <div>tut</div>
    <div>
      <button
        @click="$router.back()"
        class=" flex  justify-start items-center gap-1"
      >
        <img src="~/assets/icons/arrow-back.svg" alt="" />
        Назад
      </button>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'Doctor'
}
</script>

<style></style>
