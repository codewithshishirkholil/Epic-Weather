// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCjpXPPI_46ih71lsSJbBh57RlW9VWmxIA",
    authDomain: "epicweather-9368c.firebaseapp.com",
    projectId: "epicweather-9368c",
    storageBucket: "epicweather-9368c.appspot.com",
    messagingSenderId: "978250455035",
    appId: "1:978250455035:web:800d355896ecfbf68c5d5e",
    measurementId: "G-3RSBF7R5XF",
};

// Initialize Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut, deleteUser } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// DOM Elements
const profilePic = document.getElementById("profile-pic");
const uploadPic = document.getElementById("upload-pic");
const userName = document.getElementById("user-name");
const userEmail = document.getElementById("user-email");
const editName = document.getElementById("edit-name");
const editAbout = document.getElementById("edit-about");
const updateProfile = document.getElementById("update-profile");
const logout = document.getElementById("logout");
const deleteAccount = document.getElementById("delete-account");

// Check user authentication
onAuthStateChanged(auth, async (user) => {
    if (user) {
        try {
            const userDocRef = doc(db, "users", user.uid);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
                const userData = userDoc.data();
                profilePic.src = userData.photoURL || "default.png";
                userName.textContent = userData.name || "No Name";
                userEmail.textContent = user.email || "No Email";
                editName.value = userData.name || "";
                editAbout.value = userData.about || "";
            } else {
                // Create a new document if it doesn't exist
                await setDoc(userDocRef, {
                    email: user.email,
                    name: user.displayName || "",
                    about: "",
                    photoURL: user.photoURL || "default.png",
                });
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    } else {
        // Redirect to login page
        window.location.href = "login.html";
    }
});

// Update profile
updateProfile.addEventListener("click", async () => {
    const user = auth.currentUser;
    if (user) {
        try {
            const userDocRef = doc(db, "users", user.uid);
            await updateDoc(userDocRef, {
                name: editName.value,
                about: editAbout.value,
                photoURL: profilePic.src,
            });
            alert("Profile updated!");
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Failed to update profile. Please try again.");
        }
    }
});

// Handle picture upload
uploadPic.addEventListener("change", () => {
    const reader = new FileReader();
    reader.onload = (e) => {
        profilePic.src = e.target.result;
    };
    reader.readAsDataURL(uploadPic.files[0]);
});

// Logout
logout.addEventListener("click", () => {
    signOut(auth)
        .then(() => {
            window.location.href = "login.html";
        })
        .catch((error) => {
            console.error("Error during logout:", error);
        });
});

// Delete account
deleteAccount.addEventListener("click", async () => {
    const user = auth.currentUser;
    if (user) {
        try {
            const userDocRef = doc(db, "users", user.uid);
            await deleteDoc(userDocRef); // Delete Firestore document
            await deleteUser(user); // Delete Firebase Authentication account
            alert("Account deleted!");
            window.location.href = "login.html";
        } catch (error) {
            console.error("Error deleting account:", error);
            alert("Failed to delete account. Please try again.");
        }
    }
});
