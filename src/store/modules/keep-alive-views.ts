const state = {
  visitedViews: [],
  cachedViews: []
};

const mutations = {
  add_visited_views: (state, payload: any) => {
    state.visitedViews.push(payload);
  },
  add_cached_views: (state, payload) => {
    if (payload.meta.noCache && !state.cachedViews.includes(payload.name)) {
      state.cachedViews.push(payload.name);
    }
  },
  remove_visited_views: (state, payload) => {
    for (const [i, v] of state.visitedViews.entries()) {
      if (v.path === payload.path) {
        state.visitedViews.splice(i, 1);
        break;
      }
    }
  },
  remove_cached_views: (state, payload) => {
    const index = state.cachedViews.indexOf(payload.name);
    index > -1 && state.cachedViews.splice(index, 1);
  }
}

const actions = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}