<template>
  <div class="menu-container">
    <div class="logo"><img src="@/assets/logo.png" alt="E达OA"></div>
    <el-menu :default-active="currentRoute.path" router style="height: 100%">
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
import MenuList from '@/router/menu-list';
import { namespace } from 'vuex-class';
const routeStore = namespace('route')
@Component({
  name: 'lay-menu'
})
export default class extends Vue {
  list = MenuList;

  @routeStore.State('currentRoute') currentRoute!: any;
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
  border-right: solid 1px #e6e6e6;
  background: #fff;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  img {
    height: 40px;
  }
}
.menu-container > .el-menu {
  margin-top: 62px;
}
</style>