<template>
  <div><el-input v-model="n" /></div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component({
  name: 'index'
})
export default class extends Vue {
  n = 'x'
}
</script>