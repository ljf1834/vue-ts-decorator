import { Component, Prop, Vue } from 'vue-property-decorator';
import './query.less';

@Component({
  name: 'cus-query',
})
export default class CusQuery extends Vue {

  @Prop() nodes!: any[];

  private formGroup: any = {};

  constructor(props) {
    super(props);
    this.nodes.map(node => {
      if (node.keys) {
        this.formGroup[node.keys[0]] = null; 
        this.formGroup[node.keys[1]] = null; 
      } else {
        this.formGroup[node.key] = undefined;
      }
      if (node.url) {
        this.axios.post(node.url).then((res: any) => node.options = [...res.result, ...(node.options || [])]);
      }
    })
  }

  submit() {
    let data = { ...this.formGroup };
    Object.keys(data).map(key => (data[key] === undefined || data[key] === null || data[key] === '') && delete data[key]);
    this.$emit('submit', data);
  }
  reset() {
    Object.keys(this.formGroup).map(key => this.formGroup[key] = undefined);
  }

  protected render() {
    return (
      <el-form inline ref="formGroup" label-width="82px" class={['cus__query__container']}>
        <input type="text" style="display:none" />
        {this.nodes.map((node: any) => {
          return (
            <el-form-item label={ node.label }>{
              (() => {
                switch (node.type) {
                  case 'input': {
                    let n = node as NInput;
                    return (
                      <el-input
                        clearable
                        value={this.formGroup[n.key]}
                        onInput={(v: string) => { this.formGroup[n.key] = v }}
                        placeholder={n.placeholder || `请输入${n.label}`}
                        nativeOnKeydown={(e: any) => { e.keyCode === 13 && this.submit() }}
                      />
                    )
                  }
                  case 'number': {
                    let n = (node as NNumber);
                    return (
                      <el-input-number
                        clearable
                        controls-position="right"
                        value={this.formGroup[n.key]}
                        onInput={(v: number) => { this.formGroup[n.key] = v }}
                        placeholder={n.placeholder || `请输入${n.label}`}
                        nativeOnKeydown={(e: any) => { e.keyCode === 13 && this.submit() }}
                      />
                    )
                  }
                  case 'select': {
                    let n = node as NSelect;
                    return (
                      <el-select 
                        clearable
                        value={this.formGroup[n.key]}
                        onInput={(v) => { this.formGroup[n.key] = v }}
                        placeholder={n.placeholder || `请选择${n.label}`}>
                        {
                          n.options?.map(option => (
                            <el-option key={option[n.labelKey || 'id']} label={option[n.labelKey || 'name']} value={option[n.labelKey || 'id']} />
                          ))
                        }
                      </el-select>
                    )
                  }
                  case 'datepicker': {
                    let n = node as NDatepicker;
                    return (
                      <el-date-picker
                        type="date"
                        value-format={node.format || 'yyyy-MM-dd'}
                        value={this.formGroup[n.key]}
                        onInput={(v) => { this.formGroup[n.key] = v }}
                        placeholder={n.placeholder || `请选择${n.label}`}
                      />
                    )
                  }
                  case 'rangepicker': {
                    let n = node as NRangepicker;
                    return (
                      <el-date-picker
                        type="daterange"
                        value-format={node.format || 'yyyy-MM-dd'}
                        range-separator="~"
                        value={this.formGroup[n.key]}
                        onInput={(v) => { this.formGroup[n.key] = v }}
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                      />
                    )
                  }
                  case 'between': {
                    let n = node as NBetween;
                    return (
                      <el-input readonly value="~" style="vertical-align: initial">
                        <el-input
                          clearable
                          slot="prepend"
                          style={{width: '100px'}}
                          value={this.formGroup[n.keys[0]]}
                          onInput={(v: string) => { this.formGroup[n.keys[0]] = v }}
                          placeholder="开始"
                          nativeOnKeydown={(e: any) => { e.keyCode === 13 && this.submit() }}
                        />
                        <el-input
                          clearable
                          slot="append"
                          style={{ width: '100px' }}
                          value={this.formGroup[n.keys[1]]}
                          onInput={(v: string) => { this.formGroup[n.keys[1]] = v }}
                          placeholder="结束"
                          nativeOnKeydown={(e: any) => { e.keyCode === 13 && this.submit() }}
                        />
                      </el-input>
                    )
                  }
                  default:
                    break;
                }  
              })()
            }</el-form-item>
          )
        })}
        <el-form-item label=" ">
          <el-button type="primary" onClick={ this.submit }>查询</el-button>
          <el-button onClick={ this.reset }>重置</el-button>
        </el-form-item>
      </el-form>
    );
  }
}

interface NPublic {
  readonly label: string;
  readonly default?: any;
  readonly placeholder?: string;
}
interface NInput extends NPublic { 
  readonly type: 'input';
  readonly key: string; 
}
interface NNumber extends NPublic {
  readonly type: 'number';
  readonly key: string; 
}
interface NBetween extends NPublic {
  readonly type: 'between';
  readonly keys: [string, string];
}
interface NSelect extends NPublic {
  readonly type: 'select';
  readonly key: string;
  readonly url?: string;
  readonly multiple?: boolean;
  options?: any[]
  readonly labelKey?: string;
  readonly valueKey?: string;
}
interface NDatepicker extends NPublic {
  readonly type: 'datepicker';
  readonly key: string;
  format?: 'yyyy-MM-dd' | 'yyyy-MM-dd hh:mm:ss',
}
interface NRangepicker extends NPublic {
  readonly type: 'rangepicker';
  readonly key: string;
  format?: 'yyyy-MM-dd' | 'yyyy-MM-dd hh:mm:ss',
}