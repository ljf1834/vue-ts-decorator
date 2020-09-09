<template>
  <div><el-button @click="open">open drawer</el-button></div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import DraggableTable from '@/components/draggable-table.vue'
@Component({
  name: 'organization'
})
export default class extends Vue {
  n = 'o';

  open() {
    let drawer = this.$drawer.create({
      title: '可拖动Table',
      component: DraggableTable
    });
    drawer.close.then(v => console.log(v))
    setTimeout(() => {
      // drawer.remove();
    }, 3000);

    // let d = this.$drawer.create({
    //   title: '标题',
    //   width: 700,
    //   mask: true,
    //   content: DraggableTable,
    //   props: {name: 'phuhoang'}
    // })
  }

}
</script>