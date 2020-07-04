import OneSignal from 'react-onesignal';
import { configs } from '../configs';

const options = { autoRegister: true, autoResubscribe: true, notifyButton: { enable: true } }

OneSignal.initialize(configs.onesignal, options);

try {
    OneSignal.registerForPushNotifications();
} catch (error) {
}
