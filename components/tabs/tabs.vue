<template>
  <div >
    <ul class='flex justify-between w-full gap-4'>
      <li v-for='(tab, index) in tabs'
        :key='tab.title'
        @click='selectTab(index)'
        class="flex w-1/2 justify-center cursor-pointer items-center px-3 border border-[#4CBDEE] rounded-[5px] h-[40px]  text-[16px]"
        :class='{"flex bg-[#4CBDEE] text-white justify-center items-center border border-[#4CBDEE] rounded-[5px] h-[40px]  flex-col gap-2": (index == selectedIndex)}'>
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
      tabs: []         // all of the tabs
    }
  },
  created () {
    this.tabs = this.$children
  },
  mounted () {
    if (this.$route.path == '/all-analyzes/1-dlya-zhenshhin/2797') {
      this.selectedIndex = 1
      console.log('1 ' + this.$route.path);
    } else {
     this.selectedIndex = 0
     console.log('2 ' + this.$route.path);
    }

    
  },
  methods: {
    selectTab (i) {
      this.selectedIndex = i
      // loop over all the tabs
      this.tabs.forEach((tab, index) => {
        tab.isActive = (index === i)
      })
    }
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
  .tabs__light .tab{
    background-color: #fff;
  }
  .tabs__light li {
    background-color: #ddd;
    color: #aaa;
  }
  .tabs__light li.tab__selected {
    background-color: #fff;
    color: #83FFB3;
  }
  .tabs__dark .tab{
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