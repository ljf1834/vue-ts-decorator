import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Detail extends Vue {

  click() {
    this.$emit('loading', true);
    setTimeout(() => {
      this.$emit('loading');

      this.$emit('close', '关闭drawer');
    }, 2000);
  }

  save() {
    this.click();
  }

  protected render() {
    return (
      <div>
        <el-button onClick={this.click}>点击2s后关闭</el-button>
      </div>
    )
  }
}