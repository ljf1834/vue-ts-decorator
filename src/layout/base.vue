<template>
  <el-container style="height: 100%">
    <el-aside style="z-index: 2" :class="{'collapse-active': isCollapse}"><lay-menu /></el-aside>
    <el-container>
      <el-header><lay-header /></el-header>
      <el-main>
        <transition :name="transitionName">
          <keep-alive :include="keepAlive" :max="20">
            <router-view />
          </keep-alive>
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator';
import LayMenu from './menu.vue';
import LayHeader from './header.vue';
import RouteStore from '@/store/modules/route';

@Component({
  components: { LayMenu, LayHeader },
  beforeRouteLeave(to: any, from: any, next: Function) {
    RouteStore.REMOVE_ROUTE_TAB(null);
    next();
  }
})
export default class Home extends Vue {
  
  private transitionName = '';

  private keepAlive: any[] = [];

  get routeTabs() { return RouteStore.routeTabs }

  @Watch('routeTabs')
  tabsChange() {
    this.keepAlive = this.routeTabs.map(e => e.name);
  }

  @Watch('$route')
  routeChange(to: any, from: any) {
    if (to.meta.keepAlive) {
      let isHas = this.routeTabs.some(n => n.name === to.name);
      if (!isHas) {
        RouteStore.SET_ROUTE_TAB(to);
      }
    }
    /* ------------- 转场动画 ------------- */
    if (to.meta.index > from.meta.index){
      this.transitionName = 'slide-left';
    } else{
      this.transitionName = 'slide-right';
    }
  }

  private isCollapse = false;
  created() {
    this.$bus.$on('nav-is-collapse', (e: boolean) => this.isCollapse = e);

    /* --------- 进入base页时，由于不触发路由变更，需在此添加需缓存路由 --------- */
    let isHas = this.routeTabs.some(r => r.path === this.$route.path);
    !isHas && RouteStore.SET_ROUTE_TAB(this.$route);
  }
  beforeDestroy() {
    this.$bus.$off('nav-is-collapse');
  }
}
</script>

<style lang="less" scoped>
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  width: 100%;
  transition: all 300ms;
  position: absolute;
  z-index: 1;
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(-10%, 0, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(10%, 0, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(10%, 0, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-10%, 0, 0);
}
::v-deep .el-aside {
  width: 220px !important;
  transition: all .3s;
  border-right: solid 1px #e6e6e6;
  &.collapse-active {
    width: 64px !important;
  }
}
::v-deep .el-header {
  height: 64px;
  line-height: 64px;
  box-shadow: 0 0 5px #ccc;
}
::v-deep .el-main {
  position: relative;
}
</style>