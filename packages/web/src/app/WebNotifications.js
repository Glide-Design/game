import firebase from 'firebase/app';
import 'firebase/messaging';

export const initiateMessaging = () => {
  getTokenInit();
  const messaging = firebase.messaging();
  messaging.onMessage(payload => {
    console.log('Notification Received', payload);
    //this is the function that gets triggered when you receive a
    //push notification while you’re on the page. So you can
    //create a corresponding UI for you to have the push
    //notification handled.
  });
};

const getToken = noPermissionCallback => {
  const messaging = firebase.messaging();
  messaging.getToken().then(function(currentToken) {
    if (currentToken) {
      console.log('FCM Token:', currentToken);
      // sendTokenToServer(currentToken);
    } else if (noPermissionCallback) {
      noPermissionCallback();
    }
  });
};

export const getPermission = () => {
  getToken(() => {
    const messaging = firebase.messaging();
    messaging
      .requestPermission()
      .then(() => {
        console.log('Have Permission');
        return messaging.getToken();
      })
      .then(token => {
        console.log('FCM Token:', token);
        // sendTokenToServer(currentToken);
      })
      .catch(error => {
        if (error.code === 'messaging/permission-blocked') {
          console.log('Please Unblock Notification Request Manually');
        } else {
          console.log('Error Occurred', error);
        }
      });
  });
};

const getTokenInit = () => {
  getToken();
  const messaging = firebase.messaging();
  messaging.onTokenRefresh(() => getToken());
};
