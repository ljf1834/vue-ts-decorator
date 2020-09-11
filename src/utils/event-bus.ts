export default {
  install: (Vue) => { Vue.prototype.$bus = new Vue() }
}

declare module 'vue/types/vue' {
  interface Vue {
    $bus: { $on: any, $emit: any, $off: any }
  }
}