import { RouterStore } from 'mobx-react-router';
import { action } from 'mobx';

export default class NewRouterStore extends RouterStore {

  @action setHistory = (path: string) => {
    this.history.push(path);
  }

}

const router = new NewRouterStore();
export { router };
