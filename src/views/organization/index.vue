<template>
  <div>
    <el-button @click="openLoading">打开loading</el-button>
    <cus-tip>默认内容-default</cus-tip>
    <cus-tip type="success">默认内容-success</cus-tip>
    <cus-tip type="error">默认内容-error</cus-tip>
    <cus-tip type="warning">默认内容-warning</cus-tip>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'organization'
})
export default class extends Vue {
  openLoading() {
    const loading = this.$loading({text: '努力加载中...'});
    setTimeout(() => {
      loading.close();
    }, 2000);
  }
}
</script>