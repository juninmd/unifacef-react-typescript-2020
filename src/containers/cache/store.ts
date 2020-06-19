import { observable, action } from 'mobx';
import { assign } from '../../utils/object.util';

export default class CacheStore {

  @observable session: string | null = '';
  @observable local: string | null = '';
  @observable cookie: string | null = '';

  @action handleForm = (event: any, select?: any) => {
    const { name, value } = select || event.target;
    assign(this, name, value);
  };

  @action saveCookie = () => {
    document.cookie = `unifacef=${this.cookie}`; 
  }

  @action saveLocalStorage = () => {
    localStorage.setItem('unifacef-local', this.local || '')
  }

  @action saveSessionStorage = () => {
    sessionStorage.setItem('unifacef-session', this.session || '')
  }

  @action loadForm = () => {
    this.cookie = this.getCookie('unifacef');
    this.session = sessionStorage.getItem('unifacef-session');
    this.local = localStorage.getItem('unifacef-local');
  }

  @action submit = () => {
    this.saveCookie();
    this.saveSessionStorage();
    this.saveLocalStorage();
  }

  getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
}
const cache = new CacheStore();
export { cache };
