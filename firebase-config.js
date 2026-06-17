import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyAiLt9YrV_KSktyQVkk6Ot2n4nHP1LqVx0",
    authDomain: "esp1-53532.firebaseapp.com",
    databaseURL: "https://esp1-53532-default-rtdb.firebaseio.com",
    projectId: "esp1-53532",
    storageBucket: "esp1-53532.firebasestorage.app",
    messagingSenderId: "395642028907",
    appId: "1:395642028907:web:98f6567ec952fa39d7422e"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { app, db };
