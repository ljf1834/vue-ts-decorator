<template>
  <div class="container">
    <div class="router-tabs">
      <el-tabs @tab-remove="closeTab" :value="currentRoute.path" @tab-click="tabClick">
        <el-tab-pane v-for="i in routeTabs" :key="i.path" :label="i.meta.keepAlive" :name="i.path" :closable="routeTabs.length > 1" />
      </el-tabs>
    </div>
    <div class="header-user">
      <el-dropdown @command="commandList.get($event)()">
        <div class="el-dropdown-link">
          <el-avatar :size="28" :src="avatar" />
          <span>用户名</span>
          <i class="el-icon-arrow-down"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-user" disabled>个人中心</el-dropdown-item>
          <el-dropdown-item icon="el-icon-setting" disabled>主题设置</el-dropdown-item>
          <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
const userStore = namespace('route')
@Component({
  name: 'lay-header'
})
export default class extends Vue {

  @userStore.State('routeTabs') routeTabs!: any[];

  @userStore.State('currentRoute') currentRoute!: any;

  @userStore.Mutation('removeRouteTab') removeRouteTab!: Function;

  closeTab(path: string) {
    this.removeRouteTab(path);
    let toPath = this.routeTabs[this.routeTabs.length - 1].path;
    toPath !== this.currentRoute.path && this.$router.push(toPath);
  }

  tabClick(el: any) {
    this.$router.push(el.name);
  }

  commandList = new Map([
    ['logout', () => this.$router.push('/login')]
  ]);
  
  avatar = require('@/assets/default-boy.png');
}
</script>
<style lang="less" scoped>
.container {
  display: flex;
}
.router-tabs {
  float: left;
  flex: 1
}
.header-user {
  flex: 0 0 auto;
  cursor: pointer;
  margin-left: 40px;
}
/deep/ .el-tabs__header {
  margin-top: -2px;
}
/deep/ .el-tabs__header {
  margin-bottom: 0;
}
/deep/ .el-tabs__nav-wrap::after {
  display: none;
}
/deep/ .el-tabs__nav-next, .el-tabs__nav-prev {
  line-height: 45px;
  font-size: 15px;
  cursor: pointer;
}
/deep/ .el-avatar {
  vertical-align: middle;
  margin-right: 8px;
}
</style>