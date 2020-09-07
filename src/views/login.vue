<template>
  <div class="container">
    <div class="login-box">
      <div class="title">登录</div>
      <el-form :model="formGroup" :rules="rules" ref="formGroup">
        <el-form-item prop="username">
          <el-input placeholder="请输入您的用户名" maxlength="30" prefix-icon="el-icon-user" v-model="formGroup.username" @keyup.enter.native="submit" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" show-password placeholder="请输入您的密码" maxlength="30" prefix-icon="el-icon-lock" v-model="formGroup.password" @keyup.enter.native="submit" />
        </el-form-item>
      </el-form>
      <div class="submit" @click="submit">登录</div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { ElForm } from 'element-ui/types/form';
import { decrypt, encrypt } from '@/utils/aes';
import { ResponseBody } from '@/core/interfaces';
import { Route } from 'vue-router/types/router';
@Component({
  beforeRouteEnter(to: Route, from: Route, next: any) {
    next((vm: Login) => {
      vm.sourcePage = from;
    })
  }
})
export default class Login extends Vue {

  formGroup = {
    username: null,
    password: null
  }
  rules = {
    username: { required: true, message: '请输入用户名！' },
    password: { required: true, message: '请输入密码！' }
  }

  /* 记录来源，登录成功后直接返回至来源页面 */
  sourcePage!: Route;

  public $refs!: {
    formGroup: ElForm
  };
  async submit() {
    this.$router.push(this.sourcePage.path);
    // let valid = await this.$refs.formGroup.validate();
    // let { username, password } = this.formGroup;
    // if (valid) {
    //   let res: ResponseBody = await this.axios.post('/user/login', { username, password: encrypt(password) });
    //   if (res.code === 200) {
    //     this.$router.push(this.sourcePage.path);
    //   } else {
    //     this.$message.warning(res.message);
    //   }
    // }
  }
}
</script>
<style lang="less" scoped>
.container {
  height: 100%;
  background: url('./../assets/login-bg.jpg') 0 center;
  background-size: cover;
}
.login-box {
  width: 460px;
  position: absolute;
  top: 50%;
  margin-top: -240px;
  left: 324px;
  &::before {
    content: '';
    display: block;
    width: 65px;
    height: 8px;
    background: #5BAFF1;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 2px;
  }
  .title {
    color: #3A3A3A;
    font-size: 44px;
    line-height: 1;
    font-family: SourceHanSansCN;
    margin : 44px 0 60px;
  }

  /deep/ .el-input__inner {
    height: 64px;
    font-size: 20px;
    font-weight: 400;
    border-top: 0;
    border-right: 0;
    border-left: 0;
    border-radius: 0;
    border-bottom: solid 1px #E1E1E1;
    padding: 22px 0 22px 64px;
  }
  /deep/ .el-input__prefix {
    left: 17px;
    color: #5BAFF1;
    font-size: 30px;
    .el-input__icon {
      line-height: 64px;
    }
  }
  /deep/ .el-form-item__error {
    font-size: 16px;
    text-indent: 64px;
  }
  .submit {
    margin-top: 70px;
    width: 230px;
    height: 50px;
    color: #fff;
    font-size: 24px;
    line-height: 50px;
    font-weight: 400;
    text-align: center;
    background: #4B75F6;
    opacity: 0.9;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
      opacity: .8;
    }
    &:active {
      opacity: 1;
    }
  }
}
</style>