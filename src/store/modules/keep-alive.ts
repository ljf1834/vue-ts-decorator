import { VuexModule, Module, Mutation, getModule } from 'vuex-module-decorators';
import store from '@/store';
interface KeepAliveInterface {
  visitedViews: any[];
  cachedViews: any[]
}
@Module({ dynamic: true, store, name: 'route' })
class KeepAliveModule extends VuexModule implements KeepAliveInterface {
  public visitedViews: any[] = [];
  public cachedViews: any[] =[];

  @Mutation
  public ADD_VISITED_VIEWS(payload) {
    this.visitedViews.push(payload);
  }
  @Mutation
  public ADD_CACHED_VIEWS(payload) {
    if (payload.meta.noCache && !this.cachedViews.includes(payload.name)) {
      this.cachedViews.push(payload.name);
    }
  }

  @Mutation
  public REMOVE_VISITED_VIEWS(payload) {
    for (const [i, v] of this.visitedViews.entries()) {
      if (v.path === payload.path) {
        this.visitedViews.splice(i, 1);
        break;
      }
    }
  }

  @Mutation
  public REMOVE_CACHED_VIEWS(payload) {
    const index = this.cachedViews.indexOf(payload.name);
    index > -1 && this.cachedViews.splice(index, 1);
  }
}
export default getModule(KeepAliveModule);