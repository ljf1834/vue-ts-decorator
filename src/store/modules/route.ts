import { VuexModule, Module, Mutation, getModule } from 'vuex-module-decorators';
import store from '@/store';
import { Route } from 'vue-router';

interface RouteInterface {
  routeTabs: Route[]
}
@Module({ dynamic: true, store, name: 'route' })
class RouteModule extends VuexModule implements RouteInterface {
  public routeTabs: any[] = []
  
  @Mutation
  public SET_ROUTE_TAB(payload) {
    this.routeTabs.push(payload);
  }
  @Mutation
  public REMOVE_ROUTE_TAB(payload) {
    if (payload) {
      let index = this.routeTabs.findIndex((n: Route) => n.path === payload);
      this.routeTabs.splice(index, 1);
    } else {
      this.routeTabs = [];
    }
  }
}
export default getModule(RouteModule);