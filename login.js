import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBagpTroJo4kqFP1GqprT9rOt0ZuBR1QVo",
  authDomain: "login-page-43aee.firebaseapp.com",
  projectId: "login-page-43aee",
  storageBucket: "login-page-43aee.appspot.com",
  messagingSenderId: "380530753086",
  appId: "1:380530753086:web:643b4a4c548d16a0151b6f",
  measurementId: "G-JLXBK5LN3B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

document.addEventListener('DOMContentLoaded', () => {
  // Show the signup form
  document.getElementById('showSignupLink').addEventListener('click', (event) => {
    event.preventDefault();
    showSignupForm();
  });

  // Show the login form
  document.getElementById('showLoginLink').addEventListener('click', (event) => {
    event.preventDefault();
    showLoginForm();
  });

  // Handle login form submission
  document.getElementById('loginForm').addEventListener('submit', (event) => {
    handleLogin(event);
  });

  // Handle signup form submission
  document.getElementById('signupForm').addEventListener('submit', (event) => {
    handleSignup(event);
  });
});

function showSignupForm() {
  document.getElementById('login-form').classList.add('d-none');
  document.getElementById('signup-form').classList.remove('d-none');
}

function showLoginForm() {
  document.getElementById('signup-form').classList.add('d-none');
  document.getElementById('login-form').classList.remove('d-none');
}

function showAlert(message, type) {
  const alertContainer = document.getElementById('alert-container');
  const alert = document.createElement('div');
  alert.className = `alert alert-${type} alert-dismissible fade show`;
  alert.role = 'alert';
  alert.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  `;
  alertContainer.appendChild(alert);
  setTimeout(() => {
    alert.classList.remove('show');
    alert.addEventListener('transitionend', () => alert.remove());
  }, 10000);
}

function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-pwd').value;

  // Simple validation (you can add your own validation logic here)
  if (email === 'user@example.com' && password === 'password') {
    showAlert('Login successful!', 'success');
  } else {
    showAlert('Incorrect email or password.', 'danger');
  }
}

function handleSignup(event) {
  event.preventDefault();
  const firstName = document.getElementById('firstname').value;
  const lastName = document.getElementById('lastname').value;
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-pwd').value;
  const confirmPassword = document.getElementById('confirm-pwd').value;

  if (password !== confirmPassword) {
    showAlert('Passwords do not match.', 'danger');
    return;
  }

  const auth = getAuth();
  const DB = getFirestore();
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const userData = {
        email: email,
        firstName: firstName,
        lastName: lastName
      };

      const docRef = doc(DB, 'users', user.uid);
      setDoc(docRef, userData).then(() => {
        window.location.href = "dashboard.html";
      }).catch((error) => {
        console.error('Error writing document', error);
        showAlert('Error writing document', 'danger');
      });

    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === "auth/email-already-in-use") {
        showAlert('Email already exists!', 'danger');
      } else {
        showAlert('Error signing up', 'danger');
      }
    });
}
