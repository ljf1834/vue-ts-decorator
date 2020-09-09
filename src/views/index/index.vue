<template>
  <div>
    <draggable-table />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import DraggableTable from '@/components/draggable-table.vue'
@Component({
  name: 'index',
  components: { DraggableTable }
})
export default class extends Vue {

}
</script>