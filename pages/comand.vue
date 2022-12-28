<template>
  <div class="container flex h-64  justify-center items-center">
    <button @click="start" class="bg-[green] text-white p-8">Start</button>
  </div>
</template>

<script>
import categoryAnaliz from '~/static/fakeBD/complecs2.json'
import CREATE_COMPLECS from '../graphql/CREATE_COMPLECS.gql'
export default {
  data () {
    return {
      dataE: categoryAnaliz
    }
  },
  methods: {
    start () {
      const data = categoryAnaliz
      console.log(data.length)

      let interval = 500 
      data.forEach((el, index) => {
        setTimeout(() => {
          console.log(el);
          this.$apollo
            .mutate({
              mutation: CREATE_COMPLECS,
              variables: {
                NAME: el.Title,
                DESC: el.Content,
                SUBDESC: el.Excerpt,
                UID: el.Sku,
                PRICE: el.Price,
                SUB_CAT: el.category,
                ART: el.pa_sku.toString(),
                TIME: el.pa_time,
                BIO: el.UpSells,
                COMPLECS: el.CrossSells
              }
            })
            .then(data => {
              console.log(data)
            })
            .catch(error => {
              console.error(error)
            })
        }, index * interval)

      })

     
    }
  }
}
</script>

<style></style>
