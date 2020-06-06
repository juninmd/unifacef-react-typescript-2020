import { getPrice } from './../../apis/economy.api';
import { action, observable } from 'mobx';

export default class HomeStore {
  @observable records: any[] = [];

  @action buildRecords = async () => {
    const { data } = await getPrice();
    this.records = Object.values(data);
  }

}
const home = new HomeStore();
export { home };
