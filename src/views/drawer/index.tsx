import { Component, Prop, Vue } from 'vue-property-decorator';

import Detail from './detail';

@Component
export default class Demo extends Vue {

  toggleSize() {
    // this.$ELEMENT
  }

  openDrawer() {
    this.$drawer.create({
      title: '标题',
      component: Detail,
      footed: true
    }).$on('close', (e) => console.log(e))
  }

  protected render() {
    return (
      <div>
        <el-button onClick={this.toggleSize}>toggle size</el-button>
        <el-button onClick={this.openDrawer}>drawer open</el-button>
      </div>
    )
  }
}