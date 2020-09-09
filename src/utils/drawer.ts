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
  }

  const vm = new Vue({
    // render 生成虚拟dom
    render: h => h(options.component, { 
      props: {
        ...options.props,
        drawerClose(val?: any) {
          
        }
      }
    })
  }).$mount(); // $mount 生成真实dom, 挂载dom 挂载在哪里, 不传参的时候只生成不挂载，需要手动挂载

  const carrier = document.getElementById('drawer') || document.createElement('div');

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
  let remove = () => {
    maskEl.remove();
    drawerBox.remove();
    vm.$children[0].$destroy(); // 销毁组件
  };

  let drawerBox = document.createElement('div');
  drawerBox.className = 'drawer-box';
  drawerBox.style.width = options.width + 'px';
  if (options.title) {
    let titleEl = document.createElement('div');
    titleEl.className = 'drawer-title';
    titleEl.innerHTML = `<span>${options.title}</span>`;
    if (options.closable) {
      let iconEl = document.createElement('i');
      iconEl.className = 'el-dialog__close el-icon el-icon-close';
      iconEl.onclick = remove;
      titleEl.appendChild(iconEl);
    }
    drawerBox.appendChild(titleEl);
  }


  drawerBox.appendChild(vm.$el);
  carrier.appendChild(drawerBox);

 
  let drawerRef = {
    open: new Promise((resolve, reject) => {

    }),
    close: new Promise((resolve, reject) => {

    })
  };

  return drawerRef
}

export default { create };


declare module 'vue/types/vue' {
  interface Vue {
    $drawer: { create: (options: DrawerCreate) => DrawerRef }
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
}
interface DrawerRef {
  close: Promise<any>
  open: Promise<any>
}