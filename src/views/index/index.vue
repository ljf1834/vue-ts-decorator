<template>
  <div>
    <cus-query :nodes="nodes" @submit="$refs.table.request($event)" />
    <cus-table ref="table" url="/list">
      <el-table-column prop="id" label="id" />
    </cus-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class extends Vue {
  nodes = [
    {type: 'input', label: '输入框', key: 'name'}, 
    {type: 'number', label: '数字输入框', key: 'num'},
    {type: 'select', label: '下拉框', key: 'select', options: [{ name: '姓名', id: 1 }]},
    {type: 'datepicker', label: '日期选择', key: 'date'},
    {type: 'rangepicker', label: '日期区间', key: 'range'},
    {type: 'between', label: '区间', keys: ['start', 'end']},
  ];
}
</script>