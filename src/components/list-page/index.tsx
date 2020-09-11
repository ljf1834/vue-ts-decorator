import { Component, Prop, Vue } from 'vue-property-decorator';
import './list-page.less';
import CusTable from '../table';
@Component({
  name: 'cus-list-page',
})
export default class CusListPage extends Vue {

  @Prop() url!: string;
  @Prop({ default: () => [] }) queryNodes!: any[];

  protected render() {
    return (
      <div class="cus__list-page__container">
        <cus-query 
          nodes={this.queryNodes}
          onSubmit={(event: object) => (this.$refs.table as CusTable).request(event)}
        />
        <cus-talbe ref="table" url={this.url}>
          { this.$slots.default }
        </cus-talbe>
      </div>
    )
  }

}