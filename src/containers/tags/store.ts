import swal from 'sweetalert2';
import { observable, action } from 'mobx';

export default class TagsStore {

  @observable image: string | null = 'https://www.einerd.com.br/wp-content/uploads/2019/08/Naruto-erro-1%C2%BA-epis%C3%B3dio-capa-890x466.jpg';
  @observable video: string | null = 'https://www.w3schools.com/html/mov_bbb.mp4';

  @observable geoLocale = '';

  @action getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        this.geoLocale = `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`;
      }, (err) => {
        swal.fire(err.message, '', 'error');
      }, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      });

    } else {
      swal.fire('Geolocation não é pertida nesse navegador.', '', 'error');
    }
  }

}
const tags = new TagsStore();
export { tags };
