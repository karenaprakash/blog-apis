const firebase  = require('firebase/app');
const storage = require('firebase/storage');


let firebaseConfig = {
    apiKey: "AIzaSyBVk8uU3vkTNlUAHoP8CsMJLzXqDaoymqA",
    authDomain: "images-f8e11.firebaseapp.com",
    databaseURL: "https://images-f8e11.firebaseio.com",
    projectId: "images-f8e11",
    storageBucket: "images-f8e11.appspot.com",
    messagingSenderId: "358962288517",
    appId: "1:358962288517:web:3578c217e6fb907da8d6ec"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  //firebase.analytics();

  let firebase_storage = firebase.storage();
  
  let API_URL = 'gs://images-f8e11.appspot.com';
  
  module.exports = {
      firebase_storage,
      API_URL,
      firebase 
  };