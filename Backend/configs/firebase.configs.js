require("dotenv").config();
// Your web app"s Firebase configuration
const firebaseConfig = {
    apiKey: proccess.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSender: process.env.messagingSender,
    appId: process.env.appId,
};

module.exports = firebaseConfig;