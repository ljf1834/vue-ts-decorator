<template>
  <el-container style="height: 100%">
    <el-aside style="width: 220px; z-index: 2"><lay-menu /></el-aside>
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
import LayMenu from '@/views/layout/menu.vue';
import LayHeader from '@/views/layout/header.vue';
import { namespace } from 'vuex-class';
const userStore = namespace('route')
@Component({
  components: { LayMenu, LayHeader },
  beforeRouteLeave(to: any, from: any, next: Function) {
    (this as any).removeRouteTab(null);
    next();
  }
})
export default class Home extends Vue {
  
  transitionName = '';

  keepAlive: any[] = [];

  @userStore.Mutation('setRouteTab') setRouteTab!: Function;

  @userStore.Mutation('setCurrentRoute') setCurrentRoute!: Function;

  @userStore.Mutation('removeRouteTab') removeRouteTab!: any;

  @userStore.State('routeTabs') routeTabs!: any[];

  @Watch('routeTabs')
  tabsChange() {
    this.keepAlive = this.routeTabs.map(e => e.name);
  }

  @Watch('$route')
  routeChange(to: any, from: any) {
    this.setCurrentRoute(to);
    if (to.meta.keepAlive) {
      let isHas = this.routeTabs.some(n => n.name === to.name);
      if (!isHas) {
        this.setRouteTab(to);
      }
    }
    /* ------------- 转场动画 ------------- */
    if (to.meta.index > from.meta.index){
      this.transitionName = 'slide-left';
    } else{
      this.transitionName = 'slide-right';
    }
  }

  /* --------- 进入base页时，由于不触发路由变更，需在此添加需缓存路由 --------- */
  created() {
    this.setCurrentRoute(this.$route);

    let isHas = this.routeTabs.some(r => r.path === this.$route.path);
    !isHas && this.setRouteTab(this.$route);
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
/deep/ .el-header {
  height: 64px;
  line-height: 64px;
  box-shadow: 0 0 5px #ccc;
}
/deep/ .el-main {
  position: relative;
}
</style>