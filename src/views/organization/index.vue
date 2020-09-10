<template>
  <div>
    <el-button @click="open">open drawer</el-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import DraggableTable from '@/components/draggable-table.vue'
@Component({
  name: 'organization'
})
export default class extends Vue {
  open() {
    this.$drawer.create({
      title: '可拖动Table',
      component: DraggableTable,
      footed: true,
      close(e) {
        console.log(e)
      }
    });
  }

}
</script>