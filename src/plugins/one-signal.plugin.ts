import OneSignal from 'react-onesignal';

const options = { autoRegister: true, autoResubscribe: true, notifyButton: { enable: true } }

OneSignal.initialize('f0b91418-d0d0-49cf-a5f1-3337b20e5a7b', options);
OneSignal.registerForPushNotifications();
console.info(OneSignal.notificationPermission());