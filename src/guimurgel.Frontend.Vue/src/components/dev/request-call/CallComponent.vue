<template>
  <div>Call Component SHOWS!</div>
</template>
<script>
export default {
  name: "CallComponent",
  mounted() {
    console.log("Mounted Component CALL");
    this.init();
  },
  methods: {
    init() {
      this.request();
    },
    async request() {
      console.log("setTimeout request");
      await setTimeout(function () {
        console.log("setTimeout done");
        return 
      }, 3000);
    },
  },
};
</script>