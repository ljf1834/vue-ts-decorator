import Vue, { Component } from 'vue';
import './drawer.less';

const create = (opt: DrawerCreate) => {
  let options = {
    title: opt.title || null,
    width: opt.width || 720,
    component: opt.component,
    props: opt.props || {},
    mask: typeof opt.mask === 'undefined' ? true : opt.mask,
    maskClosable: typeof opt.maskClosable === 'undefined' ? true : opt.maskClosable,
    closable: typeof opt.closable === 'undefined' ? true : opt.closable,
    close: opt.close || ((val?: any) => {}),
    footed: typeof opt.footed === 'undefined' ? false : opt.footed,
  }

  const vm = new Vue({
    // render 生成虚拟dom
    render: h => h(options.component, { 
      props: {
        ...options.props,
        drawerClose(val?: any) {
          remove(val);
        }
      }
    })
  }).$mount(); // $mount 生成真实dom, 挂载dom 挂载在哪里, 不传参的时候只生成不挂载，需要手动挂载

  const carrier = document.createElement('div');

  let maskEl: HTMLElement = document.createElement('div');
  maskEl.className = 'drawer-mask';
  if (options.mask) {
    carrier.appendChild(maskEl);
    if (options.maskClosable) {
      maskEl.onclick = () => {
        remove();
      }
    }
  }
  // 回收组件
  let remove = (val?: any) => {
    options.close(val);
    maskEl.className = 'drawer-mask active';
    drawerBox.className = 'drawer-box active';
    setTimeout(() => {
      document.body.removeChild(carrier);
    }, 500);
    vm.$children[0].$destroy(); // 销毁组件
  };

  let drawerBox = document.createElement('div');
  drawerBox.className = 'drawer-box';
  drawerBox.style.width = options.width + 'px';

  let drawerBody = document.createElement('div');
  drawerBody.className = 'drawer-body';
  drawerBody.appendChild(vm.$el);
  drawerBox.appendChild(drawerBody);
  if (options.title) {
    let titleEl = document.createElement('div');
    titleEl.className = 'drawer-title';
    titleEl.innerHTML = `<span>${options.title}</span>`;
    if (options.closable) {
      let iconEl = document.createElement('i');
      iconEl.className = 'el-dialog__close el-icon el-icon-close';
      iconEl.onclick = () => { remove() };
      titleEl.appendChild(iconEl);
    }
    drawerBox.insertBefore(titleEl, drawerBox.children[0]);
  }
  if (options.footed) {
    let drawerFooter = document.createElement('div');
    drawerFooter.className = 'drawer-footer';
    let closeBtn = document.createElement('button');
    let saveBtn = document.createElement('button');
    closeBtn.className = 'drawer-close-btn';
    saveBtn.className = 'drawer-save-btn';
    closeBtn.innerHTML = '<span>取消</span>';
    saveBtn.innerHTML = '<span>确定</span>';
    closeBtn.onclick = () => { remove(); }
    saveBtn.onclick = () => {
      let vmDW: any = vm.$children[0]
      if (vmDW.confirm) {
        saveBtn.innerHTML = `<i class="el-icon-loading"></i><span>加载中</span>`;
        saveBtn.className = 'drawer-save-btn loading';
        vmDW.confirm().then((res: any) => {
          saveBtn.innerHTML = `<span>确定</span>`;
          saveBtn.className = 'drawer-save-btn';
          res && remove(res);
        }).catch((err: any) => {
          saveBtn.innerHTML = `<span>确定</span>`;
          saveBtn.className = 'drawer-save-btn';
        })
      }
    }
    drawerFooter.appendChild(closeBtn)
    drawerFooter.appendChild(saveBtn)
    drawerBox.appendChild(drawerFooter);
  }

  carrier.appendChild(drawerBox);
  document.body.appendChild(carrier);
  
}

export default { install: (vue: any) => (vue.prototype.$drawer = { create }) };

declare module 'vue/types/vue' {
  interface Vue {
    $drawer: { create: (options: DrawerCreate) => void }
  }
}

interface DrawerCreate {
  title?: string;
  width?: number;
  component?: Component;     // 子组件
  mask?: boolean;          // 是否展示遮罩
  maskClosable?: boolean;  // 点击蒙层是否允许关闭
  closable?: boolean;      // 是否展示右上角关闭按钮
  props?: object;          // 传入子组件的值
  close?: (val?: any) => void;
  footed?: boolean;         // 是否拥有默认页脚
}