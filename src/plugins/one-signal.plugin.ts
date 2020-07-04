// import OneSignal from 'react-onesignal';
import { configs } from '../configs';

// const options = { autoRegister: true, autoResubscribe: true, notifyButton: { enable: true } }

// OneSignal.initialize(configs.onesignal, options);

// try {
//   OneSignal.registerForPushNotifications();
// } catch (error) {
// }


const script = document.createElement("script") as any;
script.id = 'signalScript';
script.src = "https://cdn.onesignal.com/sdks/OneSignalSDK.js";
script.async = true;
script.onreadystatechange = async () => {
  var OneSignal = (window as any).OneSignal || [];
  OneSignal.push(() => {
    const registering = OneSignal.registerForPushNotifications({
      modalPrompt: true
    }).then(() => {
      console.log("in registration")
      OneSignal.getUserId().then(userId => {
        console.log("One signal -> ", userId)
      }).catch((err) => {
        console.log("error don show", err);
      })
    });
    console.log("coming second", registering)
  });
};
script.onload = script.onreadystatechange as any;
script.innerHTML = `var OneSignal = window.OneSignal || [];
                   OneSignal.push(function () {
                     OneSignal.init({
                       appId: "${configs.onesignal}"
                     });
                   });`;
document.body.appendChild(script);
const signalScript = document.getElementById('signalScript')!.innerHTML;
window.eval(signalScript);