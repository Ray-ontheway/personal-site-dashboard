<script setup lang="ts">
import { toRefs } from 'vue'
interface PageTitleProps {
  pageTitle: string
}
const props = withDefaults(defineProps<PageTitleProps>(), {
  pageTitle: '',
})
const { pageTitle } = toRefs(props)
</script>
<template>
  <div class="page-title-wrap">
    <span>{{ pageTitle }}</span>
  </div>
</template>
<style lang="scss" scoped>
.page-title-wrap {
  width: 100%;
  font-size: 2.4rem;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  font-weight: bold;
  color: black;
  text-align: left;
  padding: 1.2rem 0;
}
</style>
