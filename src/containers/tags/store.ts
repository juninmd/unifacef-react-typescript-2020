import swal from 'sweetalert2';
import { observable, action } from 'mobx';

export default class TagsStore {

  @observable image: string | null = 'https://www.einerd.com.br/wp-content/uploads/2019/08/Naruto-erro-1%C2%BA-epis%C3%B3dio-capa-890x466.jpg';
  @observable video: string | null = 'https://www.w3schools.com/html/mov_bbb.mp4';

  @observable geoLocale = '';

  @action getLocationGPS = () => {
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

  getUserMedia(constraints) {
    // if Promise-based API is available, use it
    if (navigator.mediaDevices) {
      return navigator.mediaDevices.getUserMedia(constraints);
    }

    // otherwise try falling back to old, possibly prefixed API...
    var legacyApi = navigator.getUserMedia;

    if (legacyApi) {
      // ...and promisify it
      return new Promise(function (resolve, reject) {
        legacyApi.bind(navigator)(constraints, resolve, reject);
      });
    }
    throw Error('not suported')
  }

  @action getStream = (type) => {
    var constraints = {};
    constraints[type] = true;

    this.getUserMedia(constraints)!
      .then(function (stream) {
        var mediaControl = document.querySelector('video#webcam') as any;

        if ('srcObject' in mediaControl) {
          mediaControl.srcObject = stream;
        } else {
          mediaControl.src = (window.URL || window.webkitURL).createObjectURL(stream);
        }

        mediaControl.play();
      })
      .catch(function (err) {
        alert('Error: ' + err);
      });

  }
}
const tags = new TagsStore();
export { tags };
