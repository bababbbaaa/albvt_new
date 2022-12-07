<template>
  <div>
    <main-page-wrapper :data_wrap="data" :isMobile="isMobile" />
  </div>
</template>

<script>
import MainPageWrapper from '~/components/pages/MainPageWrapper.vue'

export default {
  components: { MainPageWrapper },
  data () {
    return {
      data: [],
      dataInfo: [],
      isMobile: false,
    }
  },
  beforeDestroy () {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.onResize, { passive: true })
    }
  },
  methods: {
    
    onResize () {
      this.isMobile = window.innerWidth < 600
      console.log(this.$route.path)
    }
  },
  mounted () {
    this.onResize()

    window.addEventListener('resize', this.onResize, { passive: true })
  },
  layout: 'MainLayout',
  async asyncData ({ $axios }) {
    let { data } = await $axios.get(
      'https://foxsis.ru/alvd/wp-json/wp/v2/posts',
      {
        auth: {
          username: 'ck_85e44e8735261d45a19d8f7aaf012f8d640c2dac',
          password: 'cs_4261bb639f4e9a18c146851361d6317804a816fc'
        },
        params: {
          per_page: 20
        }
      }
    )
    

    return { data }
  }
}
</script>
<style>
input::-webkit-input-placeholder {
  opacity: 1;
  transition: opacity 0.3s ease;
}
input::-moz-placeholder {
  opacity: 1;
  transition: opacity 0.3s ease;
}
input:-moz-placeholder {
  opacity: 1;
  transition: opacity 0.3s ease;
}
input:-ms-input-placeholder {
  opacity: 1;
  transition: opacity 0.3s ease;
}
input:focus::-webkit-input-placeholder {
  opacity: 0;
  transition: opacity 0.3s ease;
}
input:focus::-moz-placeholder {
  opacity: 0;
  transition: opacity 0.3s ease;
}
input:focus:-moz-placeholder {
  opacity: 0;
  transition: opacity 0.3s ease;
}
input:focus:-ms-input-placeholder {
  opacity: 0;
  transition: opacity 0.3s ease;
}
</style>
