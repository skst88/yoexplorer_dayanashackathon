import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDOKwWgM7tWeR5jcfhWx2c7WXXsie64sPE",
    authDomain: "yoexplorer-54cb4.firebaseapp.com",
    projectId: "yoexplorer-54cb4",
    storageBucket: "yoexplorer-54cb4.appspot.com",
    messagingSenderId: "22219008566",
    appId: "1:22219008566:web:3e3e3e770f6ec9fc320697"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const storage = getStorage(app);