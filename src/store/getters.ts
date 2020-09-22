const getters = {
  visitedViews: state => state.keepAliveViews.visitedViews,
  cachedViews: state => state.keepAliveViews.cachedViews,
}
export default getters