<template>
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