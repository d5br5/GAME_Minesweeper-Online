// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";

type fbase = {
	[key: string]: string;
};

const firebaseConfig: fbase = {
	apiKey: "AIzaSyA32E0DIMbwogbwI_degYhAXoHDj1h2UMg",
	authDomain: "prism-studio.firebaseapp.com",
	projectId: "prism-studio",
	storageBucket: "prism-studio.appspot.com",
	messagingSenderId: "1074690878853",
	appId: "1:1074690878853:web:c488757f0453ae68b7a8ec",
	measurementId: "G-98L5162SYX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
