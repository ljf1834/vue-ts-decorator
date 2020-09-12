import { Component, Prop, Vue } from 'vue-property-decorator';
import './table.less';
@Component({
  name: 'cus-table',
})
export default class CusTable extends Vue {
  @Prop() url!: string;
  @Prop({ default: () => [] }) dataSet!: any[];
  @Prop({ default: true }) auto!: boolean;
  @Prop({ default: () => {} }) default!: object;
  @Prop({ default: () => { } }) init!: object;
  @Prop({ default: true }) hasPage!: boolean;

  private loading = false;
  private pageSize = 10;
  private pageNo = 1;
  private total = 0;
  private params = {};

  private dataSource = this.dataSet;

  constructor(props) {
    super(props)
    this.auto && this.request();
  }

  public request(params?: object) {
    if (this.loading || !this.url) { return; }
    this.loading = true;

    if (params) {
      this.pageNo = 1;
      this.params = params;
    }
    let paramJson ={ ...this.default, ...this.params };
    this.axios.post(this.url, Object.assign({
      pageSize: this.pageSize,
      pageNo: this.pageNo,
    }, Object.assign(paramJson, this.init))).then((res: any) => {
      this.loading = false;
      if (res.code == 200) {
        this.total = res.response.total;
        this.dataSource = res.response.data;
      } else if(res.code) {
        this.$message.warning(res.message);
      }
    })
  }

  protected render() {
    return (
      <div class="cus__table__container">
        <el-table stripe v-loading={ this.loading } data={ this.dataSource } tooltip-effect="dark">
          { this.$slots.default }
        </el-table>
        {
          this.hasPage && (
            <el-pagination 
              background={ true }
              total={ this.total }
              hide-on-single-page={ true }
              current-page={ this.pageNo }
              on={{...{'current-change': (e: number) => { this.pageNo = e; this.request(); }}}}
              layout="total, sizes, prev, pager, next" 
              on-size-change={(e: number) => { this.pageSize = e; this.request() }}>
            </el-pagination>
          )
        }
      </div>
    );
  }
}