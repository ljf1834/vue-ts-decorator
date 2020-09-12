import { Component, Prop, Vue } from 'vue-property-decorator';
import './tip.less';
@Component({
  name: 'cus-tip',
})
export default class CusTip extends Vue {
  @Prop({ default: 'default' }) type!: 'default' | 'success' | 'error' | 'warning';
  protected render() {
    return (
      <div class={ `cus__tip__container ${this.type}` }>
        <p>{ this.$slots.default }</p>
      </div>
    )
  }
}