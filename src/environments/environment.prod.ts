import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

export const environment = {
  production: true,
  firebaseConfig: {
    apiKey: "AIzaSyDzyBspL521SkJW1iU5zDyGdLEWAjLIzAk",
    authDomain: "jdev-il.firebaseapp.com",
    databaseURL: "https://jdev-il-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "jdev-il",
    storageBucket: "jdev-il.appspot.com",
    messagingSenderId: "704733248110",
    appId: "1:704733248110:web:6e1f6508ab6cfcafa8847f",
    measurementId: "G-SNHZQR0C3S"
  },
};

const app = initializeApp(environment.firebaseConfig);
const analytics = getAnalytics(app);
