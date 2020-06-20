import { observable, action } from 'mobx';
import { assign } from '../../utils/object.util';

export default class CacheStore {

  @observable session: string | null = '';
  @observable local: string | null = '';
  @observable cookie: string | null = '';
  @observable indexed: string | null = '';

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
    this.getData();
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

  saveData() {
    const request = window.indexedDB.open("Unifacef", 2);

    request.onsuccess = function (event) {
      console.log('sucesso');
    };

    request.onerror = function (event) {
      console.log('erro');
    };

    request.onupgradeneeded = (event) => {
      const db = (event!.target! as any).result;

      const objectStore = db.createObjectStore("clientes", { keyPath: "id" });

      // Cria um índice para buscar clientes pelo nome. Podemos ter nomes
      // duplicados, então não podemos usar como índice único.
      objectStore.createIndex("nome", "nome", { unique: false });

      // Cria um índice para buscar clientes por email. Queremos ter certeza
      // que não teremos 2 clientes com o mesmo e-mail;
      objectStore.createIndex("email", "email", { unique: true });


      const dados = [
        { id: 1, nome: "Bill", idade: 35, email: "bill@company.com" },
        { id: 2, nome: "Donna", idade: 32, email: "donna@home.org" }
      ];

      for (let index = 0; index < dados.length; index++) {
        const element = dados[index];
        objectStore.add(element);
      }
      db.close();
      this.getData();
    };
  }

  getData() {
    const dataBase = window.indexedDB.open("Unifacef");

    dataBase.onerror = function (event) {
      alert("Você não habilitou minha web app para usar IndexedDB?!");
    };
    dataBase.onsuccess = (event) => {
      const db = dataBase.result;
      try {
        const transaction = db.transaction(["clientes"]);
        const objectStore = transaction.objectStore("clientes");
        const request = objectStore.getAll();
        request.onerror = function (event) {
          // Tratar erro!
          db.close();
        };
        request.onsuccess = (event) => {
          // Fazer algo com request.result!
          this.indexed = JSON.stringify(request.result);
          db.close();
        };
      } catch (error) {
      }

    };
  }

  @action indexDb = () => {
    this.saveData();
  }
}
const cache = new CacheStore();
export { cache };
