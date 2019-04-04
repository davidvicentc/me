import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import firebase from "firebase/app";

import * as serviceWorker from "./serviceWorker";

const config = {
	apiKey: "AIzaSyADDnu4EkIuMx2x5ZqzfnsWjv5FNiYxku0",
	authDomain: "my-app-d7d57.firebaseapp.com",
	databaseURL: "https://my-app-d7d57.firebaseio.com",
	projectId: "my-app-d7d57",
	storageBucket: "my-app-d7d57.appspot.com",
	messagingSenderId: "419497028122"
};

firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
