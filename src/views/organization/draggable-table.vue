<template>
  <div>
    <el-table ref="draggableTable" :data="list" row-key="id" highlight-current-row>
      <el-table-column label="ID" prop="id"></el-table-column>
      <el-table-column label="Title" prop="title"></el-table-column>
    </el-table>
    <div>
      <el-tag>拖拽后顺序 :</el-tag> {{ sortList }}
    </div>
  </div>
</template>

<script lang="ts">
import Sortable from 'sortablejs'
import { Component,Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'draggable-table'
})
export default class extends Vue {
  private list: any[] = []
  
  get sortList(): number[] {
    return this.list.map(v => v.id)
  }

  created() {
    const data = {"total":100,"items":[{"id":0,"status":"published","title":"Numquam occaecati totam ut et sed.","abstractContent":"Suscipit natus deleniti itaque et minima nobis. Architecto non eveniet.","fullContent":"<p>I am testing data, I am testing data.</p><p><img src=\"https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943\"></p>","sourceURL":"https://joanne.info","imageURL":"http://placeimg.com/640/480","timestamp":1598600717583,"platforms":["a-platform"],"disableComment":true,"importance":1,"author":"Mrs. Albert Wolf","reviewer":"Ms. Sonja Wolf","type":"US","pageviews":357},{"id":1,"status":"published","title":"Voluptatem fugiat corrupti aperiam nostrum impedit.","abstractContent":"Rerum quis rerum. Accusantium voluptas voluptas repellendus.","fullContent":"<p>I am testing data, I am testing data.</p><p><img src=\"https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943\"></p>","sourceURL":"https://lambert.net","imageURL":"http://placeimg.com/640/480","timestamp":1569898938429,"platforms":["b-platform"],"disableComment":true,"importance":3,"author":"Andres Fadel","reviewer":"Ivan Daniel","type":"JP","pageviews":480},{"id":2,"status":"draft","title":"Voluptate nesciunt impedit perferendis est id.","abstractContent":"Ex dolorum minima omnis est nisi. Impedit aut omnis quo saepe perferendis eum odit accusantium.","fullContent":"<p>I am testing data, I am testing data.</p><p><img src=\"https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943\"></p>","sourceURL":"https://hosea.net","imageURL":"http://placeimg.com/640/480","timestamp":1579770674227,"platforms":["c-platform"],"disableComment":true,"importance":3,"author":"Leland Connelly","reviewer":"Darla Ryan","type":"US","pageviews":395},{"id":3,"status":"published","title":"Inventore et saepe pariatur et magnam.","abstractContent":"Quis ad quae animi neque. Saepe fuga doloremque.","fullContent":"<p>I am testing data, I am testing data.</p><p><img src=\"https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943\"></p>","sourceURL":"https://michelle.net","imageURL":"http://placeimg.com/640/480","timestamp":1578965339089,"platforms":["a-platform"],"disableComment":false,"importance":2,"author":"Marcella Turcotte","reviewer":"Myra Jast","type":"CN","pageviews":438},{"id":4,"status":"published","title":"Officia est quo et aliquid hic.","abstractContent":"Vitae tempora sint. Quo sit dolorem cumque dolorum totam quod.","fullContent":"<p>I am testing data, I am testing data.</p><p><img src=\"https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943\"></p>","sourceURL":"https://cali.name","imageURL":"http://placeimg.com/640/480","timestamp":1594277472928,"platforms":["c-platform"],"disableComment":true,"importance":1,"author":"Dr. Byron Mueller","reviewer":"Faye Greenfelder","type":"JP","pageviews":392},{"id":5,"status":"draft","title":"Maiores cupiditate quaerat cupiditate excepturi laudantium.","abstractContent":"Repellendus modi et qui eum quis. Est exercitationem voluptatem pariatur.","fullContent":"<p>I am testing data, I am testing data.</p><p><img src=\"https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943\"></p>","sourceURL":"https://bradly.org","imageURL":"http://placeimg.com/640/480","timestamp":1577423626702,"platforms":["a-platform"],"disableComment":false,"importance":2,"author":"Rudy Kohler","reviewer":"Josh Jenkins","type":"JP","pageviews":330},{"id":6,"status":"published","title":"Modi aut ut quam placeat totam.","abstractContent":"Veritatis similique dolorem eum sequi provident. Fuga neque recusandae quas velit omnis eum asperiores quod iusto.","fullContent":"<p>I am testing data, I am testing data.</p><p><img src=\"https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943\"></p>","sourceURL":"https://nyasia.com","imageURL":"http://placeimg.com/640/480","timestamp":1568652571917,"platforms":["a-platform"],"disableComment":true,"importance":3,"author":"Susie McDermott","reviewer":"Karl Metz","type":"EU","pageviews":390},{"id":7,"status":"published","title":"Voluptate molestiae quisquam deleniti dolorum in.","abstractContent":"Omnis vel saepe et fugit occaecati alias est. Doloribus velit fugiat.","fullContent":"<p>I am testing data, I am testing data.</p><p><img src=\"https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943\"></p>","sourceURL":"https://geraldine.biz","imageURL":"http://placeimg.com/640/480","timestamp":1597084092654,"platforms":["c-platform"],"disableComment":false,"importance":1,"author":"Tommy Beier","reviewer":"Mrs. Luis Maggio","type":"JP","pageviews":324},{"id":8,"status":"draft","title":"Excepturi debitis blanditiis aliquam et voluptatibus.","abstractContent":"Quia ab accusantium sed. Placeat dolores aliquid atque.","fullContent":"<p>I am testing data, I am testing data.</p><p><img src=\"https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943\"></p>","sourceURL":"https://lucienne.org","imageURL":"http://placeimg.com/640/480","timestamp":1582850567067,"platforms":["b-platform"],"disableComment":false,"importance":3,"author":"Jorge Jacobi","reviewer":"Wesley Champlin","type":"US","pageviews":314},{"id":9,"status":"draft","title":"Repellendus error ab est ut blanditiis.","abstractContent":"Ut laboriosam quo. Nesciunt perferendis aut non qui.","fullContent":"<p>I am testing data, I am testing data.</p><p><img src=\"https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943\"></p>","sourceURL":"http://estella.com","imageURL":"http://placeimg.com/640/480","timestamp":1581025116308,"platforms":["a-platform"],"disableComment":true,"importance":1,"author":"Miss Katie Murray","reviewer":"Alison Littel","type":"EU","pageviews":403}]}
    this.list = data.items
    
    this.$nextTick(() => {
      this.setSort()
    })

    // setTimeout(() => {
    //   console.log('关闭1');
    //   this.$emit('close');
    // }, 1000);
  }

  private sortable!: Sortable;
  private setSort() {
    const el = (this.$refs.draggableTable as Vue).$el.querySelectorAll('.el-table__body-wrapper > table > tbody')[0] as HTMLElement
    this.sortable = Sortable.create(el, {
      ghostClass: 'sortable-ghost',
      onEnd: evt => {
        if (typeof (evt.oldIndex) !== 'undefined' && typeof (evt.newIndex) !== 'undefined') {
          const targetRow = this.list.splice(evt.oldIndex, 1)[0]
          this.list.splice(evt.newIndex, 0, targetRow);
        }
      }
    })
  }

  confirm() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(true);
      }, 2000);
    })
  }
}
</script>

<style>
.sortable-ghost {
  opacity: .8;
  color: #fff!important;
  background: #409EFF!important;
}
</style>
