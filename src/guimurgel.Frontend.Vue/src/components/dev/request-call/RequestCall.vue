<template>
  <Suspense>
    <template #default>
      <CallComponent />
    </template>
    <template #fallback>
      <div class="loading">
        Loading... 
      </div>
    </template>
  </Suspense>
</template>
<script>
import CallComponent from '@/components/dev/request-call/CallComponent'
export default {
  name: "RequestCall",
  components: {
    CallComponent,
  },
};
</script>
<style lang="scss" scoped>
.loading{
  widows: 100%;
  height: 100px;
  background-color: palevioletred;
}
</style>