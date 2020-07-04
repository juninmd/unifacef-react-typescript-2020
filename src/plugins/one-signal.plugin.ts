import OneSignal from 'react-onesignal';
import { configs } from '../configs';
import { OneSignalOptions } from 'react-onesignal/dist/oneSignal.types';

const options: OneSignalOptions = {
  autoRegister: true,
  autoResubscribe: true,
  notifyButton: { enable: true, showCredit: true },
  persistNotification: true
}

OneSignal.initialize(configs.onesignal, options);

async function init() {
  try {
    await OneSignal.registerForPushNotifications();
  } catch (error) {
  }
}

init();
