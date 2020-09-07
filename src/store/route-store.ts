const routeStore =  {
  state: () => ({
    goPath: null,
    toPath: null,
    currentRoute: null,
    routeTabs: []
  }),
  mutations: {
    setCurrentRoute(state: RouteState, payload: any) {
      state.currentRoute = payload
    },
    setRouteTab(state: RouteState, payload: any) {
      if (payload) {
        state.routeTabs.push(payload);
      } else {
        state.routeTabs = [];
      }
    },
    removeRouteTab(state: RouteState, payload: string) {
      let index = state.routeTabs.findIndex(n => n.path === payload);
      state.routeTabs.splice(index, 1);
    }
  },
  actions: {

  },
  getters: {  }
}
export interface RouteState {
  from: any,
  to: any,
  currentRoute: any,
  routeTabs: any[]
}

export default {
  namespaced: true,
  ...routeStore
}