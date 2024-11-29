// Firebase Configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

// Firebase Setup
const firebaseConfig = {
    apiKey: "AIzaSyCjpXPPI_46ih71lsSJbBh57RlW9VWmxIA",
    authDomain: "epicweather-9368c.firebaseapp.com",
    projectId: "epicweather-9368c",
    storageBucket: "epicweather-9368c.appspot.com",
    messagingSenderId: "978250455035",
    appId: "1:978250455035:web:800d355896ecfbf68c5d5e",
    measurementId: "G-3RSBF7R5XF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Login Functionality (Email & Password)
const signin = document.getElementById("signin");

signin.addEventListener("click", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
        alert("Please fill in both email and password fields.");
        return;
    }

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            // alert("Logged in successfully! Welcome back, " + user.email);
            window.location.href = "index.html";
        })
        .catch((error) => {
            switch (error.code) {
                case "auth/user-not-found":
                    alert("No account found with this email. Please sign up first.");
                    break;
                case "auth/wrong-password":
                    alert("Incorrect password. Please try again.");
                    break;
                case "auth/invalid-email":
                    alert("The email address is invalid. Please check and try again.");
                    break;
                default:
                    alert("Error: " + error.message);
            }
        });
});

// Google Sign-In Functionality
const googleLoginBtn = document.getElementById("google-login");

googleLoginBtn.addEventListener("click", function (event) {
    event.preventDefault();

    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            console.log("User signed in with Google: ", user.email);
            // Redirect or process user information
            window.location.href = "index.html";
        })
        .catch((error) => {
            console.error("Google sign-in error: ", error.message);
            alert("Error during Google sign-in. Please try again.");
        });
});

// Firebase Authentication State Listener
auth.onAuthStateChanged((user) => {
    if (user) {
        console.log("User signed in: ", user.email);
        // Allow access to weather app functionality
    } else {
        console.log("No user signed in.");
        // Optionally restrict access to weather app functionality
    }
});
