<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <Playground/>
  <Component1/>
  <Component2/>
</template>

<script>
import Playground from '@/components/dev/Playground.vue'
import Component1 from '@/components/Component1.vue'
import Component2 from '@/components/Component2.vue'

export default {
  name: 'App',
  components: {
    Playground,
    Component1,
    Component2,
  },
  setup() {
    // console.log("Setup")
  },
  beforeCreate() {
    // console.log("Before Create")
  },
  created() {
    // console.log("Created")
  },
  beforeMount() {
    // console.log("Before Mount")
  },
  mounted() {
    // console.log("Mounted")
  },
  beforeUpdate() {
    // console.log("Before Update")
  },
  updated() {
    // console.log("Updated")
  },
  beforeUnmount() {
    // console.log("Before Unmount")
  },
  unmounted() {
    // console.log("Unmounted")
  },
}
</script>

<style lang="scss">
@import "@/styles/_styles";
</style>
