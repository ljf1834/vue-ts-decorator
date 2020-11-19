<template>
  <div class="menu-container">
    <div class="logo"><img :class="{scale: isCollapse}" src="@/assets/logo.png" alt="E达OA"></div>
    <el-menu :default-active="$route.path" router style="height: 100%" :collapse="isCollapse">
      <template v-for="menu in list">

        <el-menu-item :index="menu.key" :key="menu.key" v-if="menu.isLeaf">
          <i :class="menu.icon"></i>
          <span slot="title">{{ menu.title }}</span>
        </el-menu-item>

        <el-submenu :index="menu.key" :key="menu.key" v-else>
          <template slot="title">
            <i :class="menu.icon"></i>
            <span slot="title">{{ menu.title }}</span>
          </template>
          <el-menu-item v-for="link in menu.children" :index="link.key" :key="link.key">{{ link.title }}</el-menu-item>
        </el-submenu>

      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MenuList from '@/core/menu-list';
import RouteStore from '@/store/modules/route';

@Component({
  name: 'lay-menu'
})
export default class extends Vue {

  private list = MenuList;

  private isCollapse = false;
  created() {
    this.$bus.$on('nav-is-collapse', (e) => this.isCollapse = e);
  }
  beforeDestroy() {
    this.$bus.$off('nav-is-collapse');
  }

}
</script>

<style lang="less" scoped>
.menu-container {
  height: 100%;
  position: relative;
  overflow: hidden;
}
.logo {
  box-sizing: border-box;
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center;     /* 垂直居中 */
  box-shadow: 0 0 5px #ccc;
  background: #fff;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  img {
    height: 40px;
    transition: all .3s;
    &.scale {
      transform: scale(.5);
    }
  }
}
.menu-container > .el-menu {
  margin-top: 62px;
  border-right: 0;
}
/deep/ .el-menu {
  transition: all .3s;
}
</style>