// Firebase project config for warehouse-inbound-check
const firebaseConfig = {
  apiKey: "AIzaSyD4WDZw7NlKAYE-o_u57e57-O_or9rCWj8",
  authDomain: "warehouse-inbound-check.firebaseapp.com",
  databaseURL: "https://warehouse-inbound-check-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "warehouse-inbound-check",
  storageBucket: "warehouse-inbound-check.firebasestorage.app",
  messagingSenderId: "1084166400561",
  appId: "1:1084166400561:web:2b7ef9149e745d3e0e8310"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();
