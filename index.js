function weatherApp() {
    return {
        apiKey: "aa6ea938956a570b463fa4a1a58898b7",
        city: '',
        weatherData: null,
        error: '',
        isLoading: false,
        async fetchWeather() {
            if (!this.city.trim()) {
                this.error = "Please enter a city name.";
                this.weatherData = null;
                return;
            }

            try {
                this.isLoading = true;
                this.error = '';
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.apiKey}&units=metric`);
                const data = await response.json();

                if (data.cod === 200) {
                    this.weatherData = data;
                    this.error = '';
                } else {
                    this.error = "City not found. Please try again.";
                    this.weatherData = null;
                }
            } catch (error) {
                this.error = "An error occurred while fetching weather data. Please try again.";
                this.weatherData = null;
            } finally {
                this.isLoading = false;
            }
        }
    };
}

// Firebase Configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

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

// Signup Functionality
const signup = document.getElementById("signup");

signup.addEventListener("click", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
        alert("Please fill in both email and password fields.");
        return;
    }

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            window.location.href = "login.html";
        })
        .catch((error) => {
            switch (error.code) {
                case "auth/email-already-in-use":
                    alert("This email is already registered. Please use another email.");
                    break;
                case "auth/weak-password":
                    alert("The password is too weak. Please choose a stronger password.");
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
            window.location.href = "index.html"; // Redirect after successful sign-in
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
        // Enable access to weather app functionality
    } else {
        console.log("No user signed in.");
        // Optionally, restrict access to weather app functionality
    }
});
