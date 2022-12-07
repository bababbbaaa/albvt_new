<template>
  <div class="grid grid-cols-1  gap-[20px] pt-[47px] w-full ">
    <ul class="grid grid-cols-1 sm:grid-cols-5 gap-[10px]">
      <li
        v-for="(tab, index) in tabs"
        :key="tab.title"
        @click="selectTab(index)"
        class="flex justify-center flex-col cursor-pointer items-center  rounded-[5px] bg-white shadow-md py-4 sm:py-8   text-[14px] font-medium text-[#343434] hover:text-main hover:shadow-lg anime"
        :class="{ ' !text-main ': index == selectedIndex }"
      >
        {{ tab.title }}
      </li>
    </ul>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      default: 'light'
    }
  },
  data () {
    return {
      selectedIndex: 0, // the index of the selected tab,
      tabs: [] // all of the tabs
    }
  },
  created () {
    this.tabs = this.$children
  },
  mounted () {
    this.selectTab(0)
    // window.scrollTo({
    //   top: 0,
    //   behavior: 'smooth'
    // })
  },
  methods: {
    selectTab (i) {
      this.selectedIndex = i
      this.tabs.forEach((tab, index) => {
        tab.isActive = index === i
        console.log('tut')
        window.scrollTo({
          top: 247,
          behavior: 'smooth'
        })
        
      })
      // const el = document.querySelector('.test-id')
      //   el.scrollIntoView({block: "start", behavior: "smooth"})
    },
    scrollToID () {}
  }
}
</script>

<style lang="css">
ul.tabs__header {
  display: block;
  list-style: none;
  margin: 0 0 0 20px;
  padding: 0;
}
ul.tabs__header > li {
  padding: 15px 30px;
  border-radius: 10px;
  margin: 0;
  display: inline-block;
  margin-right: 5px;
  cursor: pointer;
}
ul.tabs__header > li.tab__selected {
  font-weight: bold;
  border-radius: 10px 10px 0 0;
  border-bottom: 8px solid transparent;
}
.tab {
  display: inline-block;
  color: black;
  padding: 20px;
  min-width: 800px;
  border-radius: 10px;
  min-height: 400px;
}
.tabs__light .tab {
  background-color: #fff;
}
.tabs__light li {
  background-color: #ddd;
  color: #aaa;
}
.tabs__light li.tab__selected {
  background-color: #fff;
  color: #83ffb3;
}
.tabs__dark .tab {
  background-color: #555;
  color: #eee;
}
.tabs__dark li {
  background-color: #ddd;
  color: #aaa;
}
.tabs__dark li.tab__selected {
  background-color: #555;
  color: white;
}
</style>
