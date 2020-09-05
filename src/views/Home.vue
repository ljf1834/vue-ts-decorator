<template>
  <el-container style="height: 100%">
    <el-aside><nav-menu /></el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Menu from '@/views/base/menu.vue';
@Component({
  components: { 'nav-menu': Menu }
})
export default class Home extends Vue {
  beforeCreate() {
    console.log('to home', this.$storage);
    this.axios.post('/api/userinfo').then(res => console.log(res));
  }
}
</script>