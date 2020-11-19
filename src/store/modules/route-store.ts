const routeStore =  {
  state: () => ({
    currentRoute: null,
    routeTabs: []
  }),
  mutations: {
    setCurrentRoute(state: RouteState, payload: any) {
      state.currentRoute = payload
    },
    setRouteTab(state: RouteState, payload: any) {
      state.routeTabs.push(payload);
    },
    removeRouteTab(state: RouteState, payload: string) {
      if (payload) {
        let index = state.routeTabs.findIndex(n => n.path === payload);
        state.routeTabs.splice(index, 1);
      } else {
        state.routeTabs = [];
      }
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