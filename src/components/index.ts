import CusQuery from './query';
import CusTable from './table';
import CusListPage from './list-page';

const AppComponents: any = {
  CusQuery,
  CusTable,
  CusListPage
};

const install = (Vue: any) => {
  Object.keys(AppComponents).map(key => Vue.component(key, AppComponents[key]));
};

export default {
  version: '0.0.1',
  install,
}